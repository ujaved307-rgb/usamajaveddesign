import type { ChatProvider } from "@/lib/virtual-usama/providers/types";

// Flash-Lite has "thinking" disabled by default (unlike 2.5 Pro/Flash, which
// think unless told not to) — the fastest, most direct model on the free
// tier, which is exactly what a quick recruiter Q&A needs. Override with
// GEMINI_MODEL if Google's free-tier lineup changes.
const DEFAULT_MODEL = "gemini-2.5-flash-lite";
const MAX_TOKENS = 700;

/**
 * Google's Generative Language API. Free tier, no billing required — get a
 * key at aistudio.google.com. Streams via Server-Sent Events (?alt=sse);
 * unlike OpenAI-style APIs there's no [DONE] sentinel, the stream just ends
 * when the connection closes.
 */
export const geminiChat: ChatProvider = async ({ systemPrompt, messages, signal }) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const baseUrl = process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta";
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  const upstream = await fetch(`${baseUrl}/models/${model}:streamGenerateContent?alt=sse`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: MAX_TOKENS,
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
    signal,
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    throw new Error(`Gemini API error ${upstream.status}: ${detail.slice(0, 300)}`);
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();
  let buffer = "";

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }

      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split("\n\n");
      buffer = events.pop() ?? "";

      for (const event of events) {
        const dataLine = event.split("\n").find((line) => line.startsWith("data:"));
        if (!dataLine) continue;
        const json = dataLine.slice(5).trim();
        if (!json) continue;

        try {
          const parsed = JSON.parse(json);
          const parts = parsed.candidates?.[0]?.content?.parts ?? [];
          const text = parts.map((p: { text?: string }) => p.text ?? "").join("");
          if (text) controller.enqueue(encoder.encode(text));

          const blockReason = parsed.promptFeedback?.blockReason;
          if (blockReason) {
            controller.error(new Error(`Gemini blocked the request: ${blockReason}`));
          }
        } catch {
          // Ignore malformed/partial SSE fragments — the next chunk completes them.
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });
};
