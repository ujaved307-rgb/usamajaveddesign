import { Reveal } from "@/components/reveal";
import { RoleFitTrigger } from "@/components/role-fit/role-fit-trigger";

export function RoleFitTeaser() {
  return (
    <section className="border-t border-ink/10 bg-cream-2">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
            For Recruiters & Hiring Managers
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="font-display mx-auto mt-5 max-w-xl text-2xl font-semibold leading-snug tracking-tight text-balance sm:text-3xl">
            Hiring for a role like this? See how I match it.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-md text-ink-2 text-pretty">
            Paste or upload the job description and I&rsquo;ll compare it against my real
            background — instantly, honestly, and only visible to you.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 flex justify-center">
            <RoleFitTrigger />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
