import Link from "next/link";
import { strategyAi } from "@/lib/data/site";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";

export function AiTeaser() {
  return (
    <section className="bg-charcoal text-cream-on-charcoal">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-cream-on-charcoal-2">
            Design × Strategy × AI
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="font-display mt-5 max-w-2xl text-3xl font-semibold leading-snug tracking-tight text-balance sm:text-4xl">
            {strategyAi.principle}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-cream-on-charcoal-2 text-pretty">{strategyAi.intro}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <Magnetic className="mt-8 inline-block">
            <Link
              href="/strategy-and-ai"
              className="inline-flex items-center gap-2 rounded-full border-2 border-cream-on-charcoal/30 px-6 py-3 text-sm font-medium text-cream-on-charcoal transition-colors hover:border-cream-on-charcoal"
            >
              How I use AI
              <span aria-hidden>→</span>
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
