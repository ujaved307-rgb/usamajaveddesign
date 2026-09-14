import { contact } from "@/lib/data/site";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";

// Nedbank South Africa's Apply Hub is a live, confidential banking
// engagement — no public screens exist to build a full case study from, so
// this is a factual highlight (sourced from the resume) rather than a
// ProjectCard: no invented images, no invented metrics, no link to a case
// study page that doesn't exist.
const scope = ["Credit Cards", "Personal Loans", "Overdrafts", "Investments", "Account Opening"];

const stats = [
  { value: "4", label: "Designers led" },
  { value: "5", label: "Product journeys" },
  { value: "2", label: "Customer segments" },
];

export function CurrentEngagement() {
  return (
    <Reveal>
      <div className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br from-cream-2 via-cream-2 to-accent/15 p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-accent/25 blur-3xl transition-transform duration-700 group-hover:scale-110"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-ink/[0.04] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle,var(--color-ink)_1px,transparent_1px)] [background-size:18px_18px]"
        />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden />
                Currently Leading
              </span>
              <span className="rounded-full border border-ink/15 bg-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-2">
                Banking &amp; Fintech
              </span>
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
              Nedbank South Africa
            </p>
            <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Leading the Apply Hub — End-to-End Digital Banking Experience
            </h3>
            <p className="mt-3 text-base leading-relaxed text-ink-2">
              Led a pod of 4 designers delivering credit cards, personal loans, overdrafts, investments, and
              account opening journeys — navigating NCA compliance, POPIA, and bureau decisioning logic to
              turn regulated complexity into trustworthy customer experiences.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {scope.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-cream px-3 py-1.5 text-xs font-medium text-ink-2"
                >
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-5 text-sm text-ink-3">
              An active, confidential engagement — no public case study yet.
            </p>

            <Magnetic className="mt-6 inline-block">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-opacity hover:opacity-85"
              >
                Ask about this project
                <span aria-hidden>→</span>
              </a>
            </Magnetic>
          </div>

          <div className="grid shrink-0 grid-cols-3 gap-6 border-t border-ink/10 pt-6 lg:grid-cols-1 lg:gap-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="font-display block text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs text-ink-3">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
