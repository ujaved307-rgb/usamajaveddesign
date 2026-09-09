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
      <Link
        href={`/work/${project.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-ink/10 p-4 transition-colors hover:border-ink/30 sm:p-5"
      >
        <RevealImage
          src={project.heroImage}
          alt={`${project.shortTitle} — ${project.client}`}
          fit="cover"
          aspect={large ? "aspect-[16/10]" : "aspect-[4/3]"}
          roundedClassName="rounded-lg"
          hoverScale
          sizes={
            large ? "(min-width: 1024px) 1000px, 100vw" : "(min-width: 1024px) 480px, 100vw"
          }
        />

        <div className="mt-5 flex flex-1 flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
            {project.client} · {project.year}
          </p>
          <h3
            className={`font-display mt-2 font-semibold tracking-tight text-ink text-balance ${
              large ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
            }`}
          >
            {project.shortTitle}
          </h3>
          <p className="mt-2 line-clamp-2 text-ink-2 text-pretty">{project.cardTagline}</p>

          {project.award && (
            <p
              className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-ink"
              style={{ backgroundColor: project.colorSoft }}
            >
              <span aria-hidden>🏆</span> {project.award}
            </p>
          )}

          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-ink/10 pt-5">
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
        </div>
      </Link>
    </Reveal>
  );
}
