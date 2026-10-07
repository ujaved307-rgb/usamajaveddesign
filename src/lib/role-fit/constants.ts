// Shared between the client component and the server route — kept in its
// own file (no server-only imports) so the client bundle never has to pull
// in pdf-parse/mammoth just to read a number.
//
// Vercel's serverless functions hard-cap request bodies at 4.5MB — a file
// (plus multipart overhead) over this never reaches the route handler at
// all; the platform rejects it first with a non-JSON response. Stay
// safely under it.
export const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4MB
