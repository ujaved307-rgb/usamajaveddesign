import { NextRequest, NextResponse } from "next/server";
import { GATE_COOKIE_NAME, computeGateToken, isCorrectPassword } from "@/lib/gate";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!isCorrectPassword(password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  // No maxAge/expires: this is a session cookie, cleared when the browser closes,
  // so the password is asked again on every new visit.
  response.cookies.set(GATE_COOKIE_NAME, await computeGateToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return response;
}
