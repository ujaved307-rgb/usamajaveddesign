import Link from "next/link";
import { homepage } from "@/lib/data/site";
import { Reveal } from "@/components/reveal";
import { RevealImage } from "@/components/reveal-image";
import { Magnetic } from "@/components/magnetic";

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16">
        <RevealImage
          src={homepage.aboutTeaserPortrait}
          alt="Usama Javed with colleagues"
          fit="cover"
          aspect="aspect-[4/5]"
          roundedClassName="rounded-lg"
          sizes="(min-width: 768px) 480px, 100vw"
          curtain={false}
        />
        <div>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
              Get to know more about me
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="font-display mt-5 text-2xl font-semibold leading-snug tracking-tight text-balance sm:text-3xl">
              {homepage.aboutTeaser}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Magnetic className="mt-8 inline-block">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-opacity hover:opacity-85"
              >
                More about me
                <span aria-hidden>→</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
