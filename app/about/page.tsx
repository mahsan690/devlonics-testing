import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Blocks";
import { TestimonialDeck } from "@/components/TestimonialDeck";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Devlonic Solutions and Muhammad Ahsan",
  description: `Devlonic Solutions is a remote web design and Shopify studio led by ${site.founder.name}, a Top Rated developer with ${site.yearsExperience} years' experience and ${site.projectsDelivered} sites built.`,
  alternates: { canonical: "/about" },
};

const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];

const principles = [
  { title: "A fixed price, in writing", body: "You know the cost and the timeline before anything starts. No hourly meter running in the background." },
  { title: "Plain English", body: "We explain what we're doing and why, without jargon. You'll never need to decode an update." },
  { title: "You own everything", body: "Your domain, hosting, content and code stay in your name. If you ever leave, you take it all with you." },
  { title: "Built to be measured", body: "Every site launches with tracking, so you can see the calls, leads and sales it brings in." },
];

const skills = [
  "WordPress", "Elementor", "Divi", "WP Bakery", "WooCommerce", "Shopify / Liquid", "Laravel / PHP",
  "Next.js", "Tailwind CSS", "GSAP", "Stripe", "PayPal", "Apple Pay & Google Pay", "Local SEO",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), personSchema()]} />
      <PageHero
        crumbs={crumbs}
        title="About Devlonic: a web design studio for service businesses and Shopify brands."
        lede={`Devlonic Solutions designs and builds websites, online stores, apps and custom software. We're a remote team led by ${site.founder.name}, working with service businesses and ecommerce brands across the US.`}
      />

      <section id="founder" className="scroll-mt-24 border-t border-line py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="t-h2">Who&apos;s behind it</h2>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-1 border-t border-line pt-4">
                <dt className="text-sm text-graphite">years building websites</dt>
                <dd className="order-first font-display text-4xl font-bold tracking-tight text-signal-ink">{site.yearsExperience}</dd>
              </div>
              <div className="flex flex-col gap-1 border-t border-line pt-4">
                <dt className="text-sm text-graphite">websites and stores built</dt>
                <dd className="order-first font-display text-4xl font-bold tracking-tight text-signal-ink">{site.projectsDelivered}</dd>
              </div>
            </dl>
          </div>
          <div className="space-y-5 text-[1.125rem] lg:col-span-7">
            <p>
              {site.founder.name} founded Devlonic after {site.yearsExperience} years of building websites and online stores, more than{" "}
              {site.projectsDelivered.replace("+", "")} of them, for clients in the US, UK, UAE and Australia. He holds Top Rated status on Upwork,
              earned through consistently strong client feedback, and has built for home care agencies, cleaning companies, contractors,
              real estate, fashion and fragrance brands, agencies and startups.
            </p>
            <p>
              The work spans WordPress and WooCommerce sites, Shopify stores, custom Laravel applications and modern Next.js builds,
              plus payment integrations with Stripe, PayPal, Apple Pay and Google Pay. Devlonic brings that experience to small
              businesses that want a website which pays for itself.
            </p>
            <p>
              Every project follows the same process: a written plan, design approval, a build on a private staging site, then launch,
              a recorded walkthrough so your team can run the site, and {site.freeFixesDays} days of free fixes. We work remotely, which keeps
              prices lower than a big-city agency, with one point of contact and calls booked in your time zone.
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <a href={site.founder.linkedin} className="btn btn-ink" target="_blank" rel="noopener">{site.founder.name} on LinkedIn</a>
              <a href={site.profiles.upwork} className="btn btn-ghost" target="_blank" rel="noopener">Upwork profile</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="wrap">
          <h2 className="t-h2">How we work</h2>
          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <div key={p.title} className="border-t-2 border-signal pt-6">
                <h3 className="t-h3">{p.title}</h3>
                <p className="mt-3 text-ash">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <h2 className="t-h2 lg:col-span-4">Tools we build with</h2>
          <ul className="flex flex-wrap gap-2.5 lg:col-span-8">
            {skills.map((s) => (
              <li key={s} className="rounded-full border-[1.5px] border-line px-4 py-2 font-medium">{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-fog py-20 md:py-28">
        <div className="wrap">
          <TestimonialDeck />
          <Link href="/work" className="btn btn-ghost mt-12">See our work</Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
