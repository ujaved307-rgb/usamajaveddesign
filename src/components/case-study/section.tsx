import type { CaseStudySection } from "@/lib/types";
import { BlockRenderer } from "@/components/case-study/blocks";
import { Reveal } from "@/components/reveal";

// Dark (ink) is the default ground across the site now; `invert` sections
// flip to the light "bone" tone as the occasional contrast beat — the
// reverse mapping of what these two classes meant before the re-theme.
export function CaseStudySectionView({ section }: { section: CaseStudySection }) {
  const invert = Boolean(section.invert);

  return (
    <section className={invert ? "bg-bone text-text-on-bone" : "bg-ink text-text"}>
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="mb-10 flex items-baseline gap-4">
            <span
              className={`text-xs font-medium uppercase tracking-[0.14em] ${
                invert ? "text-text-on-bone-2" : "text-text-3"
              }`}
            >
              {section.kicker}
            </span>
            <span className={`h-px flex-1 ${invert ? "bg-bone-line" : "bg-ink-line"}`} />
          </div>
        </Reveal>

        {section.heading && (
          <Reveal>
            <h2 className="font-display mb-8 max-w-3xl text-3xl font-medium tracking-tight text-balance sm:text-4xl">
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
