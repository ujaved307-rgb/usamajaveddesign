"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const PHRASES = [
  "Reading the role…",
  "Comparing it against my real background…",
  "Weighing strengths and gaps…",
  "Putting together an honest read…",
];

const ORB_SIZE = 112;
const ORBIT_SIZE = 148;
const PARTICLES = [
  { duration: 3.2, delay: 0 },
  { duration: 4, delay: 0.5 },
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
    <div className="flex flex-col items-center gap-8 py-12 text-center">
      <div className="relative" style={{ width: ORBIT_SIZE, height: ORBIT_SIZE }} aria-hidden>
        {/* slow rotating glow, same language as the homepage AI orb */}
        <motion.div
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full opacity-70 blur-2xl"
          style={{
            inset: (ORBIT_SIZE - ORB_SIZE) / 2 - 10,
            background:
              "conic-gradient(from 180deg, var(--accent), transparent 35%, transparent 65%, var(--accent) 100%)",
          }}
        />

        {/* core orb */}
        <div
          className="absolute rounded-full"
          style={{
            inset: (ORBIT_SIZE - ORB_SIZE) / 2,
            background:
              "radial-gradient(circle at 32% 28%, #ffe4cf 0%, var(--accent) 32%, #4a1d0c 74%, #100a06 100%)",
            boxShadow: "0 22px 48px -16px rgba(232, 90, 40, 0.55), inset 0 -10px 20px rgba(0,0,0,0.5)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: (ORBIT_SIZE - ORB_SIZE) / 2 + ORB_SIZE * 0.14,
            left: (ORBIT_SIZE - ORB_SIZE) / 2 + ORB_SIZE * 0.22,
            width: ORB_SIZE * 0.28,
            height: ORB_SIZE * 0.18,
            background: "radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)",
            filter: "blur(2px)",
          }}
        />

        {/* crisp scanning ring */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute rounded-full border-2"
            style={{
              inset: (ORBIT_SIZE - ORB_SIZE) / 2 - 6,
              borderColor: "transparent",
              borderTopColor: "var(--accent-strong)",
              borderRightColor: "color-mix(in srgb, var(--accent-strong) 35%, transparent)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* orbiting particles */}
        {!shouldReduceMotion &&
          PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
            >
              <span
                className="absolute rounded-full bg-accent-strong"
                style={{
                  top: 0,
                  left: "50%",
                  width: 7,
                  height: 7,
                  transform: "translateX(-50%)",
                  boxShadow: "0 0 10px var(--accent-strong)",
                }}
              />
            </motion.div>
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
