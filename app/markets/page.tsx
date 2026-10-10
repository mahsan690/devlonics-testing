import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, MarketsGrid, PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Markets We Serve: Websites for Service Businesses and Shopify Brands",
  description:
    "Websites and marketing for HVAC, plumbing, roofing, cleaning, contracting, landscaping, home care and clinics, and ecommerce and Shopify brands across the US.",
  alternates: { canonical: "/markets" },
};

const crumbs = [{ name: "Home", path: "/" }, { name: "Markets we serve", path: "/markets" }];

export default function MarketsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        crumbs={crumbs}
        title="Websites built for the way your industry buys."
        lede="A homeowner with a burst pipe, a family choosing home care and a shopper comparing jewelry all decide differently. Pick your market to see what we build for it."
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
