import Link from "next/link";
import { strategyAi } from "@/lib/data/site";
import { Reveal } from "@/components/reveal";

export function AiTeaser() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <span className="font-display text-xs font-medium uppercase tracking-[0.14em] text-paper/50">
            Design × Strategy × AI
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="font-display mt-5 max-w-2xl text-3xl font-medium leading-snug tracking-tight text-balance sm:text-4xl">
            {strategyAi.principle}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-paper/70 text-pretty">{strategyAi.intro}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            href="/strategy-and-ai"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-paper"
          >
            How I use AI
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
