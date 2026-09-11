"use client";

import { motion, useReducedMotion } from "motion/react";

// Matches the rotation of the .sticker-tilt-1/2/3 CSS classes — applied here
// via Motion instead of CSS so it can share a transform with the float loop
// below without the two fighting over the element's `transform` property.
const TILT_DEGREES = [-2.5, 2, -1.5] as const;

export function StickerTags({ items }: { items: string[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((item, i) => {
        const filled = i % 3 === 1;
        const rotate = TILT_DEGREES[i % TILT_DEGREES.length];
        const duration = 2.4 + (i % 3) * 0.35;
        const delay = (i % 4) * 0.22;

        return (
          <motion.span
            key={item}
            initial={{ rotate, y: 0 }}
            animate={
              shouldReduceMotion
                ? { rotate }
                : {
                    rotate,
                    y: [0, -5, 0],
                    transition: {
                      y: { duration, repeat: Infinity, ease: "easeInOut", delay },
                      rotate: { duration: 0 },
                    },
                  }
            }
            whileHover={
              shouldReduceMotion
                ? undefined
                : { rotate: 0, scale: 1.08, y: -3, transition: { type: "spring", stiffness: 400, damping: 15 } }
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
