import type { ChatProvider } from "@/lib/virtual-usama/providers/types";

const ANTHROPIC_VERSION = "2023-06-01";
const DEFAULT_MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 700;

/**
 * Anthropic Messages API via raw fetch + manual SSE parsing — no SDK
 * dependency, so it stays edge-runtime friendly and keeps the bundle small.
 * Requires ANTHROPIC_API_KEY in the deployment's environment variables.
 */
export const anthropicChat: ChatProvider = async ({ systemPrompt, messages, signal }) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const baseUrl = process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com";

  const upstream = await fetch(`${baseUrl}/v1/messages`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: process.env.VIRTUAL_USAMA_MODEL || DEFAULT_MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      stream: true,
    }),
    signal,
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    throw new Error(`Anthropic API error ${upstream.status}: ${detail.slice(0, 300)}`);
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
          if (parsed.type === "content_block_delta" && parsed.delta?.type === "text_delta") {
            controller.enqueue(encoder.encode(parsed.delta.text));
          } else if (parsed.type === "error") {
            controller.error(new Error(parsed.error?.message || "Anthropic stream error"));
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
