import type { DesignThinkingContent, DesignThinkingStep } from "@/lib/types";

const STEPS: { key: keyof DesignThinkingContent; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "insight", label: "Insight" },
  { key: "approach", label: "Approach" },
  { key: "decision", label: "Decision" },
  { key: "outcome", label: "Outcome" },
  { key: "impact", label: "Impact" },
];

function resolveStep(key: string, step: DesignThinkingStep) {
  return typeof step === "string" ? { value: step, href: `#${key}` } : { value: step.label, href: step.href };
}

// Sits right after the case-study hero in the DOM and relies on native
// `position: sticky` for both halves of the brief: it scrolls normally
// (out of view) while the hero is on screen, then sticks to the top the
// moment the hero scrolls past — no scroll-listener/IntersectionObserver
// needed. `top-16` matches SiteNav's height so it docks directly under it.
export function DesignThinkingBar(props: DesignThinkingContent) {
  return (
    <nav
      aria-label="Design thinking process"
      className="sticky top-16 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-stretch overflow-x-auto px-5 sm:px-8">
        {STEPS.map(({ key, label }, i) => {
          const { value, href } = resolveStep(key, props[key]);
          return (
            <div key={key} className="flex shrink-0 items-center">
              {i > 0 && (
                <span aria-hidden className="mx-2 text-ink-3 sm:mx-3">
                  ›
                </span>
              )}
              <a
                href={href}
                className="group flex w-32 shrink-0 flex-col gap-0.5 rounded-sm py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-40 sm:py-4"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
                  {label}
                </span>
                <span className="text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-accent-strong">
                  {value}
                </span>
              </a>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
