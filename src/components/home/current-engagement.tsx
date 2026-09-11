import { contact } from "@/lib/data/site";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";

// Nedbank South Africa's Apply Hub is a live, confidential banking
// engagement — no public screens exist to build a full case study from, so
// this is a factual highlight (sourced from the resume) rather than a
// ProjectCard: no invented images, no invented metrics, no link to a case
// study page that doesn't exist.
const scope = ["Credit Cards", "Personal Loans", "Overdrafts", "Investments", "Account Opening"];

export function CurrentEngagement() {
  return (
    <Reveal>
      <div className="flex flex-col gap-6 rounded-2xl border border-ink/10 bg-cream-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            Currently Leading
          </span>
          <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Nedbank South Africa — Apply Hub
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-2">
            Leading a pod of 4 designers on Nedbank&rsquo;s digital banking platform — end-to-end product
            design strategy, design system standards and cross-functional alignment across product,
            engineering, compliance and business, for both New-to-Bank and Existing-to-Bank customers.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {scope.map((item) => (
              <span
                key={item}
                className="rounded-full border border-ink/15 bg-cream px-3 py-1 text-xs font-medium text-ink-2"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-3">
            An active, confidential engagement — no public case study yet.
          </p>
        </div>
        <Magnetic className="shrink-0">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Ask about this project
            <span aria-hidden>→</span>
          </a>
        </Magnetic>
      </div>
    </Reveal>
  );
}
