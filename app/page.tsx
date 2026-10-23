import type { Metadata } from "next";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { ServiceIndex } from "@/components/ServiceIndex";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { CaseCard, CaseStudyFeature } from "@/components/CaseStudyFeature";
import { GrowthSystem } from "@/components/GrowthSystem";
import { TestimonialDeck } from "@/components/TestimonialDeck";
import { ClientMarquee, CtaBand, MarketsGrid, SectionHead, WorkTile } from "@/components/Blocks";
import { PostCard } from "@/components/BlogParts";
import { allPosts } from "@/lib/blog";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/case-studies";
import { projects } from "@/lib/work";
import { homeFaqs } from "@/lib/faqs";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const latest = allPosts.slice(0, 3);
  const moreCases = caseStudies.filter((c) => c.featured && c.slug !== "florida-surface-pro");

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <HomeHero />
      <ClientMarquee />

      <GrowthSystem />

      <CaseStudyFeature />

      <section className="py-20 md:py-28" aria-labelledby="what-we-do">
        <div className="wrap">
          <div id="what-we-do">
            <SectionHead
              title="Marketing services for local service businesses"
              lede="Six services that get a local business found, chosen and called: websites, reviews, your Google profile, lead flows, local ads and a few smart automations. Each one has its own model: drag it to spin."
            />
          </div>
          <div className="mt-12">
            <ServiceIndex items={services} />
          </div>
        </div>
      </section>

      <section className="bg-fog py-20 md:py-28" aria-labelledby="results">
        <div className="wrap">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div id="results"><SectionHead title="More work for service businesses" lede="Call answering, sales follow-up and websites we've built for contractors, clinics and home services." /></div>
            <Link href="/work" className="btn btn-ghost shrink-0">See all work</Link>
          </div>
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {moreCases.map((c) => <li key={c.slug}><CaseCard cs={c} /></li>)}
          </ul>
          <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => <WorkTile key={p.file} project={p} priority={i < 2} />)}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="how-it-works">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28" id="how-it-works">
              <SectionHead title="How it works" lede="From a two-minute form to more calls and booked jobs. You know the price and the timeline before anything starts." />
              <Link href="/contact" data-magnetic className="btn btn-signal mt-8">Start with the form</Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28" aria-labelledby="markets-we-serve">
        <div className="wrap">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div id="markets-we-serve">
              <SectionHead
                title="Markets we serve"
                lede="HVAC, plumbing, roofing, cleaning, contractors, landscaping, home care and clinics. Each trade wins customers differently, so we build for the way yours does."
              />
            </div>
            <Link href="/markets" className="btn btn-ghost shrink-0">All markets</Link>
          </div>
          <div className="mt-12"><MarketsGrid /></div>
        </div>
      </section>

      <section className="bg-fog py-20 md:py-28">
        <div className="wrap"><TestimonialDeck /></div>
      </section>

      {latest.length > 0 && (
        <section className="border-t border-line py-20 md:py-28" aria-labelledby="from-the-blog">
          <div className="wrap">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div id="from-the-blog">
                <SectionHead title="Guides for local service businesses" lede="Straight answers on reviews, Google Maps, leads, ads and websites, plus the problems service businesses are facing right now." />
              </div>
              <Link href="/blog" className="btn btn-ghost shrink-0">All guides</Link>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {latest.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="bg-fog py-20 md:py-28" aria-labelledby="faq">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4" id="faq">
            <SectionHead title="Questions, answered" />
            <p className="mt-5 text-graphite">
              Something else on your mind? <Link href="/contact" className="link text-ink">Ask us directly</Link>.
            </p>
          </div>
          <div className="lg:col-span-8"><FaqList faqs={homeFaqs} /></div>
        </div>
      </section>

      <CtaBand title="Get more calls from your area." body="A few quick questions, then a written plan with scope, price and timeline. No obligation." />
    </>
  );
}
