import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { isRateLimited } from "@/lib/virtual-usama/rate-limit";
import { extractTextFromFile, ExtractionError } from "@/lib/role-fit/extract-text";
import { RoleFitResultSchema } from "@/lib/role-fit/schema";
import { buildRoleFitSystemPrompt, wrapJobDescription } from "@/lib/role-fit/system-prompt";

export const maxDuration = 60;

const MIN_JD_LENGTH = 80;
const MAX_JD_LENGTH = 15000;

function getClientKey(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { error: "Too many requests — please try again in a few minutes." },
      { status: 429 }
    );
  }

  let jdText: string;
  try {
    const formData = await request.formData();
    const pastedText = formData.get("jdText");
    const file = formData.get("file");

    if (file instanceof File && file.size > 0) {
      jdText = await extractTextFromFile(file);
    } else if (typeof pastedText === "string" && pastedText.trim().length > 0) {
      jdText = pastedText;
    } else {
      return NextResponse.json(
        { error: "Please paste a job description or upload a file." },
        { status: 400 }
      );
    }
  } catch (err) {
    if (err instanceof ExtractionError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Couldn't read that submission." }, { status: 400 });
  }

  jdText = jdText.trim();
  if (jdText.length < MIN_JD_LENGTH) {
    return NextResponse.json(
      { error: "That doesn't look like a full job description — please paste more detail." },
      { status: 400 }
    );
  }
  if (jdText.length > MAX_JD_LENGTH) {
    jdText = jdText.slice(0, MAX_JD_LENGTH);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "This feature isn't configured yet — missing API credentials." },
      { status: 503 }
    );
  }

  try {
    const client = new Anthropic();
    const response = await client.messages.parse({
      model: "claude-opus-5-5",
      max_tokens: 8000,
      system: buildRoleFitSystemPrompt(),
      messages: [{ role: "user", content: wrapJobDescription(jdText) }],
      output_config: {
        format: zodOutputFormat(RoleFitResultSchema),
        effort: "medium",
      },
    });

    if (!response.parsed_output) {
      return NextResponse.json(
        { error: "Couldn't analyze that job description — please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json(response.parsed_output);
  } catch (err) {
    console.error("role-fit analysis failed:", err);
    return NextResponse.json(
      { error: "Something went wrong analyzing that — please try again shortly." },
      { status: 502 }
    );
  }
}
