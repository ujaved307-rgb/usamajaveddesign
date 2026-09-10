import { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/virtual-usama/system-prompt";
import { anthropicChat } from "@/lib/virtual-usama/providers/anthropic";
import { isRateLimited } from "@/lib/virtual-usama/rate-limit";
import type { ChatMessage } from "@/lib/virtual-usama/providers/types";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 12;

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    (v.role === "user" || v.role === "assistant") &&
    typeof v.content === "string" &&
    v.content.length > 0 &&
    v.content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Virtual Usama is getting a lot of questions right now. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request body.");
  }

  const messages = (body as { messages?: unknown[] })?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return badRequest("A non-empty `messages` array is required.");
  }
  if (!messages.every(isChatMessage)) {
    return badRequest("Each message needs a role of 'user' or 'assistant' and non-empty text under 1000 characters.");
  }

  const trimmed = (messages as ChatMessage[]).slice(-MAX_HISTORY);
  if (trimmed[trimmed.length - 1]?.role !== "user") {
    return badRequest("The last message must be from the user.");
  }

  try {
    const stream = await anthropicChat({
      systemPrompt: buildSystemPrompt(),
      messages: trimmed,
      signal: request.signal,
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[virtual-usama]", error);
    return Response.json(
      {
        error:
          "Virtual Usama is taking a quick break. You can still explore the case studies, or reach out directly.",
      },
      { status: 502 }
    );
  }
}
