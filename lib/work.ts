// Portfolio. Images are pulled from the current devlonics.com media library
// into /public/work by scripts/fetch-portfolio.mjs (runs before every build,
// skips files already in the repo).

export type Project = {
  name: string;
  file: string; // file name in /public/work
  type: string; // what we built, in plain words
  tags: ("store" | "services" | "health" | "brand" | "app" | "software")[];
  featured?: boolean;
};

export const projects: Project[] = [
  { name: "MaetiQ", file: "MaetiQ-scaled.webp", type: "WordPress website for a digital marketing agency", tags: ["brand", "services"], featured: true },
  { name: "KitsXI", file: "KitsXI-Ecommerce-Store-scaled.webp", type: "Online store for football kits", tags: ["store"], featured: true },
  { name: "ApplyPro Consulting", file: "ApplyProConsulting-scaled.webp", type: "Subscription-based ecommerce platform", tags: ["store", "services"], featured: true },
  { name: "Earthly Angels Home Care", file: "Earthly-Angels.webp", type: "Website for a home care agency", tags: ["health", "services"], featured: true },
  { name: "Javabuzz", file: "Javabuzz-scaled.webp", type: "Website for a coffee brand", tags: ["brand", "store"] },
  { name: "Mobilects", file: "Mobilects_Ecommerce-scaled.webp", type: "Online store for consumer electronics", tags: ["store"] },
  { name: "Indy Cardinal Landscaping", file: "Indy-Cardinal-Landscaping.webp", type: "Website for a landscaping company", tags: ["services"] },
  { name: "BazTech", file: "BazTech_Ecommerce-scaled.webp", type: "Online store for tech accessories", tags: ["store"] },
  { name: "Daniela's Cleaning", file: "Danielas-Cleaning.webp", type: "Website for a cleaning company", tags: ["services"] },
  { name: "Sweets & Bakers", file: "Bakery_Software-scaled.webp", type: "Order and sales dashboard for a bakery", tags: ["software"] },
  { name: "Alon Home Care", file: "Alon-Home-Care.webp", type: "Website for a home care provider", tags: ["health", "services"] },
  { name: "HHHC", file: "HHHC.webp", type: "Website for a home health care provider", tags: ["health", "services"] },
  { name: "KA Metal Scrap", file: "Ka_Metal_Scrap-scaled.webp", type: "Website for a scrap metal recycler", tags: ["services"] },
  { name: "Home Rental", file: "Home_Rental-scaled.webp", type: "Property rental website", tags: ["services", "app"] },
  { name: "Aviary", file: "Aviary_Ecommerce-scaled.webp", type: "Online store for bird supplies", tags: ["store"] },
  { name: "Arts Stationery", file: "Arts_Stationery-scaled.webp", type: "Online store for stationery", tags: ["store"] },
  { name: "SpotWeb", file: "SpotWeb-scaled.webp", type: "Website for a web development agency", tags: ["brand", "services"] },
  { name: "Fugu", file: "Fugu-scaled.webp", type: "Website for an AI art studio", tags: ["brand"] },
  { name: "Delta Extrax", file: "Delta_Extrax-scaled.webp", type: "Custom brand website", tags: ["brand", "store"] },
  { name: "Monopoled", file: "Monopoled-scaled.webp", type: "Brand website", tags: ["brand"] },
  { name: "PNWX", file: "PNWX-scaled.webp", type: "Brand website", tags: ["brand"] },
  { name: "ILMS", file: "ILMS-scaled.webp", type: "Web platform", tags: ["software", "app"] },
  { name: "Earn Web", file: "Earn_Web-scaled.webp", type: "Rewards web app", tags: ["app"] },
  { name: "Weather App", file: "Weather_App-scaled.webp", type: "Weather app interface", tags: ["app"] },
];

// Results the founder reported directly. Keep these factual.
export const caseStudy = {
  name: "Gladiolaz",
  url: "https://gladiolaz.com",
  summary:
    "A Shopify brand that had stopped selling. We rebuilt the store, connected AutoDS and supplier networks for fulfilment, produced AI video creative and ran TikTok ads.",
  stats: [
    { value: "~10", label: "orders in the first 15 days" },
    { value: "$120", label: "average order value" },
    { value: "$20/day", label: "TikTok ad budget" },
  ],
};

export const reviewScreenshots = [
  "FP-Review-1.webp", "FP-Review-2.webp", "FP-Review-3.webp", "FP-Review-4.webp", "FP-Review-5.webp",
  "FP-Review-6.webp", "FP-Review-7.webp", "FP-Review-8.webp", "FP-Review-9.webp",
  "UF-Review-1.webp", "UF-Review-2.webp", "UF-Review-3.webp", "UF-Review-4.webp", "UF-Review-5.webp",
];

export const clientNames = [
  "MaetiQ", "KitsXI", "ApplyPro Consulting", "FortuneLeads", "Gladiolaz", "Javabuzz",
  "Earthly Angels Home Care", "Daniela's Cleaning", "Indy Cardinal", "Alon Home Care", "BazTech", "KA Metal Scrap",
];

export const projectsFor = (tags: string[], limit = 3) =>
  projects.filter((p) => p.tags.some((t) => tags.includes(t))).slice(0, limit);
