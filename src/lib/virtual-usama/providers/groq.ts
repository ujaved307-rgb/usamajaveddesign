import type { ChatProvider } from "@/lib/virtual-usama/providers/types";

// llama-3.1-8b-instant and llama-3.3-70b-versatile are Enterprise-only on
// Groq now (hence the 404s) — openai/gpt-oss-20b is the fastest model
// actually available on a normal developer key. Override with the
// GROQ_MODEL env var (no code change needed) if Groq's catalog shifts
// again — check the current list at console.groq.com/docs/models.
const DEFAULT_MODEL = "openai/gpt-oss-20b";
const MAX_TOKENS = 700;

/**
 * Groq's chat completions API is OpenAI-compatible — same request shape,
 * same "data: {...}" SSE framing, terminated by "data: [DONE]". Free tier,
 * no billing required. Swappable with the Anthropic provider via
 * providers/index.ts without touching the route or the UI.
 */
export const groqChat: ChatProvider = async ({ systemPrompt, messages, signal }) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const baseUrl = process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1";

  const upstream = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || DEFAULT_MODEL,
      max_tokens: MAX_TOKENS,
      // gpt-oss is a reasoning model — keep its internal reasoning short so
      // it doesn't bleed into the visible answer or slow down streaming.
      reasoning_effort: "low",
      messages: [{ role: "system", content: systemPrompt }, ...messages.map((m) => ({ role: m.role, content: m.content }))],
      stream: true,
    }),
    signal,
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    throw new Error(`Groq API error ${upstream.status}: ${detail.slice(0, 300)}`);
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
        if (!json || json === "[DONE]") continue;

        try {
          const parsed = JSON.parse(json);
          const text = parsed.choices?.[0]?.delta?.content;
          if (typeof text === "string" && text.length > 0) {
            controller.enqueue(encoder.encode(text));
          }
          if (parsed.error) {
            controller.error(new Error(parsed.error?.message || "Groq stream error"));
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
