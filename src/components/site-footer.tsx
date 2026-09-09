import Link from "next/link";
import { contact, nav } from "@/lib/data/site";
import { Magnetic } from "@/components/magnetic";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-display display-wonk max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl">
          Have a complex problem worth solving?
        </p>
        <Magnetic className="mt-8 inline-block">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-lg font-medium text-gold-ink transition-opacity hover:opacity-85"
          >
            Let&rsquo;s talk
            <span aria-hidden>→</span>
          </a>
        </Magnetic>

        <div className="mt-20 grid gap-10 border-t border-ink-line pt-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div className="text-sm text-text-2">
            {contact.name} — {contact.role} · {contact.subRole}
          </div>

          <div className="flex flex-col gap-2 text-sm text-text-2">
            <span className="mb-1 text-xs uppercase tracking-wider text-text-3">
              Navigate
            </span>
            <Link href="/" className="w-fit hover:text-text">
              Home
            </Link>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="w-fit hover:text-text">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm text-text-2">
            <span className="mb-1 text-xs uppercase tracking-wider text-text-3">
              Connect
            </span>
            <a href={`mailto:${contact.email}`} className="w-fit hover:text-text">
              {contact.email}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-fit hover:text-text"
            >
              LinkedIn
            </a>
            <span>{contact.location}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink-line pt-6 text-xs text-text-3 sm:flex-row sm:items-center sm:justify-between">
          <span>© {contact.name} · {year}</span>
        </div>
      </div>
    </footer>
  );
}
