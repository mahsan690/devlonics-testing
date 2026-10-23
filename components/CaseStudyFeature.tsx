import Image from "next/image";
import Link from "next/link";
import { flagship as cs, type CaseStudy } from "@/lib/case-studies";
import { QuoteFunnelDemo } from "./QuoteFunnelDemo";

// The Florida Surface Pro case study as the headline proof: a quote funnel and
// lead flow, with the funnel playing on the right and the lead's path below.
// On the case study page itself this is the page heading and opening section.
export function CaseStudyFeature({ standalone = false }: { standalone?: boolean }) {
  const H = standalone ? "h1" : "h2";
  return (
    <section
      className={`relative overflow-hidden bg-ink text-paper ${standalone ? "pb-20 pt-28 md:pb-28 md:pt-36" : "py-20 md:py-28"}`}
      aria-labelledby="case-study-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(233,75,39,0.22), transparent)" }} />
      <div className="wrap relative">
        <div className="flex flex-wrap gap-2 text-sm font-semibold">
          <span className="rounded-full bg-signal px-3 py-1 text-ink">Lead flow case study</span>
          <span className="rounded-full border border-white/25 px-3 py-1">{cs.client}</span>
          <span className="rounded-full border border-white/25 px-3 py-1">{cs.industry}</span>
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <H id="case-study-title" className="t-h1 max-w-[17ch]">{cs.headline}</H>
            <p className="t-lede mt-6 max-w-2xl text-ash">{cs.summary}</p>
            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8">
              {cs.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-2 border-t border-white/20 pt-4">
                  <dt className="text-sm text-ash">{s.label}</dt>
                  <dd className="order-first whitespace-nowrap font-display text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-none tracking-tight text-signal">{s.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              {!standalone && (
                <Link href={`/work/${cs.slug}`} data-magnetic className="btn btn-signal">Read the case study</Link>
              )}
              <Link href="/contact?need=leads" data-magnetic={standalone || undefined} className={`btn ${standalone ? "btn-signal" : "btn-ghost"}`}>
                Get a lead flow like this
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <QuoteFunnelDemo />
          </div>
        </div>

        {cs.flow && (
          <div className="mt-16">
            <h3 className="t-h3">Where every lead goes</h3>
            <ol className="relative mt-6 grid gap-4 md:grid-cols-4">
              {cs.flow.map((f, i, all) => (
                <li key={f.title} className={`relative rounded-2xl border p-5 ${i === 2 ? "border-signal bg-signal/10" : "border-white/15 bg-white/[0.03]"}`}>
                  <span className="font-display text-sm font-bold text-signal" aria-hidden="true">0{i + 1}</span>
                  <span className="mt-2 block font-display text-lg font-bold tracking-tight">{f.title}</span>
                  <span className="mt-1 block text-sm text-ash">{f.body}</span>
                  {i < all.length - 1 && (
                    <span aria-hidden="true" className="flow-link absolute -bottom-4 left-8 h-4 w-0.5 md:-right-4 md:bottom-auto md:left-auto md:top-1/2 md:h-0.5 md:w-4" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}

// Case study card: the 4:3 cover, industry, title and one line.
export function CaseCard({ cs: c, priority = false }: { cs: CaseStudy; priority?: boolean }) {
  return (
    <Link href={`/work/${c.slug}`} className="group block h-full">
      <div data-tilt className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] shadow-[0_0_0_1px_var(--color-line)]">
        <Image
          src={`/case-studies/${c.slug}.webp`}
          alt={`${c.card}: case study cover`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4">
        <span className="text-sm font-semibold text-signal-ink">{c.industry}</span>
        <h3 className="mt-1.5 font-display text-xl font-bold leading-tight tracking-tight">{c.card}</h3>
        <p className="mt-1.5 text-[0.975rem] text-graphite">{c.cardLine ?? c.summary}</p>
        <span className="mt-3 inline-block text-[0.95rem] font-semibold underline decoration-signal decoration-2 underline-offset-4">Read the case study</span>
      </div>
    </Link>
  );
}
