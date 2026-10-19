import type { Faq } from "./services";

// The AI automation offer: the /ai landing page and its case study pages.
// Case study copy comes from the founder's own case studies document.
// Stats are build facts (workflows, pipelines, response time), not
// client-reported results. Images live in public/ai/<slug>.webp (4:3).

export type AiCategory = "agents" | "automation" | "crm" | "operations" | "apps";

export const aiCategories: { id: AiCategory; label: string; short: string }[] = [
  { id: "agents", label: "AI voice and chat agents", short: "Voice and chat agents" },
  { id: "automation", label: "AI workflow automation", short: "Workflow automation" },
  { id: "crm", label: "CRM systems", short: "CRM systems" },
  { id: "operations", label: "Operations and ERP workspaces", short: "Operations and ERP" },
  { id: "apps", label: "Custom AI apps and dashboards", short: "Custom AI apps" },
];

export type AiCaseStudy = {
  slug: string;
  title: string; // H1 on the case study page
  card: string; // short title on cards
  category: AiCategory;
  industry: string;
  summary: string; // one line on cards and in meta descriptions
  problem: string;
  built: string;
  result: string;
  stack: string[];
  stats?: { value: string; label: string }[];
  featured?: boolean;
};

export const aiCaseStudies: AiCaseStudy[] = [
  {
    slug: "ai-voice-receptionist-home-services",
    title: "AI voice receptionist for an HVAC and plumbing company, answering calls 24/7",
    card: "AI voice receptionist, 24/7",
    category: "agents",
    industry: "HVAC and plumbing",
    summary: "Every call answered and booked, day or night, from the company's own service data.",
    problem:
      "An HVAC and plumbing company was missing calls after hours and losing hours every day answering the same questions about service areas, pricing, availability and booking.",
    built:
      "We built a 24/7 AI voice receptionist on VAPI, connected to the company's service list, price ranges, coverage areas and FAQ data. It talks naturally, handles follow-up questions, books jobs into open calendar slots and transfers genuine emergencies to the on-call technician. When a call ends, a webhook triggers n8n to post a call summary to Slack and log the lead in Google Sheets.",
    result: "Every call answered, day or night, with booked jobs and lead details captured without anyone picking up the phone.",
    stack: ["VAPI", "n8n", "Slack", "Google Sheets", "Google Calendar", "Webhooks"],
    stats: [
      { value: "24/7", label: "call coverage, nights and weekends included" },
      { value: "2", label: "call routes: book the job or escalate" },
      { value: "100%", label: "of calls summarized in Slack" },
    ],
    featured: true,
  },
  {
    slug: "ai-whatsapp-assistant-auto-parts",
    title: "AI customer support assistant on WhatsApp for an auto parts retailer",
    card: "AI WhatsApp assistant, 24/7",
    category: "agents",
    industry: "Auto parts retail",
    summary: "Always-on parts support that understands text, voice notes and photos.",
    problem:
      "An auto parts retailer was answering a constant stream of WhatsApp messages by hand, most of them repeat questions about part fitment, prices, stock and returns.",
    built:
      "We built an AI assistant on the WhatsApp Cloud API. An n8n webhook sorts every incoming message by type: text goes straight to the agent, voice notes get transcribed, and photos of parts get analyzed. The agent answers from a Supabase vector store of products, vehicle fitment data, FAQs and policies, then replies as text or voice, passing anything unclear to a staff member.",
    result: "Routine questions answered automatically around the clock, and the counter team free to handle the orders that need a person.",
    stack: ["n8n", "OpenAI", "Supabase Vector Store", "WhatsApp Cloud API", "Webhooks"],
    stats: [
      { value: "24/7", label: "replies on WhatsApp, no queue" },
      { value: "3", label: "message types: text, voice and photo" },
      { value: "1", label: "knowledge base for parts, fitment and policy" },
    ],
    featured: true,
  },
  {
    slug: "ai-lead-qualification-freight",
    title: "AI lead qualification and quote routing agent for a freight forwarder",
    card: "AI lead qualification agent",
    category: "agents",
    industry: "Freight forwarding",
    summary: "Inbound freight quotes scored, enriched and routed to the right rep in under 2 seconds.",
    problem:
      "Inbound freight quote requests had to be read, judged and passed on by hand, so a hot quote could wait hours before the rep who owned that trade lane saw it.",
    built:
      "An end-to-end system that scores, enriches and routes inbound quote requests. GPT-4.1 assesses each request on 5 dimensions (shipment value, urgency, intent, ICP fit and contact quality), returns a score from 0 to 100, and labels it HOT, WARM or COLD. HOT requests fire an instant Slack alert to the rep who owns that trade lane, with company enrichment attached; WARM requests join a nurture queue; COLD ones archive themselves. It also includes Airtable CRM sync, a rule-based fallback so scoring never stops, duplicate-request detection and a live analytics dashboard, all orchestrated with Node.js, Express and n8n.",
    result: "Hot quotes reach the right rep in seconds instead of hours, and scoring keeps running even if the AI service is down.",
    stack: ["Node.js", "Express", "OpenAI GPT-4.1", "n8n", "Slack", "Airtable"],
    stats: [
      { value: "< 2s", label: "end-to-end lead analysis" },
      { value: "12-field", label: "structured AI output per lead" },
      { value: "100%", label: "uptime with rule-based fallback" },
    ],
    featured: true,
  },
  {
    slug: "patientflow-ai-medical-tourism",
    title: "PatientFlow AI: lead automation SaaS for medical tourism clinics",
    card: "PatientFlow AI for clinics",
    category: "apps",
    industry: "Medical tourism clinics",
    summary: "Every patient enquiry classified and answered on WhatsApp in the patient's language, in seconds.",
    problem:
      "Medical tourism clinics in Istanbul receive enquiries in English, Arabic, German and Russian at every hour of the day, and each one needs a fast answer in the patient's own language.",
    built:
      "A multi-tenant SaaS platform that automates enquiry handling. Each inbound enquiry is captured via API, classified by GPT-4o (language, treatment interest, hot, warm or cold), answered on WhatsApp in the patient's own language, and assigned to a patient coordinator by round-robin. It adds clinic owner and coordinator dashboards, Stripe billing with 7-day trials, follow-up automation and two-way WhatsApp conversations.",
    result: "Every enquiry captured, classified, answered and assigned to a coordinator in under 3 seconds.",
    stack: ["React", "Node.js", "Express", "Firebase", "OpenAI GPT-4o", "WhatsApp Cloud API", "Stripe"],
    stats: [
      { value: "< 3s", label: "from enquiry to WhatsApp reply" },
      { value: "4", label: "languages answered automatically" },
      { value: "7-day", label: "free trials with Stripe billing" },
    ],
  },
  {
    slug: "ai-abandoned-cart-recovery",
    title: "AI abandoned cart recovery for a WooCommerce skincare store",
    card: "AI abandoned cart recovery",
    category: "automation",
    industry: "Skincare ecommerce",
    summary: "Every abandoned WooCommerce checkout gets a personalized follow-up email.",
    problem:
      "Abandoned checkouts on a skincare brand's WooCommerce store were either chased one by one or ignored, which meant hours of manual follow-up every week or revenue quietly walking away.",
    built:
      "We built an n8n automation that watches WooCommerce for abandoned checkouts, waits a set window so shoppers are never spammed, checks again that the order still wasn't completed, then has OpenAI write a personalized recovery email based on the products left in the cart and sends it through Gmail. No dashboard to watch, nothing to click.",
    result: "Every abandoned cart now gets a recovery attempt, emails go out within minutes instead of hours, and the manual chasing is gone.",
    stack: ["WooCommerce", "n8n", "OpenAI", "Gmail"],
    stats: [
      { value: "100%", label: "of abandoned carts get a recovery attempt" },
      { value: "0", label: "manual follow-ups, no dashboards to watch" },
      { value: "1:1", label: "emails written from each cart's products" },
    ],
  },
  {
    slug: "ai-google-ads-reporting",
    title: "AI-powered Google Ads reporting: a day of analysis turned into a daily automated report",
    card: "AI-powered Google Ads reporting",
    category: "automation",
    industry: "Home improvement",
    summary: "Daily automated analysis that flags wasted spend and ranks fixes by expected impact.",
    problem:
      "PPC managers at a home improvement company were losing most of a working day each week exporting Google Ads campaign, ad group and keyword data by hand, and wasted spend was spotted far too late.",
    built:
      "We built an automated reporting layer that pulls every metric from the Google Ads API and normalizes it, then uses AI to flag low CTR, weak ROAS, rising CPA and search-term waste, and recommends budget, bidding, keyword and ad copy fixes ranked by expected impact. Alerts fire the moment a KPI drifts, and changes can be requested in plain English.",
    result: "Weekly reporting becomes a short review, underperforming ads and keywords are caught as they happen, and the account can grow past 50 ad groups without extra headcount.",
    stack: ["n8n", "Google Ads API", "OpenAI", "Google Sheets", "Slack"],
    stats: [
      { value: "1/day", label: "data refresh" },
      { value: "100%", label: "of campaigns checked" },
      { value: "50+", label: "ad groups covered" },
      { value: "4", label: "fix types ranked by impact" },
    ],
  },
  {
    slug: "ai-warranty-claim-approval",
    title: "AI-powered warranty claim approval system for a consumer electronics brand",
    card: "AI warranty claim approval",
    category: "automation",
    industry: "Consumer electronics",
    summary: "Warranty claims checked, decided and answered automatically in under 30 seconds.",
    problem:
      "A consumer electronics support team was working through dozens of warranty claims a day by hand: matching serial numbers and purchase dates in spreadsheets, judging each fault against the warranty terms, then writing back to the customer. Every claim took several minutes, and the outcome often depended on who picked it up.",
    built:
      "We built a Make.com scenario where a Google Form submission triggers a serial-number and purchase-date lookup in Google Sheets, an AI policy check that approves, rejects or flags the claim for human review, a logged decision for audit, and an instant Gmail reply to the customer.",
    result: "A decision in under 30 seconds, every claim judged against the same rules, and a full audit trail without extra admin.",
    stack: ["Make.com", "Google Forms", "Google Sheets", "OpenAI", "Gmail"],
    stats: [
      { value: "< 30s", label: "decision time per claim" },
      { value: "100%", label: "of claims judged against the same policy" },
      { value: "5", label: "steps automated, form to inbox" },
    ],
  },
  {
    slug: "ai-product-photography-automation",
    title: "AI product photography automation for furniture and home decor",
    card: "AI product photo automation",
    category: "automation",
    industry: "Furniture and home decor",
    summary: "One product photo in, a full catalog shoot out, with no manual prompting.",
    problem:
      "Catalog imagery for furniture and decor takes studio time and hours of prompt writing for every product, and keeping the look consistent across a whole range is hard.",
    built:
      "An n8n workflow where a furniture or decor item is uploaded through a form. The workflow reads its material, color and style, writes a creative brief, and calls Google Gemini to place it in photorealistic room settings. It produces clean ecommerce studio shots (front, three-quarter, side and close-up detail) plus lifestyle scenes in living, bedroom and dining spaces, checks each image against the brief, and saves everything to the right Google Drive folder with consistent file names.",
    result: "Far less creative and prompt-writing time, product visuals that stay consistent and on-brand, and the same process for 1 product or 1,000.",
    stack: ["n8n", "Gemini Image API", "Google Drive"],
    stats: [
      { value: "8", label: "studio and room shots from one photo" },
      { value: "1–1,000", label: "products per run, same quality bar" },
      { value: "100%", label: "of images filed to the right Drive folder" },
    ],
  },
  {
    slug: "hubspot-engineering-consultancy",
    title: "HubSpot sales pipeline and marketing automation for an engineering consultancy",
    card: "HubSpot for an engineering consultancy",
    category: "crm",
    industry: "Engineering consultancy",
    summary: "Every enquiry becomes a scored, owned deal, then a project, across five service lines.",
    problem:
      "A structural and civil engineering consultancy with five service lines needed one sales process, without copying data between its proposal, invoicing and project tools by hand.",
    built:
      "We set up a complete HubSpot RevOps system: a mapped sales process, an 8-stage task-driven deal pipeline, automated lifecycle stage updates, BANT lead scoring and five service-line nurture workflows. Through Make.com we connected HubSpot to Better Proposal, Xero and Asana, so proposal tracking, invoicing and new project boards happen without anyone copying data between tools.",
    result: "Clear pipeline visibility, far fewer manual follow-ups, and a sales process where every deal stage has an owner and a next step.",
    stack: ["HubSpot Sales Hub", "HubSpot Marketing Hub", "Make.com", "Better Proposal", "Xero", "Asana"],
    stats: [
      { value: "5", label: "service lines" },
      { value: "8", label: "deal stages" },
      { value: "5", label: "nurture workflows" },
      { value: "3", label: "tools connected" },
    ],
  },
  {
    slug: "hubspot-bookkeeping-onboarding",
    title: "HubSpot sales pipeline and client onboarding automation for a bookkeeping firm",
    card: "HubSpot for a bookkeeping firm",
    category: "crm",
    industry: "Bookkeeping firm",
    summary: "A deal opens the moment a call is booked, then runs automatically to onboarded.",
    problem:
      "An outsourced bookkeeping firm booked every discovery call through Calendly, yet HubSpot only learned a deal existed when someone remembered to log it after the call. No-shows, lost-deal reasons, engagement letter follow-ups and a nine-step onboarding checklist all relied on memory and Slack threads.",
    built:
      "We rebuilt the entire journey inside HubSpot: a 12-stage sales pipeline that opens a deal the moment a call is booked, with the lead source captured on entry, and a 6-stage onboarding pipeline that starts as soon as a deal is won. Around it sit 5 sequences, 10 active lists, 8 leadership reports and Fathom call summaries logged to each record.",
    result: "No deal goes unlogged, onboarding starts on its own, and Slack flags every stage change and stalled deal.",
    stack: ["HubSpot Sales Hub", "HubSpot Marketing Hub", "Calendly", "Slack", "Fathom"],
    stats: [
      { value: "2", label: "pipelines" },
      { value: "18", label: "stages" },
      { value: "5", label: "sequences" },
      { value: "8", label: "leadership reports" },
    ],
  },
  {
    slug: "hubspot-edtech-growth-engine",
    title: "HubSpot growth engine for a 5-plan edtech tutoring platform",
    card: "HubSpot growth engine for edtech",
    category: "crm",
    industry: "EdTech tutoring platform",
    summary: "Five plans, three audiences, one HubSpot engine with MRR tracked by plan and channel.",
    problem:
      "An online tutoring platform relaunched with five subscription plans for parents, tutors and schools. HubSpot held a single contact list, and revenue could only be seen inside Stripe.",
    built:
      "We built the full go-to-market engine across three hubs: four audience pipelines, a 38-property subscription data model, lead scoring with a hot-lead threshold, the relaunch campaign across email, SMS, social and PR, three audience-specific nurtures, trial-to-paid sequences, failed-payment dunning and win-back flows, and UTM attribution.",
    result: "Leadership reviews MRR dashboards every week, broken down by plan and channel.",
    stack: ["HubSpot Sales Hub", "HubSpot Marketing Hub", "HubSpot Service Hub", "Stripe"],
    stats: [
      { value: "3", label: "HubSpot hubs" },
      { value: "4", label: "audience pipelines" },
      { value: "38", label: "subscription properties" },
      { value: "5", label: "plans tracked" },
    ],
  },
  {
    slug: "hubspot-solar-sales-system",
    title: "HubSpot sales process and performance reporting for a residential solar installer",
    card: "HubSpot for a solar installer",
    category: "crm",
    industry: "Residential solar",
    summary: "Lead-to-install pipelines, a GoHighLevel migration and coaching dashboards.",
    problem:
      "A residential solar installer was running on GoHighLevel, with pipeline stages the sales team ignored and follow-ups buried in the owner's inbox.",
    built:
      "We mapped the lead-to-installation journey with the operations director, then rebuilt it in HubSpot: lifecycle and lead stages that mirror how a solar job moves from enquiry to site survey to install, three pipelines with stage-duration reminders, a meetings link so homeowners self-book their site survey, and a full GoHighLevel migration with email and calendar synced.",
    result: "Activity and deal-velocity dashboards for sales coaching, and segmented email campaigns driven by lead scoring.",
    stack: ["HubSpot Sales Hub Pro", "HubSpot Marketing Hub Starter", "GoHighLevel migration"],
    stats: [
      { value: "3", label: "sales pipelines" },
      { value: "6", label: "lifecycle stages" },
      { value: "1", label: "GoHighLevel to HubSpot migration" },
      { value: "6", label: "workstreams delivered" },
    ],
  },
  {
    slug: "airtable-account-health-system",
    title: "Airtable account health system for a managed IT services provider",
    card: "Account health system on Airtable",
    category: "crm",
    industry: "Managed IT services",
    summary: "One Airtable workspace replacing five disconnected tools, with a nightly health score.",
    problem:
      "A managed IT services provider was tracking client accounts across five tools that never spoke to each other (HubSpot, Zendesk, Stripe, an RMM monitoring dashboard and Google Sheets), so an unhappy client usually came to light only when the contract was up for renewal.",
    built:
      "We replaced that patchwork with one Airtable workspace: an 11-table relational base with Accounts at the center, one-way syncs from Stripe, Zendesk and HubSpot, an account health score recalculated every night, and three Interfaces for account managers and leadership.",
    result: "Nine automations launch retention playbooks and post Slack alerts well before risk turns into a cancellation call.",
    stack: ["Airtable", "HubSpot", "Zendesk", "Stripe", "Slack"],
    stats: [
      { value: "11", label: "linked tables" },
      { value: "4", label: "tools synced" },
      { value: "3", label: "role-based interfaces" },
      { value: "9", label: "automations live" },
    ],
  },
  {
    slug: "physiotherapy-monday-automation",
    title: "monday.com automation for a physiotherapy clinic group",
    card: "Physiotherapy operations on monday.com",
    category: "operations",
    industry: "Physiotherapy clinics",
    summary: "Bookings, patient records and reminders for three clinics in one automated workspace.",
    problem:
      "A physiotherapy group with three clinics was booking sessions, keeping patient notes and chasing follow-ups by hand across several disconnected tools, which meant double-booked therapists and reminders that never went out.",
    built:
      "We moved the whole operation onto monday.com: appointment intake that lands automatically on boards grouped by clinic and treatment type, Calendly syncing new bookings and cancellations in real time, email and SMS reminders, a central patient records board with role-based access, and automated follow-up and referral workflows.",
    result: "Booking, records, reminders and referrals now run end to end from one workspace.",
    stack: ["monday.com", "Calendly", "Email", "SMS"],
    stats: [
      { value: "3", label: "clinic locations" },
      { value: "4", label: "workflows automated" },
      { value: "3", label: "booking and reminder integrations" },
      { value: "1", label: "central patient workspace" },
    ],
  },
  {
    slug: "med-spa-clickup-automation",
    title: "ClickUp automation for a two-location med spa",
    card: "Med spa operations on ClickUp",
    category: "operations",
    industry: "Med spa",
    summary: "Bookings, consent forms and reminders automated end to end across two locations.",
    problem:
      "A med spa with two locations was booking treatments, chasing consent and intake forms, and tracking pre-treatment checks by hand across phone calls, email and a pile of separate apps.",
    built:
      "We set up a ClickUp workspace that does the chasing for them: Calendly bookings drop into lists sorted by location and treatment type, missing JotForm consent forms trigger email and SMS reminders sent through RingCentral, treatment notes from the practitioner's inbox attach to the right client task, and cancellations sync both ways with Calendly.",
    result: "A master schedule gives the front desk visibility across both sites, reminders go out on their own, and finished appointments archive themselves.",
    stack: ["ClickUp", "Calendly", "JotForm", "RingCentral"],
    stats: [
      { value: "2", label: "spa locations" },
      { value: "5", label: "tools integrated" },
      { value: "8+", label: "automated workflows" },
      { value: "1", label: "master appointment list" },
    ],
  },
  {
    slug: "print-on-demand-clickup-operations",
    title: "ClickUp operations workspace for a print-on-demand apparel brand",
    card: "E-commerce operations on ClickUp",
    category: "operations",
    industry: "Print-on-demand apparel",
    summary: "A whole print-on-demand operation, from orders to ads, in one structured workspace.",
    problem:
      "A print-on-demand apparel brand was running order fulfillment, customer support, design uploads, ad campaigns and store upkeep out of loose notes and group chats, with no shared system to hold it together.",
    built:
      "We built one ClickUp workspace that splits the operation into five departments and fourteen task lists, each carrying the custom fields the team actually tracks, from order status, SKU and print provider to campaign ROAS and site health checks.",
    result: "Shopify orders import automatically, misprints and refund requests escalate on their own, low blank-stock alerts start reordering, approved designs move straight to the listing team, and SOP templates keep every process consistent.",
    stack: ["ClickUp", "Shopify"],
    stats: [
      { value: "5", label: "departments" },
      { value: "14", label: "task lists" },
      { value: "6", label: "SOP templates" },
      { value: "20+", label: "automations" },
    ],
  },
  {
    slug: "stayline-vacation-rental-dashboard",
    title: "Stayline: vacation rental management dashboard, built full-stack on MERN",
    card: "Stayline vacation rental dashboard",
    category: "apps",
    industry: "Short-term rentals",
    summary: "Listings, property managers, bookings and performance data in one live dashboard.",
    problem:
      "A short-term rental company had its listings, property managers, bookings and performance data in separate places, with no single view of how the business was doing.",
    built:
      "We built the full MERN stack: live KPI tiles, a revenue chart and booking-channel analytics, plus complete listing management with photo uploads to Cloudinary. Google sign-in gives each property manager passwordless access, and database transactions keep listings and users updated together. Frontend: React 18 and TypeScript on Refine with Material UI. Backend: Node.js and Express on MongoDB Atlas.",
    result: "One source of truth, with role-aware actions and KPIs that refresh live.",
    stack: ["React", "TypeScript", "Refine", "Material UI", "Node.js", "Express", "MongoDB Atlas", "Cloudinary", "Google OAuth"],
  },
];

// How the AI offer appears in the main site's service lists (home, /services,
// footer). It links to /ai rather than a /services page.
export const aiListing = {
  slug: "ai-automation",
  name: "AI automation",
  short: "AI voice agents, chatbots, workflow automation and CRM systems that answer, qualify and follow up for you.",
  href: "/ai",
};

export const getAiCaseStudy = (slug: string) => aiCaseStudies.find((c) => c.slug === slug);
export const categoryLabel = (id: AiCategory) => aiCategories.find((c) => c.id === id)?.label ?? id;

// What we build. `cases` are case study slugs shown under each offer.
export const aiOffers: {
  id: AiCategory;
  title: string;
  body: string;
  points: string[];
  cases: string[];
}[] = [
  {
    id: "agents",
    title: "AI voice agents and chatbots",
    body: "An AI receptionist for your small business that answers every call, calling agents that follow up, and chatbots for your website and WhatsApp that reply from your own data.",
    points: [
      "Answer calls 24/7, book jobs into your calendar and transfer emergencies",
      "Outbound calls that follow up on quotes and missed calls",
      "WhatsApp and website chat that understands text, voice notes and photos",
      "Lead scoring and routing to the right person in seconds",
    ],
    cases: ["ai-voice-receptionist-home-services", "ai-whatsapp-assistant-auto-parts", "ai-lead-qualification-freight"],
  },
  {
    id: "automation",
    title: "AI workflow automation",
    body: "n8n and Make.com workflow automation that takes repetitive work off your team: follow-ups, approvals, reports and content.",
    points: [
      "Lead and abandoned-cart follow-ups written by AI and sent on time",
      "Approvals and decisions checked against your own rules",
      "Daily reports that flag problems and suggest fixes",
      "Product images and content produced in bulk",
    ],
    cases: ["ai-abandoned-cart-recovery", "ai-warranty-claim-approval", "ai-google-ads-reporting"],
  },
  {
    id: "crm",
    title: "CRM setup and automation",
    body: "HubSpot implementation, GoHighLevel and Airtable, set up around how you actually sell, with pipelines, scoring and reports your team uses.",
    points: [
      "Pipelines where every stage has an owner and a next step",
      "Lead scoring, sequences and nurture workflows",
      "Migrations from GoHighLevel, spreadsheets or another CRM",
      "Dashboards for revenue, pipeline and sales coaching",
    ],
    cases: ["hubspot-bookkeeping-onboarding", "hubspot-solar-sales-system", "airtable-account-health-system"],
  },
  {
    id: "operations",
    title: "ERP and operations workspaces",
    body: "ClickUp, monday.com and Airtable workspaces that run bookings, orders, records and reminders in one place.",
    points: [
      "Bookings and forms that land in the right place automatically",
      "Reminders, escalations and reorders that trigger themselves",
      "One schedule or order board across every location",
      "SOP templates so every process runs the same way",
    ],
    cases: ["physiotherapy-monday-automation", "med-spa-clickup-automation", "print-on-demand-clickup-operations"],
  },
  {
    id: "apps",
    title: "Custom AI apps and dashboards",
    body: "When off-the-shelf tools don't fit: AI-powered SaaS platforms, portals and live dashboards built in React and Node.js.",
    points: [
      "Multi-language AI replies and smart assignment",
      "Live KPI dashboards and role-based access",
      "Stripe billing, trials and subscriptions",
      "APIs that connect to the tools you already use",
    ],
    cases: ["patientflow-ai-medical-tourism", "stayline-vacation-rental-dashboard"],
  },
];

// Problems an AI system fixes first, for the "where it pays off" table.
export const aiFixes: { problem: string; fix: string; offer: AiCategory }[] = [
  { problem: "Calls go to voicemail after hours or when the team is busy", fix: "An AI voice receptionist answers, books the job and hands real emergencies to a person.", offer: "agents" },
  { problem: "Messages and enquiries wait hours for a reply", fix: "A chatbot answers on WhatsApp or your website in seconds, from your own prices and policies.", offer: "agents" },
  { problem: "Hot leads sit in a shared inbox", fix: "An AI agent scores every lead and alerts the right person straight away.", offer: "agents" },
  { problem: "Staff copy data between tools all day", fix: "An n8n or Make.com workflow moves it automatically and logs every step.", offer: "automation" },
  { problem: "The CRM is out of date and nobody trusts it", fix: "A CRM rebuilt around your sales process, with deals opened and updated automatically.", offer: "crm" },
  { problem: "Bookings, orders and reminders live in spreadsheets and group chats", fix: "One operations workspace where tasks, reminders and escalations run themselves.", offer: "operations" },
];

export const aiTools = [
  "n8n", "Make.com", "Zapier", "OpenAI", "Google Gemini", "VAPI", "WhatsApp Cloud API", "HubSpot",
  "GoHighLevel", "Airtable", "ClickUp", "monday.com", "Supabase", "Slack", "Stripe", "Node.js", "React",
];

export const aiProcess: { title: string; body: string }[] = [
  { title: "Free automation audit", body: "Tell us where the hours go and which tools you use. We find the calls, messages and tasks worth automating first." },
  { title: "Blueprint and fixed price", body: "A written plan showing each workflow, agent and integration, with one fixed price and a timeline, within one business day." },
  { title: "Build and test on real data", body: "We build in your own accounts and test with your real calls, messages and records before anything goes live." },
  { title: "Launch, train and monitor", body: "We switch it on, train your team, and watch the first weeks closely so the AI handles the edge cases well." },
];

export const aiIndustries = [
  "Home services: HVAC, plumbing, roofing, cleaning",
  "Clinics, med spas and physiotherapy",
  "Ecommerce and Shopify or WooCommerce stores",
  "Professional services: bookkeeping, engineering, IT",
  "Logistics and freight",
  "SaaS, edtech and subscription businesses",
  "Real estate and short-term rentals",
];

export const aiAnswer = {
  q: "What does an AI automation agency do?",
  a: "An AI automation agency builds systems that handle repetitive work for you: AI voice agents that answer calls, chatbots that reply to customers, workflows that move data between your tools, and CRMs that update themselves. Devlonic designs each system around your process, builds it in your own accounts and keeps a person in charge of anything that needs judgment.",
};

export const aiFaqs: Faq[] = [
  { q: "How much does AI automation or an AI receptionist cost?", a: "Every project gets a fixed price after a free audit, based on how many workflows, agents and integrations it needs. Running costs such as AI usage, phone minutes and automation hosting are billed by those providers directly to your own accounts, so you see exactly what you pay for." },
  { q: "How long does it take to build an AI voice agent or chatbot?", a: "A focused agent or workflow usually takes one to three weeks from approved plan, including testing on real calls or messages. Larger CRM rebuilds and operations workspaces take three to six weeks." },
  { q: "Will an AI voice agent sound robotic to my customers?", a: "Modern voice agents speak naturally and handle follow-up questions. We write the script from your real calls, test it before launch, and always give it a way to transfer to a person for emergencies or anything it can't answer." },
  { q: "What happens when the AI doesn't know the answer?", a: "It hands over. Every agent we build has a clear escalation path: a transfer to your on-call number, a Slack or email alert, or a task for a team member, with the full conversation attached." },
  { q: "Which tools do you build with?", a: "Mostly n8n, Make.com and Zapier for workflows; OpenAI and Google Gemini for the AI; VAPI for voice; the WhatsApp Cloud API for chat; and HubSpot, GoHighLevel, Airtable, ClickUp and monday.com for CRM and operations. Custom apps are built in React and Node.js." },
  { q: "Is my business data safe?", a: "We build in your own accounts using your own API keys, so your data stays with you and you can switch any part off at any time. On the paid business APIs we use, the AI providers don't train their models on your data by default, and n8n can be self-hosted if you need data kept on your own server." },
  { q: "Do I own the automations you build?", a: "Yes. The workflows, agents, CRM setup and code live in your accounts and belong to you. At handover you get documentation and a recorded walkthrough, so your team or another developer can run and change them." },
  { q: "Can you connect AI to the software I already use?", a: "Usually, yes. If a tool has an API, webhooks or a native integration, we can connect it, including CRMs, calendars, field service software, Shopify, WooCommerce, Stripe, Google Workspace and Slack." },
];
