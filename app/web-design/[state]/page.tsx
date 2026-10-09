import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHero, StatesGrid, TestimonialsBlock, WorkTile } from "@/components/Blocks";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { getState, states } from "@/lib/states";
import { services } from "@/lib/services";
import { projectsFor } from "@/lib/work";
import { breadcrumbSchema, faqSchema, stateServiceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export async function generateMetadata(props: PageProps<"/web-design/[state]">): Promise<Metadata> {
  const { state } = await props.params;
  const st = getState(state);
  if (!st) return {};
  const path = `/web-design/${st.slug}`;
  return {
    title: st.metaTitle,
    description: st.metaDescription,
    alternates: { canonical: path },
    openGraph: { title: st.metaTitle, description: st.metaDescription, url: path },
  };
}

export default async function StatePage(props: PageProps<"/web-design/[state]">) {
  const { state } = await props.params;
  const st = getState(state);
  if (!st) notFound();

  const path = `/web-design/${st.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas we serve", path: "/web-design" },
    { name: st.name, path },
  ];
  const work = projectsFor(["services", "health", "store"], 3);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), stateServiceSchema(st.name, path, st.metaDescription), faqSchema(st.faqs)]} />
      <PageHero crumbs={crumbs} title={st.heroTitle}>
        <div className="mt-6 max-w-2xl space-y-4 text-graphite t-lede">
          {st.intro.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/contact?state=${st.abbr}`} className="btn btn-signal">Get a quote for your {st.name} business</Link>
        </div>
      </PageHero>

      <section className="bg-ink py-16 text-paper md:py-20">
        <div className="wrap">
          <h2 className="sr-only">{st.name} small business at a glance</h2>
          <dl className="grid gap-10 md:grid-cols-3">
            {st.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-2 border-t border-white/20 pt-5">
                <dt className="text-ash">{s.label}</dt>
                <dd className="order-first font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-none tracking-tight text-signal">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-ash">
            Source: <a href={st.source.url} className="link" target="_blank" rel="noopener">{st.source.label}</a>
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="t-h2">Who we build for in {st.name}</h2>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-7">
            {st.industries.map((i) => (
              <li key={i.name} className="py-6">
                <h3 className="t-h3">{i.name}</h3>
                <p className="mt-2 text-graphite">{i.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-fog py-20 md:py-28">
        <div className="wrap">
          <h2 className="t-h2 max-w-3xl">What we do differently for {st.name} businesses</h2>
          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {st.angle.map((a) => (
              <div key={a.title} className="border-t-2 border-signal pt-6">
                <h3 className="t-h3">{a.title}</h3>
                <p className="mt-3 text-graphite">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="t-h2">Cities we work with</h2>
            <p className="mt-5 text-graphite">
              Plus every town in between. If you serve several areas, we&apos;ll build a page for each one.
            </p>
          </div>
          <ul className="flex flex-wrap content-start gap-2.5 lg:col-span-7">
            {st.cities.map((c) => (
              <li key={c} className="rounded-full border-[1.5px] border-line px-4 py-2 font-medium">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-24">
        <div className="wrap">
          <h2 className="t-h2">Services for {st.name} businesses</h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
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

      <section className="bg-fog py-20 md:py-28">
        <div className="wrap">
          <h2 className="t-h2">Recent work</h2>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((p) => <WorkTile key={p.file} project={p} />)}
          </div>
          <div className="mt-16"><TestimonialsBlock /></div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <h2 className="t-h2 lg:col-span-4">{st.name} web design questions</h2>
          <div className="lg:col-span-8"><FaqList faqs={st.faqs} /></div>
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="wrap">
          <h2 className="t-h2">Other states we serve</h2>
          <div className="mt-10"><StatesGrid exclude={st.slug} /></div>
        </div>
      </section>

      <CtaBand title={`Get a fixed quote for your ${st.name} business.`} href={`/contact?state=${st.abbr}`} />
    </>
  );
}
