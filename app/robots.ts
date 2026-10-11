import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/lib/site";

// The live site on its real domain is open to search engines and AI crawlers
// (good for AEO) and lists the sitemap. Previews and the temporary
// *.vercel.app address stay crawlable but every page carries a noindex tag
// (see isIndexable in lib/site.ts), so anything already indexed drops out.
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: [{ userAgent: "*", allow: "/" }] };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot"], allow: "/", disallow: ["/api/"] },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
