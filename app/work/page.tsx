import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHero, WorkTile } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { projects, caseStudy, reviewScreenshots } from "@/lib/work";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Work: Websites, Online Stores & Apps",
  description:
    "Websites, Shopify and WooCommerce stores, dashboards and apps designed and built by Devlonic Solutions for small businesses, agencies and brands.",
  alternates: { canonical: "/work" },
};

const crumbs = [{ name: "Home", path: "/" }, { name: "Work", path: "/work" }];

const groups = [
  { title: "Service businesses", tags: ["services", "health"] },
  { title: "Online stores", tags: ["store"] },
  { title: "Brands and agencies", tags: ["brand"] },
  { title: "Apps and software", tags: ["app", "software"] },
] as const;

export default function WorkPage() {
  const shown = new Set<string>();
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        crumbs={crumbs}
        title="Work we've designed and built."
        lede="Websites, online stores, dashboards and apps for small businesses, agencies and brands. Every one designed from scratch for the business it serves."
      />

      <section className="pb-8">
        <div className="wrap">
          <article className="grid gap-8 rounded-[1.75rem] bg-ink p-8 text-paper md:grid-cols-12 md:p-12">
            <div className="md:col-span-6">
              <p className="text-ash">Case study: {caseStudy.name}</p>
              <h2 className="t-h2 mt-3">Bringing a Shopify brand back to life.</h2>
              <p className="mt-5 text-ash">{caseStudy.summary}</p>
            </div>
            <dl className="grid grid-cols-3 gap-4 self-end md:col-span-6">
              {caseStudy.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-2 border-t border-white/20 pt-4">
                  <dt className="text-sm text-ash">{s.label}</dt>
                  <dd className="order-first font-display text-[clamp(1.75rem,3.4vw,3rem)] font-bold leading-none tracking-tight text-signal">{s.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </section>

      {groups.map((g) => {
        const list = projects.filter((p) => !shown.has(p.file) && p.tags.some((t) => (g.tags as readonly string[]).includes(t)));
        list.forEach((p) => shown.add(p.file));
        if (!list.length) return null;
        return (
          <section key={g.title} className="py-16 md:py-20">
            <div className="wrap">
              <h2 className="t-h2">{g.title}</h2>
              <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => <WorkTile key={p.file} project={p} />)}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-fog py-20 md:py-24">
        <div className="wrap">
          <h2 className="t-h2">Reviews from past clients</h2>
          <p className="t-lede mt-4 max-w-2xl text-graphite">Screenshots of feedback left on the freelance platforms where many of our projects started.</p>
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {reviewScreenshots.map((f) => (
              <div key={f} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-paper p-2 shadow-[0_0_0_1px_var(--color-line)]">
                <Image src={`/work/${f}`} alt="Client review screenshot" width={700} height={220} className="h-auto w-full" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Want yours on this page?" />
    </>
  );
}
