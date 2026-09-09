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
  sections: CaseStudySection[];
  impact: { value: string; label: string }[];
  award?: string;
}
