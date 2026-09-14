import { tasmu } from "@/lib/data/case-studies/tasmu";
import { stcKuwait } from "@/lib/data/case-studies/stc-kuwait";
import { rcrc } from "@/lib/data/case-studies/rcrc";
import { dubaiHolding } from "@/lib/data/case-studies/dubai-holding";
import { saudia } from "@/lib/data/case-studies/saudia";
import type { CaseStudy } from "@/lib/types";

/**
 * The ONLY projects Virtual Usama may link to as a "case study" — each one
 * is a real, published page on this portfolio. Reuses the actual case-study
 * data (no duplicated prose) and adds recruiter-facing retrieval tags.
 *
 * Anything from experience.ts that isn't listed here (Nedbank, Careem Plus,
 * STC Saudi Arabia enterprise UX, Rogers/Telus, the news app, etc.) has NO
 * public case-study page — Virtual Usama must describe it from experience.ts
 * only and must never imply a case-study link exists for it.
 */
export interface KnowledgeProject {
  slug: string;
  route: string;
  data: CaseStudy;
  industries: string[];
  /** Recruiter-intent buckets this project is most relevant to. */
  relevantFor: string[];
}

export const projects: KnowledgeProject[] = [
  {
    slug: tasmu.slug,
    route: `/work/${tasmu.slug}`,
    data: tasmu,
    industries: ["Government", "Smart Cities", "AI", "Enterprise"],
    relevantFor: ["government", "smart-cities", "ai-native-design", "b2b-enterprise"],
  },
  {
    slug: stcKuwait.slug,
    route: `/work/${stcKuwait.slug}`,
    data: stcKuwait,
    industries: ["Telecom", "Mobile", "E-commerce"],
    relevantFor: ["telecom", "b2c"],
  },
  {
    slug: rcrc.slug,
    route: `/work/${rcrc.slug}`,
    data: rcrc,
    industries: ["Government", "Enterprise", "Design Systems"],
    relevantFor: ["government", "b2b-enterprise", "design-systems"],
  },
  {
    slug: dubaiHolding.slug,
    route: `/work/${dubaiHolding.slug}`,
    data: dubaiHolding,
    industries: ["Mobility", "Real Estate", "Consumer"],
    relevantFor: ["b2c", "ai-native-design", "fintech-adjacent"],
  },
  {
    slug: saudia.slug,
    route: `/work/${saudia.slug}`,
    data: saudia,
    industries: ["Aviation", "E-commerce"],
    relevantFor: ["aviation", "b2c"],
  },
];

export const caseStudySlugs = projects.map((p) => p.slug);
