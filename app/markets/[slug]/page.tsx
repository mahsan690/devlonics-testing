import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand, MarketIcon, MarketsGrid, WorkTile } from "@/components/Blocks";
import { FaqList } from "@/components/FaqList";
import { PostCard } from "@/components/BlogParts";
import { JsonLd } from "@/components/JsonLd";
import { TestimonialDeck } from "@/components/TestimonialDeck";
import { getMarket, markets } from "@/lib/markets";
import { marketGrowth } from "@/lib/market-growth";
import { getService, type Service } from "@/lib/services";
import { postsBySlugs } from "@/lib/blog";
import { projectsFor } from "@/lib/work";
import { breadcrumbSchema, faqSchema, marketServiceSchema } from "@/lib/schema";

// "HVAC companies" stays as is; other names start lower-case mid-sentence.
const lower = (name: string) => (name.startsWith("HVAC") ? name : name.charAt(0).toLowerCase() + name.slice(1));

export function generateStaticParams() {
  return markets.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(props: PageProps<"/markets/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const m = getMarket(slug);
  if (!m) return {};
  const path = `/markets/${m.slug}`;
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { canonical: path },
    openGraph: { title: m.metaTitle, description: m.metaDescription, url: path },
  };
}

export default async function MarketPage(props: PageProps<"/markets/[slug]">) {
  const { slug } = await props.params;
  const m = getMarket(slug);
  if (!m) notFound();

  const path = `/markets/${m.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Markets we serve", path: "/markets" },
    { name: m.name, path },
  ];
  const work = projectsFor(m.workTags, 3);
  const quoteHref = `/contact?industry=${m.wizard}`;
  const relatedServices = m.relatedServices.map(getService).filter((x): x is Service => Boolean(x));
  const growth = marketGrowth[m.slug];
  const faqs = [...m.faqs, ...(growth?.faqs ?? [])];
  // Trade-specific guides first; postsBySlugs skips posts not yet published.
  const guides = postsBySlugs([...new Set([...(growth?.posts ?? []), ...m.relatedPosts])]).slice(0, 6);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), marketServiceSchema(m), faqSchema([m.answer, ...faqs])]} />
      <section className="bg-paper pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Breadcrumbs items={crumbs} />
            <h1 className="t-h1 mt-6 max-w-[20ch]">{m.heroTitle}</h1>
            <p className="t-lede mt-6 max-w-2xl text-graphite">{m.heroLede}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={quoteHref} data-magnetic className="btn btn-signal">Get a quote for your business</Link>
              <Link href="/work" className="btn btn-ghost">See our work</Link>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <div data-tilt data-spotlight className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-[2rem] bg-ink p-10 text-paper">
              <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(320px circle at var(--mx, 70%) var(--my, 30%), rgba(233,75,39,0.3), transparent 70%)" }} />
              <MarketIcon icon={m.icon} className="relative h-40 w-40 text-signal" />
              <span className="relative font-display text-3xl font-bold tracking-tight">{m.name}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="wrap">
          <div className="flex items-start gap-5">
            <MarketIcon icon={m.icon} className="mt-1 hidden h-12 w-12 shrink-0 text-signal sm:block" />
            <h2 className="t-h2 max-w-3xl">{`Why ${lower(m.name)} lose calls online`}</h2>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {m.problems.map((p) => (
              <div key={p.title} className="border-t-2 border-signal pt-6">
                <h3 className="t-h3">{p.title}</h3>
                <p className="mt-3 text-ash">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="t-h2">{m.answer.q}</h2>
            <p className="t-lede mt-6">{m.answer.a}</p>
          </div>
          <div className="lg:col-span-7">
            <h3 className="font-sans text-sm font-semibold text-graphite">What we build into every site for {lower(m.name)}</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {m.features.map((f) => <li key={f} className="py-4 text-[1.0625rem]">{f}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {growth && (
        <section className="border-t border-line bg-fog py-20 md:py-28">
          <div className="wrap">
            <div className="grid gap-8 lg:grid-cols-12">
              <h2 className="t-h2 lg:col-span-5">{growth.heading}</h2>
              <p className="t-lede text-graphite lg:col-span-7">{growth.intro}</p>
            </div>
            <ol className="mt-12 grid gap-5 md:grid-cols-2">
              {growth.points.map((pt, i) => (
                <li key={pt.title} className="rounded-[1.5rem] bg-paper p-7">
                  <span className="font-display text-sm font-bold text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="t-h3 mt-3">{pt.title}</h3>
                  <p className="mt-2 text-graphite">{pt.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-graphite">
              We handle this through our <Link href="/services/google-business-profile" className="link text-ink">Google Business Profile</Link>, <Link href="/services/reputation-management" className="link text-ink">reputation</Link> and <Link href="/services/local-ads" className="link text-ink">local ads</Link> services, alongside the website.
            </p>
          </div>
        </section>
      )}

      {work.length > 0 && (
        <section className="bg-fog py-20 md:py-28">
          <div className="wrap">
            <h2 className="t-h2">Work for businesses like yours</h2>
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {work.map((p) => <WorkTile key={p.file} project={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-28">
        <div className="wrap"><TestimonialDeck /></div>
      </section>

      <section className="border-t border-line py-20 md:py-24">
        <div className="wrap">
          <h2 className="t-h2">Services for {lower(m.name)}</h2>
          <ul className={`mt-10 grid gap-px overflow-hidden rounded-[1.5rem] bg-line ring-1 ring-line ${relatedServices.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {relatedServices.map((s) => (
              <li key={s.slug} className="bg-paper">
                <Link href={`/services/${s.slug}`} className="block h-full p-7 hover:bg-fog">
                  <h3 className="t-h3">{s.name}</h3>
                  <p className="mt-2 text-graphite">{s.short}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="wrap">
            <h2 className="t-h2">Guides for {lower(m.name)}</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="bg-fog py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <h2 className="t-h2 lg:col-span-4">{m.keyword.charAt(0).toUpperCase() + m.keyword.slice(1)}: common questions</h2>
          <div className="lg:col-span-8"><FaqList faqs={faqs} /></div>
        </div>
      </section>

      <section className="py-20">
        <div className="wrap">
          <h2 className="t-h2">Other markets we serve</h2>
          <div className="mt-10"><MarketsGrid exclude={m.slug} compact /></div>
        </div>
      </section>

      <CtaBand title="Get a fixed quote for your business." href={quoteHref} />
    </>
  );
}
