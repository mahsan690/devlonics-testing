import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { ServiceStage3D } from "@/components/ServiceStage3D";
import { services } from "@/lib/services";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Web Design Services for Small Businesses",
  description:
    "Web design services for small businesses and ecommerce brands: lead generation websites, Shopify stores, apps, custom software, local SEO and ads. Fixed price.",
  alternates: { canonical: "/services" },
};

const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        crumbs={crumbs}
        title="Web design services for small businesses: websites, Shopify stores, apps and SEO."
        lede="Six services, one team. Pick the one that fits, or tell us what you're trying to achieve and we'll recommend where to start. Every project gets a fixed price before work begins."
      >
        <Link href="/contact?need=unsure" data-magnetic className="btn btn-signal mt-8">Help me choose</Link>
      </PageHero>

      <section className="pb-24">
        <div className="wrap space-y-20 md:space-y-28">
          {services.map((s, i) => (
            <article key={s.slug} className="grid items-center gap-10 border-t border-line pt-12 lg:grid-cols-12">
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
                <h2 className="t-h2">{s.name}</h2>
                <p className="t-lede mt-5 text-graphite">{s.short}</p>
                <ul className="ray-list mt-6 space-y-2.5">
                  {s.included.slice(0, 4).map((x) => <li key={x}>{x}</li>)}
                </ul>
                <p className="mt-6 text-sm text-graphite">{s.timeline}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={`/services/${s.slug}`} className="btn btn-ink">Explore {s.name.toLowerCase()}</Link>
                  <Link href={`/contact?need=${s.wizardChoice}`} className="btn btn-ghost">Get a quote</Link>
                </div>
              </div>
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1" : ""}`}>
                <ServiceStage3D active={s.slug} label={s.name} showLabel={false} className="aspect-[4/3]" />
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Not sure which service you need?" body="Tell us what you're trying to achieve. We'll recommend the simplest way to get there, with a fixed price." />
    </>
  );
}
