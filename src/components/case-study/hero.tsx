import type { CaseStudy } from "@/lib/types";
import { Reveal } from "@/components/reveal";
import { RevealImage } from "@/components/reveal-image";

export function CaseStudyHero({ project }: { project: CaseStudy }) {
  return (
    <header>
      <div className="mx-auto max-w-6xl px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
            {project.client} · {project.year}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="font-display mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
            {project.hook}
          </h1>
        </Reveal>

        {project.award && (
          <Reveal delay={0.1}>
            <p
              className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink"
              style={{ backgroundColor: project.colorSoft }}
            >
              <span aria-hidden>🏆</span> {project.award}
            </p>
          </Reveal>
        )}
      </div>

      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-6 border-y border-ink/15 px-5 py-8 text-sm sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wide text-ink-3">
              Overview
            </span>
            <p className="mt-2 text-base text-ink-2">{project.cardTagline}</p>
          </div>
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wide text-ink-3">
              Role
            </span>
            <p className="mt-2 text-base font-medium text-ink">{project.role}</p>
          </div>
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wide text-ink-3">
              Details
            </span>
            <ul className="mt-2 flex flex-col gap-1 text-base font-medium text-ink">
              <li>{project.client}</li>
              <li>{project.platform}</li>
              <li>{project.scope}</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20">
        <RevealImage
          src={project.heroImage}
          alt={`${project.title} — ${project.client}`}
          fit="cover"
          aspect="aspect-[16/10] sm:aspect-[2/1]"
          roundedClassName="rounded-lg"
          priority
          sizes="(min-width: 1280px) 1152px, 100vw"
        />
      </div>
    </header>
  );
}
