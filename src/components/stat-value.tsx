"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

function parseValue(raw: string) {
  const match = raw.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  return { prefix, number: parseFloat(number), suffix, decimals: number.includes(".") ? 1 : 0 };
}

export function StatValue({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Positive bottom margin starts the count before the element is actually
  // scrolled into view, so it's already settled on its real value by the
  // time a viewer's eyes (or a screenshot) land on it — a mid-count number
  // like "2+" instead of "10+" otherwise reads as a bug, not an animation.
  const inView = useInView(ref, { once: true, margin: "0px 0px 200px 0px" });
  const shouldReduceMotion = useReducedMotion();
  const parsed = parseValue(value);
  // The real value is the fallback, not zero: it's what server-rendered
  // markup shows before hydration, and what stays on screen if JS never
  // runs at all. A bare "0" at that point reads as a broken page, not an
  // animation — the count-up (when it does run) starts from most of the
  // way there instead, so no frame ever shows a literal zero.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed || !inView) return;
    const duration = shouldReduceMotion ? 0 : 600;
    const startProgress = shouldReduceMotion ? 1 : 0.45;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const elapsed = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      const progress = startProgress + elapsed * (1 - startProgress);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.number * eased;
      setDisplay(
        `${parsed.prefix}${current.toFixed(parsed.decimals)}${parsed.suffix}`
      );
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
