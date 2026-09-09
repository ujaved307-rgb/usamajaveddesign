import type { CaseStudy } from "@/lib/types";
import { tasmu } from "./tasmu";
import { stcKuwait } from "./stc-kuwait";
import { rcrc } from "./rcrc";
import { dubaiHolding } from "./dubai-holding";
import { saudia } from "./saudia";

// Ordered newest first — matches the real chronology from the source portfolio.
export const caseStudies: CaseStudy[] = [tasmu, stcKuwait, rcrc, dubaiHolding, saudia];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAdjacentCaseStudy(slug: string): CaseStudy {
  const index = caseStudies.findIndex((c) => c.slug === slug);
  const nextIndex = (index + 1) % caseStudies.length;
  return caseStudies[nextIndex];
}
