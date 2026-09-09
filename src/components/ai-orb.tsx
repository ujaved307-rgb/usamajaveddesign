"use client";

import { motion, useReducedMotion } from "motion/react";

export function AiOrb() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-48 sm:w-64" aria-hidden>
      <motion.div
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-6 rounded-full opacity-60 blur-2xl"
        style={{
          background:
            "conic-gradient(from 180deg, var(--accent), transparent 35%, transparent 65%, var(--accent) 100%)",
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 26%, #ffe4cf 0%, var(--accent) 30%, #4a1d0c 72%, #100a06 100%)",
          boxShadow: "0 40px 90px -25px rgba(232, 90, 40, 0.55), inset 0 -14px 30px rgba(0,0,0,0.5)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: "12%",
          left: "20%",
          width: "30%",
          height: "20%",
          background: "radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)",
          filter: "blur(3px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          bottom: "10%",
          right: "16%",
          width: "16%",
          height: "10%",
          background: "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)",
          filter: "blur(4px)",
        }}
      />
    </div>
  );
}
