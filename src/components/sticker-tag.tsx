"use client";

import { motion, useReducedMotion } from "motion/react";

const TILTS = ["sticker-tilt-1", "sticker-tilt-2", "sticker-tilt-3"] as const;

export function StickerTags({ items }: { items: string[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((item, i) => {
        const filled = i % 3 === 1;
        const tilt = TILTS[i % TILTS.length];
        return (
          <motion.span
            key={item}
            whileHover={shouldReduceMotion ? undefined : { rotate: 0, scale: 1.08, y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`${tilt} inline-block rounded-full border-2 px-4 py-1.5 text-sm font-medium ${
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
