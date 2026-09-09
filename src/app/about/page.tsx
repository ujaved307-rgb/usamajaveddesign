import type { Metadata } from "next";
import Link from "next/link";
import { about } from "@/lib/data/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { RevealImage } from "@/components/reveal-image";
import { Magnetic } from "@/components/magnetic";

export const metadata: Metadata = {
  title: "About",
  description:
    "Usama Javed is an Experience Design Lead and Senior UX Consultant — background, expertise and how he approaches complex digital experiences.",
};

function SkillColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-medium uppercase tracking-[0.1em] text-text-3">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-5 pt-32 pb-20 sm:px-8 sm:pt-40">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-3">
            About
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display display-wonk mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl">
            {about.title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-2 text-pretty">
            {about.intro}
          </p>
        </Reveal>
      </section>

      <section className="border-t border-ink-line bg-ink-2/50">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-16">
          <RevealImage
            src={about.portrait}
            alt="Usama Javed"
            fit="cover"
            aspect="aspect-[4/3]"
            sizes="(min-width: 768px) 480px, 100vw"
            curtain={false}
          />
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
                {about.background.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-lg leading-relaxed text-text-2 text-pretty">
                {about.background.body}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
            {about.expertise.heading}
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-10 sm:grid-cols-3">
          <RevealItem>
            <SkillColumn title={about.expertise.domains.title} items={about.expertise.domains.items} />
          </RevealItem>
          <RevealItem>
            <SkillColumn title={about.expertise.core.title} items={about.expertise.core.items} />
          </RevealItem>
          <RevealItem>
            <SkillColumn title={about.expertise.tools.title} items={about.expertise.tools.items} />
          </RevealItem>
        </RevealGroup>
      </section>

      <section className="border-t border-bone-line bg-bone text-text-on-bone">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
              {about.outsideWork.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 max-w-xl text-text-on-bone-2 text-pretty">{about.outsideWork.body}</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {about.outsideWork.images.map((src, i) => (
              <RevealImage
                key={src}
                src={src}
                alt={`Travel photo ${i + 1}`}
                fit="cover"
                aspect="aspect-[2/3]"
                className="bg-bone-2"
                sizes="(min-width: 768px) 240px, 45vw"
                curtain={false}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-display mx-auto max-w-xl text-2xl font-medium leading-snug tracking-tight text-balance sm:text-3xl">
            Want to see how this thinking shows up in real projects?
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
