"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, contact } from "@/lib/data/site";
import { Magnetic } from "@/components/magnetic";

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-ink-line bg-ink/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-tight text-text"
        >
          Usama Javed
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                isActive(item.href) ? "text-gold" : "text-text-2 hover:text-text"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-text-2 transition-colors hover:text-text"
          >
            LinkedIn
          </a>
          <Magnetic>
            <a
              href={`mailto:${contact.email}`}
              className="inline-block rounded-full bg-gold px-4 py-2 text-sm font-medium text-gold-ink transition-opacity hover:opacity-85"
            >
              Let&rsquo;s talk
            </a>
          </Magnetic>
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-text transition-transform ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-5 bg-text transition-transform ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-ink-line bg-ink px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-lg text-text"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="block py-3 text-lg text-text">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="block py-3 text-lg text-text">
                Email
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
