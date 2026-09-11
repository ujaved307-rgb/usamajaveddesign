import Image from "next/image";
import { homepage } from "@/lib/data/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export function AiToolsStrip() {
  return (
    <section className="border-y border-ink/10 bg-cream-2">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
            {homepage.aiTools.heading}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-2 max-w-md text-sm text-ink-2">{homepage.aiTools.subline}</p>
        </Reveal>

        <RevealGroup className="mt-6 flex flex-wrap gap-2.5">
          {homepage.aiTools.items.map((tool) => (
            <RevealItem key={tool.name}>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm font-medium text-ink">
                {tool.logo && (
                  <Image src={tool.logo} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                )}
                {tool.name}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
