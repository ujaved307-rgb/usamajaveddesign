"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Full-bleed cover banner with a safe scroll parallax: the image is sized
 * larger than its container so the vertical shift never exposes empty
 * edges (a bare y-transform on an image sized to fit its box will).
 *
 * The reduced-motion check only applies after mount (`active` starts true,
 * matching the server's assumption, and is flipped post-hydration) —
 * feeding it directly into the `useTransform` range would make the very
 * first client render disagree with the SSR output.
 */
export function ParallaxBanner({
  src,
  alt,
  className,
  priority,
  amount = 60,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!shouldReduceMotion) return;
    const frame = requestAnimationFrame(() => setActive(false));
    return () => cancelAnimationFrame(frame);
  }, [shouldReduceMotion]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], active ? [-amount, amount] : [0, 0]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        style={{ y, top: -amount, bottom: -amount }}
        className="absolute left-0 right-0"
      >
        <Image src={src} alt={alt} fill priority={priority} sizes="100vw" className="object-cover" />
      </motion.div>
    </div>
  );
}
