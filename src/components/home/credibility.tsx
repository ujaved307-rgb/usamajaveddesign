import { homepage } from "@/lib/data/site";
import { StatValue } from "@/components/stat-value";
import { RevealGroup, RevealItem } from "@/components/reveal";

export function Credibility() {
  return (
    <section className="border-y border-line bg-paper-2/60">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <RevealGroup className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {homepage.credibility.map((item) => (
            <RevealItem key={item.label}>
              <StatValue
                value={item.value}
                className="font-display block text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
              />
              <p className="mt-2 max-w-[26ch] text-sm text-ink-2">{item.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
