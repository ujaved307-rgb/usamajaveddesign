import { NextRequest, NextResponse } from "next/server";
import { GATE_COOKIE_NAME, isValidGateToken } from "@/lib/gate";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(GATE_COOKIE_NAME)?.value;
  if (await isValidGateToken(token)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/gate";
  url.search = "";
  if (request.nextUrl.pathname !== "/") {
    url.searchParams.set("from", request.nextUrl.pathname);
  }
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!gate|api/gate|_next/static|_next/image|favicon.ico|icon.png|images|logos).*)",
  ],
};
