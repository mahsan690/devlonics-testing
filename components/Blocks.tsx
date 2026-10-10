import Image from "next/image";
import Link from "next/link";
import { markets, type Market } from "@/lib/markets";
import { clientNames, type Project } from "@/lib/work";

export function SectionHead({ title, lede, className = "" }: { title: string; lede?: string; className?: string }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <h2 className="t-h2">{title}</h2>
      {lede && <p className="t-lede mt-5 text-graphite">{lede}</p>}
    </div>
  );
}

export function ClientMarquee() {
  const names = [...clientNames, ...clientNames];
  return (
    <section aria-label="Recent clients" className="group overflow-hidden border-y border-line bg-paper py-6">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap group-hover:[animation-play-state:paused]">
        {names.map((n, i) => (
          <span key={i} aria-hidden={i >= clientNames.length} className="font-display text-xl font-bold tracking-tight text-ink/70 transition-colors hover:text-signal-ink md:text-2xl">
            {n}
          </span>
        ))}
      </div>
    </section>
  );
}

// Portfolio tile. `data-tilt` lets InteractiveFX tilt it toward the cursor.
export function WorkTile({ project, priority = false, large = false }: { project: Project; priority?: boolean; large?: boolean }) {
  return (
    <figure>
      <div data-tilt className={`relative overflow-hidden rounded-[1.5rem] bg-fog shadow-[0_0_0_1px_var(--color-line)] ${large ? "aspect-[1.25]" : "aspect-[1.18]"}`}>
        <Image
          src={`/work/${project.file}`}
          alt={`${project.name}: ${project.type}`}
          fill
          priority={priority}
          sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover object-top"
        />
        {(project.platform || project.year) && (
          <span className="absolute left-3 top-3 flex gap-1.5 text-xs font-semibold">
            {project.platform && <span className="rounded-full bg-ink px-2.5 py-1 text-paper">{project.platform}</span>}
            {project.year && <span className="rounded-full bg-signal px-2.5 py-1 text-ink">{project.year}</span>}
          </span>
        )}
      </div>
      <figcaption className="mt-3">
        <span className="font-display text-lg font-bold tracking-tight">{project.name}</span>
        <span className="block text-[0.95rem] text-graphite">{project.type}</span>
      </figcaption>
    </figure>
  );
}

// Simple line icons drawn for this site, one per market.
export function MarketIcon({ icon, className = "h-8 w-8" }: { icon: Market["icon"]; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<Market["icon"], React.ReactNode> = {
    hvac: (<><circle cx="12" cy="12" r="2.2" {...common} /><path d="M12 9.8C11 6 12.5 3.5 15 3.5c1.6 0 2.2 2 .8 3.4L12 9.8ZM14.2 12.6c3.8-1 6.3.5 6.3 3 0 1.6-2 2.2-3.4.8l-2.9-3.8ZM9.8 13.2c-2.8 2.8-5.7 2.7-6.8.5-.7-1.4.8-3 2.6-2.4l4.2 1.9Z" {...common} /></>),
    plumbing: (<path d="M12 3.5c3.2 4.1 5.5 7.3 5.5 10a5.5 5.5 0 0 1-11 0c0-2.7 2.3-5.9 5.5-10Z M9.5 14.5a2.6 2.6 0 0 0 2.5 2.4" {...common} />),
    roofing: (<path d="M2.5 12 12 4l9.5 8M5.5 10v9.5h13V10M10 19.5v-5h4v5" {...common} />),
    cleaning: (<path d="M12 3v4M12 13v4M7 10H3M21 10h-4M8.5 6.5 6 4M15.5 6.5 18 4M18.5 15.5l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" {...common} />),
    contractors: (<path d="m14.5 6.5 3 3M4 20l8.6-8.6M13.5 5.5l3-2.5 4.5 4.5-2.5 3-3.6-1.4-1.4-3.6Z M10.5 13.5 7 10" {...common} />),
    landscaping: (<path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15M5 19l7-7" {...common} />),
    health: (<path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z M12 10.5v5M9.5 13h5" {...common} />),
    ecommerce: (<path d="M5 8h14l-1.2 12H6.2L5 8Z M9 8V6.5a3 3 0 0 1 6 0V8" {...common} />),
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}

// Market tiles. `data-spotlight` gets a cursor-following glow from InteractiveFX.
export function MarketsGrid({ exclude, compact = false }: { exclude?: string; compact?: boolean }) {
  const list = markets.filter((m) => m.slug !== exclude);
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 ${compact ? "lg:grid-cols-4" : "lg:grid-cols-4"}`}>
      {list.map((m) => (
        <li key={m.slug}>
          <Link
            href={`/markets/${m.slug}`}
            data-spotlight
            className="group relative flex h-full min-h-48 flex-col justify-between overflow-hidden rounded-[1.5rem] bg-ink p-6 text-paper transition-transform duration-300 hover:-translate-y-1"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(233,75,39,0.28), transparent 65%)" }}
            />
            <MarketIcon icon={m.icon} className="relative h-9 w-9 text-signal transition-transform duration-300 group-hover:scale-110" />
            <span className="relative mt-8 block">
              <span className="block font-display text-xl font-bold tracking-tight">{m.name}</span>
              {!compact && <span className="mt-1.5 block text-[0.95rem] text-ash">{m.short}</span>}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({
  title = "Tell us about your project.",
  body = "A few quick questions, then a written plan with scope, price and timeline. No obligation.",
  href = "/contact",
  label = "Get a quote",
}: { title?: string; body?: string; href?: string; label?: string }) {
  return (
    <section className="bg-signal text-ink">
      <div className="wrap flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-24">
        <div className="max-w-2xl">
          <h2 className="t-h1">{title}</h2>
          <p className="t-lede mt-5">{body}</p>
        </div>
        <Link href={href} data-magnetic className="btn btn-ink shrink-0 !min-h-14 !px-8 text-lg">{label}</Link>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-graphite">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i < items.length - 1 ? (
              <Link href={it.path} className="link">{it.name}</Link>
            ) : (
              <span aria-current="page" className="text-ink">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  title, lede, crumbs, children,
}: { title: string; lede?: string; crumbs?: { name: string; path: string }[]; children?: React.ReactNode }) {
  return (
    <section className="bg-paper pb-14 pt-28 md:pb-20 md:pt-36">
      <div className="wrap">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <h1 className="t-h1 mt-6 max-w-[20ch]">{title}</h1>
        {lede && <p className="t-lede mt-6 max-w-2xl text-graphite">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
