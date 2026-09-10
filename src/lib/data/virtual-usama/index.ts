import { profile } from "@/lib/data/virtual-usama/profile";
import { experience } from "@/lib/data/virtual-usama/experience";
import { skillGroups, awards } from "@/lib/data/virtual-usama/skills";
import { philosophy } from "@/lib/data/virtual-usama/philosophy";
import { projects, caseStudySlugs } from "@/lib/data/virtual-usama/projects";

export { profile, experience, skillGroups, awards, philosophy, projects, caseStudySlugs };

function fmtList(items: string[], bullet = "-"): string {
  return items.map((i) => `${bullet} ${i}`).join("\n");
}

/**
 * Renders the entire knowledge base as plain, structured text for the
 * system prompt. Kept in one place so the prompt and the data can never
 * drift apart — every fact here traces back to profile/experience/
 * projects/skills/philosophy, which in turn trace back to the resume and
 * the site's own published copy.
 */
export function renderKnowledgeBase(): string {
  const experienceText = experience
    .map(
      (e) =>
        `### ${e.title} — ${e.company} (${e.location})\nPeriod: ${e.period}\n${fmtList(e.highlights)}`
    )
    .join("\n\n");

  const projectsText = projects
    .map((p) => {
      const d = p.data;
      return [
        `### ${d.shortTitle} (slug: "${d.slug}", route: "${p.route}")`,
        `Client: ${d.client} | Year: ${d.year} | Categories: ${d.category.join(", ")}`,
        `Role: ${d.role}`,
        `Scope: ${d.scope}`,
        `One-line summary: ${d.cardTagline}`,
        `Framing question: ${d.hook}`,
        d.award ? `Award: ${d.award}` : "",
        `Impact metrics: ${d.impact.map((i) => `${i.value} ${i.label}`).join("; ")}`,
        `Relevant for recruiter intents: ${p.relevantFor.join(", ")}`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  const skillsText = skillGroups.map((g) => `${g.label}: ${g.items.join(", ")}`).join("\n");

  const awardsText = awards
    .map((a) => `- ${a.name} — ${a.project} (${a.org}${a.date ? `, ${a.date}` : ""}): ${a.description}`)
    .join("\n");

  return `
## IDENTITY
Name: ${profile.name}
Current title: ${profile.currentTitle} at ${profile.employer}, based in ${profile.location}
Positioning: ${profile.positioning}
Years of experience: ${profile.yearsExperience} | Products delivered: ${profile.productsDelivered}
${profile.openTo}
Contact: ${profile.contact.email} | ${profile.contact.linkedin}

## PROFESSIONAL SUMMARY
${profile.summary}

## WHAT HE'S LOOKING FOR
${profile.lookingFor}

## WORK EXPERIENCE (verbatim from resume, most recent first)
${experienceText}

## PUBLIC CASE STUDIES (the ONLY projects with a real page on this portfolio — link to these by route, never invent a link for anything else)
${projectsText}

## AWARDS
${awardsText}

## SKILLS & TOOLS
${skillsText}

## DESIGN PHILOSOPHY
Approach: ${philosophy.approach}
Background: ${philosophy.background}

AI philosophy: "${philosophy.aiPhilosophy.principle}"
${philosophy.aiPhilosophy.summary}
AI-driven process: ${philosophy.aiPhilosophy.process.map((p) => `${p.step} (${p.detail})`).join(" → ")}
Applied AI examples:
${fmtList(philosophy.aiPhilosophy.appliedExamples)}

Domain experience:
${fmtList(philosophy.domainExperience)}

Core areas:
${fmtList(philosophy.coreAreas)}

Outside work: ${philosophy.outsideWork}

## EDUCATION & CERTIFICATIONS
${profile.education.map((e) => `${e.degree} — ${e.school}`).join("; ")}
Certifications: ${profile.certifications.join(", ")}

## PUBLICATIONS
${profile.publications.map((p) => `${p.title} — ${p.outlet} (${p.date})`).join("; ")}
`.trim();
}
