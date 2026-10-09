import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { services } from "@/lib/services";
import { states } from "@/lib/states";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-10");
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/services", 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, 0.85)),
    page("/web-design", 0.8),
    ...states.map((s) => page(`/web-design/${s.slug}`, 0.85)),
    page("/work", 0.7),
    page("/pricing", 0.7),
    page("/about", 0.6),
    page("/contact", 0.8),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
