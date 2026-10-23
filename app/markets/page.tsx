import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, MarketsGrid, PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Marketing for Local Service Businesses by Industry",
  description:
    "Websites, reviews, Google profiles, lead flows and local ads for HVAC, plumbing, roofing, cleaning, contracting, landscaping, home care and clinics across the US.",
  alternates: { canonical: "/markets" },
};

const crumbs = [{ name: "Home", path: "/" }, { name: "Markets we serve", path: "/markets" }];

export default function MarketsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        crumbs={crumbs}
        title="Marketing built for the way your industry gets customers."
        lede="Websites, reputation management, Google profiles, lead flows and local ads for HVAC companies, plumbers, roofers, cleaning companies, contractors, landscapers, home care agencies and clinics. A homeowner with a burst pipe and a family choosing home care decide differently, so pick your market to see what we build for it."
      />
      <section className="pb-20 md:pb-28">
        <div className="wrap"><MarketsGrid /></div>
      </section>
      <section className="border-t border-line py-20 md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <h2 className="t-h2 lg:col-span-5">Don&apos;t see your industry?</h2>
          <div className="space-y-5 text-[1.125rem] lg:col-span-7">
            <p>
              We build for plenty of businesses that aren&apos;t on this list, from authors and agencies to software companies.
              The approach is the same: understand how your customers decide, then build the site and marketing around that.
            </p>
            <Link href="/contact?industry=other" data-magnetic className="btn btn-signal">Get a quote</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
