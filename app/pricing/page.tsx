import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Blocks";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { pricingFaqs } from "@/lib/faqs";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Design Pricing: Fixed Quotes",
  description: `How much a website costs, what drives the price, and how Devlonic quotes websites, Shopify stores and software: a fixed price in writing within ${site.quoteTurnaround}.`,
  alternates: { canonical: "/pricing" },
};

const crumbs = [{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }];

const factors = [
  { title: "How many pages and templates", body: "A one-page landing site and a 30-page service business site are different jobs. More unique layouts mean more design and build time." },
  { title: "What the site needs to do", body: "Online booking, payments, customer accounts, quote calculators and memberships each add work." },
  { title: "Connections to other tools", body: "Linking your CRM, booking calendar, accounting software or inventory system takes setup and testing." },
  { title: "Content you have, and content you need", body: "If you have copy and photos ready, it costs less. If we write the words or source images, that's included in the quote." },
  { title: "Support after launch", body: "Hosting, updates, backups and ongoing edits are optional and priced separately as a monthly care plan." },
];

const shapes = [
  { name: "Landing page", fits: "One offer, one goal: an ad campaign, a launch or a single service.", time: "Typically 1 to 2 weeks" },
  { name: "Business website", fits: "A full multi-page site with service pages, area pages and lead capture.", time: "Typically 3 to 6 weeks" },
  { name: "Online store", fits: "Shopify or WooCommerce with catalog, checkout, shipping and tracking.", time: "Typically 4 to 8 weeks" },
  { name: "App or custom software", fits: "Portals, CRMs, booking systems and apps, scoped and built in phases.", time: "Scoped per phase" },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(pricingFaqs)]} />
      <PageHero
        crumbs={crumbs}
        title="Website design pricing: one fixed price, agreed before we start."
        lede={`No hourly billing and no surprise invoices. Tell us what you need and you'll get a written quote with scope, price and timeline within ${site.quoteTurnaround}.`}
      >
        <Link href="/contact" className="btn btn-signal mt-8">Get my quote</Link>
      </PageHero>

      <section className="border-t border-line py-16 md:py-20" aria-labelledby="cost">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <h2 id="cost" className="t-h2 lg:col-span-5">How much does a website cost?</h2>
          <div className="lg:col-span-7">
            <p className="t-lede">
              Pricing guides published in 2026 put freelancer-built small business websites at roughly $500 to $5,000 and agency
              builds at about $5,000 to $15,000. Online stores typically run from about $3,000 to $25,000 or more, and custom
              platforms higher still. Running costs add roughly $10 to $200 a month for hosting, a domain and any subscriptions.
            </p>
            <p className="mt-5 text-graphite">
              Sources: <a href="https://www.levitate.ai/blog-posts/average-website-design-cost-for-small-businesses-in-2026" target="_blank" rel="noopener" className="link">Levitate</a> and{" "}
              <a href="https://www.wd-strategies.com/articles/how-much-does-a-website-cost-in-2026" target="_blank" rel="noopener" className="link">WD Strategies</a>, February 2026.
              Read our full guide: <Link href="/blog/how-much-does-a-small-business-website-cost" className="link text-ink">How much does a small business website cost?</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="t-h2">What sets the price</h2>
            <p className="mt-5 text-graphite">Five things decide most of the cost. Knowing them helps you decide what to build now and what can wait.</p>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-8">
            {factors.map((f) => (
              <li key={f.title} className="grid gap-2 py-6 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-8">
                <h3 className="t-h3">{f.title}</h3>
                <p className="text-graphite">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="wrap">
          <h2 className="t-h2 max-w-3xl">Most projects fall into one of four shapes</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] bg-white/15 md:grid-cols-2">
            {shapes.map((s) => (
              <div key={s.name} className="bg-ink p-8">
                <h3 className="font-display text-3xl font-bold tracking-tight">{s.name}</h3>
                <p className="mt-3 text-ash">{s.fits}</p>
                <p className="mt-6 text-sm font-semibold text-signal">{s.time}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-ash">
            Timelines start once the design is approved and depend on how quickly content and feedback come back.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <h2 className="t-h2 lg:col-span-4">Pricing questions</h2>
          <div className="lg:col-span-8"><FaqList faqs={pricingFaqs} /></div>
        </div>
      </section>

      <CtaBand title="Get your number." body="Answer a few questions and we'll send a fixed price in writing. No call needed unless you'd like one." />
    </>
  );
}
