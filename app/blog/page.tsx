import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Blocks";
import { PostCard } from "@/components/BlogParts";
import { JsonLd } from "@/components/JsonLd";
import { allPosts } from "@/lib/blog";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Blog: Marketing Guides for Local Service Businesses",
  description:
    "Practical guides for local service businesses: Google reviews, Google Maps and local SEO, websites that convert, lead flows, local ads and speed to lead.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }];

export default function BlogIndex() {
  const [lead, ...rest] = allPosts;
  const categories = [...new Set(allPosts.map((p) => p.category))];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), blogSchema(allPosts)]} />
      <PageHero
        crumbs={crumbs}
        title="Guides for local service businesses that want more calls."
        lede="Plain-English answers on reviews, Google Maps, websites, lead flows and local ads, written from the work we do for contractors, home services and clinics."
      >
        {categories.length > 1 && (
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Topics">
            {categories.map((c) => (
              <li key={c} className="rounded-full border-[1.5px] border-line px-4 py-2 text-sm font-medium">{c}</li>
            ))}
          </ul>
        )}
      </PageHero>

      <section className="pb-20 md:pb-28">
        <div className="wrap">
          {lead ? (
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="lg:col-span-2"><PostCard post={lead} large /></div>
              {rest.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          ) : (
            <p className="t-lede text-graphite">The first guides are on their way. <Link href="/contact" className="link text-ink">Ask us a question</Link> in the meantime.</p>
          )}
          <p className="mt-10 text-sm text-graphite">
            Prefer a feed reader? <a href="/blog/rss.xml" className="link text-ink">Subscribe via RSS</a>.
          </p>
        </div>
      </section>

      <CtaBand title="Have a question we haven't answered?" body="Tell us about your business and what you're trying to fix. You'll get a written plan and a fixed price." />
    </>
  );
}
