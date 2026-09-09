import type { Metadata } from "next";
import { caseStudies } from "@/lib/data/case-studies";
import { homepage } from "@/lib/data/site";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Research-driven design and transformation projects across government, telecom, aviation, mobility and smart cities — for GCC and global organizations.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">Work</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="font-display mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
          Research-driven design, built for scale.
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-2xl text-lg text-ink-2 text-pretty">{homepage.workIntro}</p>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {caseStudies.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
