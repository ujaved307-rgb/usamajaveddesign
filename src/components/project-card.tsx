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
  const tickerText = [...project.category, project.year, "VIEW CASE STUDY"];
  const ticker = [...tickerText, ...tickerText, ...tickerText];
  const metaLine = [...project.category, project.year];

  return (
    <Reveal>
      <Link href={`/work/${project.slug}`} className="group flex h-full flex-col">
        <div
          className="relative overflow-hidden rounded-[2rem]"
          style={{
            background: `linear-gradient(160deg, #0b0b0c 0%, ${project.color} 65%)`,
          }}
        >
          <div className="overflow-hidden border-b border-cream/15 py-2">
            <div className="flex w-max animate-marquee motion-reduce:animate-none">
              {ticker.map((item, i) => (
                <span
                  key={i}
                  className="mx-3 shrink-0 text-xs font-semibold uppercase tracking-wide text-cream/70"
                >
                  {item} <span aria-hidden>✦</span>
                </span>
              ))}
            </div>
          </div>

          <div className="relative px-6 pb-10 pt-10 sm:px-10 sm:pb-14 sm:pt-12">
            {/* soft "resting on a surface" shadow, staged-photo feel */}
            <div
              aria-hidden
              className="absolute bottom-6 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-full bg-black/40 blur-2xl sm:bottom-8"
            />
            <motion.div
              initial={{ rotate: -2.5 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto overflow-hidden rounded-2xl bg-cream shadow-[0_40px_70px_-20px_rgba(0,0,0,0.55)]"
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
          </div>
        </div>

        <div className="mt-6 flex flex-1 flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-3">
            Case study {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={`font-display mt-2 font-semibold tracking-tight text-ink text-balance ${
              large ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {project.shortTitle}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-md text-ink-2">{project.cardTagline}</p>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-3">
              {metaLine.map((m, i) => (
                <span key={m}>
                  {i > 0 && " "}
                  <span aria-hidden>•</span> {m}
                </span>
              ))}
              {headline && (
                <>
                  {" "}
                  <span aria-hidden>•</span>{" "}
                  <span className="text-accent-strong">
                    {headline.value} {headline.label}
                  </span>
                </>
              )}
            </p>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-transform group-hover:-translate-y-0.5">
              View case study
              <span aria-hidden>↗</span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
