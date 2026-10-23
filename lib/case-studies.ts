// Case studies for local service businesses, shown at /work/<slug>.
// Florida Surface Pro is the flagship: details come from the founder's own
// project notes. The others come from his case studies document. Stats are
// build facts (steps, coverage, response time), not client-reported results.
// Covers live in public/case-studies/<slug>.webp (4:3).

export type CaseStudy = {
  slug: string;
  client?: string; // named only where the founder names the client
  url?: string;
  title: string; // H1 on the case study page
  card: string; // short title for cards
  headline?: string; // big statement for features
  industry: string;
  services: string[]; // service slugs in lib/services.ts
  summary: string;
  cardLine?: string; // shorter line for cards, when the summary is long
  problem: string;
  built: string;
  features?: { title: string; body: string }[];
  flow?: { title: string; body: string }[];
  result: string;
  stats: { value: string; label: string }[];
  stack: string[];
  extra?: { title: string; body: string }; // related work for the same client
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "florida-surface-pro",
    client: "Florida Surface Pro",
    url: "https://floridasurfacepro.com",
    title: "Florida Surface Pro: a quote funnel that sends every lead to the CRM in seconds",
    card: "Florida Surface Pro: quote funnel and lead flow",
    headline: "Every quote request in the CRM within seconds, even the unfinished ones.",
    industry: "Concrete floor coatings, South Florida",
    services: ["lead-generation", "website-design", "automation"],
    summary:
      "Florida Surface Pro installs epoxy, polyurea and other concrete floor coatings across South Florida. We rebuilt their ad landing page as a quote funnel on their own WordPress site and connected it to their inbox, a Google Sheet and their Builder Prime CRM.",
    cardLine: "A quote funnel on their own site that sends every lead to email, a Google Sheet and Builder Prime in seconds.",
    problem:
      "Their ads sent homeowners to a multi-step quote form hosted on a separate page, outside their own website. Every lead arrived as an email and had to be moved into Builder Prime, their CRM, before anyone acted on it. Visitors who stopped halfway through the form were lost, and there was no way for a customer to say when they wanted their free estimate.",
    built:
      "We rebuilt the funnel as a custom WordPress plugin at floridasurfacepro.com/free-quote, matching the original design and keeping their tracking and SEO plugins working. Then we rebuilt what happens after someone presses the button.",
    features: [
      { title: "The same funnel, on their own site", body: "Four quick questions with big tap targets, loading instantly on a phone. Ad traffic now lands on their own domain." },
      { title: "Contact details before the address", body: "Name, phone and email come early. If a visitor stops, the partial lead is sent to the team ten minutes later unless they finish first." },
      { title: "A preferred appointment step", body: "Three date tiles from two days out, an ASAP option or any date on a calendar, then a time inside their working hours. Hours and days off are editable." },
      { title: "Straight into Builder Prime", body: "Every finished lead becomes a client in Builder Prime within seconds, with the status, source, requested time, project details and ad source filled in." },
      { title: "Email alerts in their own words", body: "The team gets \"Lead received\" and \"Appointment booked\" emails, named to match how their office already talks about leads." },
      { title: "A backup of every lead", body: "Each lead is saved in WordPress with CSV export and logged to a Google Sheet, with spam blocked and repeat contacts flagged." },
    ],
    flow: [
      { title: "Ad click", body: "Paid ads land on the quote page on their own website." },
      { title: "Quote funnel", body: "Four questions, contact details, then a preferred day and time." },
      { title: "Lead delivered", body: "Email to the team, a row in Google Sheets and a new client in Builder Prime." },
      { title: "Call to confirm", body: "Their call center rings back with the details and requested time already in the CRM." },
    ],
    result:
      "Every lead, finished or not, now reaches the team and the CRM automatically, with the requested time and ad source attached. The office calls back to confirm instead of retyping details, and the funnel lives on their own website where they control it.",
    stats: [
      { value: "4", label: "questions to a free estimate request" },
      { value: "Seconds", label: "from form to a client in Builder Prime" },
      { value: "10 min", label: "until an unfinished lead is sent to the team" },
      { value: "0", label: "leads typed into the CRM by hand" },
    ],
    stack: ["WordPress", "Custom plugin (PHP, JavaScript)", "Builder Prime API", "Google Sheets", "Email alerts", "Google reviews widget"],
    extra: {
      title: "Also for Florida Surface Pro",
      body: "Earlier in 2026 we redesigned the iPad sales presentation their reps use in homeowners' homes, including new process pages for each coating system. We're now redesigning their main website, with the booking form on the homepage.",
    },
    featured: true,
  },
  {
    slug: "ai-voice-receptionist-home-services",
    title: "AI voice receptionist for an HVAC and plumbing company, answering calls 24/7",
    card: "AI receptionist for HVAC and plumbing",
    industry: "HVAC and plumbing",
    services: ["automation", "lead-generation"],
    summary: "Every call answered and booked, day or night, from the company's own service data.",
    problem:
      "An HVAC and plumbing company was missing calls after hours and losing hours every day answering the same questions about service areas, pricing, availability and booking.",
    built:
      "We built a 24/7 AI voice receptionist on VAPI, connected to the company's service list, price ranges, coverage areas and FAQ data. It talks naturally, handles follow-up questions, books jobs into open calendar slots and transfers genuine emergencies to the on-call technician. When a call ends, a webhook triggers n8n to post a call summary to Slack and log the lead in Google Sheets.",
    result: "Every call answered, day or night, with booked jobs and lead details captured without anyone picking up the phone.",
    stats: [
      { value: "24/7", label: "call coverage, nights and weekends included" },
      { value: "2", label: "call routes: book the job or escalate" },
      { value: "100%", label: "of calls summarized in Slack" },
    ],
    stack: ["VAPI", "n8n", "Slack", "Google Sheets", "Google Calendar", "Webhooks"],
    featured: true,
  },
  {
    slug: "hubspot-solar-sales-system",
    title: "Lead-to-install sales system for a residential solar installer",
    card: "Lead flow for a solar installer",
    industry: "Residential solar",
    services: ["lead-generation", "automation"],
    summary: "Lead-to-install pipelines, a GoHighLevel to HubSpot move and coaching dashboards.",
    problem:
      "A residential solar installer was running on GoHighLevel, with pipeline stages the sales team ignored and follow-ups buried in the owner's inbox.",
    built:
      "We mapped the lead-to-installation journey with the operations director, then rebuilt it in HubSpot: lead stages that mirror how a solar job moves from enquiry to site survey to install, three pipelines with stage-duration reminders, a meetings link so homeowners book their own site survey, and a full GoHighLevel migration with email and calendar synced.",
    result: "Activity and deal-velocity dashboards for sales coaching, and segmented email follow-ups driven by lead scoring.",
    stats: [
      { value: "3", label: "sales pipelines" },
      { value: "6", label: "lifecycle stages" },
      { value: "1", label: "GoHighLevel to HubSpot migration" },
      { value: "6", label: "workstreams delivered" },
    ],
    stack: ["HubSpot Sales Hub Pro", "HubSpot Marketing Hub", "GoHighLevel migration"],
    featured: true,
  },
  {
    slug: "ai-google-ads-reporting",
    title: "Automated Google Ads reporting for a home improvement company",
    card: "Google Ads reporting for home improvement",
    industry: "Home improvement",
    services: ["local-ads", "automation"],
    summary: "Daily automated analysis that flags wasted ad spend and ranks fixes by expected impact.",
    problem:
      "PPC managers at a home improvement company were losing most of a working day each week exporting Google Ads campaign, ad group and keyword data by hand, and wasted spend was spotted far too late.",
    built:
      "We built an automated reporting layer that pulls every metric from the Google Ads API, then uses AI to flag low click-through rates, weak returns, rising cost per lead and wasted search terms, and recommends budget, bidding, keyword and ad copy fixes ranked by expected impact. Alerts fire the moment a number drifts.",
    result: "Weekly reporting became a short review, weak ads and keywords are caught as they happen, and the account can grow past 50 ad groups without extra staff.",
    stats: [
      { value: "1/day", label: "data refresh" },
      { value: "100%", label: "of campaigns checked" },
      { value: "50+", label: "ad groups covered" },
      { value: "4", label: "fix types ranked by impact" },
    ],
    stack: ["n8n", "Google Ads API", "OpenAI", "Google Sheets", "Slack"],
  },
  {
    slug: "med-spa-clickup-automation",
    title: "Booking, consent form and reminder automation for a two-location med spa",
    card: "Booking automation for a med spa",
    industry: "Med spa",
    services: ["automation"],
    summary: "Bookings, consent forms and reminders automated end to end across two locations.",
    problem:
      "A med spa with two locations was booking treatments, chasing consent and intake forms, and tracking pre-treatment checks by hand across phone calls, email and a pile of separate apps.",
    built:
      "We set up a ClickUp workspace that does the chasing for them: Calendly bookings drop into lists sorted by location and treatment type, missing JotForm consent forms trigger email and text reminders sent through RingCentral, treatment notes attach to the right client, and cancellations sync both ways with Calendly.",
    result: "One master schedule across both sites, reminders that go out on their own, and finished appointments that archive themselves.",
    stats: [
      { value: "2", label: "locations" },
      { value: "5", label: "tools connected" },
      { value: "8+", label: "automated workflows" },
      { value: "1", label: "master appointment list" },
    ],
    stack: ["ClickUp", "Calendly", "JotForm", "RingCentral"],
  },
  {
    slug: "physiotherapy-monday-automation",
    title: "Booking and reminder automation for a physiotherapy clinic group",
    card: "Clinic bookings on monday.com",
    industry: "Physiotherapy clinics",
    services: ["automation"],
    summary: "Bookings, patient records and reminders for three clinics in one automated workspace.",
    problem:
      "A physiotherapy group with three clinics was booking sessions, keeping patient notes and chasing follow-ups by hand across several disconnected tools, which meant double-booked therapists and reminders that never went out.",
    built:
      "We moved the operation onto monday.com: bookings that land automatically on boards by clinic and treatment type, Calendly syncing new bookings and cancellations in real time, email and text reminders, a central patient records board with role-based access, and automated follow-up and referral workflows.",
    result: "Booking, records, reminders and referrals now run end to end from one workspace.",
    stats: [
      { value: "3", label: "clinic locations" },
      { value: "4", label: "workflows automated" },
      { value: "3", label: "booking and reminder integrations" },
      { value: "1", label: "central patient workspace" },
    ],
    stack: ["monday.com", "Calendly", "Email", "SMS"],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const caseStudiesFor = (service: string) => caseStudies.filter((c) => c.services.includes(service));
export const flagship = caseStudies[0];
