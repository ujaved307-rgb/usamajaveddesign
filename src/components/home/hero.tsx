"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { homepage, contact } from "@/lib/data/site";

function getLineVariants(reduced: boolean) {
  return {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: 0,
      transition: reduced
        ? { duration: 0.01 }
        : { duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const lineVariants = getLineVariants(Boolean(shouldReduceMotion));
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-20 pt-32 sm:pt-44">
      <motion.div style={{ opacity }} className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-sm font-medium uppercase tracking-[0.16em] text-ink-3"
        >
          {homepage.eyebrow}
        </motion.p>

        <h1 className="font-display mt-6 text-[13vw] font-semibold leading-[0.95] tracking-tight sm:text-[7.5rem] md:text-[8.5rem]">
          <span className="block overflow-hidden">
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              style={{ y: y1 }}
              className="block"
            >
              {homepage.heroStatement[0]}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              custom={1}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              style={{ y: y1 }}
              className="block text-accent"
            >
              {homepage.heroStatement[1]}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              custom={2}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              style={{ y: y2 }}
              className="block"
            >
              {homepage.heroStatement[2]}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2 text-pretty"
        >
          <span className="font-medium text-ink">{contact.name}</span> — {homepage.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/work"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-85"
          >
            View work
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
          >
            About me
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 max-w-md border-t border-line pt-6 text-sm text-ink-2 text-pretty"
        >
          <span aria-hidden>🏆</span> {homepage.award}
        </motion.p>
      </motion.div>
    </section>
  );
}
