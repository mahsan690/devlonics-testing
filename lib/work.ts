// Portfolio: websites for local service businesses only. The backup branch
// backup/web-shopify-ai-2026-10 has the full list, including stores and apps.
// The 2026 projects (files starting "2026-") live in the repo.
// Older images are pulled from the devlonics.com media library into
// /public/work by scripts/fetch-portfolio.mjs before each build.

export type Project = {
  name: string;
  file: string; // file name in /public/work
  type: string; // what we did, in plain words
  tags: ("store" | "services" | "health" | "brand" | "app" | "software")[];
  platform?: "Shopify" | "WordPress";
  year?: number;
  featured?: boolean;
};

// Descriptions name the platform and the industry only. Upgrade the wording
// (e.g. "designed and built") for projects where the full build was ours.
export const projects: Project[] = [
  { name: "Florida Surface Pro", file: "2026-florida-surface-pro.webp", type: "Website, quote funnel and lead flow for a concrete floor coating contractor", tags: ["services"], platform: "WordPress", year: 2026, featured: true },
  { name: "Midtown New York Doctors", file: "2026-midtown-ny-doctors.webp", type: "WordPress site for a walk-in urgent care clinic in Manhattan", tags: ["health", "services"], platform: "WordPress", year: 2026, featured: true },
  { name: "Taylor Morrison", file: "2026-taylor-morrison.webp", type: "WordPress work for a national homebuilder", tags: ["services"], platform: "WordPress", year: 2026, featured: true },
  { name: "Daniela's Cleaning", file: "Danielas-Cleaning.webp", type: "Website for a cleaning company", tags: ["services"], featured: true },
  { name: "Indy Cardinal Landscaping", file: "Indy-Cardinal-Landscaping.webp", type: "Website for a landscaping company", tags: ["services"] },
  { name: "Earthly Angels Home Care", file: "Earthly-Angels.webp", type: "Website for a home care agency", tags: ["health", "services"] },
  { name: "Alon Home Care", file: "Alon-Home-Care.webp", type: "Website for a home care provider", tags: ["health", "services"] },
  { name: "HHHC", file: "HHHC.webp", type: "Website for a home health care provider", tags: ["health", "services"] },
  { name: "KA Metal Scrap", file: "Ka_Metal_Scrap-scaled.webp", type: "Website for a scrap metal recycler", tags: ["services"] },
];

export const reviewScreenshots = [
  "FP-Review-1.webp", "FP-Review-2.webp", "FP-Review-3.webp", "FP-Review-4.webp", "FP-Review-5.webp",
  "FP-Review-6.webp", "FP-Review-7.webp", "FP-Review-8.webp", "FP-Review-9.webp",
  "UF-Review-1.webp", "UF-Review-2.webp", "UF-Review-3.webp", "UF-Review-4.webp", "UF-Review-5.webp",
];

export const clientNames = [
  "Florida Surface Pro", "Midtown New York Doctors", "Taylor Morrison", "Earthly Angels Home Care", "Daniela's Cleaning",
  "Indy Cardinal Landscaping", "Alon Home Care", "HHHC", "KA Metal Scrap", "FortuneLeads", "MaetiQ",
];

export const projectsFor = (tags: string[], limit = 3) =>
  projects.filter((p) => p.tags.some((t) => tags.includes(t))).slice(0, limit);
