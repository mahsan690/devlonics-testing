import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { AiCaseCard, OfferIcon } from "@/components/AiParts";
import { aiCaseStudies, aiOffers, categoryLabel, getAiCaseStudy } from "@/lib/ai";
import { aiCaseStudySchema, breadcrumbSchema } from "@/lib/schema";

// One page per AI case study: the problem, what we built, the result and the
// stack, with the cover image the founder designed for it.

export function generateStaticParams() {
  return aiCaseStudies.map((c) => ({ slug: c.slug }));
}

const describe = (summary: string, stack: string[]) => {
  const full = `${summary} Built with ${stack.slice(0, 3).join(", ")}.`;
  return full.length <= 160 ? full : summary;
};

export async function generateMetadata(props: PageProps<"/ai/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const cs = getAiCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.card}: AI Case Study`;
  const description = describe(cs.summary, cs.stack);
  return {
    title,
    description,
    alternates: { canonical: `/ai/case-studies/${cs.slug}` },
    openGraph: { type: "article", title, description, url: `/ai/case-studies/${cs.slug}` },
  };
}

export default async function AiCaseStudyPage(props: PageProps<"/ai/case-studies/[slug]">) {
  const { slug } = await props.params;
  const cs = getAiCaseStudy(slug);
  if (!cs) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "AI automation", path: "/ai" },
    { name: cs.card, path: `/ai/case-studies/${cs.slug}` },
  ];
  const offer = aiOffers.find((o) => o.id === cs.category);
  const sameCategory = aiCaseStudies.filter((c) => c.category === cs.category && c.slug !== cs.slug);
  const others = aiCaseStudies.filter((c) => c.category !== cs.category && c.slug !== cs.slug);
  const more = [...sameCategory, ...others].slice(0, 3);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), aiCaseStudySchema(cs)]} />

      <section className="bg-paper pb-12 pt-28 md:pb-16 md:pt-36">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
            <span className="rounded-full bg-signal px-3 py-1 text-ink">{categoryLabel(cs.category)}</span>
            <span className="rounded-full px-3 py-1 shadow-[inset_0_0_0_1.5px_var(--color-line)]">{cs.industry}</span>
          </div>
          <h1 className="t-h1 mt-6 max-w-[22ch]">{cs.title}</h1>
          <p className="t-lede mt-6 max-w-2xl text-graphite">{cs.summary}</p>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="wrap">
          <div className="relative mx-auto aspect-[4/3] max-w-5xl overflow-hidden rounded-[1.5rem] shadow-[0_0_0_1px_var(--color-line),0_40px_90px_-40px_rgba(0,0,0,0.35)]">
            <Image src={`/ai/${cs.slug}.webp`} alt={`${cs.card}: how the system works, with the tools used`} fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
          </div>
          {cs.stats && (
            <dl className={`mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-8 ${cs.stats.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
              {cs.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-2 border-t border-line pt-4">
                  <dt className="text-sm text-graphite">{s.label}</dt>
                  <dd className="order-first font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-none tracking-tight text-signal-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

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
            </div>
            <div className="rounded-[1.5rem] bg-ink p-8 text-paper md:p-10">
              <h2 className="font-display text-2xl font-bold tracking-tight text-signal">The result</h2>
              <p className="t-lede mt-4">{cs.result}</p>
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-28">
              <div className="rounded-[1.5rem] border border-line p-7">
                <h2 className="font-sans text-sm font-semibold text-graphite">Built with</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cs.stack.map((t) => (
                    <li key={t} className="rounded-full bg-fog px-3 py-1.5 text-[0.95rem] font-medium">{t}</li>
                  ))}
                </ul>
                <h2 className="mt-7 font-sans text-sm font-semibold text-graphite">Industry</h2>
                <p className="mt-1.5 font-medium">{cs.industry}</p>
              </div>
              {offer && (
                <div className="rounded-[1.5rem] bg-fog p-7">
                  <OfferIcon id={offer.id} className="h-8 w-8 text-signal-ink" />
                  <h2 className="mt-4 font-display text-xl font-bold tracking-tight">{offer.title}</h2>
                  <p className="mt-2 text-[0.975rem] text-graphite">{offer.body}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href="/ai#quote" className="btn btn-signal !min-h-11">Get a free audit</Link>
                    <Link href="/ai#services" className="btn btn-ghost !min-h-11">All AI services</Link>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-fog py-20 md:py-24" aria-labelledby="more-case-studies">
        <div className="wrap">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 id="more-case-studies" className="t-h2">More AI case studies</h2>
            <Link href="/ai#case-studies" className="btn btn-ghost shrink-0">All {aiCaseStudies.length} case studies</Link>
          </div>
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((c) => <li key={c.slug}><AiCaseCard cs={c} /></li>)}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Want something like this?"
        body="Tell us where the hours go. You get a free audit and a written plan with one fixed price, with no obligation."
        href="/contact?need=ai"
        label="Get a free audit"
      />
    </>
  );
}
