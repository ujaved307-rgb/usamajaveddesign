import { Fragment } from "react";

/** Renders `**bold**` spans within a single line of plain text. */
function renderInline(line: string, keyPrefix: string) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>;
  });
}

/**
 * Minimal, dependency-free renderer for the small markdown subset the model
 * is asked to use: paragraphs, "- " bullet lists, and **bold**. Intentionally
 * not a full markdown parser — keeps the bundle tiny and the output
 * predictable for streaming text.
 */
export function MarkdownLite({ text }: { text: string }) {
  const blocks: { type: "p" | "ul"; lines: string[] }[] = [];

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    const isBullet = line.startsWith("- ") || line.startsWith("• ");
    const content = isBullet ? line.slice(2).trim() : line;

    const last = blocks[blocks.length - 1];
    if (isBullet && last?.type === "ul") {
      last.lines.push(content);
    } else if (isBullet) {
      blocks.push({ type: "ul", lines: [content] });
    } else if (last?.type === "p") {
      last.lines.push(content);
    } else {
      blocks.push({ type: "p", lines: [content] });
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, i) =>
        block.type === "ul" ? (
          <ul key={i} className="flex flex-col gap-1.5">
            {block.lines.map((line, j) => (
              <li key={j} className="flex gap-2 text-[15px] leading-relaxed">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-3" aria-hidden />
                <span>{renderInline(line, `${i}-${j}`)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p key={i} className="text-[15px] leading-relaxed text-pretty">
            {block.lines.map((line, j) => (
              <Fragment key={j}>
                {j > 0 && " "}
                {renderInline(line, `${i}-${j}`)}
              </Fragment>
            ))}
          </p>
        )
      )}
    </div>
  );
}

/** Strips markdown syntax down to clean prose for text-to-speech. */
export function toSpeechText(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trim().replace(/^[-•]\s+/, ""))
    .filter(Boolean)
    .join(". ")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
