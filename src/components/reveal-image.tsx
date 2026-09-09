"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

/**
 * Crop-safe image reveal: `fit="contain"` (default) always shows the full
 * frame — no top/bottom or side content lost to a forced aspect crop — on a
 * neutral card so mixed portrait/landscape screenshots still sit together
 * cleanly. Reserve `fit="cover"` for intentionally cinematic full-bleed
 * banners where a crop is expected.
 */
export function RevealImage({
  src,
  alt,
  fit = "contain",
  aspect = "aspect-[4/3]",
  className,
  priority,
  sizes = "(min-width: 1024px) 900px, 100vw",
  curtain = true,
  hoverScale = false,
}: {
  src: string;
  alt: string;
  fit?: "contain" | "cover";
  aspect?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  curtain?: boolean;
  hoverScale?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${aspect} ${
        fit === "contain" ? "bg-cream-2" : ""
      } ${className ?? ""}`}
    >
      <motion.div
        initial={{ scale: fit === "cover" ? 1.08 : 1.04, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={
          shouldReduceMotion ? { duration: 0.01 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
        }
        className="absolute inset-0"
      >
        <div
          className={
            hoverScale
              ? "relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.045]"
              : "relative h-full w-full"
          }
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={fit === "contain" ? "object-contain p-3 sm:p-4" : "object-cover"}
          />
        </div>
      </motion.div>

      {curtain && (
        <motion.div
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={
            shouldReduceMotion
              ? { duration: 0.01 }
              : { duration: 0.65, ease: [0.83, 0, 0.17, 1], delay: 0.08 }
          }
          style={{ transformOrigin: "right" }}
          className="absolute inset-0 bg-accent"
        />
      )}
    </div>
  );
}
