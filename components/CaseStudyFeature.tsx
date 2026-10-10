import Image from "next/image";
import Link from "next/link";
import { caseStudy } from "@/lib/work";
import { CountUp } from "./CountUp";

// The Gladiolaz case study, presented as the headline proof on the home page:
// Shopify rebuild plus performance marketing, with the numbers counting up and
// the order flow we built drawn as a live diagram.

const flow = [
  { name: "TikTok and Meta ads", note: "AI video creative, $20/day" },
  { name: "Shopify store", note: "Rebuilt product pages and checkout" },
  { name: "AutoDS", note: "Orders routed automatically" },
  { name: "Amazon and Alibaba suppliers", note: "Fulfilment and tracking" },
];

export function CaseStudyFeature({ standalone = false }: { standalone?: boolean }) {
  // On the case study page itself this is the page heading and opening section.
  const H = standalone ? "h1" : "h2";
  return (
    <section
      className={`relative overflow-hidden bg-ink text-paper ${standalone ? "pb-20 pt-28 md:pb-28 md:pt-36" : "py-20 md:py-28"}`}
      aria-labelledby="case-study-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(233,75,39,0.22), transparent)" }} />
      <div className="wrap relative">
        <div className="flex flex-wrap gap-2 text-sm font-semibold">
          <span className="rounded-full bg-signal px-3 py-1 text-ink">Shopify case study</span>
          <span className="rounded-full border border-white/25 px-3 py-1">Performance marketing</span>
          <span className="rounded-full border border-white/25 px-3 py-1">{caseStudy.industry}</span>
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <H id="case-study-title" className="t-h1 max-w-[16ch]">{caseStudy.headline}</H>
            <p className="t-lede mt-6 max-w-xl text-ash">{caseStudy.summary}</p>
            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-8">
              {caseStudy.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-2 border-t border-white/20 pt-4">
                  <dt className="text-sm text-ash">{s.label}</dt>
                  <dd className="order-first whitespace-nowrap font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-none tracking-tight text-signal">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              {!standalone && (
                <Link href={`/work/${caseStudy.slug}`} data-magnetic className="btn btn-signal">Read the case study</Link>
              )}
              <Link href="/contact?need=store&industry=retail" data-magnetic={standalone || undefined} className={`btn ${standalone ? "btn-signal" : "btn-ghost"}`}>
                Grow my Shopify store
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div data-tilt className="overflow-hidden rounded-[1.25rem] bg-paper shadow-[0_40px_90px_-30px_rgba(233,75,39,0.45)]">
              <div className="flex items-center gap-1.5 bg-coal px-4 py-3" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-signal" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <span className="ml-3 truncate rounded-full bg-white/10 px-3 py-0.5 text-xs text-ash">gladiolaz.com</span>
              </div>
              <div className="relative aspect-[1000/847]">
                <Image src={`/work/${caseStudy.image}`} alt="Gladiolaz Shopify store homepage" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-top" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="t-h3">The system we built</h3>
          <ol className="relative mt-6 grid gap-4 md:grid-cols-4">
            {flow.map((f, i) => (
              <li key={f.name} className="relative rounded-2xl border border-white/15 bg-white/[0.03] p-5">
                <span className="font-display text-sm font-bold text-signal" aria-hidden="true">{i + 1}</span>
                <span className="mt-2 block font-display text-lg font-bold tracking-tight">{f.name}</span>
                <span className="mt-1 block text-sm text-ash">{f.note}</span>
                {i < flow.length - 1 && (
                  <span aria-hidden="true" className="flow-link absolute -bottom-4 left-8 h-4 w-0.5 md:-right-4 md:bottom-auto md:left-auto md:top-1/2 md:h-0.5 md:w-4" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
