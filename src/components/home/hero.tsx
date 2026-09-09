"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { homepage, contact } from "@/lib/data/site";
import { Magnetic } from "@/components/magnetic";

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
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }}
      />

      <motion.div style={{ opacity }} className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm font-medium uppercase tracking-[0.16em] text-text-3"
        >
          {homepage.eyebrow}
        </motion.p>

        <h1 className="font-display display-wonk mt-6 text-[13vw] font-medium leading-[0.95] tracking-tight sm:text-[7.5rem] md:text-[8.5rem]">
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
              className="block italic text-gold"
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
          className="mt-8 max-w-xl text-lg leading-relaxed text-text-2 text-pretty"
        >
          <span className="font-medium text-text">{contact.name}</span> — {homepage.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Link
              href="/work"
              className="inline-block rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-ink transition-opacity hover:opacity-85"
            >
              View work
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/about"
              className="inline-block rounded-full border border-ink-line px-6 py-3 text-sm font-medium text-text transition-colors hover:border-text"
            >
              About me
            </Link>
          </Magnetic>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 max-w-md border-t border-ink-line pt-6 text-sm text-text-2 text-pretty"
        >
          <span aria-hidden>🏆</span> {homepage.award}
        </motion.p>
      </motion.div>
    </section>
  );
}
