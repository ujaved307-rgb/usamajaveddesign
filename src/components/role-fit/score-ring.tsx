"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export function ScoreRing({ score }: { score: number }) {
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldReduceMotion ? score : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      const frame = requestAnimationFrame(() => setDisplay(score));
      return () => cancelAnimationFrame(frame);
    }
    const duration = 900;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setDisplay(Math.round(score * eased));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score, shouldReduceMotion]);

  const size = 136;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - display / 100);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-ink/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-accent-strong transition-[stroke-dashoffset] duration-150"
        />
      </svg>
      <span className="font-display absolute text-3xl font-semibold tracking-tight text-ink">
        {display}%
      </span>
    </div>
  );
}
