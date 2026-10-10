import type { Metadata } from "next";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { ServiceIndex } from "@/components/ServiceIndex";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { CaseStudyFeature } from "@/components/CaseStudyFeature";
import { TestimonialDeck } from "@/components/TestimonialDeck";
import { ClientMarquee, CtaBand, MarketsGrid, SectionHead, WorkTile } from "@/components/Blocks";
import { services } from "@/lib/services";
import { projects } from "@/lib/work";
import { homeFaqs } from "@/lib/faqs";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <HomeHero />
      <ClientMarquee />

      <CaseStudyFeature />

      <section className="py-20 md:py-28" aria-labelledby="what-we-build">
        <div className="wrap">
          <div id="what-we-build">
            <SectionHead
              title="What we build"
              lede="Six ways we help businesses get more customers online. Each one has its own model: drag it to spin."
            />
          </div>
          <div className="mt-12">
            <ServiceIndex items={services} />
          </div>
        </div>
      </section>

      <section className="bg-fog py-20 md:py-28" aria-labelledby="recent-work">
        <div className="wrap">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div id="recent-work"><SectionHead title="Recent work" lede="A few of the Shopify and WordPress projects we've delivered this year." /></div>
            <Link href="/work" className="btn btn-ghost shrink-0">See all projects</Link>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
            {featured.map((p, i) => <WorkTile key={p.file} project={p} large priority={i < 2} />)}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="how-it-works">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28" id="how-it-works">
              <SectionHead title="How it works" lede="From a two-minute form to a website that brings in work. You know the price and the timeline before anything starts." />
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
                lede="Each industry has its own customers, questions and buying habits. We build for the way yours actually buys."
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

      <section className="py-20 md:py-28" aria-labelledby="faq">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4" id="faq">
            <SectionHead title="Common questions" />
            <p className="mt-5 text-graphite">
              Something else on your mind? <Link href="/contact" className="link text-ink">Ask us directly</Link>.
            </p>
          </div>
          <div className="lg:col-span-8"><FaqList faqs={homeFaqs} /></div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
