import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand } from "@/components/Blocks";
import { CaseCard, CaseStudyFeature } from "@/components/CaseStudyFeature";
import { JsonLd } from "@/components/JsonLd";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { getService, type Service } from "@/lib/services";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";

// One page per case study. Florida Surface Pro opens with the full feature
// (funnel demo and lead path); the others open with their cover image.

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const title = cs.client ? `${cs.client} Case Study: Quote Funnel and Lead Flow` : `${cs.card}: Case Study`;
  const description = (cs.cardLine ?? cs.summary).slice(0, 160);
  return {
    title,
    description,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: { type: "article", title, description, url: `/work/${cs.slug}` },
  };
}

function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-5 w-5 shrink-0 ${className}`} aria-hidden="true">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: cs.client ?? cs.card, path: `/work/${cs.slug}` },
  ];
  const services = cs.services.map(getService).filter((s): s is Service => Boolean(s));
  const more = caseStudies.filter((c) => c.slug !== cs.slug).slice(0, 3);
  const isFlagship = Boolean(cs.flow);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), caseStudySchema(cs)]} />

      {isFlagship ? (
        <CaseStudyFeature standalone />
      ) : (
        <section className="bg-paper pb-12 pt-28 md:pb-16 md:pt-36">
          <div className="wrap">
            <Breadcrumbs items={crumbs} />
            <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
              {services.slice(0, 2).map((s) => (
                <span key={s.slug} className="rounded-full bg-signal px-3 py-1 text-ink">{s.name}</span>
              ))}
              <span className="rounded-full px-3 py-1 shadow-[inset_0_0_0_1.5px_var(--color-line)]">{cs.industry}</span>
            </div>
            <h1 className="t-h1 mt-6 max-w-[22ch]">{cs.title}</h1>
            <p className="t-lede mt-6 max-w-2xl text-graphite">{cs.summary}</p>
            <div className="relative mx-auto mt-12 aspect-[4/3] max-w-5xl overflow-hidden rounded-[1.5rem] shadow-[0_0_0_1px_var(--color-line),0_40px_90px_-40px_rgba(0,0,0,0.35)]">
              <Image src={`/case-studies/${cs.slug}.webp`} alt={`${cs.card}: how the system works, with the tools used`} fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
            </div>
            <dl className={`mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-8 ${cs.stats.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
              {cs.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-2 border-t border-line pt-4">
                  <dt className="text-sm text-graphite">{s.label}</dt>
                  <dd className="order-first font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-none tracking-tight text-signal-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section className="border-t border-line py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <div>
              <h2 className="t-h2">The problem</h2>
              <p className="t-lede mt-5 text-graphite">{cs.problem}</p>
            </div>
            <div>
              <h2 className="t-h2">What we built</h2>
              <p className="mt-5 text-[1.125rem] leading-relaxed">{cs.built}</p>
              {cs.features && (
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {cs.features.map((f) => (
                    <li key={f.title} className="rounded-[1.25rem] border border-line p-6">
                      <span className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"><Tick className="text-signal-ink" />{f.title}</span>
                      <span className="mt-2 block text-graphite">{f.body}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="rounded-[1.5rem] bg-ink p-8 text-paper md:p-10">
              <h2 className="font-display text-2xl font-bold tracking-tight text-signal">The result</h2>
              <p className="t-lede mt-4">{cs.result}</p>
            </div>
            {isFlagship && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_0_0_1px_var(--color-line)]">
                <Image src={`/case-studies/${cs.slug}.webp`} alt={`${cs.card}: the lead path from ad click to CRM, with the numbers`} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              </div>
            )}
            {cs.extra && (
              <div>
                <h2 className="t-h3">{cs.extra.title}</h2>
                <p className="mt-3 text-[1.0625rem] text-graphite">{cs.extra.body}</p>
              </div>
            )}
          </div>
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-[1.5rem] border border-line p-7">
                <h2 className="font-sans text-sm font-semibold text-graphite">Built with</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cs.stack.map((t) => <li key={t} className="rounded-full bg-fog px-3 py-1.5 text-[0.95rem] font-medium">{t}</li>)}
                </ul>
                <h2 className="mt-7 font-sans text-sm font-semibold text-graphite">Industry</h2>
                <p className="mt-1.5 font-medium">{cs.industry}</p>
                {cs.url && (
                  <>
                    <h2 className="mt-7 font-sans text-sm font-semibold text-graphite">Website</h2>
                    <a href={cs.url} target="_blank" rel="noopener" className="link mt-1.5 inline-block font-medium">{cs.url.replace("https://", "")}</a>
                  </>
                )}
              </div>
              <div className="rounded-[1.5rem] bg-fog p-7">
                <h2 className="font-display text-xl font-bold tracking-tight">Services behind this</h2>
                <ul className="mt-4 space-y-3">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="link font-semibold">{s.name}</Link>
                      <span className="block text-sm text-graphite">{s.short}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/contact?need=${services[0]?.wizardChoice ?? "unsure"}`} className="btn btn-signal mt-6 !min-h-11">Get a fixed quote</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-fog py-20 md:py-24" aria-labelledby="more-case-studies">
        <div className="wrap">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 id="more-case-studies" className="t-h2">More case studies</h2>
            <Link href="/work" className="btn btn-ghost shrink-0">All work</Link>
          </div>
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((c) => <li key={c.slug}><CaseCard cs={c} /></li>)}
          </ul>
        </div>
      </section>

      <CtaBand title="Want something like this?" body="Tell us what's leaking leads today. You get a written plan with one fixed price within one business day." href={`/contact?need=${services[0]?.wizardChoice ?? "unsure"}`} />
    </>
  );
}
