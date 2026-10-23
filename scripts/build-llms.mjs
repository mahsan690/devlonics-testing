// Generates public/llms.txt so AI assistants get an accurate, current summary
// of the business. Runs before every build, after build-content.mjs.
import { readFile, writeFile } from "node:fs/promises";

const site = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://devlonics.com");

// Kept in sync by hand with lib/services.ts, lib/markets.ts and lib/case-studies.ts.
const services = [
  ["Website design and redesign", "website-design", "Modern, phone-first websites for local service businesses, with tap-to-call, quote forms, reviews, service and town pages, and redirects so redesigns keep their rankings."],
  ["Reputation management", "reputation-management", "Automatic review requests after every job, replies to every review, low-rating alerts and monitoring across Google, Yelp and Facebook, within Google's and the FTC's rules."],
  ["Google Business Profile and local SEO", "google-business-profile", "Profile setup, optimization and weekly management, consistent business details, service-area pages and help with suspensions."],
  ["Lead generation and lead flow", "lead-generation", "Quote funnels and preferred-time booking steps that send every lead to email, phone and CRM in seconds, including unfinished forms."],
  ["Local ads", "local-ads", "Google Local Services Ads, Google search ads and Facebook and Instagram ads targeted to the service area, with call and conversion tracking."],
  ["Automation", "automation", "Missed-call text-back, AI receptionists for after-hours calls, follow-ups, reminders and review requests."],
];
const markets = [
  ["HVAC companies", "hvac"], ["plumbing companies", "plumbing"], ["roofing companies", "roofing"],
  ["cleaning companies", "cleaning"], ["contractors and remodelers", "contractors"],
  ["landscaping companies", "landscaping"], ["home care agencies and clinics", "home-care-and-clinics"],
];
const cases = [
  ["Florida Surface Pro: quote funnel and lead flow", "florida-surface-pro", "A WordPress quote funnel for a South Florida floor coating contractor that captures partial leads, asks for a preferred appointment time and sends every lead to email, a Google Sheet and Builder Prime CRM within seconds."],
  ["AI receptionist for an HVAC and plumbing company", "ai-voice-receptionist-home-services", "A 24/7 VAPI voice receptionist that answers, books jobs and escalates emergencies, with call summaries posted to Slack."],
  ["Lead-to-install sales system for a solar installer", "hubspot-solar-sales-system", "GoHighLevel to HubSpot migration, three pipelines, self-booked site surveys and coaching dashboards."],
  ["Google Ads reporting for a home improvement company", "ai-google-ads-reporting", "Daily automated analysis that flags wasted spend and ranks fixes by impact."],
  ["Booking automation for a med spa", "med-spa-clickup-automation", "Bookings, consent forms and reminders automated across two locations."],
  ["Clinic bookings on monday.com", "physiotherapy-monday-automation", "Bookings, patient records and reminders for three physiotherapy clinics."],
];

let posts = [];
try {
  posts = JSON.parse(await readFile(new URL("../lib/generated/posts.json", import.meta.url), "utf8"));
} catch {
  // Blog not compiled yet; skip the section.
}

const body = `# Devlonic Solutions

> Devlonic Solutions helps local service businesses in the US get more calls and booked jobs: website design and redesign, reputation management, Google Business Profile and local SEO, lead flows that send every enquiry to email and CRM, local ads and small automations. Every project has a fixed price agreed in writing before work starts. Founded and led by Muhammad Ahsan, a Top Rated developer on Upwork with 6+ years of experience and 100+ websites built.

## Key facts
- Contact: info@devlonics.com, +1 (773) 915-7523
- Who we work with: local service businesses only (HVAC, plumbing, roofing, cleaning, contractors and remodelers, landscaping, home care agencies and clinics)
- Service area: United States (remote team)
- Pricing: fixed quote per project or a fixed monthly fee for ongoing management, delivered in writing within one business day of a request; ad spend is paid to Google and Meta directly
- Process: written plan, approval, build on a staging site, launch, recorded walkthrough, 14 days of free fixes after launch
- Clients own their domain, website, Google Business Profile, ad accounts and leads

## Services
${services.map(([n, s, d]) => `- [${n}](${site}/services/${s}): ${d}`).join("\n")}

## Markets we serve
${markets.map(([n, s]) => `- [Marketing for ${n}](${site}/markets/${s})`).join("\n")}

## Case studies
${cases.map(([n, s, d]) => `- [${n}](${site}/work/${s}): ${d}`).join("\n")}
${posts.length ? `\n## Guides\n${posts.map((p) => `- [${p.title}](${site}/blog/${p.slug}): ${p.description}`).join("\n")}\n` : ""}
## Other pages
- [Work](${site}/work)
- [How pricing works](${site}/pricing)
- [About and founder](${site}/about)
- [Blog](${site}/blog)
- [Get a quote](${site}/contact)
`;

await writeFile(new URL("../public/llms.txt", import.meta.url), body);
console.log("llms.txt written");
