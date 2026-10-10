import type { Faq } from "./services";

// "Markets we serve": one landing page per industry. To add a market, add an
// entry here and its slug to MARKETS in proxy.ts and scripts/build-llms.mjs.
// Copy describes what we build for each industry. It does not claim past
// clients in industries where we have none; related work is matched by tag.

export type Market = {
  slug: string;
  name: string; // plural noun used in headings, e.g. "HVAC companies"
  short: string; // one line for grids
  icon: "hvac" | "plumbing" | "roofing" | "cleaning" | "contractors" | "landscaping" | "health" | "ecommerce";
  wizard: string; // value pre-selected in the quote form's industry step
  workTags: string[];
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLede: string;
  problems: { title: string; body: string }[];
  features: string[];
  faqs: Faq[];
};

export const markets: Market[] = [
  {
    slug: "hvac",
    name: "HVAC companies",
    short: "Emergency calls in peak season, tune-up bookings the rest of the year.",
    icon: "hvac",
    wizard: "hvac",
    workTags: ["services"],
    metaTitle: "Website Design for HVAC Companies",
    metaDescription:
      "HVAC websites built to win emergency calls and fill tune-up schedules: tap-to-call, service area pages, maintenance plan sign-ups and local SEO. Fixed-price builds.",
    heroTitle: "Websites for HVAC companies that ring in peak season.",
    heroLede:
      "When the AC dies in July or the furnace quits in January, homeowners call the first company that looks reliable and answers fast. We build HVAC sites that make you that company, and keep the schedule full between heat waves.",
    problems: [
      { title: "Emergencies are won in seconds", body: "A homeowner with no heat is calling whoever's phone number they see first. If it takes a scroll to find yours, they've already called someone else." },
      { title: "The off-season goes quiet", body: "Without a way to book tune-ups and sell maintenance plans online, your techs sit idle in spring and fall." },
      { title: "Every town is a separate search", body: "People search 'AC repair near me' and the town name. A single homepage can't rank across your whole service area." },
    ],
    features: [
      "24/7 emergency banner with tap-to-call on every page",
      "Pages for repair, installation, maintenance, heat pumps and indoor air quality",
      "Service area pages for the towns you cover",
      "Online booking for tune-ups and maintenance plan sign-ups",
      "Financing and rebate information where you offer it",
      "Reviews, licenses and brand certifications next to every call button",
      "Call and form tracking so you can see which pages bring jobs",
    ],
    faqs: [
      { q: "What should an HVAC website include?", a: "A visible phone number and emergency call button, a page for each core service, pages for the towns you serve, online booking for maintenance, financing details if you offer it, and real reviews. Each of those either brings in a call or makes someone more likely to make one." },
      { q: "Can customers book maintenance online?", a: "Yes. We can add online booking that syncs with your calendar or connect the scheduling tool you already use, plus a sign-up form for maintenance plans." },
      { q: "How do I show up for 'AC repair near me'?", a: "Through a complete Google Business Profile, steady reviews, and dedicated pages for each service and town on your website. We set up all three as part of the build." },
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing companies",
    short: "Burst-pipe calls at 2am and the jobs that follow.",
    icon: "plumbing",
    wizard: "plumbing",
    workTags: ["services"],
    metaTitle: "Website Design for Plumbers",
    metaDescription:
      "Plumbing websites that turn emergency searches into calls: tap-to-call, service pages for every job type, service area pages and local SEO. Fixed price, agreed up front.",
    heroTitle: "Plumbing websites built for the 2am call.",
    heroLede:
      "Nobody shops around with water on the floor. They call the plumber who looks trustworthy and is easy to reach. We build sites that win those calls, then help you land the bigger jobs: water heaters, repipes and remodels.",
    problems: [
      { title: "Panicked customers don't read", body: "They need your number, your hours and proof you're legitimate in one glance, on a phone, with wet hands." },
      { title: "Big jobs need more convincing", body: "A water heater replacement or repipe is a considered purchase. Those visitors want detail, pricing guidance and reviews before they call." },
      { title: "Directories take your leads", body: "If your site doesn't rank, lead marketplaces sell your customers back to you." },
    ],
    features: [
      "Emergency call bar fixed to the bottom of the screen on phones",
      "Pages for drains, leaks, water heaters, sewer lines, repipes and fixtures",
      "Service area pages for each town you work in",
      "Upfront pricing guidance and coupons where you offer them",
      "Quote form with photo upload for non-urgent jobs",
      "License, insurance and guarantee badges near every call to action",
      "Google Business Profile and local schema set up at launch",
    ],
    faqs: [
      { q: "Should I list prices on my plumbing website?", a: "Starting prices or price ranges for common jobs usually increase calls, because they answer the first question people have. You don't need a full price list, just enough to set expectations." },
      { q: "Can customers send photos of the problem?", a: "Yes. A quote form with photo upload helps you triage and quote non-emergency jobs without a site visit." },
      { q: "How do I stop relying on lead marketplaces?", a: "By ranking your own site and Google Business Profile for the jobs you want. Service and town pages plus a steady flow of reviews are what move the needle." },
    ],
  },
  {
    slug: "roofing",
    name: "Roofing companies",
    short: "Storm-season demand, inspections and big-ticket replacements.",
    icon: "roofing",
    wizard: "roofing",
    workTags: ["services"],
    metaTitle: "Website Design for Roofing Companies",
    metaDescription:
      "Roofing websites that book inspections and win replacements: storm damage pages, before-and-after galleries, financing, service area pages and local SEO.",
    heroTitle: "Roofing websites that turn storm searches into inspections.",
    heroLede:
      "Roof replacements are expensive and homeowners are wary of storm chasers. The roofer who looks established, local and honest gets the inspection. We build sites that earn that trust before the first phone call.",
    problems: [
      { title: "Trust decides the job", body: "Homeowners have heard the horror stories. Reviews, real project photos, warranties and credentials have to be front and center." },
      { title: "Demand arrives all at once", body: "After a storm, everyone searches at the same time. Your site needs to load fast and make booking an inspection effortless." },
      { title: "Insurance questions stall decisions", body: "Clear answers about the claims process keep homeowners moving instead of putting the decision off." },
    ],
    features: [
      "Free inspection booking on every page",
      "Storm and hail damage pages that explain the insurance process",
      "Before-and-after project galleries with locations",
      "Pages for replacement, repair, gutters, siding and commercial roofing",
      "Financing options and manufacturer warranty details",
      "Service area pages for each town and county you cover",
      "Review collection set up to grow your Google rating",
    ],
    faqs: [
      { q: "What makes a roofing website convert?", a: "Proof. Real project photos, reviews, warranty details and credentials, placed right next to a simple inspection booking form." },
      { q: "Should my site explain insurance claims?", a: "Yes, if you do insurance work. A plain-English page on how storm damage claims work answers the question that stops most homeowners from calling." },
      { q: "Can you show our projects by town?", a: "Yes. Tagging gallery projects by location helps both trust and local search, because neighbors recognize the streets." },
    ],
  },
  {
    slug: "cleaning",
    name: "Cleaning companies",
    short: "Instant quotes, online booking and recurring clients.",
    icon: "cleaning",
    wizard: "cleaning",
    workTags: ["services"],
    metaTitle: "Website Design for Cleaning Companies",
    metaDescription:
      "Websites for residential and commercial cleaning companies: instant quote forms, online booking, recurring plans and local SEO that bring in steady clients.",
    heroTitle: "Websites for cleaning companies that fill the calendar.",
    heroLede:
      "People choosing a cleaner want to know three things: the price, whether they can trust you in their home, and when you can come. We build sites that answer all three and let them book on the spot.",
    problems: [
      { title: "Price is the first question", body: "If visitors can't get a rough quote quickly, they move on to a competitor who shows one." },
      { title: "Trust is personal", body: "You're coming into their home or office. Real reviews, team photos and clear policies make the difference." },
      { title: "Recurring clients are the business", body: "One-off cleans pay the bills. Weekly and biweekly clients build the business, so the site should sell the plan, not just the visit." },
    ],
    features: [
      "Instant quote form by home size, cleaning type and frequency",
      "Online booking with deposits or card on file",
      "Pages for standard, deep, move-in/move-out, office and post-construction cleaning",
      "Recurring plan options with clear pricing",
      "Trust section: reviews, insurance, background checks and satisfaction guarantee",
      "Service area pages for the neighborhoods you cover",
      "Automatic booking confirmations and reminders",
    ],
    faqs: [
      { q: "Can my website give customers an instant quote?", a: "Yes. A quote calculator based on home size, cleaning type and frequency gives visitors a number straight away and sends you a qualified lead." },
      { q: "Can clients book and pay online?", a: "Yes. We set up online booking with deposits or card-on-file payments through Stripe or PayPal, plus automatic confirmations and reminders." },
      { q: "We have no website at all. Is it worth it?", a: "For most cleaning businesses, yes. People search for cleaners on Google and expect to see prices, reviews and a way to book. One of our cleaning clients started getting inquiries within days of launch." },
    ],
  },
  {
    slug: "contractors",
    name: "Contractors and remodelers",
    short: "Project galleries and quote requests for big-ticket work.",
    icon: "contractors",
    wizard: "contractors",
    workTags: ["services"],
    metaTitle: "Website Design for Contractors and Remodelers",
    metaDescription:
      "Websites for general contractors, remodelers, concrete and flooring contractors: project galleries, quote requests with photo upload, credentials and local SEO.",
    heroTitle: "Contractor websites that sell the next project.",
    heroLede:
      "Remodels, additions, concrete and flooring jobs are big decisions. Clients compare portfolios, check credentials and want to know you'll show up. We build sites that do the selling before the site visit.",
    problems: [
      { title: "Your work is the pitch", body: "Most contractor sites hide their best projects. Great photos, organized by project type, sell more than any headline." },
      { title: "Quote requests arrive half-empty", body: "Without the right questions, you waste site visits on jobs that were never a fit." },
      { title: "Referrals still check the website", body: "Even a warm referral will look you up. A dated site can undo a friend's recommendation." },
    ],
    features: [
      "Project galleries organized by type, with before-and-after views",
      "Quote request form with project type, budget range, timeline and photo upload",
      "Pages for each service line: kitchens, baths, additions, concrete, flooring and more",
      "License, insurance and warranty details shown clearly",
      "Process page explaining how a project runs from estimate to handover",
      "Service area pages for the towns you work in",
      "Review and referral sections that build credibility",
    ],
    faqs: [
      { q: "How should a contractor show their portfolio?", a: "By project type, with a short story for each: the problem, what you did, and the result, plus before-and-after photos. That's far more persuasive than a single photo grid." },
      { q: "Can the quote form filter out bad-fit jobs?", a: "Yes. Asking for project type, budget range, timeline and photos up front means you only visit the jobs that fit." },
      { q: "Do you build for specialty contractors?", a: "Yes. We've built for a concrete floor coating contractor, and the same approach works for flooring, painting, fencing, decks and other specialty trades." },
    ],
  },
  {
    slug: "landscaping",
    name: "Landscaping companies",
    short: "Seasonal services, design projects and maintenance contracts.",
    icon: "landscaping",
    wizard: "landscaping",
    workTags: ["services"],
    metaTitle: "Website Design for Landscaping Companies",
    metaDescription:
      "Landscaping and lawn care websites: seasonal service pages, project galleries, maintenance plan sign-ups, quote requests and local SEO for your service area.",
    heroTitle: "Landscaping websites that grow with the seasons.",
    heroLede:
      "Spring cleanups, summer maintenance, fall leaf removal, winter snow work: your services change with the calendar, and so do the searches. We build landscaping sites that show the right offer at the right time and turn one-off jobs into maintenance contracts.",
    problems: [
      { title: "Demand is seasonal", body: "If your site still promotes snow removal in May, you're missing the spring rush." },
      { title: "Design work needs a portfolio", body: "Hardscape and design-build clients want to see finished projects before they'll call." },
      { title: "Maintenance is the steady income", body: "Weekly lawn care contracts smooth out the year, but only if your site sells them clearly." },
    ],
    features: [
      "Seasonal service pages you can switch on and off yourself",
      "Project galleries for design, hardscape and installations",
      "Maintenance plan options with simple sign-up",
      "Quote request form with property size and photo upload",
      "Commercial property maintenance page for HOAs and businesses",
      "Service area pages for each town you cover",
      "Google Business Profile and review setup at launch",
    ],
    faqs: [
      { q: "Can I update seasonal offers myself?", a: "Yes. We build the site so you can switch featured services and promotions on and off without a developer." },
      { q: "Should I separate residential and commercial work?", a: "Usually, yes. Homeowners and property managers ask different questions, so separate pages convert better for both." },
      { q: "Have you built for landscapers before?", a: "Yes, including the website for Indy Cardinal Landscaping. You'll find it in our work." },
    ],
  },
  {
    slug: "home-care-and-clinics",
    name: "Home care agencies and clinics",
    short: "Trust-first websites for families, patients and caregivers.",
    icon: "health",
    wizard: "health",
    workTags: ["health"],
    metaTitle: "Website Design for Home Care Agencies and Medical Clinics",
    metaDescription:
      "Websites for home care agencies, urgent care centers and medical practices: clear services, online check-in, caregiver recruiting pages and local SEO.",
    heroTitle: "Websites for home care agencies and clinics people trust.",
    heroLede:
      "Families choosing care for a parent, and patients choosing a clinic, need reassurance before anything else. We build calm, clear sites that explain your services, show your credentials and make the next step easy.",
    problems: [
      { title: "Families are anxious", body: "They're making an emotional decision. Clear services, real people and simple contact options matter more than clever design." },
      { title: "Recruiting never stops", body: "Home care agencies need a steady flow of caregiver applications, not just client inquiries." },
      { title: "Patients want to skip the wait", body: "Clinics that show hours, wait times and online check-in clearly win walk-in patients." },
    ],
    features: [
      "Service pages written in plain, reassuring language",
      "Inquiry and consultation forms for families",
      "Careers pages and application forms for caregiver recruiting",
      "Online check-in or appointment booking for clinics",
      "Insurance, payment and location details made easy to find",
      "Accessibility built in: readable type, contrast and keyboard navigation",
      "Local SEO for the communities you serve",
    ],
    faqs: [
      { q: "Have you built websites for home care and medical clients?", a: "Yes. Our work includes websites for several home care agencies and a walk-in urgent care clinic in Manhattan." },
      { q: "Can the website help us recruit caregivers?", a: "Yes. A dedicated careers section with an easy application form keeps applications coming in alongside client inquiries." },
      { q: "Can patients book or check in online?", a: "Yes. We can add online booking or connect the check-in system you already use." },
    ],
  },
  {
    slug: "ecommerce",
    name: "Ecommerce and Shopify brands",
    short: "Stores that convert, and ads that bring buyers to them.",
    icon: "ecommerce",
    wizard: "retail",
    workTags: ["store"],
    metaTitle: "Shopify Development and Marketing for Ecommerce Brands",
    metaDescription:
      "Shopify and WooCommerce stores plus performance marketing for ecommerce brands: product pages that convert, fulfilment and dropshipping setup, TikTok and Meta ads.",
    heroTitle: "Shopify stores, and the marketing that fills them.",
    heroLede:
      "A beautiful store with no traffic doesn't sell, and ads pointed at a weak store waste money. We handle both sides: a Shopify store built to convert, and TikTok and Meta campaigns that bring the right buyers to it.",
    problems: [
      { title: "Traffic that doesn't buy", body: "Slow pages, thin product details and a clunky checkout leak sales before customers reach the cart." },
      { title: "Ads without tracking", body: "Without pixels and conversion tracking set up properly, you can't tell which campaigns make money." },
      { title: "Fulfilment that breaks", body: "Dropshipping apps, suppliers and marketplace settings need to work together, or orders get stuck." },
    ],
    features: [
      "Shopify or WooCommerce store designed around your products",
      "Product pages with strong photos, details, reviews and clear shipping and returns",
      "Fast checkout with Shop Pay, Apple Pay, Google Pay and PayPal",
      "Dropshipping and fulfilment setup with AutoDS and supplier networks",
      "TikTok, Meta and Google pixels and conversion tracking",
      "AI video ad creative for TikTok and Meta",
      "Paid ad campaigns that scale only when they're profitable",
    ],
    faqs: [
      { q: "Can you run ads as well as build the store?", a: "Yes. We build the store and run TikTok and Meta campaigns, so the people making the ads and the people fixing the store are the same team." },
      { q: "Do you work with dropshipping stores?", a: "Yes. We set up AutoDS with Amazon and Alibaba suppliers and fix fulfilment issues between Shopify, TikTok Shop and your apps. See our Gladiolaz case study." },
      { q: "How much ad budget do I need to start?", a: "Less than most people think. We've launched TikTok campaigns at $20 a day that brought in orders within the first two weeks. What matters is tracking every order so spend only grows when it pays." },
    ],
  },
];

export const getMarket = (slug: string) => markets.find((m) => m.slug === slug);
