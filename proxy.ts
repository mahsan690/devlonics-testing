import { NextResponse, type NextRequest } from "next/server";

// With Cache Components the page shell streams before notFound() runs, so an
// unknown slug would get a 200 status. Send unknown service, market and case
// study URLs to a path with no route, which Next.js answers with a real 404.
// Keep these lists in sync with lib/services.ts, lib/markets.ts and lib/work.ts.
const KNOWN: Record<string, Set<string>> = {
  services: new Set([
    "lead-generation-websites", "small-business-websites", "online-stores",
    "app-development", "custom-software", "seo-and-marketing",
  ]),
  markets: new Set([
    "hvac", "plumbing", "roofing", "cleaning", "contractors",
    "landscaping", "home-care-and-clinics", "ecommerce",
  ]),
  work: new Set(["gladiolaz"]),
};

export function proxy(request: NextRequest) {
  const [, section, slug, extra] = request.nextUrl.pathname.split("/");
  // Files such as /work/2026-gladiolaz.webp are static assets, not pages.
  if (slug?.includes(".")) return NextResponse.next();
  const known = KNOWN[section]?.has(slug) ?? false;
  // Allow the per-page share image routes under known slugs.
  if (known && (!extra || extra === "opengraph-image")) return NextResponse.next();
  return NextResponse.rewrite(new URL("/__not-found", request.url));
}

export const config = {
  matcher: ["/services/:slug/:path*", "/markets/:slug/:path*", "/work/:slug/:path*"],
};
