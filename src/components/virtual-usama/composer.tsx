"use client";

import { useState, type KeyboardEvent } from "react";

const MAX_LENGTH = 1000;

export function Composer({ onSend, disabled }: { onSend: (text: string) => void; disabled: boolean }) {
  const [value, setValue] = useState("");
  const tooLong = value.length > MAX_LENGTH;

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || tooLong || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div
      className="border-t border-ink/10 px-5 py-4 sm:px-6"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      {tooLong && (
        <p className="mb-2 text-xs text-accent-strong">
          That&rsquo;s a long question — try trimming it to under {MAX_LENGTH} characters.
        </p>
      )}
      <div className="flex items-end gap-2 rounded-2xl border border-ink/15 bg-cream-2/50 px-3 py-2 focus-within:border-ink/30">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          rows={1}
          placeholder="Ask Virtual Usama…"
          aria-label="Ask Virtual Usama a question"
          className="max-h-32 min-h-[28px] flex-1 resize-none bg-transparent py-1 text-[15px] leading-relaxed text-ink placeholder:text-ink-3 focus:outline-none disabled:opacity-60"
        />
        <button
          type="button"
          onClick={submit}
          disabled={disabled || !value.trim() || tooLong}
          aria-label="Send question"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-cream transition-opacity disabled:opacity-30"
        >
          <span aria-hidden>↑</span>
        </button>
      </div>
      <p className="mt-2 text-center text-[11px] text-ink-3">
        Human-led × AI-powered — answers are grounded in Usama&rsquo;s real portfolio, not invented.
      </p>
    </div>
  );
}
