import type { CaseStudySection } from "@/lib/types";
import { BlockRenderer } from "@/components/case-study/blocks";
import { Reveal } from "@/components/reveal";

// Cream is the default ground across the site; `invert` sections flip to
// charcoal as the occasional dark contrast beat.
export function CaseStudySectionView({ section }: { section: CaseStudySection }) {
  const invert = Boolean(section.invert);

  return (
    <section
      id={section.id}
      className={invert ? "bg-charcoal text-cream-on-charcoal" : "bg-cream text-ink"}
    >
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="mb-10 flex items-baseline gap-4">
            <span
              className={`text-xs font-semibold uppercase tracking-[0.14em] ${
                invert ? "text-cream-on-charcoal-2" : "text-ink-3"
              }`}
            >
              {section.kicker}
            </span>
            <span className={`h-px flex-1 ${invert ? "bg-charcoal-line" : "bg-ink/10"}`} />
          </div>
        </Reveal>

        {section.heading && (
          <Reveal>
            <h2 className="font-display mb-8 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {section.heading}
            </h2>
          </Reveal>
        )}

        <div className="flex flex-col gap-8">
          {section.blocks.map((block, i) => (
            <Reveal key={i} delay={Math.min(i * 0.04, 0.2)}>
              <BlockRenderer block={block} invert={invert} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
