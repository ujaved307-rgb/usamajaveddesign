export interface ParsedMeta {
  caseStudySlug: string | null;
  suggested: string[];
  cta: "work" | "contact" | null;
}

const META_BLOCK = /\[\[meta\]\]([\s\S]*?)\[\[\/meta\]\]/;
const META_OPEN_INDEX = (text: string) => text.indexOf("[[meta]]");

/** Strips the (possibly still-streaming, possibly unclosed) meta block so it's never shown to the user. */
export function stripMeta(rawText: string): string {
  const openIndex = META_OPEN_INDEX(rawText);
  if (openIndex === -1) return rawText;
  return rawText.slice(0, openIndex).trimEnd();
}

/** Parses a completed meta block. Call once streaming has finished. */
export function parseMeta(rawText: string): ParsedMeta {
  const match = rawText.match(META_BLOCK);
  const empty: ParsedMeta = { caseStudySlug: null, suggested: [], cta: null };
  if (!match) return empty;

  const body = match[1];
  const line = (key: string) => {
    const m = body.match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
    return m?.[1]?.trim();
  };

  const caseStudyRaw = line("caseStudy");
  const suggestedRaw = line("suggested");
  const ctaRaw = line("cta");

  return {
    caseStudySlug: caseStudyRaw && caseStudyRaw !== "none" ? caseStudyRaw : null,
    suggested:
      suggestedRaw && suggestedRaw !== "none"
        ? suggestedRaw
            .split("|")
            .map((s) => s.trim())
            .filter(Boolean)
            .slice(0, 3)
        : [],
    cta: ctaRaw === "work" || ctaRaw === "contact" ? ctaRaw : null,
  };
}
