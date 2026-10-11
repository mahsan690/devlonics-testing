import Link from "next/link";
import { Logo } from "./Logo";
import { Year } from "./Year";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { markets } from "@/lib/markets";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo className="h-10 w-auto" />
          <p className="mt-5 max-w-xs text-ash">
            Websites, Shopify stores, apps and marketing for service businesses and ecommerce brands.
          </p>
          <div className="mt-6 space-y-1.5">
            <a href={`mailto:${site.email}`} className="link block text-lg">{site.email}</a>
            <a href={site.phoneHref} className="link block text-lg">{site.phoneDisplay}</a>
          </div>
        </div>

        <nav aria-label="Services" className="md:col-span-3">
          <h2 className="font-sans text-sm font-semibold tracking-normal text-ash">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-signal">{s.name}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Markets we serve" className="md:col-span-2">
          <h2 className="font-sans text-sm font-semibold tracking-normal text-ash">Markets we serve</h2>
          <ul className="mt-4 space-y-2.5">
            {markets.map((m) => (
              <li key={m.slug}><Link href={`/markets/${m.slug}`} className="hover:text-signal">{m.name}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-3">
          <h2 className="font-sans text-sm font-semibold tracking-normal text-ash">Company</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/work" className="hover:text-signal">Work</Link></li>
            <li><Link href="/pricing" className="hover:text-signal">Pricing</Link></li>
            <li><Link href="/about" className="hover:text-signal">About</Link></li>
            <li><Link href="/blog" className="hover:text-signal">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-signal">Get a quote</Link></li>
            <li><a href={site.profiles.upwork} className="hover:text-signal" rel="noopener" target="_blank">Upwork profile</a></li>
            <li><a href={site.profiles.linkedin} className="hover:text-signal" rel="noopener" target="_blank">LinkedIn</a></li>
            <li><a href={site.profiles.trustpilot} className="hover:text-signal" rel="noopener" target="_blank">Trustpilot reviews</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/15">
        <div className="wrap flex flex-col gap-3 py-6 text-sm text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>© <Year /> {site.name}</p>
          <p className="flex gap-5">
            <Link href="/privacy" className="hover:text-paper">Privacy</Link>
            <Link href="/terms" className="hover:text-paper">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
