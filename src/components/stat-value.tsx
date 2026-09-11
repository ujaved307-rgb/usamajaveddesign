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
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!parsed || !inView) return;
    const duration = shouldReduceMotion ? 0 : 700;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.number * eased;
      setDisplay(
        `${parsed.prefix}${current.toFixed(parsed.decimals)}${parsed.suffix}`
      );
      if (progress < 1) frame = requestAnimationFrame(tick);
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
