import type { Metadata } from "next";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { ServiceIndex } from "@/components/ServiceIndex";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ClientMarquee, CtaBand, SectionHead, StatesGrid, TestimonialsBlock, WorkTile } from "@/components/Blocks";
import { services } from "@/lib/services";
import { projects, projectsFor, caseStudy } from "@/lib/work";
import { homeFaqs } from "@/lib/faqs";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const serviceItems = services.map((s) => ({ service: s, project: projectsFor(s.workTags, 1)[0] }));
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <HomeHero />
      <ClientMarquee />

      <section className="py-20 md:py-28" aria-labelledby="what-we-build">
        <div className="wrap">
          <div id="what-we-build">
            <SectionHead
              title="What we build"
              lede="Six ways we help small businesses get more customers online. Most clients start with one and add the rest as they grow."
            />
          </div>
          <div className="mt-12">
            <ServiceIndex items={serviceItems} />
          </div>
        </div>
      </section>

      <section className="bg-fog py-20 md:py-28" aria-labelledby="recent-work">
        <div className="wrap">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div id="recent-work"><SectionHead title="Recent work" lede="Sites and stores we've designed and built for businesses like yours." /></div>
            <Link href="/work" className="btn btn-ghost shrink-0">See all projects</Link>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
            {featured.map((p, i) => <WorkTile key={p.file} project={p} large priority={i < 2} />)}
          </div>

          <article className="mt-16 grid gap-8 rounded-[1.75rem] bg-ink p-8 text-paper md:grid-cols-12 md:p-12">
            <div className="md:col-span-6">
              <h3 className="t-h2">Bringing a Shopify brand back to life.</h3>
              <p className="mt-5 text-ash">{caseStudy.summary}</p>
            </div>
            <dl className="grid grid-cols-3 gap-4 self-end md:col-span-6">
              {caseStudy.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-2 border-t border-white/20 pt-4">
                  <dt className="text-sm text-ash">{s.label}</dt>
                  <dd className="order-first font-display text-[clamp(1.75rem,3.4vw,3rem)] font-bold leading-none tracking-tight text-signal">{s.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="how-it-works">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28" id="how-it-works">
              <SectionHead title="How it works" lede="From a two-minute form to a website that brings in work. You know the price and the timeline before anything starts." />
              <Link href="/contact" className="btn btn-signal mt-8">Start with the form</Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28" aria-labelledby="where-we-work">
        <div className="wrap">
          <div id="where-we-work">
            <SectionHead
              title="Where we work"
              lede="We build for businesses anywhere in the US, with dedicated local SEO research for three states."
            />
          </div>
          <div className="mt-12"><StatesGrid /></div>
        </div>
      </section>

      <section className="bg-fog py-20 md:py-28" aria-labelledby="what-clients-say">
        <div className="wrap">
          <div id="what-clients-say"><SectionHead title="What clients say" /></div>
          <div className="mt-12"><TestimonialsBlock /></div>
        </div>
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
