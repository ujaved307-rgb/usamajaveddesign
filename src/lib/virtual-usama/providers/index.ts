import type { ChatProvider } from "@/lib/virtual-usama/providers/types";
import { groqChat } from "@/lib/virtual-usama/providers/groq";
import { anthropicChat } from "@/lib/virtual-usama/providers/anthropic";

/**
 * Picks whichever provider has an API key configured — Groq first (free
 * tier, what's currently set up), falling back to Anthropic if that key
 * exists instead. Keeps the route and UI completely provider-agnostic;
 * add a new provider file and a branch here to support another one.
 */
export function getChatProvider(): ChatProvider {
  if (process.env.GROQ_API_KEY) return groqChat;
  if (process.env.ANTHROPIC_API_KEY) return anthropicChat;
  throw new Error("No AI provider configured — set GROQ_API_KEY or ANTHROPIC_API_KEY.");
}
