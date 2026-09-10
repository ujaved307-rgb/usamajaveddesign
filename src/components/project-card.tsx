import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/lib/types";
import { Reveal } from "@/components/reveal";
import { RevealImage } from "@/components/reveal-image";

export function ProjectCard({
  project,
  large = false,
}: {
  project: CaseStudy;
  large?: boolean;
}) {
  return (
    <Reveal>
      <Link
        href={`/work/${project.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-ink/10 p-4 transition-colors hover:border-ink/30 sm:p-5"
      >
        <div className="relative">
          <RevealImage
            src={project.heroImage}
            alt={`${project.shortTitle} — ${project.client}`}
            fit="cover"
            aspect={large ? "aspect-[16/10]" : "aspect-[4/3]"}
            roundedClassName="rounded-xl"
            hoverScale
            sizes={
              large ? "(min-width: 1024px) 1000px, 100vw" : "(min-width: 1024px) 480px, 100vw"
            }
          />
          {project.awardLogos && project.awardLogos.length > 0 && (
            <div className="absolute top-3 left-3 flex gap-2">
              {project.awardLogos.map((logo) => (
                <span
                  key={logo}
                  className="flex h-9 items-center rounded-lg bg-cream/95 px-2.5 shadow-md"
                >
                  <Image
                    src={logo}
                    alt="Design award"
                    width={80}
                    height={32}
                    className="h-5 w-auto object-contain"
                  />
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
            {project.client}
          </p>
          <h3
            className={`font-display mt-2 font-semibold tracking-tight text-ink text-balance ${
              large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            }`}
          >
            {project.cardTagline}
          </h3>

          <div className="mt-auto pt-5">
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-transform group-hover:-translate-y-0.5">
              View case study
              <span aria-hidden>↗</span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
