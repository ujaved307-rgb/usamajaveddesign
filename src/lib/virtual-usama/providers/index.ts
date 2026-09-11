import type { ChatProvider } from "@/lib/virtual-usama/providers/types";
import { geminiChat } from "@/lib/virtual-usama/providers/gemini";
import { groqChat } from "@/lib/virtual-usama/providers/groq";
import { anthropicChat } from "@/lib/virtual-usama/providers/anthropic";

/**
 * Picks whichever provider has an API key configured — Gemini first (free
 * tier, no reasoning-model surprises), then Groq, then Anthropic. Keeps the
 * route and UI completely provider-agnostic; add a new provider file and a
 * branch here to support another one.
 */
export function getChatProvider(): ChatProvider {
  if (process.env.GEMINI_API_KEY) return geminiChat;
  if (process.env.GROQ_API_KEY) return groqChat;
  if (process.env.ANTHROPIC_API_KEY) return anthropicChat;
  throw new Error("No AI provider configured — set GEMINI_API_KEY, GROQ_API_KEY, or ANTHROPIC_API_KEY.");
}
