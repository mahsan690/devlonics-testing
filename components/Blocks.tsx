import Image from "next/image";
import Link from "next/link";
import { states } from "@/lib/states";
import { testimonials, type Testimonial } from "@/lib/testimonials";
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
    <section aria-label="Recent clients" className="overflow-hidden border-y border-line bg-paper py-6">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {names.map((n, i) => (
          <span key={i} aria-hidden={i >= clientNames.length} className="font-display text-xl font-bold tracking-tight text-ink/70 md:text-2xl">
            {n}
          </span>
        ))}
      </div>
    </section>
  );
}

export function WorkTile({ project, priority = false, large = false }: { project: Project; priority?: boolean; large?: boolean }) {
  return (
    <figure>
      <div className={`relative overflow-hidden rounded-[1.5rem] bg-fog ${large ? "aspect-[1.25]" : "aspect-[1.18]"}`}>
        <Image
          src={`/work/${project.file}`}
          alt={`${project.name}: ${project.type}`}
          fill
          priority={priority}
          sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
        />
      </div>
      <figcaption className="mt-3">
        <span className="font-display text-lg font-bold tracking-tight">{project.name}</span>
        <span className="block text-[0.95rem] text-graphite">{project.type}</span>
      </figcaption>
    </figure>
  );
}

export function StatesGrid({ exclude }: { exclude?: string }) {
  const list = states.filter((s) => s.slug !== exclude);
  return (
    <div className={`grid gap-4 ${list.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {list.map((s) => (
        <Link
          key={s.slug}
          href={`/web-design/${s.slug}`}
          className="group flex min-h-56 flex-col justify-between rounded-[1.5rem] bg-ink p-7 text-paper transition-colors hover:bg-coal"
        >
          <span className="font-display text-[clamp(3rem,6vw,4.5rem)] font-bold leading-none tracking-tight text-signal">{s.abbr}</span>
          <span>
            <span className="block font-display text-2xl font-bold tracking-tight">{s.name}</span>
            <span className="mt-1 block text-ash">
              {s.stats[0].value} {s.stats[0].label}
            </span>
            <span className="mt-4 inline-block text-[0.95rem] font-semibold underline decoration-signal decoration-2 underline-offset-4">
              Web design in {s.name}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export function TestimonialsBlock({ items = testimonials }: { items?: Testimonial[] }) {
  const [lead, ...rest] = items;
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <figure className="lg:col-span-7">
        <blockquote className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-bold leading-[1.15] tracking-tight">
          &ldquo;{lead.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-6 text-graphite">
          <span className="font-semibold text-ink">{lead.name}</span>, {lead.role}
        </figcaption>
      </figure>
      <div className="space-y-8 lg:col-span-5">
        {rest.map((t) => (
          <figure key={t.name} className="border-t border-line pt-6">
            <blockquote className="text-[1.0625rem]">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-3 text-sm text-graphite">
              <span className="font-semibold text-ink">{t.name}</span>, {t.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
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
        <Link href={href} className="btn btn-ink shrink-0 !min-h-14 !px-8 text-lg">{label}</Link>
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
