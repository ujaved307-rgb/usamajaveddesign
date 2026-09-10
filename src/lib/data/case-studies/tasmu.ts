import type { CaseStudy } from "@/lib/types";

export const tasmu: CaseStudy = {
  slug: "tasmuqatar",
  title: "Unifying Qatar's Smart City Intelligence",
  shortTitle: "TASMU",
  client: "TASMU / MCIT Qatar",
  year: "2026",
  category: ["Government", "Smart Cities", "AI"],
  role: "Product & Experience Design Lead",
  scope: "TASMU 1.0 and 2.0 — national smart-city platform",
  platform: "Web platform, Digital Twin, ICCC, Cognitive AI",
  cardTagline: "Unifying Qatar's Smart City Intelligence — MCIT Qatar",
  hook: "How do you turn a national smart-city vision into a platform that ministries, sector leads and citizens can actually run on?",
  heroImage: "https://framerusercontent.com/images/72EZIKexnHmEzb1EMzgGIQZQ8.png",
  color: "#6C5CE7",
  colorSoft: "#EFEBFD",
  award: "iF Design Award 2026 & Red Dot Design Award — TASMU, Government of Qatar (MCIT)",
  awardLogos: ["/logos/if-award.png", "/logos/reddot.png"],
  impact: [
    { value: "90%", label: "reduction in design time using AI-driven workflows" },
    { value: "70%", label: "faster delivery cycles" },
    { value: "50–60%", label: "fewer design iterations" },
    { value: "36+", label: "products and services unified into one platform" },
  ],
  sections: [
    {
      id: "snapshot",
      kicker: "01 — Snapshot",
      blocks: [
        {
          type: "paragraph",
          text: "Qatar is on a national mission to accelerate digital transformation and build smarter, safer, more resilient cities. TASMU is Qatar's national smart-city program — under the Ministry of Communications & Information Technology (MCIT), it needed to move from a collection of independent digital initiatives into a unified, national platform capable of real-time operations, predictive intelligence and coordinated decision-making across sectors.",
        },
        {
          type: "list",
          items: [
            "Client — TASMU / MCIT, in collaboration with Ooredoo",
            "Scope — TASMU 1.0 (platform definition) and TASMU 2.0 (Digital Twin, ICCC, Cognitive AI)",
            "Role — Product & Experience Design Lead",
            "Team — strategy, technology and experience disciplines",
          ],
        },
      ],
    },
    {
      id: "challenge-1",
      kicker: "02 — The Challenge",
      heading: "A platform strategy without a product structure",
      blocks: [
        {
          type: "paragraph",
          text: "TASMU 2.0 brought together Smart City OS, Digital Twin, ICCC, Cognitive AI, Connected Assets and the TASMU Data Marketplace into one future-facing ecosystem — but the platform had to move from vision to implementation readiness. Key initiatives like Digital Twin and ICCC were progressing independently, governance was inconsistent across ministries, investment was fragmented, and the strategy hadn't yet been translated into an executable roadmap.",
        },
        {
          type: "list",
          items: [
            "Independent initiatives with fragmented architectures",
            "Inconsistent governance across entities",
            "RFPs advancing without unified standards",
            "Unclear platform identity and value proposition",
            "A complex ecosystem with multiple owners and providers",
          ],
        },
        {
          type: "statement",
          text: "Without a clear product structure, experience direction and governance model, TASMU risked becoming a set of disconnected initiatives rather than Qatar's unified digital backbone.",
        },
      ],
    },
    {
      id: "discovery",
      kicker: "03 — Discovery",
      heading: "From ambiguity to a platform direction",
      blocks: [
        {
          type: "paragraph",
          text: "This wasn't a conventional UI project — it combined product strategy, ecosystem design, stakeholder facilitation, platform definition, concept design and future-state prototyping. The first phase focused on understanding TASMU's current state: its ecosystem, sectors, existing channels, products and future ambition.",
        },
        {
          type: "list",
          items: [
            "Ecosystem mapping — the relationships between sector leads, service providers, partners, MCIT and the TASMU platform team, surfacing friction, unclear ownership and dependency risk",
            "Channel and offering audit — the current state spanned multiple channels, account areas, APIs, Azure resources, dashboards and more than 36 products and services",
            "Benchmarking and inspiration — government-managed G2G/B platforms and public digital platforms, studied for GTM practice, UX patterns, onboarding principles and engagement models",
          ],
        },
        {
          type: "gallery",
          images: [
            { src: "https://framerusercontent.com/images/Th6SIXP9qSomviVEwFmdeJCD9DQ.png", alt: "TASMU ecosystem map showing relationships between sector leads, providers and MCIT" },
            { src: "https://framerusercontent.com/images/3VPI7CcQWBrE2pJWk3Wm6LFeoF4.png", alt: "Audit of TASMU's existing channels, products and services" },
            { src: "https://framerusercontent.com/images/5UmcwVxHPM3meJtwUUectpinUNI.png", alt: "Benchmarking review of global smart-city and G2G/B platforms" },
          ],
        },
      ],
    },
    {
      id: "workshops",
      kicker: "04 — Workshops",
      heading: "Turning ambition into product framing",
      blocks: [
        {
          type: "paragraph",
          text: "A core exercise in TASMU 1.0 was debating each offering through three questions: what is the value of the offering, what should be inside it, and whether it should be monetized — moving discussion from vague ambition to clear product framing. Offering cards captured what it is, who it's for, what's inside, why it's needed and how it would be provisioned, surfacing ambiguity and dependencies that needed resolving before implementation.",
        },
        {
          type: "paragraph",
          text: "The future user landscape was defined by distinguishing decision-makers, TASMU champions and direct platform users — from sector leaders and transformation managers to developers, operators and data handlers — giving a clearer foundation for role-based journeys. Workshops then explicitly prioritized the hero user flows that would guide visual concepting, so the team wasn't designing generic interfaces but focused experiences tied to real operational value.",
        },
        {
          type: "gallery",
          images: [
            { src: "https://framerusercontent.com/images/nzYjdrOFb8tj8mAvbNXdhl4U8Q.png", alt: "Value proposition workshop exercise for TASMU offerings" },
            { src: "https://framerusercontent.com/images/E1bHghiakX9s4go97iETbfIPBY.png", alt: "Offering-card exercise defining what, who and why for each TASMU service" },
          ],
        },
      ],
    },
    {
      id: "insights",
      kicker: "05 — Insight",
      blocks: [
        {
          type: "statement",
          text: "TASMU didn't have a technology problem. It had an identity problem.",
        },
        {
          type: "list",
          items: [
            "Lack of clarity in what the platform was — even within government — was limiting adoption",
            "The value proposition of core offerings like Smart City OS and Digital Twin was unclear and needed translating into tangible sector benefits",
            "The ecosystem was structurally complex, spanning ministries, sector leads, service providers, partners and platform operators — complexity that had to be made operable through design",
            "The platform needed to differentiate itself from hyperscalers and OEM tools by acting as a national enabler with governance, interoperability and sector relevance",
            "The future platform had to serve both strategic leaders and hands-on users, from government decision-makers to developers and operators",
          ],
        },
      ],
    },
    {
      id: "system",
      kicker: "06 — Building the System",
      heading: "From workshops to scalable delivery",
      blocks: [
        {
          type: "paragraph",
          text: "Insights from stakeholder workshops were consolidated with focused research — mapping the as-is experience, identifying gaps across services, and gathering global references to inform direction.",
        },
        {
          type: "list",
          items: [
            "Experience definition — end-to-end user flows for each service, validated iteratively with product owners and stakeholders before moving forward",
            "Wireframing & interaction design — validated flows translated into detailed wireframes defining layout, structure and interaction patterns",
            "Design system foundation — components, patterns, typography and visual guidelines established before high-fidelity design, to support a unified, extensible platform",
          ],
        },
        { type: "image", src: "https://framerusercontent.com/images/SyXSUhyJBIA4OU6ESW4wlW4MK8.png", alt: "TASMU design system foundation: components, patterns and typography", wide: true },
      ],
    },
    {
      id: "tasmu-1-visuals",
      kicker: "07 — TASMU 1.0",
      heading: "Bringing structure to complexity",
      blocks: [
        {
          type: "paragraph",
          text: "TASMU 1.0 translated a highly fragmented ecosystem into a cohesive platform experience — making it easier for stakeholders to discover offerings, understand value and interact with the platform. These designs established the foundation for TASMU's product vision, directly influencing the scale-up into TASMU 2.0.",
        },
        {
          type: "gallery",
          images: [
            { src: "https://framerusercontent.com/images/9A840crNfGlmwhij7T5W1h82Gg.png", alt: "TASMU platform dashboard" },
            { src: "https://framerusercontent.com/images/THAaQ8j6C8bRoX0g8934QXXZk.png", alt: "TASMU Digital Twin interface" },
            { src: "https://framerusercontent.com/images/RJI3cguScPaGzt3CiYCUwVNt4.png", alt: "TASMU Data Marketplace interface" },
            { src: "https://framerusercontent.com/images/wLoah8jZ18nmJrDndAbWD6EnFs.png", alt: "TASMU Connected Assets interface" },
            { src: "https://framerusercontent.com/images/H5xRuomOWWUa1wxoHUL1v3TS9Do.png", alt: "TASMU Integrated Command & Control Center (ICCC)" },
          ],
        },
        {
          type: "quote",
          text: "The success of TASMU 1.0 went beyond delivery — it built trust. The client recognized the value of the platform direction and experience strategy, leading to a direct expansion into TASMU 2.0 to scale the vision into a fully realized, AI-powered national platform.",
        },
      ],
    },
    {
      id: "tasmu-2",
      kicker: "08 — TASMU 2.0",
      heading: "From platform definition to real product execution",
      invert: true,
      blocks: [
        {
          type: "paragraph",
          text: "TASMU 2.0 focused on transforming a strategic platform vision into real, scalable, operational products for a smart-nation ecosystem. Building on TASMU 1.0's foundation, the work shifted from defining the platform to designing and enabling its core systems: Digital Twin, Cognitive AI, and the Integrated Command & Control Center.",
        },
        {
          type: "list",
          items: [
            "Moving from platform definition to real product execution",
            "Designing for multiple user groups — government, operators, developers",
            "Handling real-time data, AI, and system integrations",
            "Ensuring interoperability across multiple sectors",
            "Aligning strategy, technology and user experience simultaneously",
          ],
        },
        {
          type: "statement",
          text: "The challenge wasn't designing interfaces. It was designing a connected system of systems.",
        },
      ],
    },
    {
      id: "process-2",
      kicker: "09 — Approach",
      blocks: [
        {
          type: "list",
          items: [
            "Discovery — deep understanding of the TASMU ecosystem, stakeholder workshops, benchmarking global smart platforms, identifying system gaps",
            "Define — product vision and platform architecture, structured core offerings, defined user groups and roles, established experience principles",
            "Prototype — end-to-end product flows, concept-driven interfaces, high-fidelity UI and dashboards, AI-assisted design workflows",
            "Govern — supported roadmap definition, enabled product scalability, aligned design with engineering and implementation teams",
          ],
        },
      ],
    },
    {
      id: "core-products",
      kicker: "10 — What Was Designed",
      heading: "Three core systems",
      blocks: [
        {
          type: "paragraph",
          text: "Digital Twin — a real-time, interactive digital replica of the city enabling simulation, monitoring and planning: 3D infrastructure visualization, real-time data integration, scenario simulation for traffic, logistics and environment, and decision-support for planners and operators.",
        },
        { type: "image", src: "https://framerusercontent.com/images/8QsSPCAu5xBOnbAnxT59BSeBSM.png", alt: "TASMU Digital Twin 3D city simulation interface", wide: true },
        {
          type: "paragraph",
          text: "ICCC (Integrated Command & Control Center) — centralized monitoring and operational control across sectors: real-time dashboards, incident monitoring and alerts, cross-system data visualization, multi-sector coordination.",
        },
        { type: "image", src: "https://framerusercontent.com/images/P0KGHFT76oMfkpKZ3ZhZJGiwdWI.png", alt: "TASMU Integrated Command & Control Center dashboard", wide: true },
        {
          type: "paragraph",
          text: "Cognitive AI — bringing intelligence and automation into the platform: AI-driven insights and recommendations, conversational and analytical agents, predictive analytics, decision-support systems.",
        },
        { type: "image", src: "https://framerusercontent.com/images/hkGRxMdgkEUODOvxULtloFz198.png", alt: "TASMU Cognitive AI interface with predictive analytics", wide: true },
      ],
    },
    {
      id: "ai-process",
      kicker: "11 — Where AI Made the Difference",
      heading: "Reimagining the design process with AI",
      blocks: [
        {
          type: "paragraph",
          text: "One of the key innovations in TASMU 2.0 was integrating AI into the design process itself — accelerating ideation and concept exploration, generating multiple design directions quickly, reducing iteration cycles significantly, and enhancing quality and consistency across a very large surface area.",
        },
        {
          type: "stats",
          items: [
            { value: "90%", label: "reduction in design time" },
            { value: "70%", label: "faster delivery cycles" },
            { value: "50–60%", label: "fewer iterations" },
          ],
        },
        {
          type: "paragraph",
          text: "Beyond design, the work supported product roadmap definition, alignment with engineering teams, RFP and implementation support, and long-term scalability planning — ensuring TASMU 2.0 was ready for real-world deployment, not just conceptual.",
        },
      ],
    },
    {
      id: "final",
      kicker: "12 — The Final Experience",
      heading: "TASMU 2.0 visual design highlights",
      blocks: [
        {
          type: "paragraph",
          text: "A showcase of how complex, large-scale systems were transformed into intuitive, scalable product experiences — bringing Digital Twin, ICCC and Cognitive AI together into a unified platform for real-time visibility, data-driven decisions and seamless cross-sector operations.",
        },
        {
          type: "gallery",
          images: [
            { src: "https://framerusercontent.com/images/ObI5Zrd60Byw108jw8pvKmuejDo.png", alt: "Integrated Command Center 2.0 interface" },
            { src: "https://framerusercontent.com/images/sD2mZ69oiEPHOEVY4Y2b2fAsxiM.png", alt: "Real-time sandbox testing environment" },
            { src: "https://framerusercontent.com/images/4tF1ainBkjVXK7vfZwNQaUobY.png", alt: "iLab view within the TASMU platform" },
            { src: "https://framerusercontent.com/images/NGvuA0hJi5s5KqW3WynyHBymOU.png", alt: "Digital Twin 3D builder interface" },
            { src: "https://framerusercontent.com/images/rda8x7TS2KnbQJ0o1qsPClztg1k.png", alt: "AI Data Marketplace interface" },
          ],
        },
      ],
    },
    {
      id: "outcomes",
      kicker: "13 — The Result",
      blocks: [
        {
          type: "paragraph",
          text: "The work moved TASMU Platform 2.0 from abstract ambition toward operational readiness — clarifying the product suite, translating high-level strategy into platform concepts and prototype experiences, and supporting future implementation through governance alignment and roadmap definition. It gave sector-transformation initiatives across Digital Twin, ICCC and Cognitive AI a much stronger foundation.",
        },
        {
          type: "list",
          items: [
            "Defined the future-state solution suite",
            "Prototyped key platform experiences",
            "Brought product clarity to complex offerings",
            "Supported RFP and vendor-onboarding readiness",
            "Helped shape a governance-led implementation path",
          ],
        },
      ],
    },
    {
      id: "reflection",
      kicker: "14 — Reflection",
      blocks: [
        {
          type: "list",
          items: [
            "National-scale design needs ecosystem clarity before interface polish",
            "Great platform design starts with value definition, not screen production",
            "Workshops aren't ceremonies — they're decision-making tools",
            "AI is most powerful when it increases exploration and strategic clarity, not just output speed",
            "Design becomes most valuable when it shapes implementation, not only concepts",
          ],
        },
      ],
    },
  ],
};
