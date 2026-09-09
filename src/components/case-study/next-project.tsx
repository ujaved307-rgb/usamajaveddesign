import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import { ParallaxBanner } from "@/components/parallax-banner";

export function NextProject({ project }: { project: CaseStudy }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex min-h-[70vh] items-end bg-charcoal text-cream-on-charcoal"
    >
      <ParallaxBanner
        src={project.heroImage}
        alt=""
        amount={50}
        className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-45"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/70" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2"
        style={{ backgroundColor: project.color }}
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cream-on-charcoal-2">
          What&rsquo;s next
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
          {project.shortTitle}
        </h2>
        <span className="mt-6 inline-flex items-center gap-2 text-lg text-cream-on-charcoal underline decoration-2 underline-offset-4">
          View case study
          <span className="transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
