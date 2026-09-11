"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { homepage, contact } from "@/lib/data/site";
import { StickerTags } from "@/components/sticker-tag";
import { ClientMarquee } from "@/components/client-marquee";
import { RevealImage } from "@/components/reveal-image";

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
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
          <div>
            <h1 className="font-display text-[15vw] font-semibold leading-[0.92] tracking-tight sm:text-[6.5rem] md:text-[7.5rem]">
              <span className="block overflow-hidden pb-2 sm:pb-3">
                <motion.span
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  className="block"
                >
                  Strategist,
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2 sm:pb-3">
                <motion.span
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  className="block text-accent"
                >
                  Designer,
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2 sm:pb-3">
                <motion.span
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  className="block"
                >
                  Builder<span aria-hidden>.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2 text-pretty"
            >
              Hi, I&rsquo;m <span className="font-semibold text-ink">{contact.name}</span>{" "}
              <span aria-hidden>👋</span> — an award-winning <span aria-hidden>🏆</span> Experience
              Design Leader at Accenture Middle East, based in {contact.location}.{" "}
              {homepage.heroSub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-ink/10 pt-6"
            >
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-ink/15 bg-cream px-3">
                <Image
                  src="/logos/if-award.png"
                  alt=""
                  width={80}
                  height={28}
                  className="h-5 w-auto object-contain"
                />
                <span className="text-xs font-semibold text-ink-2">iF Design Award 2026</span>
              </span>
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-ink/15 bg-cream px-3">
                <Image
                  src="/logos/reddot.png"
                  alt=""
                  width={80}
                  height={28}
                  className="h-5 w-auto object-contain"
                />
                <span className="text-xs font-semibold text-ink-2">Red Dot Design Award 2026</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
                Core Expertise
              </span>
              <StickerTags items={homepage.heroSkills} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="sticker-tilt-2 mx-auto w-full max-w-xs lg:max-w-none"
          >
            <RevealImage
              src={homepage.heroPortrait}
              alt={contact.name}
              fit="cover"
              aspect="aspect-[4/5]"
              roundedClassName="rounded-2xl"
              priority
              sizes="(min-width: 1024px) 380px, 60vw"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-16"
      >
        <ClientMarquee clients={homepage.clients} />
      </motion.div>
    </section>
  );
}
