// Full work history, verbatim from the resume. This is the source Virtual
// Usama draws on for any engagement that does NOT have a public case study
// page (e.g. Nedbank, Careem Plus, Rogers/Telus) — it must never claim a
// case-study link exists for these; see projects.ts for what does.

export interface ExperienceEntry {
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  /** Slugs of case-studies.ts entries that grew out of this role, if any. */
  relatedCaseStudies?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    title: "Design Lead (Experience Design)",
    company: "Accenture",
    location: "Riyadh, Saudi Arabia",
    period: "October 2023 – Present",
    relatedCaseStudies: ["tasmuqatar", "stckuwait"],
    highlights: [
      "Led UX strategy and end-to-end design for large-scale digital transformation programs; clients include STC, STC Kuwait, Saudia Airlines, ADNOC, Al Rajhi Bank, Nedbank South Africa, and the Government of Qatar.",
      "Nedbank South Africa — Apply Hub (Digital Banking Platform): manages and leads a pod of 4 designers building the complete digital banking experience covering credit cards, personal loans, overdrafts, investments, and full account opening journeys for both New-to-Bank and Existing-to-Bank customers. Owns end-to-end product design strategy, design system standards, sprint delivery, and cross-functional alignment across product, engineering, compliance and business teams — navigating NCA compliance, POPIA consent frameworks, DebiCheck mandate states and bureau decisioning logic to translate regulated financial constraints into simple, transparent, trustworthy customer experiences. Mentors designers within the pod.",
      "STC Telecom (national telecom leader, Saudi Arabia): designed enterprise UX for STC's digital transformation initiative, including self-service portals, B2B account management flows, and AI-assisted customer support interfaces, improving task completion rates and reducing call-deflection dependency across digital channels.",
      "TASMU Smart Nation Platform 1.0 & 2.0 (Government of Qatar / MCIT): delivered UX across user journeys, Cognitive AI interfaces, Digital Twin experiences, and ICCC (Integrated Command & Control Centre); recognized with the iF Design Award 2026 and Red Dot Design Award.",
      "Designed agentic and AI-powered UX flows, conversational interfaces, and intelligent dashboards, translating complex AI system behaviours into intuitive, trustworthy user experiences.",
      "Applied AI-first design workflows (Figma Make, Lovable, Replit, Claude, Google Stitch) to build near-development-ready prototypes, reducing design-to-delivery timelines by 30%.",
      "Conducted user research, journey mapping, service blueprinting, usability testing, and heuristic evaluations for B2B/B2C portals, government platforms, smart-city ecosystems, and mobile apps.",
      "Established design governance frameworks, component libraries, and design system standards; mentored junior and mid-level designers across project teams.",
      "Partnered with C-suite and government stakeholders to align design strategy with Vision 2030 and national digitisation mandates.",
      "Delivered AI adoption and design thinking workshops at King Fahd University.",
    ],
  },
  {
    title: "Senior Product Designer",
    company: "MobileLIVE",
    location: "Lahore, Pakistan",
    period: "May 2021 – September 2023",
    highlights: [
      "Designed financial products and regulated digital experiences for Canadian market clients across banking, telecom, and media, including Rogers Canada, Telus Canada, and Paradigm Quest.",
      "Revamped a major news channel's website and mobile app, improving usability and increasing user engagement by 25%.",
      "Enhanced B2B and B2C telecom platforms through targeted UX improvements, reducing user error rates by 18%.",
      "Conducted usability testing, persona development, and competitive analysis to inform product strategy and roadmap decisions.",
    ],
  },
  {
    title: "Product Designer",
    company: "VentureDive (Pvt) Ltd",
    location: "Lahore, Pakistan",
    period: "August 2020 – April 2021",
    highlights: [
      "Designed end-to-end UX for Careem Plus (an Uber company), a subscription loyalty service for UAE users, covering discovery, onboarding, and retention flows.",
      "Conducted competitive analysis, journey mapping, and rapid prototyping for new feature rollouts; boosted customer retention by 12% within Q1 post-launch.",
    ],
  },
  {
    title: "Senior UX Designer",
    company: "FiveRivers Technologies",
    location: "Lahore, Pakistan",
    period: "June 2019 – July 2020",
    highlights: [
      "Designed mobile and web applications across fintech, e-commerce, and enterprise verticals; improved usability through wireframes, interaction design, and iterative usability testing.",
    ],
  },
  {
    title: "Senior UX Designer",
    company: "NevCore Technologies International",
    location: "Lahore, Pakistan",
    period: "October 2017 – June 2019",
    highlights: [
      "Led UX design for diverse software products applying human-centered design methodologies and heuristic evaluation.",
    ],
  },
  {
    title: "Associate UI/UX Designer",
    company: "GlowingSoft Technologies / Octapult Platforms",
    location: "Lahore, Pakistan",
    period: "March 2015 – September 2017",
    highlights: [
      "Designed UI components, visual assets, and user flows for web and mobile applications across the full design lifecycle.",
    ],
  },
];
