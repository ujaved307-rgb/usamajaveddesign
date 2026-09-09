import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/types";

export function NextProject({ project }: { project: CaseStudy }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex min-h-[70vh] items-end overflow-hidden bg-ink text-paper"
    >
      <Image
        src={project.heroImage}
        alt={`${project.shortTitle} — ${project.client}`}
        fill
        sizes="100vw"
        className="object-cover opacity-40 transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8">
        <p className="font-display text-sm uppercase tracking-[0.14em] text-paper/60">
          What&rsquo;s next
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
          {project.shortTitle}
        </h2>
        <span className="mt-6 inline-flex items-center gap-2 text-lg underline decoration-2 underline-offset-4">
          View case study
          <span className="transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
