"use client";

import { motion, useReducedMotion } from "motion/react";

export function StickerTags({ items }: { items: string[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((item, i) => {
        const filled = i % 3 === 1;
        const duration = 2.4 + (i % 3) * 0.35;
        const delay = (i % 4) * 0.22;

        return (
          <motion.span
            key={item}
            initial={{ y: 0 }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -5, 0],
                    transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
                  }
            }
            whileHover={
              shouldReduceMotion
                ? undefined
                : { scale: 1.08, y: -3, transition: { type: "spring", stiffness: 400, damping: 15 } }
            }
            className={`inline-block rounded-full border-2 px-4 py-1.5 text-sm font-medium ${
              filled ? "border-ink bg-ink text-cream" : "border-ink bg-cream text-ink"
            }`}
          >
            {item}
          </motion.span>
        );
      })}
    </div>
  );
}
