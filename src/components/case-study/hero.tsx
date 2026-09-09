import type { CaseStudy } from "@/lib/types";
import { Reveal } from "@/components/reveal";
import { RevealImage } from "@/components/reveal-image";

export function CaseStudyHero({ project }: { project: CaseStudy }) {
  return (
    <header className="border-b border-ink/10">
      <div className="mx-auto max-w-5xl px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-20">
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

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-x-8 gap-y-5 border-t border-ink/10 pt-8 text-sm sm:grid-cols-4">
            <div>
              <span className="block text-ink-3">Client</span>
              <span className="mt-1 block font-medium text-ink">{project.client}</span>
            </div>
            <div>
              <span className="block text-ink-3">Role</span>
              <span className="mt-1 block font-medium text-ink">{project.role}</span>
            </div>
            <div>
              <span className="block text-ink-3">Scope</span>
              <span className="mt-1 block font-medium text-ink">{project.scope}</span>
            </div>
            <div>
              <span className="block text-ink-3">Platform</span>
              <span className="mt-1 block font-medium text-ink">{project.platform}</span>
            </div>
          </div>
        </Reveal>

        {project.award && (
          <Reveal delay={0.15}>
            <p
              className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink"
              style={{ backgroundColor: project.colorSoft }}
            >
              <span aria-hidden>🏆</span> {project.award}
            </p>
          </Reveal>
        )}
      </div>

      <div className="mx-auto w-full max-w-6xl px-0 sm:px-5">
        <RevealImage
          src={project.heroImage}
          alt={`${project.title} — ${project.client}`}
          aspect="aspect-[16/9]"
          className="sm:rounded-2xl"
          priority
          sizes="(min-width: 1280px) 1152px, 100vw"
        />
      </div>
    </header>
  );
}
