import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { strategyAi } from "@/lib/data/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { AiOrb } from "@/components/ai-orb";

export const metadata: Metadata = {
  title: "Strategy & AI",
  description:
    "How Usama Javed integrates AI into a UX strategy and product design practice — process, tools, and applied examples from real projects.",
};

export default function StrategyAiPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pt-32 pb-16 sm:px-8 sm:pt-40">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
                Design × Strategy × AI
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
                {strategyAi.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 text-pretty">
                {strategyAi.intro}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-display mt-6 max-w-xl text-2xl font-semibold tracking-tight text-balance text-accent">
                {strategyAi.principle}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <AiOrb />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-cream-2">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {strategyAi.process.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-ink-2 text-pretty">{strategyAi.process.body}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {strategyAi.process.steps.map((step, i) => (
              <RevealItem key={step.title}>
                <span className="font-display text-sm font-semibold text-accent-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{step.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {strategyAi.tools.heading}
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {strategyAi.tools.items.map((tool) => (
            <RevealItem key={tool.name}>
              <div className="flex items-start gap-4 rounded-xl border-2 border-ink/10 p-5 transition-colors hover:border-accent/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cream-2">
                  {tool.logo ? (
                    <Image src={tool.logo} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                  ) : (
                    <span className="text-sm font-bold text-ink-3" aria-hidden>
                      {tool.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold tracking-tight">{tool.name}</h3>
                  <p className="mt-1 text-sm text-ink-2">{tool.use}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="border-t-2 border-ink bg-charcoal text-cream-on-charcoal">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {strategyAi.applied.heading}
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col gap-10">
            {strategyAi.applied.cases.map((c, i) => (
              <Reveal key={c.title} delay={Math.min(i * 0.03, 0.15)}>
                <div className="grid gap-3 border-t border-charcoal-line pt-8 sm:grid-cols-[1fr_2fr] sm:gap-8">
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-balance">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm text-accent">{c.tool}</p>
                  </div>
                  <p className="text-cream-on-charcoal-2 text-pretty leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-display mx-auto max-w-xl text-2xl font-semibold leading-snug tracking-tight text-balance sm:text-3xl">
            See where this thinking has shipped.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <Magnetic className="mt-8 inline-block">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-opacity hover:opacity-85"
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
