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
  const metaLine = [...project.category, project.year];

  return (
    <Reveal>
      <Link href={`/work/${project.slug}`} className="group flex h-full flex-col">
        <div
          className="relative overflow-hidden rounded-[2rem] p-1.5 ring-1 ring-inset ring-cream/25"
          style={{
            background: `radial-gradient(120% 100% at 50% 15%, ${project.color} 0%, #0b0b0c 75%)`,
          }}
        >
          <div className="relative flex min-h-[340px] items-end justify-center overflow-hidden rounded-[1.6rem] px-6 pb-0 pt-14 sm:min-h-[420px] sm:px-10 sm:pt-16">
            <motion.div
              initial={{ rotateX: 8, rotateY: -6, rotate: -1.5 }}
              whileHover={{ rotateX: 0, rotateY: 0, rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: 1200, transformStyle: "preserve-3d" }}
              className="relative z-10 mx-auto w-full max-w-[560px] overflow-hidden rounded-t-2xl border-[6px] border-b-0 border-ink/85 bg-cream-2 shadow-[0_50px_80px_-25px_rgba(0,0,0,0.6)]"
            >
              <div className={`relative w-full ${large ? "aspect-[16/11]" : "aspect-[4/3.1]"}`}>
                <Image
                  src={project.heroImage}
                  alt={`${project.shortTitle} — ${project.client}`}
                  fill
                  sizes={large ? "(min-width: 1024px) 1000px, 100vw" : "(min-width: 1024px) 480px, 100vw"}
                  className="object-contain object-top p-2"
                />
              </div>
            </motion.div>

            {/* studio "floor" the device appears to rest on */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-4 left-1/2 h-6 w-[62%] -translate-x-1/2 rounded-full bg-black/50 blur-xl"
            />
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
