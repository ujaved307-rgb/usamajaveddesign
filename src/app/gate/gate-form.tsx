"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export function GateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "error" | "success">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "checking" || status === "success") return;
    setStatus("checking");

    try {
      const res = await fetch("/api/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      const destination = searchParams.get("from") || "/";
      router.push(destination);
      router.refresh();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-cream px-5 py-20">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm text-center"
      >
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          Usama Javed
        </span>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-ink-3"
        >
          Private Portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-3 text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl"
        >
          You&rsquo;ll need the <span className="text-accent">password</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-sm leading-relaxed text-ink-2 text-pretty"
        >
          This site is currently access-restricted. Enter the password to continue through.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            x: status === "error" ? [0, -10, 10, -8, 8, -4, 4, 0] : 0,
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 0.45, ease: "easeInOut" },
          }}
          className="mt-8 flex flex-col gap-3"
        >
          <input
            type="password"
            autoFocus
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Enter password"
            aria-label="Password"
            aria-invalid={status === "error"}
            className={`w-full rounded-2xl border-2 bg-cream-2 px-5 py-3.5 text-center text-base text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-ink ${
              status === "error" ? "border-accent-strong" : "border-ink/15"
            }`}
          />

          <button
            type="submit"
            disabled={status === "checking" || status === "success" || password.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {status === "checking"
              ? "Checking…"
              : status === "success"
                ? "Welcome"
                : "Enter site"}
            {status !== "checking" && status !== "success" && <span aria-hidden>→</span>}
          </button>

          <AnimatePresence>
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium text-accent-strong"
                role="alert"
              >
                Incorrect password — please try again.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>
    </div>
  );
}
