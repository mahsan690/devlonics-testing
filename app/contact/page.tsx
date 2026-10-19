import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Blocks";
import { ContactWizard } from "@/components/ContactWizard";
import { QuoteWizard } from "@/components/QuoteWizard";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Fixed Quote for Your Website, Store or AI Project",
  description: `Answer a few quick questions about your project and get a fixed-price quote from Devlonic Solutions within ${site.quoteTurnaround}.`,
  alternates: { canonical: "/contact" },
};

const crumbs = [{ name: "Home", path: "/" }, { name: "Get a quote", path: "/contact" }];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <section className="pb-24 pt-28 md:pt-36">
        {/* Phones: heading, form, then direct contact details. Desktop: form on the right. */}
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <Breadcrumbs items={crumbs} />
            <h1 className="t-h1 mt-6">Get a fixed quote.</h1>
            <p className="t-lede mt-6 text-graphite">
              A few quick questions, then a written plan with scope, price and timeline in your inbox within {site.quoteTurnaround}. No obligation.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <Suspense fallback={<QuoteWizard variant="page" />}>
              <ContactWizard />
            </Suspense>
          </div>
          <div className="lg:col-span-5">
            <div className="space-y-6 border-t border-line pt-8">
              <div>
                <h2 className="font-sans text-sm font-semibold text-graphite">Prefer email?</h2>
                <a href={`mailto:${site.email}`} className="link mt-1 block font-display text-2xl font-bold tracking-tight">{site.email}</a>
              </div>
              <div>
                <h2 className="font-sans text-sm font-semibold text-graphite">Prefer to call or text?</h2>
                <a href={site.phoneHref} className="link mt-1 block font-display text-2xl font-bold tracking-tight">{site.phoneDisplay}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
