export type Block =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt: string; caption?: string; wide?: boolean }
  | { type: "gallery"; images: { src: string; alt: string }[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "statement"; text: string };

export interface CaseStudySection {
  id: string;
  kicker: string;
  heading?: string;
  blocks: Block[];
  invert?: boolean;
}

// A step's value is a plain string by default (scrolls to `#<stepKey>`, e.g.
// `#problem`). Pass { label, href } instead when the matching section on the
// page uses a different id than the step's own key.
export type DesignThinkingStep = string | { label: string; href: string };

export interface DesignThinkingContent {
  problem: DesignThinkingStep;
  insight: DesignThinkingStep;
  approach: DesignThinkingStep;
  decision: DesignThinkingStep;
  outcome: DesignThinkingStep;
  impact: DesignThinkingStep;
}

export interface CaseStudy {
  slug: string;
  title: string;
  shortTitle: string;
  client: string;
  year: string;
  category: string[];
  role: string;
  scope: string;
  platform: string;
  cardTagline: string;
  hook: string;
  heroImage: string;
  /** Signature card color for the Featured Work grid — a hex pair (fill + soft tint). */
  color: string;
  colorSoft: string;
  sections: CaseStudySection[];
  impact: { value: string; label: string }[];
  award?: string;
  /** Real award-org logo marks (e.g. Red Dot, iF Design Award) shown on the card thumbnail. */
  awardLogos?: string[];
  /** Problem → Insight → Approach → Decision → Outcome → Impact process bar. */
  designThinking?: DesignThinkingContent;
}
