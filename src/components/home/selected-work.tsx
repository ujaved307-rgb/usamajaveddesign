import Link from "next/link";
import { caseStudies } from "@/lib/data/case-studies";
import { homepage } from "@/lib/data/site";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { CurrentEngagement } from "@/components/home/current-engagement";

export function SelectedWork() {
  const [first, ...rest] = caseStudies.slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
          Featured Work
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {homepage.workIntroShort}
        </h2>
      </Reveal>

      <div className="mt-10">
        <CurrentEngagement />
      </div>

      <div className="mt-8 flex flex-col gap-8">
        <ProjectCard project={first} large />
        <div className="grid gap-8 sm:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      <Reveal>
        <Magnetic className="mt-14 inline-block">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            View all work
            <span aria-hidden>→</span>
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
