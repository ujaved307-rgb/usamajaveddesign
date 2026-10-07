// Kept separate from extract-text.ts (no pdf-parse/mammoth import here) so
// the route handler can catch this error type without eagerly loading
// those heavier dependencies for every request, text-only ones included.
export class ExtractionError extends Error {}
