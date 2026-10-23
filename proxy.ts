import { NextResponse, type NextRequest } from "next/server";
import { services } from "@/lib/services";
import { markets } from "@/lib/markets";
import { caseStudies } from "@/lib/case-studies";
import posts from "@/lib/generated/posts.json";

// With Cache Components the page shell streams before notFound() runs, so an
// unknown slug would get a 200 status. Send unknown service, market, case
// study and blog URLs to a path with no route, which Next.js answers with a
// real 404. Slug lists come straight from the site data, so new pages and
// posts are picked up automatically.
const KNOWN: Record<string, Set<string>> = {
  services: new Set(services.map((s) => s.slug)),
  markets: new Set(markets.map((m) => m.slug)),
  work: new Set(caseStudies.map((c) => c.slug)),
  blog: new Set((posts as { slug: string }[]).map((p) => p.slug).concat("rss.xml")),
};

export function proxy(request: NextRequest) {
  const [, section, slug, extra] = request.nextUrl.pathname.split("/");
  // Files such as /work/2026-gladiolaz.webp are static assets, not pages.
  if (slug?.includes(".") && slug !== "rss.xml") return NextResponse.next();
  const known = KNOWN[section]?.has(slug) ?? false;
  // Allow the per-page share image routes under known slugs.
  if (known && (!extra || extra === "opengraph-image")) return NextResponse.next();
  return NextResponse.rewrite(new URL("/__not-found", request.url));
}

export const config = {
  matcher: ["/services/:slug/:path*", "/markets/:slug/:path*", "/work/:slug/:path*", "/blog/:slug/:path*"],
};
