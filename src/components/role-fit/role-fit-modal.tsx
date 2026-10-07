"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Magnetic } from "@/components/magnetic";
import { StickerTags } from "@/components/sticker-tag";
import { contact } from "@/lib/data/site";
import { RoleFitLoading } from "@/components/role-fit/role-fit-loading";
import { useRoleFit } from "@/components/role-fit/role-fit-context";
import { MAX_FILE_BYTES } from "@/lib/role-fit/constants";
import type { RoleFitResult } from "@/lib/role-fit/schema";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
const ACCEPTED_EXTENSIONS = ".pdf,.docx,.txt";

type Status = "idle" | "loading" | "result" | "error";

export function RoleFitModal() {
  const { isOpen, closeRoleFit } = useRoleFit();
  const [status, setStatus] = useState<Status>("idle");
  const [jdText, setJdText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<RoleFitResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function resetForm() {
    setStatus("idle");
    setJdText("");
    setFile(null);
    setResult(null);
    setErrorMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // Start every fresh open (manual or auto-triggered) from a clean form.
  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => resetForm());
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  // Focus management + body scroll lock, matching the site's other modal (virtual-usama panel).
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
  }, [isOpen]);

  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeRoleFit();
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
  }, [isOpen, closeRoleFit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    const formData = new FormData();
    if (file) {
      formData.set("file", file);
    } else {
      formData.set("jdText", jdText);
    }

    setStatus("loading");
    setErrorMessage("");

    let res: Response;
    try {
      res = await fetch("/api/role-fit", { method: "POST", body: formData });
    } catch {
      setErrorMessage("Couldn't reach the server — check your connection and try again.");
      setStatus("error");
      return;
    }

    // A response that never reached our route handler (platform timeout,
    // body-size limit, etc.) won't be JSON — surface the real HTTP status
    // instead of a generic message so a future failure is self-diagnosing.
    let data: unknown;
    try {
      data = await res.json();
    } catch {
      setErrorMessage(
        res.status === 413
          ? "That submission was too large for the server to accept — please try a shorter JD or a smaller file."
          : res.status === 504
            ? "The analysis took too long and timed out — please try again."
            : `Unexpected server error (HTTP ${res.status}) — please try again.`
      );
      setStatus("error");
      return;
    }

    if (!res.ok) {
      const errorData = data as { error?: string };
      setErrorMessage(errorData.error || "Something went wrong — please try again.");
      setStatus("error");
      return;
    }

    setResult(data as RoleFitResult);
    setStatus("result");
  }

  const canSubmit = status !== "loading" && (file !== null || jdText.trim().length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={closeRoleFit}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-fit-title"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-cream shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={closeRoleFit}
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-cream text-ink transition-colors hover:border-ink/30"
            >
              <span aria-hidden>✕</span>
            </button>

            <div className="overflow-y-auto px-6 py-8 sm:px-9 sm:py-10">
              {status === "loading" ? (
                <>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
                    Role Fit Check
                  </span>
                  <RoleFitLoading />
                </>
              ) : status === "idle" || status === "error" ? (
                <>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
                    Role Fit Check
                  </span>
                  <h2
                    id="role-fit-title"
                    className="font-display mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
                  >
                    How I fit your organization
                  </h2>
                  <p className="mt-3 text-ink-2 text-pretty">
                    Paste a job description or upload the file — I&rsquo;ll compare it against my
                    real background and send you an honest read, in seconds.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                    {file ? (
                      <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-ink/15 bg-cream-2 px-4 py-3">
                        <span className="truncate text-sm font-medium text-ink">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="shrink-0 text-sm font-medium text-ink-3 underline-offset-2 hover:text-ink hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <textarea
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                        placeholder="Paste the full job description here…"
                        rows={7}
                        className="w-full resize-none rounded-2xl border-2 border-ink/15 bg-cream-2 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-ink"
                      />
                    )}

                    {!file && (
                      <div className="flex items-center gap-3">
                        <span className="h-px flex-1 bg-ink/10" aria-hidden />
                        <span className="text-xs font-medium uppercase tracking-wide text-ink-3">or</span>
                        <span className="h-px flex-1 bg-ink/10" aria-hidden />
                      </div>
                    )}

                    {!file && (
                      <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/30">
                        Upload PDF, DOCX or TXT
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept={ACCEPTED_EXTENSIONS}
                          className="sr-only"
                          onChange={(e) => {
                            const picked = e.target.files?.[0];
                            if (!picked) return;
                            if (picked.size > MAX_FILE_BYTES) {
                              setErrorMessage("That file is too large — please keep it under 4MB.");
                              setStatus("error");
                              if (fileInputRef.current) fileInputRef.current.value = "";
                              return;
                            }
                            setFile(picked);
                            setJdText("");
                          }}
                        />
                      </label>
                    )}

                    {status === "error" && (
                      <p className="text-sm font-medium text-accent-strong" role="alert">
                        {errorMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition-opacity hover:opacity-85 disabled:opacity-50"
                    >
                      Check my fit
                      <span aria-hidden>→</span>
                    </button>
                  </form>
                </>
              ) : (
                result && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
                      Role Fit Check
                    </span>

                    <p className="font-display mt-4 text-2xl font-semibold leading-snug tracking-tight text-balance">
                      {result.headline}
                    </p>

                    {result.strengths.length > 0 && (
                      <div className="mt-7">
                        <span className="text-xs font-semibold uppercase tracking-wide text-ink-3">
                          Where it clicks
                        </span>
                        <ul className="mt-3 flex flex-col gap-2">
                          {result.strengths.map((s, i) => (
                            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                              <span className="mt-0.5 shrink-0 text-accent-strong" aria-hidden>
                                ✓
                              </span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.matchedSkills.length > 0 && (
                      <div className="mt-7">
                        <span className="text-xs font-semibold uppercase tracking-wide text-ink-3">
                          Skills that match
                        </span>
                        <div className="mt-3">
                          <StickerTags items={result.matchedSkills} uniform />
                        </div>
                      </div>
                    )}

                    <blockquote className="mt-7 border-l-4 border-ink/15 pl-5 text-ink-2 text-pretty">
                      {result.message}
                    </blockquote>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Magnetic>
                        <a
                          href={`mailto:${contact.email}`}
                          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-opacity hover:opacity-85"
                        >
                          Let&rsquo;s talk
                          <span aria-hidden>→</span>
                        </a>
                      </Magnetic>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/30"
                      >
                        Check another role
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
