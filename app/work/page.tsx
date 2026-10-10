import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero, WorkTile } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { CountUp } from "@/components/CountUp";
import { projects, caseStudy, reviewScreenshots } from "@/lib/work";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work: Shopify Stores, WordPress Sites and Apps",
  description:
    "Shopify stores, WordPress websites, apps and dashboards by Devlonic Solutions for service businesses, ecommerce brands and agencies, including our Gladiolaz Shopify case study.",
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
  const thisYear = projects.filter((p) => p.year === 2026);
  const earlier = projects.filter((p) => p.year !== 2026);
  const shown = new Set<string>();

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        crumbs={crumbs}
        title="Our work."
        lede="Shopify stores, WordPress websites, apps and dashboards for service businesses, ecommerce brands and agencies."
      />

      <section className="pb-8">
        <div className="wrap">
          <Link
            href={`/work/${caseStudy.slug}`}
            data-tilt
            className="group grid gap-8 overflow-hidden rounded-[1.75rem] bg-ink p-8 text-paper md:grid-cols-12 md:p-12"
          >
            <div className="md:col-span-6">
              <span className="inline-block rounded-full bg-signal px-3 py-1 text-sm font-semibold text-ink">Shopify case study</span>
              <h2 className="t-h2 mt-5">{caseStudy.headline}</h2>
              <p className="mt-5 text-ash">{caseStudy.summary}</p>
              <span className="mt-6 inline-block font-semibold underline decoration-signal decoration-2 underline-offset-4 group-hover:text-signal">
                Read the case study
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-4 self-end md:col-span-6">
              {caseStudy.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-2 border-t border-white/20 pt-4">
                  <dt className="text-sm text-ash">{s.label}</dt>
                  <dd className="order-first font-display text-[clamp(1.75rem,3.4vw,3rem)] font-bold leading-none tracking-tight text-signal">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="wrap">
          <h2 className="t-h2">This year</h2>
          <p className="t-lede mt-4 max-w-2xl text-graphite">Shopify and WordPress projects from 2026.</p>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {thisYear.map((p, i) => <WorkTile key={p.file} project={p} priority={i < 3} />)}
          </div>
        </div>
      </section>

      {groups.map((g) => {
        const list = earlier.filter((p) => !shown.has(p.file) && p.tags.some((t) => (g.tags as readonly string[]).includes(t)));
        list.forEach((p) => shown.add(p.file));
        if (!list.length) return null;
        return (
          <section key={g.title} className="border-t border-line py-16 md:py-20">
            <div className="wrap">
              <h2 className="t-h2">{g.title}</h2>
              <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => <WorkTile key={p.file} project={p} />)}
              </div>
            </div>
          </section>
        );
      })}

      <section id="reviews" className="bg-fog py-20 md:py-24">
        <div className="wrap">
          <h2 className="t-h2">Reviews from past clients</h2>
          <p className="t-lede mt-4 max-w-2xl text-graphite">
            Screenshots of feedback left on the freelance platforms where many of our projects started. More reviews are on{" "}
            <a href={site.profiles.trustpilot} target="_blank" rel="noopener" className="link text-ink">Trustpilot</a>.
          </p>
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
