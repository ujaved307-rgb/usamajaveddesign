"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { CaseStudy } from "@/lib/types";
import { Reveal } from "@/components/reveal";

export function ProjectCard({
  project,
  index,
  large = false,
}: {
  project: CaseStudy;
  index: number;
  large?: boolean;
}) {
  const headline = project.impact[0];

  return (
    <Reveal>
      <Link href={`/work/${project.slug}`} className="group block">
        <div
          className="relative overflow-hidden rounded-[2rem] p-6 sm:p-10"
          style={{ backgroundColor: project.color }}
        >
          <motion.div
            initial={{ rotate: -2.5 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto overflow-hidden rounded-2xl bg-cream shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]"
          >
            <div className={`relative w-full ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
              <Image
                src={project.heroImage}
                alt={`${project.shortTitle} — ${project.client}`}
                fill
                sizes={large ? "(min-width: 1024px) 1000px, 100vw" : "(min-width: 1024px) 480px, 100vw"}
                className="object-contain p-4"
              />
            </div>
          </motion.div>

          {headline && (
            <span className="absolute right-6 top-6 rounded-full bg-cream px-4 py-2 text-sm font-bold text-ink shadow-md sm:right-10 sm:top-10">
              {headline.value} {headline.label.split(" ").slice(0, 3).join(" ")}
            </span>
          )}

          <span className="absolute left-6 top-6 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream sm:left-10 sm:top-10">
            Case study {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink text-balance sm:text-3xl">
              {project.shortTitle}
              <span className="ml-2 font-body text-base font-normal text-ink-2">
                — {project.cardTagline}
              </span>
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.category.map((c) => (
                <span key={c} className="text-xs font-medium uppercase tracking-wide text-ink-3">
                  {c} ·
                </span>
              ))}
              <span className="text-xs font-medium uppercase tracking-wide text-ink-3">{project.year}</span>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-transform group-hover:-translate-y-0.5">
            View case study
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
