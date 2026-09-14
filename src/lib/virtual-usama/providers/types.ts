export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface StreamChatOptions {
  systemPrompt: string;
  messages: ChatMessage[];
  signal?: AbortSignal;
}

/**
 * A provider turns a conversation into a stream of plain-text deltas
 * (already unwrapped from whatever the underlying API's event format is).
 * Swapping models/vendors means writing a new file that satisfies this
 * shape — nothing else in the app needs to change.
 */
export type ChatProvider = (options: StreamChatOptions) => Promise<ReadableStream<Uint8Array>>;
