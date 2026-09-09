import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getAdjacentCaseStudy } from "@/lib/data/case-studies";
import { CaseStudyHero } from "@/components/case-study/hero";
import { CaseStudySectionView } from "@/components/case-study/section";
import { NextProject } from "@/components/case-study/next-project";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getCaseStudy(slug);
  if (!project) return {};
  return {
    title: project.shortTitle,
    description: project.cardTagline,
    openGraph: {
      title: `${project.shortTitle} — Usama Javed`,
      description: project.cardTagline,
      images: [project.heroImage],
    },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  const next = getAdjacentCaseStudy(slug);

  return (
    <article>
      <CaseStudyHero project={project} />
      {project.sections.map((section) => (
        <CaseStudySectionView key={section.id} section={section} />
      ))}
      <NextProject project={next} />
    </article>
  );
}
