"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { CaseStudy } from "@/lib/types";
import { Reveal } from "@/components/reveal";

export function ProjectRow({
  project,
  index,
  reverse = false,
}: {
  project: CaseStudy;
  index: number;
  reverse?: boolean;
}) {
  return (
    <Reveal>
      <Link
        href={`/work/${project.slug}`}
        className="group grid items-center gap-8 border-t border-line py-10 sm:py-14 md:grid-cols-2 md:gap-14"
      >
        <div
          className={`overflow-hidden rounded-2xl bg-paper-2 ${
            reverse ? "md:order-2" : "md:order-1"
          }`}
        >
          <motion.div
            className="relative aspect-[4/3] w-full"
            initial={false}
            whileHover="hover"
          >
            <motion.div
              variants={{ hover: { scale: 1.045 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={project.heroImage}
                alt={`${project.shortTitle} — ${project.client}`}
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        <div className={reverse ? "md:order-1" : "md:order-2"}>
          <span className="font-display text-sm text-ink-3">
            {String(index + 1).padStart(2, "0")} · {project.year}
          </span>
          <h3 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink text-balance sm:text-4xl">
            {project.shortTitle}
          </h3>
          <p className="mt-3 max-w-md text-ink-2 text-pretty">{project.cardTagline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.category.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line px-3 py-1 text-xs text-ink-2"
              >
                {c}
              </span>
            ))}
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent">
            View case study
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
