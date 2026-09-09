import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import { Reveal } from "@/components/reveal";
import { RevealImage } from "@/components/reveal-image";

export function ProjectCard({
  project,
  large = false,
}: {
  project: CaseStudy;
  large?: boolean;
}) {
  return (
    <Reveal>
      <Link
        href={`/work/${project.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-ink/10 p-4 transition-colors hover:border-ink/30 sm:p-5"
      >
        <div className="relative">
          <RevealImage
            src={project.heroImage}
            alt={`${project.shortTitle} — ${project.client}`}
            fit="cover"
            aspect={large ? "aspect-[16/10]" : "aspect-[4/3]"}
            roundedClassName="rounded-xl"
            hoverScale
            sizes={
              large ? "(min-width: 1024px) 1000px, 100vw" : "(min-width: 1024px) 480px, 100vw"
            }
          />
          {project.award && (
            <p className="absolute top-3 right-3 max-w-[75%] rounded-lg bg-cream/95 px-3 py-1.5 text-xs font-medium text-ink shadow-md">
              <span aria-hidden>🏆</span> {project.award}
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
            {project.client}
          </p>
          <h3
            className={`font-display mt-2 font-semibold tracking-tight text-ink text-balance ${
              large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            }`}
          >
            {project.cardTagline}
          </h3>

          <div className="mt-auto pt-5">
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-transform group-hover:-translate-y-0.5">
              View case study
              <span aria-hidden>↗</span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
