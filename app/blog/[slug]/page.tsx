import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand } from "@/components/Blocks";
import { AuthorBox, PostCard, PostMeta } from "@/components/BlogParts";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { allPosts, getPost, relatedPosts } from "@/lib/blog";
import { getService } from "@/lib/services";
import { getMarket } from "@/lib/markets";
import { blogPostingSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    // Long headlines skip the " | Devlonic" suffix so the keyword stays visible in results.
    title: post.title.length > 50 ? { absolute: post.title } : post.title,
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: path,
      publishedTime: post.date,
      modifiedTime: post.updated,
      section: post.category,
      authors: ["Muhammad Ahsan"],
    },
  };
}

export default async function BlogPost(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
  // Frontmatter `related` lists service or market slugs; resolve both.
  const links = post.related
    .map((s) => {
      const svc = getService(s);
      if (svc) return { href: `/services/${svc.slug}`, label: svc.name, note: svc.short };
      const m = getMarket(s);
      if (m) return { href: `/markets/${m.slug}`, label: `Websites for ${m.name}`, note: m.short };
      return null;
    })
    .filter((x): x is { href: string; label: string; note: string } => Boolean(x));
  const more = relatedPosts(post, 3);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), blogPostingSchema(post), ...(post.faqs.length ? [faqSchema(post.faqs)] : [])]} />

      <article>
        <header className="bg-paper pb-10 pt-28 md:pb-14 md:pt-36">
          <div className="wrap">
            <Breadcrumbs items={crumbs} />
            <p className="mt-8"><span className="rounded-full bg-fog px-3 py-1 text-xs font-semibold">{post.category}</span></p>
            <h1 className="t-h1 mt-5 max-w-[22ch]">{post.title}</h1>
            <p className="t-lede mt-6 max-w-2xl text-graphite">{post.description}</p>
            <PostMeta post={post} className="mt-6" />
            {post.image && (
              <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-line bg-fog">
                <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
              </div>
            )}
          </div>
        </header>

        <div className="wrap grid gap-12 pb-20 lg:grid-cols-12">
          <aside className="lg:order-2 lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              {post.toc.length > 2 && (
                <nav aria-label="On this page" className="hidden rounded-[1.25rem] border border-line p-6 lg:block">
                  <p className="text-sm font-semibold">On this page</p>
                  <ol className="mt-3 space-y-2 text-[0.95rem]">
                    {post.toc.map((t) => (
                      <li key={t.id}><a href={`#${t.id}`} className="text-graphite hover:text-ink">{t.text}</a></li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="hidden rounded-[1.25rem] bg-ink p-6 text-paper lg:block">
                <p className="font-display text-xl font-bold tracking-tight">Want this done for you?</p>
                <p className="mt-2 text-sm text-ash">Get a written plan and a fixed price within one business day.</p>
                <Link href="/contact" data-magnetic className="btn btn-signal mt-5 w-full">Get a quote</Link>
              </div>
            </div>
          </aside>

          <div className="min-w-0 lg:order-1 lg:col-span-8">
            <section aria-label="Key takeaways" className="rounded-[1.25rem] border-l-4 border-signal bg-fog p-6 sm:p-7">
              <h2 className="font-display text-lg font-bold tracking-tight">Key takeaways</h2>
              <ul className="ray-list mt-4 space-y-2.5">
                {post.takeaways.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </section>

            <div className="article-body mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

            {post.faqs.length > 0 && (
              <section className="mt-16" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="t-h2 mb-6">Frequently asked questions</h2>
                <FaqList faqs={post.faqs} />
              </section>
            )}

            <div className="mt-14"><AuthorBox /></div>

            {links.length > 0 && (
              <section className="mt-14" aria-labelledby="related-services">
                <h2 id="related-services" className="font-display text-2xl font-bold tracking-tight">Related services</h2>
                <ul className="mt-5 grid gap-px overflow-hidden rounded-[1.25rem] bg-line ring-1 ring-line sm:grid-cols-2">
                  {links.map((l) => (
                    <li key={l.href} className="bg-paper">
                      <Link href={l.href} className="block h-full p-5 hover:bg-fog">
                        <span className="block font-semibold">{l.label}</span>
                        <span className="mt-1 block text-sm text-graphite">{l.note}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="border-t border-line bg-fog py-20">
          <div className="wrap">
            <h2 className="t-h2">Keep reading</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {more.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
