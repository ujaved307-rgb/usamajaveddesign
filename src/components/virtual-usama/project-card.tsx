import Link from "next/link";
import { projects } from "@/lib/data/virtual-usama";

export function VirtualUsamaProjectCard({ slug, onNavigate }: { slug: string; onNavigate?: () => void }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  const { data, route } = project;

  return (
    <Link
      href={route}
      onClick={onNavigate}
      className="group block w-full max-w-xs rounded-xl border border-ink/10 bg-cream-2/60 p-4 transition-colors hover:border-ink/25"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">{data.client}</p>
      <p className="mt-1 text-xs text-ink-3">{data.category.join(" · ")}</p>
      <p className="font-display mt-2 text-base font-semibold tracking-tight text-ink">{data.shortTitle}</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-2">{data.cardTagline}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-strong">
        View case study
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}
