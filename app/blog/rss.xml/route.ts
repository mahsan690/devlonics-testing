import { allPosts } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";

// RSS feed for the blog. No request-time data, so it's prerendered at build.
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

export async function GET() {
  const items = allPosts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${absoluteUrl(`/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${p.slug}`)}</guid>
      <description>${esc(p.description)}</description>
      <category>${esc(p.category)}</category>
      <pubDate>${rfc822(p.date)}</pubDate>
    </item>`,
    )
    .join("\n");
  const lastBuild = allPosts[0] ? rfc822(allPosts[0].updated) : rfc822("2026-10-11");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} blog</title>
    <link>${absoluteUrl("/blog")}</link>
    <atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
    <description>Guides on web design, Shopify, local SEO and AI search for service businesses and ecommerce brands.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
