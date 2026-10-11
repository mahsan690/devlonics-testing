import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { services } from "@/lib/services";
import { markets } from "@/lib/markets";
import { caseStudy } from "@/lib/work";
import { allPosts } from "@/lib/blog";

// lastModified uses real content dates: the site's last copy revision for
// pages, each post's updated date for the blog.
const SITE_UPDATED = "2026-10-11";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, lastModified = SITE_UPDATED, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified: new Date(`${lastModified}T00:00:00Z`),
    changeFrequency,
    priority,
  });
  const newestPost = allPosts[0]?.updated ?? SITE_UPDATED;
  return [
    page("/", 1, SITE_UPDATED, "weekly"),
    page("/services", 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, 0.85)),
    page("/markets", 0.85),
    ...markets.map((m) => page(`/markets/${m.slug}`, 0.85)),
    page("/work", 0.75, SITE_UPDATED, "weekly"),
    page(`/work/${caseStudy.slug}`, 0.75),
    page("/blog", 0.8, newestPost, "weekly"),
    ...allPosts.map((p) => page(`/blog/${p.slug}`, 0.7, p.updated)),
    page("/pricing", 0.7),
    page("/about", 0.6),
    page("/contact", 0.8),
    page("/privacy", 0.2, SITE_UPDATED, "yearly"),
    page("/terms", 0.2, SITE_UPDATED, "yearly"),
  ];
}
