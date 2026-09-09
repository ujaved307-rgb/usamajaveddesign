import Link from "next/link";
import { contact, nav } from "@/lib/data/site";
import { Magnetic } from "@/components/magnetic";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="font-display mx-auto max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
          Interested in working together? <span aria-hidden>👋</span>
        </p>
        <Magnetic className="mt-8 inline-block">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-lg font-medium text-cream transition-opacity hover:opacity-85"
          >
            {contact.email}
            <span aria-hidden>→</span>
          </a>
        </Magnetic>

        <div className="mx-auto mt-20 grid max-w-4xl gap-10 border-t border-ink/15 pt-10 text-left sm:grid-cols-[1.4fr_1fr_1fr]">
          <div className="text-sm text-ink-2">
            {contact.name} — {contact.role} · {contact.subRole}
          </div>

          <div className="flex flex-col gap-2 text-sm text-ink-2">
            <span className="mb-1 text-xs font-medium uppercase tracking-wider text-ink-3">
              Navigate
            </span>
            <Link href="/" className="w-fit hover:text-ink">
              Home
            </Link>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="w-fit hover:text-ink">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm text-ink-2">
            <span className="mb-1 text-xs font-medium uppercase tracking-wider text-ink-3">
              Connect
            </span>
            <a href={`mailto:${contact.email}`} className="w-fit hover:text-ink">
              {contact.email}
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="w-fit hover:text-ink">
              LinkedIn
            </a>
            <span>{contact.location}</span>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-2 border-t border-ink/15 pt-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <span>Designed &amp; built by {contact.name}</span>
          <span>© {contact.name} · {year}</span>
        </div>
      </div>
    </footer>
  );
}
