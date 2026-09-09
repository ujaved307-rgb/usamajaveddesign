import Link from "next/link";
import { contact, nav } from "@/lib/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-ink">
              Have a complex problem worth solving?
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-4 inline-flex items-center gap-2 text-lg text-accent-strong underline decoration-2 underline-offset-4"
            >
              Let&rsquo;s talk
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="flex flex-col gap-2 text-sm text-ink-2">
            <span className="mb-1 text-xs uppercase tracking-wider text-ink-3">
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
            <span className="mb-1 text-xs uppercase tracking-wider text-ink-3">
              Connect
            </span>
            <a href={`mailto:${contact.email}`} className="w-fit hover:text-ink">
              {contact.email}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-fit hover:text-ink"
            >
              LinkedIn
            </a>
            <span>{contact.location}</span>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <span>© {contact.name} · {year}</span>
          <span>{contact.role} · {contact.subRole}</span>
        </div>
      </div>
    </footer>
  );
}
