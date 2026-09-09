"use client";

import { useEffect, useState } from "react";

/**
 * Fixed vertical rail of numbered dots tracking scroll position through a
 * case study's sections — pure wayfinding, no audio/narration. Desktop
 * only; there's no room for it once the layout stacks on mobile.
 */
export function SectionRail({ sectionIds, color }: { sectionIds: string[]; color: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const index = elements.findIndex((el) => el === visible.target);
          if (index !== -1) setActive(index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <nav
      aria-label="Case study sections"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2.5 rounded-full border border-ink/10 bg-cream/90 py-4 px-2.5 text-ink shadow-lg backdrop-blur-sm lg:flex"
    >
      {sectionIds.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={`Jump to section ${i + 1}`}
          aria-current={i === active ? "true" : undefined}
          className="group flex h-6 w-6 items-center justify-center"
        >
          <span
            className="rounded-full border-2 transition-all duration-300"
            style={
              i === active
                ? { width: 12, height: 12, backgroundColor: color, borderColor: color }
                : { width: 7, height: 7, backgroundColor: "transparent", borderColor: "currentColor" }
            }
          />
        </a>
      ))}
    </nav>
  );
}
