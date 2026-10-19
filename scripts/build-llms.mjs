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
// Kept in sync by hand with lib/ai.ts.
const aiCases = [
  ["AI voice receptionist for an HVAC and plumbing company", "ai-voice-receptionist-home-services", "VAPI voice agent that answers 24/7, books jobs and escalates emergencies; n8n posts call summaries to Slack."],
  ["AI WhatsApp assistant for an auto parts retailer", "ai-whatsapp-assistant-auto-parts", "n8n, OpenAI and a Supabase vector store answering text, voice notes and photos on WhatsApp."],
  ["AI lead qualification agent for a freight forwarder", "ai-lead-qualification-freight", "GPT-4.1 scores and routes inbound quotes in under 2 seconds, with Slack alerts and Airtable sync."],
  ["PatientFlow AI for medical tourism clinics", "patientflow-ai-medical-tourism", "Multi-language enquiry classification and WhatsApp replies with GPT-4o, in under 3 seconds."],
  ["AI abandoned cart recovery for WooCommerce", "ai-abandoned-cart-recovery", "n8n and OpenAI write a personalized recovery email for every abandoned checkout."],
  ["AI-powered Google Ads reporting", "ai-google-ads-reporting", "Daily Google Ads API analysis that flags wasted spend and ranks fixes by impact."],
  ["AI warranty claim approval", "ai-warranty-claim-approval", "Make.com and OpenAI decide warranty claims against policy in under 30 seconds."],
  ["AI product photography automation", "ai-product-photography-automation", "n8n and Gemini turn one product photo into eight studio and room shots."],
  ["HubSpot for an engineering consultancy", "hubspot-engineering-consultancy", "8-stage pipeline, BANT scoring and Make.com links to Better Proposal, Xero and Asana."],
  ["HubSpot for a bookkeeping firm", "hubspot-bookkeeping-onboarding", "Deals open when a call is booked; a 6-stage onboarding pipeline starts when a deal is won."],
  ["HubSpot growth engine for an edtech platform", "hubspot-edtech-growth-engine", "Four audience pipelines, dunning and win-back flows, and MRR dashboards by plan and channel."],
  ["HubSpot for a residential solar installer", "hubspot-solar-sales-system", "GoHighLevel migration, three pipelines and sales coaching dashboards."],
  ["Airtable account health system", "airtable-account-health-system", "11-table base syncing HubSpot, Zendesk and Stripe with a nightly health score."],
  ["monday.com for a physiotherapy clinic group", "physiotherapy-monday-automation", "Bookings, patient records, reminders and referrals for three clinics."],
  ["ClickUp for a two-location med spa", "med-spa-clickup-automation", "Calendly, JotForm and RingCentral automated around one master schedule."],
  ["ClickUp operations for a print-on-demand brand", "print-on-demand-clickup-operations", "Five departments, 14 lists and 20+ automations synced with Shopify."],
  ["Stayline vacation rental dashboard", "stayline-vacation-rental-dashboard", "Full-stack MERN dashboard with live KPIs, listings and Google sign-in."],
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

> Devlonic Solutions is a remote web design, development and AI automation studio that builds websites, Shopify stores, apps, custom software and AI agents for US service businesses and ecommerce brands, and runs SEO and paid ads (TikTok, Meta, Google) for them. Every project has a fixed price agreed in writing before work starts. Founded and led by Muhammad Ahsan, a Top Rated WordPress and Shopify developer on Upwork with 6+ years of experience and 100+ websites and stores built.

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

## AI automation
- [AI automation services](${site}/ai): AI voice agents and receptionists, WhatsApp and website chatbots, n8n and Make.com workflow automation, HubSpot, GoHighLevel and Airtable CRM systems, ClickUp and monday.com operations workspaces, and custom AI apps. Free audit, then a fixed price.
${aiCases.map(([n, s, d]) => `- [${n}](${site}/ai/case-studies/${s}): ${d}`).join("\n")}

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
