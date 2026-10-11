import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand, MarketIcon, WorkTile } from "@/components/Blocks";
import { PostCard } from "@/components/BlogParts";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ServiceStage3D } from "@/components/ServiceStage3D";
import { getService, services } from "@/lib/services";
import { getMarket, type Market } from "@/lib/markets";
import { postsBySlugs } from "@/lib/blog";
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
  const relatedMarkets = s.relatedMarkets.map(getMarket).filter((m): m is Market => Boolean(m));
  const guides = postsBySlugs(s.relatedPosts);
  const faqs = [s.answer, ...s.faqs];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(s), faqSchema(faqs)]} />

      <section className="bg-paper pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Breadcrumbs items={crumbs} />
            <h1 className="t-h1 mt-6 max-w-[20ch]">{s.heroTitle}</h1>
            <p className="t-lede mt-6 max-w-2xl text-graphite">{s.heroLede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/contact?need=${s.wizardChoice}`} data-magnetic className="btn btn-signal">Get a fixed quote</Link>
              <Link href="/work" className="btn btn-ghost">See our work</Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ServiceStage3D active={s.slug} label={s.name} showLabel={false} className="aspect-[4/3] lg:aspect-square" />
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-20" aria-labelledby="answer">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <h2 id="answer" className="t-h2 lg:col-span-5">{s.answer.q}</h2>
          <div className="lg:col-span-7">
            <p className="t-lede">{s.answer.a}</p>
            <p className="mt-5 text-graphite">{s.timeline}</p>
          </div>
        </div>
      </section>

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
          <h2 className="t-h2 lg:col-span-4">{s.name}: common questions</h2>
          <div className="lg:col-span-8"><FaqList faqs={s.faqs} /></div>
        </div>
      </section>

      {relatedMarkets.length > 0 && (
        <section className="bg-fog py-20 md:py-24">
          <div className="wrap">
            <h2 className="t-h2">Industries we build this for</h2>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedMarkets.map((m) => (
                <li key={m.slug}>
                  <Link href={`/markets/${m.slug}`} className="flex h-full items-start gap-4 rounded-[1.25rem] bg-paper p-6 hover:ring-1 hover:ring-ink">
                    <MarketIcon icon={m.icon} className="h-8 w-8 shrink-0 text-signal" />
                    <span>
                      <span className="block font-display text-lg font-bold tracking-tight">{m.keyword.charAt(0).toUpperCase() + m.keyword.slice(1)}</span>
                      <span className="mt-1 block text-sm text-graphite">{m.short}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {guides.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="wrap">
            <h2 className="t-h2">Guides</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line py-16">
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
