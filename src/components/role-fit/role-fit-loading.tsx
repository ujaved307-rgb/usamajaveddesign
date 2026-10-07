"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const PHRASES = [
  "Reading the role…",
  "Comparing it against my real background…",
  "Weighing strengths and gaps…",
  "Putting together an honest read…",
];

const SPARKLES = [
  { left: -8, top: -6, delay: 0 },
  { left: 76, top: 8, delay: 0.6 },
  { left: 28, top: 92, delay: 1.2 },
];

export function RoleFitLoading() {
  const shouldReduceMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-10 text-center">
      <div className="relative h-28 w-24">
        <motion.div
          className="absolute inset-0 rounded-[22px] border-2 border-ink/15 bg-cream-2"
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.03, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-x-3 top-4 flex flex-col gap-2">
          <span className="h-1.5 w-full rounded-full bg-ink/15" />
          <span className="h-1.5 w-full rounded-full bg-ink/15" />
          <span className="h-1.5 w-full rounded-full bg-ink/15" />
          <span className="h-1.5 w-3/5 rounded-full bg-ink/15" />
        </div>

        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-x-3 h-[3px] rounded-full bg-accent-strong/80"
            initial={{ top: "14%" }}
            animate={{ top: ["14%", "82%", "14%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {!shouldReduceMotion &&
          SPARKLES.map((s, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-accent-strong"
              style={{ left: s.left, top: s.top }}
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
            />
          ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={phraseIndex}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -6 }}
          transition={{ duration: 0.3 }}
          className="min-h-[1.5rem] text-sm font-medium text-ink-2"
        >
          {PHRASES[phraseIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
