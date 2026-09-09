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
  const headline = project.impact[0];

  return (
    <Reveal>
      <Link href={`/work/${project.slug}`} className="group flex h-full flex-col">
        <div className="overflow-hidden rounded-2xl bg-charcoal">
          <div aria-hidden className="h-1.5 w-full" style={{ backgroundColor: project.color }} />
          <div className="px-4 pt-4 sm:px-6 sm:pt-6">
            <RevealImage
              src={project.heroImage}
              alt={`${project.shortTitle} — ${project.client}`}
              aspect={large ? "aspect-[16/11]" : "aspect-[4/3]"}
              bgClassName="bg-charcoal-2"
              hoverScale
              sizes={
                large ? "(min-width: 1024px) 1000px, 100vw" : "(min-width: 1024px) 480px, 100vw"
              }
            />
          </div>
          <div className="px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream-on-charcoal-2">
              {project.client} · {project.year}
            </p>
            <h3
              className={`font-display mt-2 font-semibold tracking-tight text-cream-on-charcoal text-balance ${
                large ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
              }`}
            >
              {project.shortTitle}
            </h3>
            <p className="mt-2 line-clamp-2 text-cream-on-charcoal-2 text-pretty">
              {project.cardTagline}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-1 flex-wrap items-end justify-between gap-4 border-t border-ink/10 pt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-3">
            {project.role}
            {headline && (
              <>
                {" "}
                <span aria-hidden>·</span>{" "}
                <span className="text-accent-strong">
                  {headline.value} {headline.label}
                </span>
              </>
            )}
          </p>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-transform group-hover:-translate-y-0.5">
            View case study
            <span aria-hidden>↗</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
