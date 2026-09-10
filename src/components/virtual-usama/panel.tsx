"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useVirtualUsama } from "@/components/virtual-usama/store";
import { useVirtualUsamaChat } from "@/components/virtual-usama/use-virtual-usama-chat";
import { VirtualUsamaMessage } from "@/components/virtual-usama/message";
import { INTRO_PROMPT_GROUPS, PromptChipRow } from "@/components/virtual-usama/suggested-prompts";
import { TtsProvider, useTts } from "@/components/virtual-usama/tts";
import { Composer } from "@/components/virtual-usama/composer";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

function PanelInner() {
  const { isOpen, close, pendingQuestion, consumePendingQuestion } = useVirtualUsama();
  const { messages, isStreaming, sendMessage, reset } = useVirtualUsamaChat();
  const { stop: stopSpeech } = useTts();
  const shouldReduceMotion = useReducedMotion();

  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasSentPending = useRef(false);

  // Open/close side-effects: focus management + body scroll lock.
  useEffect(() => {
    if (isOpen) {
      lastFocused.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      const frame = requestAnimationFrame(() => {
        const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        first?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }
    document.body.style.overflow = "";
    lastFocused.current?.focus();
    stopSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => () => {
    document.body.style.overflow = "";
  }, []);

  // Escape to close + focus trap.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  // Auto-scroll to newest content.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Consume a queued question from an external prompt chip (e.g. the hero CTA).
  useEffect(() => {
    if (isOpen && pendingQuestion && !hasSentPending.current) {
      hasSentPending.current = true;
      sendMessage(pendingQuestion);
      consumePendingQuestion();
    }
    if (!isOpen) hasSentPending.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, pendingQuestion]);

  const handleClose = () => {
    stopSpeech();
    close();
  };

  const handleNavigate = () => {
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="vu-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.25 }}
            className="fixed inset-0 z-[95] bg-ink/30 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden
          />
          <motion.div
            key="vu-panel"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="vu-panel-title"
            initial={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[96] flex flex-col bg-cream sm:inset-y-0 sm:right-0 sm:left-auto sm:w-full sm:max-w-md sm:border-l sm:border-ink/10 sm:shadow-2xl"
            style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <header className="flex items-center justify-between border-b border-ink/10 px-5 py-4 sm:px-6">
              <div>
                <p id="vu-panel-title" className="font-display flex items-center gap-1.5 text-base font-semibold text-ink">
                  <span className="text-accent-strong" aria-hidden>
                    ✦
                  </span>
                  Virtual Usama
                </p>
                <p className="text-xs text-ink-3">Human-led × AI-powered portfolio assistant</p>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full px-3 py-1.5 text-xs font-medium text-ink-3 transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    New chat
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close Virtual Usama"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <span aria-hidden>✕</span>
                </button>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              {messages.length === 0 ? (
                <div className="flex flex-col gap-8">
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-tight text-ink">Meet Virtual Usama</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-2 text-pretty">
                      I&rsquo;m an AI-powered guide to Usama&rsquo;s portfolio. Ask me about his experience, projects,
                      design approach, clients, industries, skills, or AI-native design work — grounded in what&rsquo;s
                      actually on this site.
                    </p>
                  </div>
                  <div className="flex flex-col gap-5">
                    {INTRO_PROMPT_GROUPS.map((group) => (
                      <div key={group.label}>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink-3">
                          {group.label}
                        </p>
                        <PromptChipRow prompts={group.prompts} onSelect={sendMessage} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-7">
                  {messages.map((message) => (
                    <VirtualUsamaMessage
                      key={message.id}
                      message={message}
                      onSelectPrompt={sendMessage}
                      onNavigate={handleNavigate}
                    />
                  ))}
                </div>
              )}
            </div>

            <Composer onSend={sendMessage} disabled={isStreaming} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function VirtualUsamaPanel() {
  return (
    <TtsProvider>
      <PanelInner />
    </TtsProvider>
  );
}
