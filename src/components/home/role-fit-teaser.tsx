import { Reveal } from "@/components/reveal";
import { RoleFitTrigger } from "@/components/role-fit/role-fit-trigger";

export function RoleFitTeaser() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-cream-on-charcoal">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/25 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-[12%] h-72 w-72 rounded-full bg-accent-strong/15 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,var(--color-cream-on-charcoal)_1px,transparent_1px)] [background-size:22px_22px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream-on-charcoal/15 bg-cream-on-charcoal/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cream-on-charcoal-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden />
            For Recruiters &amp; Hiring Managers
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="font-display mx-auto mt-6 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl">
            Hiring for a role like this?{" "}
            <span className="text-accent">See how I match it.</span>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-cream-on-charcoal-2 text-pretty">
            Paste or upload the job description and I&rsquo;ll compare it against my real
            background — instantly, honestly, and only visible to you.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <RoleFitTrigger className="inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_8px_30px_-8px_rgba(232,90,40,0.45)] transition-transform hover:scale-[1.03]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
