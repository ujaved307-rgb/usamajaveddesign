// Best-effort, in-memory rate limiting — resets whenever the serverless
// function cold-starts. That's an acceptable tradeoff for a portfolio chat
// widget: it blunts casual abuse/API-cost spikes without needing a database
// or external store for V1.

const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);

  // Opportunistically forget stale keys so the map doesn't grow forever.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t > WINDOW_MS)) hits.delete(k);
    }
  }

  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}
