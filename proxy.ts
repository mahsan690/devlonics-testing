import { NextResponse, type NextRequest } from "next/server";

// With Cache Components the page shell streams before notFound() runs, so an
// unknown slug would get a 200 status. Send unknown service and state URLs
// to a path with no route, which Next.js answers with a real 404.
// Keep these lists in sync with lib/services.ts and lib/states.ts.
const SERVICES = new Set([
  "lead-generation-websites", "small-business-websites", "online-stores",
  "app-development", "custom-software", "seo-and-marketing",
]);
const STATES = new Set(["new-jersey", "texas", "florida"]);

export function proxy(request: NextRequest) {
  const [, section, slug, extra] = request.nextUrl.pathname.split("/");
  const known =
    (section === "services" && SERVICES.has(slug)) ||
    (section === "web-design" && STATES.has(slug));
  // Allow the per-page share image routes under known slugs.
  if (known && (!extra || extra === "opengraph-image")) return NextResponse.next();
  return NextResponse.rewrite(new URL("/__not-found", request.url));
}

export const config = {
  matcher: ["/services/:slug/:path*", "/web-design/:slug/:path*"],
};
