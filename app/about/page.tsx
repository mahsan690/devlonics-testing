import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Blocks";
import { TestimonialDeck } from "@/components/TestimonialDeck";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Devlonic Solutions",
  description: `Devlonic Solutions is a remote web design and development studio led by ${site.founder.name}, building websites, stores and software for US small businesses.`,
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
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        crumbs={crumbs}
        title="A small studio that builds websites for small businesses."
        lede={`Devlonic Solutions designs and builds websites, online stores, apps and custom software. We're a remote team led by ${site.founder.name}, working with service businesses and ecommerce brands across the US.`}
      />

      <section className="border-t border-line py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="t-h2">Who&apos;s behind it</h2>
          </div>
          <div className="space-y-5 text-[1.125rem] lg:col-span-7">
            <p>
              {site.founder.name} founded Devlonic after {site.yearsExperience} years of building websites and online stores for clients around the world.
              He holds a Top Rated status on Upwork, earned through consistently strong client feedback, and has built for agencies,
              ecommerce brands, home care providers, contractors and startups.
            </p>
            <p>
              The work spans WordPress and WooCommerce sites, Shopify stores, custom Laravel applications and modern Next.js builds,
              plus payment integrations with Stripe, PayPal, Apple Pay and Google Pay. Devlonic brings that experience to small
              businesses that want a website which pays for itself.
            </p>
            <p>
              We work remotely, which keeps our prices lower than a big-city agency. You get one point of contact, calls booked
              in your time zone, and written updates at every stage.
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
