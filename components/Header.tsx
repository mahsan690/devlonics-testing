"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // The home hero is black; the header sits on it transparently until scrolled.
  const onDarkHero = pathname === "/" && !scrolled && !open;

  // Close the mobile menu on navigation (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        onDarkHero ? "bg-transparent text-paper" : "bg-paper/95 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo className="h-8 w-auto md:h-9" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-5 lg:flex xl:gap-7">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-[0.95rem] font-medium transition-opacity hover:opacity-100 ${active ? "opacity-100" : "opacity-75"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href={site.phoneHref} className="hidden text-[0.95rem] font-medium opacity-75 hover:opacity-100 xl:inline">
            {site.phoneDisplay}
          </a>
          <Link href="/contact" className="btn btn-signal hidden !min-h-11 sm:inline-flex">
            Get a quote
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-6" aria-hidden="true">
              <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-paper text-ink lg:hidden">
        <nav aria-label="Mobile" className="wrap flex flex-col py-4">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="py-3 font-display text-2xl font-bold tracking-tight">
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3 border-t border-line pt-5">
            <Link href="/contact" className="btn btn-signal">Get a quote</Link>
            <a href={site.phoneHref} className="btn btn-ghost">Call {site.phoneDisplay}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
