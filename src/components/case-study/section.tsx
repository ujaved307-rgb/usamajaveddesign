import type { CaseStudySection } from "@/lib/types";
import { BlockRenderer } from "@/components/case-study/blocks";
import { Reveal } from "@/components/reveal";

export function CaseStudySectionView({ section }: { section: CaseStudySection }) {
  return (
    <section
      className={
        section.invert
          ? "bg-ink text-paper"
          : "bg-paper text-ink"
      }
    >
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="mb-10 flex items-baseline gap-4">
            <span
              className={`font-display text-xs font-medium uppercase tracking-[0.14em] ${
                section.invert ? "text-paper/50" : "text-ink-3"
              }`}
            >
              {section.kicker}
            </span>
            <span className={`h-px flex-1 ${section.invert ? "bg-paper/15" : "bg-line"}`} />
          </div>
        </Reveal>

        {section.heading && (
          <Reveal>
            <h2 className="font-display mb-8 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {section.heading}
            </h2>
          </Reveal>
        )}

        <div className="flex flex-col gap-8">
          {section.blocks.map((block, i) => (
            <Reveal key={i} delay={Math.min(i * 0.04, 0.2)}>
              <BlockRenderer block={block} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
