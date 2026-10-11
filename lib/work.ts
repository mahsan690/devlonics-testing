// Portfolio. The 2026 projects (files starting "2026-") live in the repo.
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
  { name: "Gladiolaz", file: "2026-gladiolaz.webp", type: "Shopify store and paid ads for a hair and wig brand", tags: ["store"], platform: "Shopify", year: 2026, featured: true },
  { name: "Midtown New York Doctors", file: "2026-midtown-ny-doctors.webp", type: "WordPress site for a walk-in urgent care clinic in Manhattan", tags: ["health", "services"], platform: "WordPress", year: 2026, featured: true },
  { name: "Florida Surface Pro", file: "2026-florida-surface-pro.webp", type: "WordPress site for a concrete floor coating contractor", tags: ["services"], platform: "WordPress", year: 2026, featured: true },
  { name: "Mejuri", file: "2026-mejuri.webp", type: "Shopify work for a fine jewelry brand", tags: ["store", "brand"], platform: "Shopify", year: 2026, featured: true },
  { name: "Missoma", file: "2026-missoma.webp", type: "Shopify work for a demi-fine jewelry brand", tags: ["store", "brand"], platform: "Shopify", year: 2026 },
  { name: "Tilly Sveaas", file: "2026-tilly-sveaas.webp", type: "Shopify work for a jewelry designer", tags: ["store", "brand"], platform: "Shopify", year: 2026 },
  { name: "Taylor Morrison", file: "2026-taylor-morrison.webp", type: "WordPress work for a national homebuilder", tags: ["brand", "services"], platform: "WordPress", year: 2026 },
  { name: "Steve “Mac” MacInnes", file: "2026-steve-macinnes.webp", type: "WordPress site for an author, speaker and veteran advocate", tags: ["brand"], platform: "WordPress", year: 2026 },
  { name: "Deconflict", file: "2026-deconflict.webp", type: "WordPress site for an intelligence software platform", tags: ["software", "brand"], platform: "WordPress", year: 2026 },
  { name: "MaetiQ", file: "MaetiQ-scaled.webp", type: "WordPress website for a digital marketing agency", tags: ["brand", "services"], platform: "WordPress" },
  { name: "ApplyPro Consulting", file: "ApplyProConsulting-scaled.webp", type: "Subscription-based ecommerce platform", tags: ["store", "services"] },
  { name: "Earthly Angels Home Care", file: "Earthly-Angels.webp", type: "Website for a home care agency", tags: ["health", "services"] },
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
// Revenue and ROAS are arithmetic on those figures: ~10 orders x $120 AOV,
// against $20/day x 15 days of ad spend.
export const caseStudy = {
  name: "Gladiolaz",
  slug: "gladiolaz",
  url: "https://gladiolaz.com",
  image: "2026-gladiolaz.webp",
  industry: "Hair and wig ecommerce",
  headline: "From a dead Shopify store to orders in 15 days.",
  summary:
    "Gladiolaz is a hair and wig brand on Shopify that had stopped selling. We rebuilt the store, set up fulfilment through AutoDS with Amazon and Alibaba suppliers, produced AI video creative and launched TikTok ads on a $20-a-day budget.",
  challenge:
    "The store had traffic problems, messy product data and no working ad system. Fulfilment was fragile, and nothing was measured.",
  work: [
    { title: "Shopify store rebuild", body: "Cleaned up product data and variants, set compare-at pricing, and fixed collection structure and on-page SEO." },
    { title: "Dropshipping system", body: "Connected AutoDS with Amazon and Alibaba suppliers, and fixed a TikTok Shop warehouse setting that was blocking fulfilment." },
    { title: "AI video creative", body: "Produced short-form AI video ads built for TikTok and Meta feeds." },
    { title: "Performance marketing", body: "Planned a 30-day paid strategy and launched TikTok ads at $20 a day, tracking every order back to its campaign." },
  ],
  stats: [
    { value: 10, prefix: "~", suffix: "", label: "orders in the first 15 days" },
    { value: 120, prefix: "$", suffix: "", label: "average order value" },
    { value: 20, prefix: "$", suffix: "/day", label: "TikTok ad budget" },
    { value: 4, prefix: "~", suffix: "x", label: "return on ad spend" },
  ],
  stack: ["Shopify", "AutoDS", "TikTok Ads", "Meta Ads", "AI video"],
};

export const reviewScreenshots = [
  "FP-Review-1.webp", "FP-Review-2.webp", "FP-Review-3.webp", "FP-Review-4.webp", "FP-Review-5.webp",
  "FP-Review-6.webp", "FP-Review-7.webp", "FP-Review-8.webp", "FP-Review-9.webp",
  "UF-Review-1.webp", "UF-Review-2.webp", "UF-Review-3.webp", "UF-Review-4.webp", "UF-Review-5.webp",
];

export const clientNames = [
  "MaetiQ", "Florida Surface Pro", "ApplyPro Consulting", "FortuneLeads", "Gladiolaz", "Javabuzz",
  "Earthly Angels Home Care", "Daniela's Cleaning", "Indy Cardinal", "Alon Home Care", "BazTech", "KA Metal Scrap",
];

export const projectsFor = (tags: string[], limit = 3) =>
  projects.filter((p) => p.tags.some((t) => tags.includes(t))).slice(0, limit);
