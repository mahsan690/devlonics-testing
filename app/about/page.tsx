import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Blocks";
import { TestimonialDeck } from "@/components/TestimonialDeck";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Devlonic Solutions and Muhammad Ahsan",
  description: `Devlonic Solutions helps US local service businesses get more calls and booked jobs. Led by ${site.founder.name}, a Top Rated developer with ${site.yearsExperience} years' experience.`,
  alternates: { canonical: "/about" },
};

const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];

const principles = [
  { title: "A fixed price, in writing", body: "You know the cost and the timeline before anything starts. No hourly meter running in the background." },
  { title: "Plain English", body: "We explain what we're doing and why, without jargon. You'll never need to decode an update." },
  { title: "You own everything", body: "Your domain, hosting, content and code stay in your name. If you ever leave, you take it all with you." },
  { title: "Built to be measured", body: "Everything we set up is tracked, so you can see the calls, leads, reviews and booked jobs it brings in." },
];

const skills = [
  "WordPress", "Elementor", "Next.js", "Google Business Profile", "Local SEO", "Google Local Services Ads", "Google Ads",
  "Meta Ads", "Google Analytics 4", "Call tracking", "Builder Prime", "HubSpot", "Zapier", "n8n",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), personSchema()]} />
      <PageHero
        crumbs={crumbs}
        title="About Devlonic: marketing for local service businesses across the US."
        lede={`Devlonic Solutions helps contractors, home services and clinics get more calls and booked jobs: websites, reviews, Google profiles, lead flows and local ads. We're a remote team led by ${site.founder.name}.`}
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
                <dt className="text-sm text-graphite">websites built</dt>
                <dd className="order-first font-display text-4xl font-bold tracking-tight text-signal-ink">{site.projectsDelivered}</dd>
              </div>
            </dl>
          </div>
          <div className="space-y-5 text-[1.125rem] lg:col-span-7">
            <p>
              {site.founder.name} founded Devlonic after {site.yearsExperience} years of building websites, more than{" "}
              {site.projectsDelivered.replace("+", "")} of them, for clients in the US, UK, UAE and Australia. He holds Top Rated status on Upwork,
              earned through consistently strong client feedback, and has built for home care agencies, clinics, cleaning companies,
              landscapers, contractors and homebuilders.
            </p>
            <p>
              Devlonic now works only with local service businesses, because their problems are specific: calls that ring out on job
              sites, leads that sit in an inbox, too few recent reviews and a Google profile nobody looks after. Our work for Florida
              Surface Pro, a floor coating contractor, shows the approach: a quote funnel on their own site that sends every lead to their
              email, a Google Sheet and their CRM within seconds.
            </p>
            <p>
              Every project follows the same process: a written plan with a fixed price, approval, a build on a private staging site,
              then launch, a recorded walkthrough so your team can run it, and {site.freeFixesDays} days of free fixes. We work remotely, which keeps
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
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/work/florida-surface-pro" className="btn btn-ink">Read the Florida Surface Pro case study</Link>
            <Link href="/work" className="btn btn-ghost">See our work</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
