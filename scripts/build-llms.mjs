// Generates public/llms.txt from the site data so AI assistants get an
// accurate, current summary of the business. Runs before every build.
import { writeFile } from "node:fs/promises";

const site = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://devlonics.com");

// Kept in sync by hand with lib/services.ts and lib/states.ts (slugs only).
const services = [
  ["Lead generation websites", "lead-generation-websites", "Websites for contractors, home services, clinics and local businesses, built to turn visitors into calls, quote requests and bookings."],
  ["Small business websites", "small-business-websites", "Custom-designed, mobile-first websites that are easy to edit and SEO-ready."],
  ["Online stores", "online-stores", "Shopify and WooCommerce stores with Stripe, PayPal, Apple Pay and Google Pay checkout, shipping and inventory setup."],
  ["Web and mobile apps", "app-development", "iPhone, Android and web apps for bookings, memberships, ordering and customer accounts."],
  ["Custom software", "custom-software", "CRMs, client portals, booking systems and dashboards built in Laravel and Next.js."],
  ["SEO and marketing", "seo-and-marketing", "Local SEO, Google Business Profile, answer engine optimization (AEO) and paid ads on Google, Meta and TikTok."],
];
const states = [["New Jersey", "new-jersey"], ["Texas", "texas"], ["Florida", "florida"]];

const body = `# Devlonic Solutions

> Devlonic Solutions is a remote web design and development studio that builds websites, online stores, apps and custom software for small businesses in the United States, with a focus on New Jersey, Texas and Florida. Every project has a fixed price agreed in writing before work starts. Founded and led by Muhammad Ahsan, a Top Rated developer on Upwork with 5+ years of experience.

## Key facts
- Contact: info@devlonics.com, +1 (201) 471-3717
- Service area: United States (remote), with dedicated local SEO research for New Jersey, Texas and Florida
- No physical office; projects run remotely with calls in the client's time zone
- Pricing: fixed quote per project, delivered in writing within one business day of a quote request
- Platforms: WordPress, Elementor, WooCommerce, Shopify, Laravel, Next.js
- Clients own their domain, hosting, content and code

## Services
${services.map(([n, s, d]) => `- [${n}](${site}/services/${s}): ${d}`).join("\n")}

## Areas served
${states.map(([n, s]) => `- [Web design in ${n}](${site}/web-design/${s})`).join("\n")}

## Other pages
- [Work and case studies](${site}/work)
- [How pricing works](${site}/pricing)
- [About](${site}/about)
- [Get a quote](${site}/contact)
`;

await writeFile(new URL("../public/llms.txt", import.meta.url), body);
console.log("llms.txt written");
