import type { Metadata } from "next";
import Link from "next/link";
import { strategyAi } from "@/lib/data/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";

export const metadata: Metadata = {
  title: "Strategy & AI",
  description:
    "How Usama Javed integrates AI into a UX strategy and product design practice — process, tools, and applied examples from real projects.",
};

export default function StrategyAiPage() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-5 pt-32 pb-16 sm:px-8 sm:pt-40">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-3">
            Design × Strategy × AI
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display display-wonk mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl">
            {strategyAi.title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-2 text-pretty">
            {strategyAi.intro}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-display mt-6 max-w-xl text-2xl font-medium tracking-tight text-balance text-gold">
            {strategyAi.principle}
          </p>
        </Reveal>
      </section>

      <section className="border-t border-ink-line bg-ink-2/50">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
              {strategyAi.process.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 max-w-2xl text-text-2 text-pretty">{strategyAi.process.body}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {strategyAi.process.steps.map((step, i) => (
              <RevealItem key={step.title}>
                <span className="font-display text-sm text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-lg font-medium tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-2">{step.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
            {strategyAi.tools.heading}
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
          {strategyAi.tools.items.map((tool) => (
            <RevealItem key={tool.name}>
              <div className="rounded-xl border border-ink-line p-5 transition-colors hover:border-gold/40">
                <h3 className="font-display text-base font-medium tracking-tight">{tool.name}</h3>
                <p className="mt-1 text-sm text-text-2">{tool.use}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="border-t border-bone-line bg-bone text-text-on-bone">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
              {strategyAi.applied.heading}
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col gap-10">
            {strategyAi.applied.cases.map((c, i) => (
              <Reveal key={c.title} delay={Math.min(i * 0.03, 0.15)}>
                <div className="grid gap-3 border-t border-bone-line pt-8 sm:grid-cols-[1fr_2fr] sm:gap-8">
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight text-balance">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm text-bronze">{c.tool}</p>
                  </div>
                  <p className="text-text-on-bone-2 text-pretty leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-display mx-auto max-w-xl text-2xl font-medium leading-snug tracking-tight text-balance sm:text-3xl">
            See where this thinking has shipped.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <Magnetic className="mt-8 inline-block">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-ink transition-opacity hover:opacity-85"
            >
              View my work
              <span aria-hidden>→</span>
            </Link>
          </Magnetic>
        </Reveal>
      </section>
    </div>
  );
}
