import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHero, WorkTile } from "@/components/Blocks";
import { CaseCard } from "@/components/CaseStudyFeature";
import { JsonLd } from "@/components/JsonLd";
import { caseStudies } from "@/lib/case-studies";
import { projects, reviewScreenshots } from "@/lib/work";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work for Local Service Businesses: Case Studies",
  description:
    "Case studies and websites for local service businesses: a quote funnel and lead flow for Florida Surface Pro, an AI receptionist, sales follow-up and more.",
  alternates: { canonical: "/work" },
};

const crumbs = [{ name: "Home", path: "/" }, { name: "Work", path: "/work" }];

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        crumbs={crumbs}
        title="Work for local service businesses."
        lede="Lead flows, call answering, sales follow-up and websites we've built for contractors, clinics and home services."
      />

      <section className="pb-16 md:pb-20">
        <div className="wrap">
          <h2 className="t-h2">Case studies</h2>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((c, i) => <li key={c.slug}><CaseCard cs={c} priority={i < 3} /></li>)}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-20">
        <div className="wrap">
          <h2 className="t-h2">Websites for service businesses</h2>
          <p className="t-lede mt-4 max-w-2xl text-graphite">Websites we&apos;ve designed and built for contractors, clinics, home care agencies and home services.</p>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => <WorkTile key={p.file} project={p} priority={i < 3} />)}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-fog py-20 md:py-24">
        <div className="wrap">
          <h2 className="t-h2">Reviews from past clients</h2>
          <p className="t-lede mt-4 max-w-2xl text-graphite">
            Screenshots of feedback left on the freelance platforms where many of our projects started. More reviews are on{" "}
            <a href={site.profiles.trustpilot} target="_blank" rel="noopener" className="link text-ink">Trustpilot</a>.
          </p>
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {reviewScreenshots.map((f) => (
              <div key={f} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-paper p-2 shadow-[0_0_0_1px_var(--color-line)]">
                <Image src={`/work/${f}`} alt="Client review screenshot" width={700} height={220} className="h-auto w-full" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Want yours on this page?" />
    </>
  );
}
