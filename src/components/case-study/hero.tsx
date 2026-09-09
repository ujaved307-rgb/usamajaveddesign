import Image from "next/image";
import type { CaseStudy } from "@/lib/types";
import { Reveal } from "@/components/reveal";

export function CaseStudyHero({ project }: { project: CaseStudy }) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-20">
        <Reveal>
          <p className="font-display text-xs font-medium uppercase tracking-[0.14em] text-ink-3">
            {project.client} · {project.year}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="font-display mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
            {project.hook}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-x-8 gap-y-5 border-t border-line pt-8 text-sm sm:grid-cols-4">
            <div>
              <span className="block text-ink-3">Client</span>
              <span className="mt-1 block text-ink">{project.client}</span>
            </div>
            <div>
              <span className="block text-ink-3">Role</span>
              <span className="mt-1 block text-ink">{project.role}</span>
            </div>
            <div>
              <span className="block text-ink-3">Scope</span>
              <span className="mt-1 block text-ink">{project.scope}</span>
            </div>
            <div>
              <span className="block text-ink-3">Platform</span>
              <span className="mt-1 block text-ink">{project.platform}</span>
            </div>
          </div>
        </Reveal>

        {project.award && (
          <Reveal delay={0.15}>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm text-accent-strong">
              <span aria-hidden>🏆</span> {project.award}
            </p>
          </Reveal>
        )}
      </div>

      <Reveal>
        <div className="relative mx-auto aspect-[16/9] w-full max-w-6xl overflow-hidden sm:rounded-2xl">
          <Image
            src={project.heroImage}
            alt={`${project.title} — ${project.client}`}
            fill
            priority
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </header>
  );
}
