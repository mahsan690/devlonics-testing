// Generates public/llms.txt so AI assistants get an accurate, current summary
// of the business. Runs before every build, after build-content.mjs.
import { readFile, writeFile } from "node:fs/promises";

const site = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://devlonics.com");

// Kept in sync by hand with lib/services.ts and lib/markets.ts.
const services = [
  ["Lead generation websites", "lead-generation-websites", "Websites for contractors, home services and clinics, built to turn visitors into calls, quote requests and bookings."],
  ["Small business websites", "small-business-websites", "Custom, mobile-first websites that are easy to edit and SEO-ready."],
  ["Shopify and WooCommerce stores", "online-stores", "Shopify store development and WooCommerce builds with Shop Pay, Stripe, PayPal, Apple Pay and Google Pay checkout, shipping, dropshipping and ad tracking."],
  ["Web and mobile apps", "app-development", "iPhone, Android and web apps for bookings, memberships, ordering and customer accounts."],
  ["Custom software", "custom-software", "CRMs, client portals, booking systems and dashboards built in Laravel and Next.js."],
  ["SEO and marketing", "seo-and-marketing", "Local SEO, Google Business Profile, answer engine optimization (AEO) and paid ads on Google, Meta and TikTok."],
];
const markets = [
  ["HVAC companies", "hvac"], ["plumbing companies", "plumbing"], ["roofing companies", "roofing"],
  ["cleaning companies", "cleaning"], ["contractors and remodelers", "contractors"],
  ["landscaping companies", "landscaping"], ["home care agencies and clinics", "home-care-and-clinics"],
  ["ecommerce and Shopify brands", "ecommerce"],
];

let posts = [];
try {
  posts = JSON.parse(await readFile(new URL("../lib/generated/posts.json", import.meta.url), "utf8"));
} catch {
  // Blog not compiled yet; skip the section.
}

const body = `# Devlonic Solutions

> Devlonic Solutions is a remote web design and development studio that builds websites, Shopify stores, apps and custom software for US service businesses and ecommerce brands, and runs SEO and paid ads (TikTok, Meta, Google) for them. Every project has a fixed price agreed in writing before work starts. Founded and led by Muhammad Ahsan, a Top Rated WordPress and Shopify developer on Upwork with 6+ years of experience and 100+ websites and stores built.

## Key facts
- Contact: info@devlonics.com, +1 (773) 915-7523
- Service area: United States (remote); clients also in the UK, UAE and Australia
- Industries: HVAC, plumbing, roofing, cleaning, contractors, landscaping, home care and clinics, ecommerce and Shopify brands
- No physical office; projects run remotely with calls in the client's time zone
- Pricing: fixed quote per project, delivered in writing within one business day of a quote request
- Process: written plan, design approval, build on a staging site, launch, recorded walkthrough at handover, 14 days of free fixes after launch
- Platforms: WordPress, Elementor, WooCommerce, Shopify, Laravel, Next.js
- Clients own their domain, hosting, content and code

## Services
${services.map(([n, s, d]) => `- [${n}](${site}/services/${s}): ${d}`).join("\n")}

## Markets we serve
${markets.map(([n, s]) => `- [Websites for ${n}](${site}/markets/${s})`).join("\n")}

## Case study
- [Gladiolaz: from a dead Shopify store to orders in 15 days](${site}/work/gladiolaz): Shopify rebuild, AutoDS dropshipping with Amazon and Alibaba suppliers, AI video ads and TikTok ads at $20/day; about 10 orders in the first 15 days at a $120 average order value.
${posts.length ? `\n## Guides\n${posts.map((p) => `- [${p.title}](${site}/blog/${p.slug}): ${p.description}`).join("\n")}\n` : ""}
## Other pages
- [Work and portfolio](${site}/work)
- [How pricing works](${site}/pricing)
- [About and founder](${site}/about)
- [Blog](${site}/blog)
- [Get a quote](${site}/contact)
`;

await writeFile(new URL("../public/llms.txt", import.meta.url), body);
console.log("llms.txt written");
