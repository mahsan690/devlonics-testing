import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyFeature } from "@/components/CaseStudyFeature";
import { CtaBand, WorkTile } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { caseStudy, projectsFor } from "@/lib/work";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Gladiolaz Case Study: Shopify Rebuild and TikTok Ads",
  description:
    "How we relaunched Gladiolaz, a hair and wig Shopify brand: store rebuild, AutoDS dropshipping with Amazon and Alibaba suppliers, AI video ads and TikTok ads at $20 a day. About 10 orders in the first 15 days.",
  alternates: { canonical: `/work/${caseStudy.slug}` },
  openGraph: { images: [{ url: `/work/${caseStudy.image}`, width: 1000, height: 847, alt: "Gladiolaz Shopify store" }] },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: "Gladiolaz case study", path: `/work/${caseStudy.slug}` },
];

export default function GladiolazCaseStudy() {
  const more = projectsFor(["store"], 4).filter((p) => p.file !== caseStudy.image).slice(0, 3);
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), caseStudySchema(caseStudy)]} />
      <CaseStudyFeature standalone />

      <section className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="t-h2">The challenge</h2>
          </div>
          <p className="t-lede text-graphite lg:col-span-8">{caseStudy.challenge}</p>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="wrap">
          <h2 className="t-h2">What we did</h2>
          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {caseStudy.work.map((w) => (
              <div key={w.title} className="border-t-2 border-signal pt-6">
                <h3 className="t-h3">{w.title}</h3>
                <p className="mt-3 text-graphite">{w.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm text-graphite">
            Tools: {caseStudy.stack.join(", ")}. Return on ad spend is revenue from the campaign divided by ad spend over the same 15 days.
          </p>
        </div>
      </section>

      {more.length > 0 && (
        <section className="bg-fog py-20 md:py-28">
          <div className="wrap">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="t-h2">More Shopify work</h2>
              <Link href="/markets/ecommerce" className="btn btn-ghost shrink-0">Shopify and ecommerce</Link>
            </div>
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => <WorkTile key={p.file} project={p} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Want results like these for your store?"
        body="Tell us about your products and goals. You'll get a written plan for the store and the ads, with a fixed price."
        href="/contact?need=store&industry=retail"
        label="Grow my Shopify store"
      />
    </>
  );
}
