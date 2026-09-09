import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import { ParallaxBanner } from "@/components/parallax-banner";

export function NextProject({ project }: { project: CaseStudy }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex min-h-[70vh] items-end bg-ink text-text"
    >
      <ParallaxBanner
        src={project.heroImage}
        alt=""
        amount={50}
        className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-45"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8">
        <p className="text-sm uppercase tracking-[0.14em] text-text-2">What&rsquo;s next</p>
        <h2 className="font-display display-wonk mt-4 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl">
          {project.shortTitle}
        </h2>
        <span className="mt-6 inline-flex items-center gap-2 text-lg text-gold underline decoration-2 underline-offset-4">
          View case study
          <span className="transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
