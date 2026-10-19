import { NextResponse, type NextRequest } from "next/server";
import { services } from "@/lib/services";
import { markets } from "@/lib/markets";
import { caseStudy } from "@/lib/work";
import { aiCaseStudies } from "@/lib/ai";
import posts from "@/lib/generated/posts.json";

// With Cache Components the page shell streams before notFound() runs, so an
// unknown slug would get a 200 status. Send unknown service, market, case
// study and blog URLs to a path with no route, which Next.js answers with a
// real 404. Slug lists come straight from the site data, so new pages and
// posts are picked up automatically.
const KNOWN: Record<string, Set<string>> = {
  services: new Set(services.map((s) => s.slug)),
  markets: new Set(markets.map((m) => m.slug)),
  work: new Set([caseStudy.slug]),
  blog: new Set((posts as { slug: string }[]).map((p) => p.slug).concat("rss.xml")),
};

const AI_CASES = new Set(aiCaseStudies.map((c) => c.slug));

// Under /ai: the case study pages, their share images, the /ai share image
// and the case study covers in public/ai/ are real; anything else is a 404.
function aiPath(request: NextRequest, sub?: string, slug?: string, extra?: string) {
  if (sub?.includes(".") && !slug) return NextResponse.next();
  if (sub === "opengraph-image" && !slug) return NextResponse.next();
  if (sub === "case-studies" && slug && AI_CASES.has(slug) && (!extra || extra === "opengraph-image")) return NextResponse.next();
  return NextResponse.rewrite(new URL("/__not-found", request.url));
}

export function proxy(request: NextRequest) {
  const [, section, slug, extra, more] = request.nextUrl.pathname.split("/");
  if (section === "ai") return aiPath(request, slug, extra, more);
  // Files such as /work/2026-gladiolaz.webp are static assets, not pages.
  if (slug?.includes(".") && slug !== "rss.xml") return NextResponse.next();
  const known = KNOWN[section]?.has(slug) ?? false;
  // Allow the per-page share image routes under known slugs.
  if (known && (!extra || extra === "opengraph-image")) return NextResponse.next();
  return NextResponse.rewrite(new URL("/__not-found", request.url));
}

export const config = {
  matcher: ["/services/:slug/:path*", "/markets/:slug/:path*", "/work/:slug/:path*", "/blog/:slug/:path*", "/ai/:path+"],
};
