import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import { Reveal } from "@/components/reveal";
import { RevealImage } from "@/components/reveal-image";

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
        className="group grid items-center gap-8 border-t border-ink-line py-10 sm:py-14 md:grid-cols-2 md:gap-14"
      >
        <div className={reverse ? "md:order-2" : "md:order-1"}>
          <RevealImage
            src={project.heroImage}
            alt={`${project.shortTitle} — ${project.client}`}
            aspect="aspect-[4/3]"
            sizes="(min-width: 768px) 45vw, 90vw"
            hoverScale
          />
        </div>

        <div className={reverse ? "md:order-1" : "md:order-2"}>
          <span className="text-sm text-text-3">
            {String(index + 1).padStart(2, "0")} · {project.year}
          </span>
          <h3 className="font-display mt-3 text-3xl font-medium tracking-tight text-text text-balance sm:text-4xl">
            {project.shortTitle}
          </h3>
          <p className="mt-3 max-w-md text-text-2 text-pretty">{project.cardTagline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.category.map((c) => (
              <span
                key={c}
                className="rounded-full border border-ink-line px-3 py-1 text-xs text-text-2"
              >
                {c}
              </span>
            ))}
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text underline decoration-ink-line decoration-2 underline-offset-4 transition-colors group-hover:decoration-gold group-hover:text-gold">
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
