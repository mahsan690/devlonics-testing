import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, MarketsGrid, PageHero, WorkTile } from "@/components/Blocks";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { getService, services } from "@/lib/services";
import { projectsFor } from "@/lib/work";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: `/services/${s.slug}` },
  };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const s = getService(slug);
  if (!s) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.name, path: `/services/${s.slug}` },
  ];
  const work = projectsFor(s.workTags, 3);
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(s), faqSchema(s.faqs)]} />
      <PageHero crumbs={crumbs} title={s.heroTitle} lede={s.heroLede}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/contact?need=${s.wizardChoice}`} className="btn btn-signal">Get a quote</Link>
          <Link href="/work" className="btn btn-ghost">See our work</Link>
        </div>
      </PageHero>

      <section className="border-t border-line py-20 md:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="t-h2">Who it&apos;s for</h2>
            <ul className="ray-list mt-8 space-y-3.5 text-[1.0625rem]">
              {s.forWho.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <h2 className="t-h2">What&apos;s included</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {s.included.map((x) => <li key={x} className="py-4">{x}</li>)}
            </ul>
            <p className="mt-6 text-sm text-graphite">Built with: {s.stack.join(", ")}</p>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="wrap">
          <h2 className="t-h2 max-w-3xl">How we make it work</h2>
          <div className={`mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 ${s.approach.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {s.approach.map((a) => (
              <div key={a.title} className="border-t-2 border-signal pt-6">
                <h3 className="t-h3">{a.title}</h3>
                <p className="mt-3 text-ash">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {work.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="wrap">
            <h2 className="t-h2">Related work</h2>
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {work.map((p) => <WorkTile key={p.file} project={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <h2 className="t-h2 lg:col-span-4">Questions about {s.name.toLowerCase()}</h2>
          <div className="lg:col-span-8"><FaqList faqs={s.faqs} /></div>
        </div>
      </section>

      <section className="bg-fog py-20 md:py-24">
        <div className="wrap">
          <h2 className="t-h2">Markets we build {s.name.toLowerCase()} for</h2>
          <p className="t-lede mt-4 max-w-2xl text-graphite">Industry-specific features, copy and examples for each market.</p>
          <div className="mt-10"><MarketsGrid compact /></div>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap">
          <h2 className="font-sans text-sm font-semibold text-graphite">Other services</h2>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="font-display text-2xl font-bold tracking-tight hover:text-signal-ink">{o.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`Get a fixed quote for ${s.name.toLowerCase()}.`} href={`/contact?need=${s.wizardChoice}`} />
    </>
  );
}
