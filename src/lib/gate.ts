export const GATE_COOKIE_NAME = "portfolio_auth";

async function sha256Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// The cookie stores a hash derived from the password rather than the
// password itself, so it can't be read back out of the cookie value.
export async function computeGateToken() {
  const password = process.env.SITE_PASSWORD ?? "";
  return sha256Hex(`portfolio-gate:${password}`);
}

export async function isValidGateToken(token: string | undefined) {
  if (!token) return false;
  return token === (await computeGateToken());
}

export function isCorrectPassword(candidate: string) {
  return candidate === (process.env.SITE_PASSWORD ?? "");
}
