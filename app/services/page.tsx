import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, WorkTile } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/lib/services";
import { projectsFor } from "@/lib/work";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Web Design, Online Stores, Apps & SEO Services",
  description:
    "Websites, Shopify and WooCommerce stores, apps, custom software and local SEO for small businesses in New Jersey, Texas and Florida. Fixed price, agreed up front.",
  alternates: { canonical: "/services" },
};

const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        crumbs={crumbs}
        title="Everything a small business needs to win online."
        lede="Pick the service that fits, or tell us what you're trying to achieve and we'll recommend where to start. Every project gets a fixed price before work begins."
      >
        <Link href="/contact?need=unsure" className="btn btn-signal mt-8">Help me choose</Link>
      </PageHero>

      <section className="pb-24">
        <div className="wrap space-y-20 md:space-y-28">
          {services.map((s, i) => {
            const p = projectsFor(s.workTags, 1)[0];
            return (
              <article key={s.slug} className="grid items-center gap-10 border-t border-line pt-12 lg:grid-cols-12">
                <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
                  <h2 className="t-h2">{s.name}</h2>
                  <p className="t-lede mt-5 text-graphite">{s.short}</p>
                  <ul className="ray-list mt-6 space-y-2.5">
                    {s.included.slice(0, 4).map((x) => <li key={x}>{x}</li>)}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={`/services/${s.slug}`} className="btn btn-ink">About {s.name.toLowerCase()}</Link>
                    <Link href={`/contact?need=${s.wizardChoice}`} className="btn btn-ghost">Get a quote</Link>
                  </div>
                </div>
                <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1" : ""}`}>{p && <WorkTile project={p} />}</div>
              </article>
            );
          })}
        </div>
      </section>
      <CtaBand title="Not sure what you need?" body="Tell us what you're trying to achieve. We'll recommend the simplest way to get there, with a fixed price." />
    </>
  );
}
