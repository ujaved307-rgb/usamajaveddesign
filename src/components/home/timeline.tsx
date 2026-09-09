import Link from "next/link";
import { caseStudies } from "@/lib/data/case-studies";
import { Reveal } from "@/components/reveal";

export function Timeline() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
          Timeline
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          A decade of shipping complex products.
        </h2>
      </Reveal>

      <div className="mt-10 flex flex-col">
        <div className="hidden border-b-2 border-ink pb-3 text-xs font-semibold uppercase tracking-wide text-ink-3 sm:grid sm:grid-cols-[6rem_1fr_10rem]">
          <span>Year</span>
          <span>Project</span>
          <span />
        </div>
        {caseStudies.map((project, i) => (
          <Reveal key={project.slug} delay={Math.min(i * 0.04, 0.2)}>
            <div className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-b border-ink/10 py-5 sm:grid-cols-[6rem_1fr_10rem]">
              <span className="font-display text-lg font-semibold text-ink-2">{project.year}</span>
              <span className="truncate text-base font-medium text-ink sm:text-lg">
                {project.shortTitle}
              </span>
              <Link
                href={`/work/${project.slug}`}
                className="justify-self-end rounded-full bg-ink px-4 py-2 text-xs font-semibold text-cream transition-opacity hover:opacity-85 sm:justify-self-start"
              >
                View case study
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
