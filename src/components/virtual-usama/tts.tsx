"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type TtsStatus = "idle" | "speaking" | "paused";

interface TtsContextValue {
  speakingId: string | null;
  status: TtsStatus;
  supported: boolean;
  toggle: (id: string, text: string) => void;
  stop: () => void;
}

const TtsContext = createContext<TtsContextValue | null>(null);

export function TtsProvider({ children }: { children: ReactNode }) {
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [status, setStatus] = useState<TtsStatus>("idle");
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeakingId(null);
    setStatus("idle");
  }, [supported]);

  // Stop any speech if the panel/page unmounts.
  useEffect(() => stop, [stop]);

  const toggle = useCallback(
    (id: string, text: string) => {
      if (!supported) return;

      if (speakingId === id) {
        if (status === "speaking") {
          window.speechSynthesis.pause();
          setStatus("paused");
        } else if (status === "paused") {
          window.speechSynthesis.resume();
          setStatus("speaking");
        }
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.onend = () => {
        setSpeakingId((current) => (current === id ? null : current));
        setStatus((s) => (utteranceRef.current === utterance ? "idle" : s));
      };
      utterance.onerror = () => {
        setSpeakingId((current) => (current === id ? null : current));
        setStatus("idle");
      };
      utteranceRef.current = utterance;
      setSpeakingId(id);
      setStatus("speaking");
      window.speechSynthesis.speak(utterance);
    },
    [speakingId, status, supported]
  );

  const value = useMemo(
    () => ({ speakingId, status, supported, toggle, stop }),
    [speakingId, status, supported, toggle, stop]
  );

  return <TtsContext.Provider value={value}>{children}</TtsContext.Provider>;
}

export function useTts() {
  const ctx = useContext(TtsContext);
  if (!ctx) throw new Error("useTts must be used within TtsProvider");
  return ctx;
}

function SpeakingWaveform() {
  return (
    <span className="flex items-end gap-[2.5px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[2.5px] animate-[vu-wave_0.9s_ease-in-out_infinite] rounded-full bg-accent-strong"
          style={{ animationDelay: `${i * 0.12}s`, height: 6 }}
        />
      ))}
    </span>
  );
}

export function ListenButton({ id, text }: { id: string; text: string }) {
  const { speakingId, status, supported, toggle, stop } = useTts();
  if (!supported || !text.trim()) return null;

  const isActive = speakingId === id;
  const isSpeaking = isActive && status === "speaking";

  return (
    <span className="inline-flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => toggle(id, text)}
        aria-pressed={isActive}
        aria-label={
          isSpeaking
            ? "Pause Virtual Usama speaking this answer"
            : isActive
              ? "Resume Virtual Usama speaking this answer"
              : "Listen to this answer"
        }
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
          isActive
            ? "border-accent-strong/30 bg-accent-strong/10 text-accent-strong"
            : "border-ink/15 text-ink-2 hover:border-ink/30 hover:text-ink"
        }`}
      >
        {isSpeaking ? (
          <>
            <SpeakingWaveform />
            <span>Speaking</span>
          </>
        ) : isActive ? (
          <>
            <span aria-hidden>▶</span>
            <span>Resume</span>
          </>
        ) : (
          <>
            <span aria-hidden>🔊</span>
            <span>Listen</span>
          </>
        )}
      </button>
      {isActive && (
        <button
          type="button"
          onClick={stop}
          aria-label="Stop speaking"
          className="rounded-full border border-ink/15 px-2 py-1 text-xs text-ink-2 hover:border-ink/30 hover:text-ink"
        >
          <span aria-hidden>✕</span>
        </button>
      )}
    </span>
  );
}
