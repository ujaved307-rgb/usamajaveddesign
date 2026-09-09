"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { homepage, contact } from "@/lib/data/site";
import { Magnetic } from "@/components/magnetic";
import { StickerTags } from "@/components/sticker-tag";

const lineVariants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-3"
        >
          {homepage.eyebrow}
        </motion.p>

        <h1 className="font-display mt-6 text-[15vw] font-semibold leading-[0.92] tracking-tight sm:text-[6.5rem] md:text-[7.5rem]">
          <span className="block overflow-hidden">
            <motion.span custom={0} initial="hidden" animate="visible" variants={lineVariants} className="block">
              Creative
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              custom={1}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="block text-accent"
            >
              EXPERIENCE
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span custom={2} initial="hidden" animate="visible" variants={lineVariants} className="block">
              DESIGNER<span aria-hidden>.</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2 text-pretty"
        >
          Hi, I&rsquo;m <span className="font-semibold text-ink">{contact.name}</span> <span aria-hidden>👋</span> — an
          award-winning <span aria-hidden>🏆</span> {contact.role} based in {contact.location}. {homepage.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <StickerTags items={homepage.heroSkills} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Link
              href="/work"
              className="inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-opacity hover:opacity-85"
            >
              View work
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/about"
              className="inline-block rounded-full border-2 border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              About me
            </Link>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-16 border-y-2 border-ink py-5"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 sm:px-8">
          {homepage.clients.map((c) => (
            <span key={c} className="text-sm font-semibold uppercase tracking-wide text-ink-3">
              {c}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
