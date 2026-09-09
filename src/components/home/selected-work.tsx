import Link from "next/link";
import { caseStudies } from "@/lib/data/case-studies";
import { homepage } from "@/lib/data/site";
import { ProjectRow } from "@/components/project-row";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";

export function SelectedWork() {
  const featured = caseStudies.slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-3">
          Selected work
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="font-display mt-5 max-w-2xl text-3xl font-medium leading-snug tracking-tight text-balance sm:text-4xl">
          {homepage.workIntro}
        </p>
      </Reveal>

      <div className="mt-4">
        {featured.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} reverse={i % 2 === 1} />
        ))}
      </div>

      <Reveal>
        <Magnetic className="mt-14 inline-block">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-ink transition-opacity hover:opacity-85"
          >
            View all work
            <span aria-hidden>→</span>
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
