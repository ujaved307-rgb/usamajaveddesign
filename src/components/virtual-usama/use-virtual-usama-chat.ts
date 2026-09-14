"use client";

import { useCallback, useRef, useState } from "react";
import { stripMeta, parseMeta, type ParsedMeta } from "@/components/virtual-usama/meta-parser";

export interface DisplayMessage {
  id: string;
  role: "user" | "assistant";
  /** For assistant messages: raw text as streamed, including any meta block. */
  raw: string;
  /** For assistant messages: raw with the meta block stripped — what's rendered. */
  visible: string;
  status: "streaming" | "done" | "error";
  meta?: ParsedMeta;
}

const FALLBACK_ERROR =
  "Virtual Usama is taking a quick break. You can still explore the case studies below, or reach out directly.";

let idCounter = 0;
const nextId = () => `vu-${Date.now()}-${idCounter++}`;

export function useVirtualUsamaChat() {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmedText = text.trim();
      if (!trimmedText || isStreaming) return;

      const userMessage: DisplayMessage = {
        id: nextId(),
        role: "user",
        raw: trimmedText,
        visible: trimmedText,
        status: "done",
      };
      const assistantId = nextId();
      const assistantPlaceholder: DisplayMessage = {
        id: assistantId,
        role: "assistant",
        raw: "",
        visible: "",
        status: "streaming",
      };

      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.visible,
      }));

      setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      const setAssistant = (updater: (m: DisplayMessage) => DisplayMessage) => {
        setMessages((prev) => prev.map((m) => (m.id === assistantId ? updater(m) : m)));
      };

      try {
        const res = await fetch("/api/virtual-usama", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          let errorText = FALLBACK_ERROR;
          try {
            const body = await res.json();
            if (typeof body?.error === "string") errorText = body.error;
          } catch {
            // keep fallback
          }
          setAssistant((m) => ({ ...m, raw: errorText, visible: errorText, status: "error" }));
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let raw = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          raw += decoder.decode(value, { stream: true });
          const visible = stripMeta(raw);
          setAssistant((m) => ({ ...m, raw, visible }));
        }

        const meta = parseMeta(raw);
        setAssistant((m) => ({ ...m, visible: stripMeta(raw), status: "done", meta }));
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return;
        setAssistant((m) => ({ ...m, raw: FALLBACK_ERROR, visible: FALLBACK_ERROR, status: "error" }));
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, isStreaming]
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setIsStreaming(false);
  }, []);

  return { messages, isStreaming, sendMessage, reset };
}
