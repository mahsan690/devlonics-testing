import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, MarketIcon, WorkTile } from "@/components/Blocks";
import { PostCard } from "@/components/BlogParts";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ProcessSteps } from "@/components/ProcessSteps";
import { QuoteWizard } from "@/components/QuoteWizard";
import { ServiceStage3D } from "@/components/ServiceStage3D";
import { getService, services } from "@/lib/services";
import { landing } from "@/lib/service-landing";
import { getMarket, type Market } from "@/lib/markets";
import { postsBySlugs } from "@/lib/blog";
import { projectsFor } from "@/lib/work";
import { testimonials } from "@/lib/testimonials";
import { getCaseStudy } from "@/lib/case-studies";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

// Each service page is a landing page: hero, the answer to its main question,
// the problems it solves, what's included, proof (projects and a review),
// in-depth sections for its supporting search phrases, the process, FAQs and
// the quote form. Content: lib/services.ts and lib/service-landing.ts.

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

// Build projects end with a launch; the ongoing services (reviews, Google
// profile, ads, automation) are about whose accounts everything sits in.
const builds = ["website-design", "lead-generation"];
const trustFor = (slug: string) => [
  "Top Rated on Upwork",
  `${site.projectsDelivered} websites built`,
  "Fixed price, agreed up front",
  builds.includes(slug) ? `${site.freeFixesDays} days of free fixes after launch` : "Accounts and leads stay in your name",
];

// "Website design and redesign" -> "website design and redesign", but keep
// brand names as they are ("Google Business Profile and local SEO").
const inSentence = (name: string) => (/^(Google)\b/.test(name) ? name : name.charAt(0).toLowerCase() + name.slice(1));

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-5 w-5 shrink-0 ${className}`}>
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="M5.5 10.5l3 3 6-6.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const s = getService(slug);
  if (!s) notFound();
  const l = landing[s.slug];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.name, path: `/services/${s.slug}` },
  ];
  const work = projectsFor(s.workTags, 4);
  const others = services.filter((o) => o.slug !== s.slug);
  const relatedMarkets = s.relatedMarkets.map(getMarket).filter((m): m is Market => Boolean(m));
  const guides = postsBySlugs(s.relatedPosts);
  const review = l?.testimonial ? testimonials.find((t) => t.name === l.testimonial) : undefined;
  const proof = l?.caseStudy ? getCaseStudy(l.caseStudy) : undefined;
  const faqs = [...s.faqs, ...(l?.moreFaqs ?? [])];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(s), faqSchema([s.answer, ...faqs])]} />

      {/* Hero */}
      <section className="bg-paper pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Breadcrumbs items={crumbs} />
            <h1 className="t-h1 mt-6 max-w-[20ch]">{s.heroTitle}</h1>
            <p className="t-lede mt-6 max-w-2xl text-graphite">{s.heroLede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote" data-magnetic className="btn btn-signal">Get a fixed quote</a>
              <Link href="/work" className="btn btn-ghost">See our work</Link>
            </div>
            <ul className="mt-8 grid gap-x-6 gap-y-2.5 text-[0.95rem] sm:grid-cols-2">
              {trustFor(s.slug).map((t) => (
                <li key={t} className="flex items-center gap-2.5"><Check className="text-signal" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <ServiceStage3D active={s.slug} label={s.name} showLabel={false} className="aspect-[4/3] lg:aspect-square" />
          </div>
        </div>
      </section>

      {/* The direct answer, for search and AI assistants */}
      <section className="border-t border-line py-16 md:py-20" aria-labelledby="answer">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <h2 id="answer" className="t-h2 lg:col-span-5">{s.answer.q}</h2>
          <div className="lg:col-span-7">
            <p className="t-lede">{s.answer.a}</p>
            <p className="mt-5 text-graphite">{s.timeline}</p>
          </div>
        </div>
      </section>

      {/* Problems */}
      {l && (
        <section className="bg-fog py-20 md:py-28" aria-labelledby="problems">
          <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h2 id="problems" className="t-h2">Sound familiar?</h2>
              <ol className="mt-10 space-y-4">
                {l.problems.map((p, i) => (
                  <li key={p.title} className="flex gap-5 rounded-[1.25rem] bg-paper p-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-display font-bold text-paper">{i + 1}</span>
                    <span>
                      <span className="block font-display text-lg font-bold tracking-tight">{p.title}</span>
                      <span className="mt-1.5 block text-graphite">{p.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-lg font-medium">Here&apos;s how we fix that.</p>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] shadow-[0_0_0_1px_var(--color-line)]">
                <Image src={`/services/${s.slug}.webp`} alt={`Illustration of ${inSentence(s.name)} by Devlonic`} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* What's included */}
      <section className="py-20 md:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="t-h2">What&apos;s included</h2>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {s.included.map((x) => (
                <li key={x} className="flex gap-3 text-[1.0625rem]"><Check className="mt-0.5 text-signal" />{x}</li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-graphite">Built with: {s.stack.join(", ")}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-[1.5rem] border border-line p-7">
              <h2 className="font-display text-2xl font-bold tracking-tight">Who it&apos;s for</h2>
              <ul className="ray-list mt-6 space-y-3.5 text-[1.0625rem]">
                {s.forWho.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How we make it work */}
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

      {/* Proof: a case study */}
      {proof && (
        <section className="border-b border-line py-20 md:py-28">
          <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="text-sm font-semibold text-signal-ink">Case study</span>
              <h2 className="t-h2 mt-3">{proof.headline ?? proof.card}</h2>
              <p className="t-lede mt-5 text-graphite">{proof.cardLine ?? proof.summary}</p>
              <dl className="mt-8 grid grid-cols-2 gap-6">
                {proof.stats.slice(0, 2).map((st) => (
                  <div key={st.label} className="flex flex-col gap-1 border-t border-line pt-4">
                    <dt className="text-sm text-graphite">{st.label}</dt>
                    <dd className="order-first font-display text-3xl font-bold tracking-tight text-signal-ink">{st.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href={`/work/${proof.slug}`} className="btn btn-ink mt-8">Read the case study</Link>
            </div>
            <div className="lg:col-span-7">
              <Link href={`/work/${proof.slug}`} data-tilt className="relative block aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_0_0_1px_var(--color-line)]">
                <Image src={`/case-studies/${proof.slug}.webp`} alt={`${proof.card}: case study cover`} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Proof: projects and a review */}
      {work.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="wrap">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="t-h2">Recent projects</h2>
              <Link href="/work" className="btn btn-ghost shrink-0">See all work</Link>
            </div>
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2">
              {work.map((p) => <WorkTile key={p.file} project={p} large />)}
            </div>
          </div>
        </section>
      )}

      {review && (
        <section className="border-t border-line py-20 md:py-24">
          <figure className="wrap max-w-4xl">
            <blockquote className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-bold leading-[1.2] tracking-tight">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-graphite">
              <span className="font-semibold text-ink">{review.name}</span>, {review.role}
              {review.source && (
                <> · <a href={review.source.url} target="_blank" rel="noopener" className="link">{review.source.rating}-star review on {review.source.label}</a></>
              )}
            </figcaption>
          </figure>
        </section>
      )}

      {/* In-depth sections */}
      {l?.sections.map((sec, i) => (
        <section key={sec.heading} className={`py-16 md:py-20 ${i === 0 ? "border-t border-line" : ""}`}>
          <div className="wrap grid gap-8 lg:grid-cols-12">
            <h2 className="t-h2 lg:col-span-5">{sec.heading}</h2>
            <div className="space-y-5 text-[1.0625rem] leading-relaxed lg:col-span-7">
              {sec.paragraphs.map((para) => <p key={para.slice(0, 40)}>{para}</p>)}
              {sec.source && (
                <p className="text-sm text-graphite">
                  Source: <a href={sec.source.url} target="_blank" rel="noopener" className="link">{sec.source.label}</a>
                </p>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Process */}
      <section className="bg-fog py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="t-h2">From first message to launch</h2>
            <p className="t-lede mt-6 text-graphite">{s.timeline}</p>
            <p className="mt-4 text-graphite">
              {builds.includes(s.slug)
                ? `After launch you get ${site.freeFixesDays} days of free fixes, and an optional care plan for updates, backups and improvements.`
                : "Your Google profile, ad accounts, reviews and leads stay in your name, with full access from day one."}
            </p>
          </div>
          <div className="lg:col-span-7"><ProcessSteps /></div>
        </div>
      </section>

      {relatedMarkets.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="wrap">
            <h2 className="t-h2">Industries we build this for</h2>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedMarkets.map((m) => (
                <li key={m.slug}>
                  <Link href={`/markets/${m.slug}`} className="flex h-full items-start gap-4 rounded-[1.25rem] border border-line bg-paper p-6 hover:border-ink">
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

      <section className="border-t border-line py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <h2 className="t-h2 lg:col-span-4">{s.name}: common questions</h2>
          <div className="lg:col-span-8"><FaqList faqs={faqs} /></div>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="bg-fog py-20 md:py-24">
          <div className="wrap">
            <h2 className="t-h2">Guides</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Quote form */}
      <section id="quote" className="scroll-mt-24 bg-ink py-20 text-paper md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="t-h2">Get a fixed quote for {inSentence(s.name)}.</h2>
            <ul className="mt-8 space-y-3.5 text-[1.0625rem] text-paper/90">
              <li className="flex gap-3"><Check className="mt-0.5 text-signal" />A written plan with scope, price and timeline within {site.quoteTurnaround}</li>
              <li className="flex gap-3"><Check className="mt-0.5 text-signal" />One fixed price, agreed before work starts</li>
              <li className="flex gap-3"><Check className="mt-0.5 text-signal" />No obligation and no sales call to sit through</li>
            </ul>
            <p className="mt-8 text-ash">
              Prefer to talk? Call <a href={site.phoneHref} className="link text-paper">{site.phoneDisplay}</a> or email{" "}
              <a href={`mailto:${site.email}`} className="link text-paper">{site.email}</a>.
            </p>
          </div>
          <div className="lg:col-span-7">
            <QuoteWizard initialNeed={s.wizardChoice} />
          </div>
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
    </>
  );
}
