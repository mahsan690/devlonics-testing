import type { Faq } from "./services";

// "Markets we serve": one landing page per industry. To add a market, add an
// entry here and its slug to KNOWN.markets in proxy.ts.
// Each page targets one search phrase (`keyword`) and answers the question
// buyers search most ("What should a ___ website include?") near the top.
// Copy does not claim past clients in industries where we have none.

export type Market = {
  slug: string;
  name: string; // plural noun used in headings, e.g. "HVAC companies"
  keyword: string; // primary search phrase this page targets
  short: string; // one line for grids
  icon: "hvac" | "plumbing" | "roofing" | "cleaning" | "contractors" | "landscaping" | "health" | "ecommerce";
  wizard: string; // value pre-selected in the quote form's industry step
  workTags: string[];
  metaTitle: string; // under ~50 characters; " | Devlonic" is appended
  metaDescription: string;
  heroTitle: string; // the page H1, contains the keyword
  heroLede: string;
  answer: { q: string; a: string }; // answer-first block, 40–60 words
  problems: { title: string; body: string }[];
  features: string[]; // shown under the answer as the full checklist
  relatedServices: string[];
  relatedPosts: string[];
  faqs: Faq[];
};

// Shared, sourced answer used on every service-business market page.
const costAnswer = (trade: string): Faq => ({
  q: `How much does ${trade} website cost?`,
  a: "Industry pricing guides published in 2026 put freelancer-built small business sites at roughly $500 to $5,000 and agency builds at about $5,000 to $15,000. We quote every project as a fixed price after a short questionnaire, based on the number of pages, features like booking, and how much content we write.",
});

export const markets: Market[] = [
  {
    slug: "hvac",
    name: "HVAC companies",
    keyword: "HVAC website design",
    short: "Emergency calls in peak season, tune-up bookings the rest of the year.",
    icon: "hvac",
    wizard: "hvac",
    workTags: ["services"],
    metaTitle: "HVAC Website Design That Books More Calls",
    metaDescription:
      "HVAC website design and marketing for heating and cooling companies: emergency tap-to-call, service-area pages, local SEO and ads that book calls. Fixed price.",
    heroTitle: "HVAC website design that books calls in peak season.",
    heroLede:
      "When the AC dies in July or the furnace quits in January, homeowners call the first company that looks reliable and answers fast. We design HVAC websites that make you that company, and keep the schedule full between heat waves.",
    answer: {
      q: "What should an HVAC website include?",
      a: "An HVAC website should include a 24/7 emergency call button on every page, separate pages for repair, installation and maintenance, a page for each town you serve, online booking for tune-ups, financing details, and reviews and certifications beside every call to action. Each element either earns a call or removes a reason not to make one.",
    },
    problems: [
      { title: "Emergencies are won in seconds", body: "A homeowner with no heat calls whichever number they see first. If finding yours takes a scroll, they've already called someone else." },
      { title: "The off-season goes quiet", body: "Without online tune-up booking and maintenance plan sign-ups, your technicians sit idle in spring and fall." },
      { title: "Every town is a separate search", body: "People search for AC repair plus their town. A single homepage can't rank across your whole service area." },
    ],
    features: [
      "24/7 emergency banner with tap-to-call on every page",
      "Pages for AC repair, furnace repair, installation, maintenance, heat pumps and indoor air quality",
      "Service-area pages for each town you cover",
      "Online booking for tune-ups and maintenance plan sign-ups",
      "Financing and rebate information where you offer it",
      "Reviews, licenses and manufacturer certifications next to every call button",
      "Call and form tracking, so you can see which pages bring jobs",
    ],
    relatedServices: ["lead-generation-websites", "seo-and-marketing"],
    relatedPosts: ["home-service-website-checklist", "local-seo-checklist-home-service-businesses"],
    faqs: [
      { q: "Can customers book HVAC maintenance online?", a: "Yes. We add online booking that syncs with your calendar, or connect the scheduling tool you already use, plus a sign-up form for maintenance plans." },
      { q: "How do I show up for 'AC repair near me'?", a: "Google ranks local results on relevance, distance and prominence. You improve the ones you control with a complete Google Business Profile, steady new reviews, and website pages for each service and town. We set up all three as part of the build." },
      costAnswer("an HVAC"),
      { q: "Should my HVAC site list prices?", a: "Showing starting prices for common jobs, such as a tune-up or diagnostic visit, usually increases calls because it answers the first question. Big installs can show financing options instead of a fixed number." },
      { q: "How long does an HVAC website take to build?", a: "Most launch in three to six weeks from approved design, depending on how many service and town pages you need." },
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing companies",
    keyword: "plumbing website design",
    short: "Burst-pipe calls at 2am and the bigger jobs that follow.",
    icon: "plumbing",
    wizard: "plumbing",
    workTags: ["services"],
    metaTitle: "Plumbing Website Design for Plumbers",
    metaDescription:
      "Plumbing website design services and plumber marketing: a sticky call bar, a page for every job, service-area pages and local SEO that turn searches into calls.",
    heroTitle: "Plumbing website design built for the 2am call.",
    heroLede:
      "Nobody shops around with water on the floor. They call the plumber who looks trustworthy and is easy to reach. We build plumbing websites that win those calls, then help you land the bigger jobs: water heaters, repipes and remodels.",
    answer: {
      q: "What should a plumbing website include?",
      a: "A plumbing website should include a call button fixed to the screen on phones, your hours and emergency availability, separate pages for drains, leaks, water heaters and sewer lines, a page for each town you serve, license and insurance details, real reviews, and a quote form that accepts photos for non-urgent jobs.",
    },
    problems: [
      { title: "Panicked customers don't read", body: "They need your number, your hours and proof you're legitimate in one glance, on a phone, with wet hands." },
      { title: "Big jobs need more convincing", body: "A water heater replacement or repipe is a considered purchase. Those visitors want detail, price guidance and reviews before they call." },
      { title: "Directories sell your leads back to you", body: "If your own site doesn't rank, lead marketplaces charge you for the customers who were searching for you." },
    ],
    features: [
      "Emergency call bar fixed to the bottom of the screen on phones",
      "Pages for drain cleaning, leak repair, water heaters, sewer lines, repipes and fixtures",
      "Service-area pages for each town you work in",
      "Starting-price guidance and coupons where you offer them",
      "Quote form with photo upload for non-urgent jobs",
      "License, insurance and guarantee badges near every call to action",
      "Google Business Profile and local schema set up at launch",
    ],
    relatedServices: ["lead-generation-websites", "seo-and-marketing"],
    relatedPosts: ["home-service-website-checklist", "local-seo-checklist-home-service-businesses"],
    faqs: [
      { q: "Should I list prices on my plumbing website?", a: "Starting prices or ranges for common jobs usually increase calls, because they answer the first question people have. You don't need a full price list, just enough to set expectations." },
      { q: "Can customers send photos of the problem?", a: "Yes. A quote form with photo upload helps you triage and price non-emergency jobs without a site visit." },
      { q: "How do I stop relying on lead marketplaces?", a: "Rank your own site and Google Business Profile for the jobs you want. Service and town pages, plus a steady flow of recent reviews, are what move the needle." },
      costAnswer("a plumbing"),
      { q: "What's the most important part of a plumber's website?", a: "The phone number. On mobile it should be one tap away on every page, with your hours and emergency availability right beside it." },
    ],
  },
  {
    slug: "roofing",
    name: "Roofing companies",
    keyword: "roofing website design",
    short: "Storm-season demand, inspections and big-ticket replacements.",
    icon: "roofing",
    wizard: "roofing",
    workTags: ["services"],
    metaTitle: "Roofing Website Design That Books Inspections",
    metaDescription:
      "Roofing website design and roofing marketing that book inspections: storm damage pages, project galleries, financing, service-area pages and local SEO.",
    heroTitle: "Roofing website design that turns storm searches into inspections.",
    heroLede:
      "Roof replacements are expensive and homeowners are wary of storm chasers. The roofer who looks established, local and honest gets the inspection. We design roofing websites that earn that trust before the first call.",
    answer: {
      q: "What should a roofing website include?",
      a: "A roofing website should include a free inspection booking form on every page, real before-and-after project photos tagged by town, storm and hail damage pages that explain insurance claims, pages for replacement, repair and gutters, financing and warranty details, and reviews plus credentials near every call to action.",
    },
    problems: [
      { title: "Trust decides the job", body: "Homeowners have heard the horror stories. Reviews, real project photos, warranties and credentials have to be front and center." },
      { title: "Demand arrives all at once", body: "After a storm everyone searches at the same time. Your site has to load fast and make booking an inspection effortless." },
      { title: "Insurance questions stall decisions", body: "Clear answers about the claims process keep homeowners moving instead of putting the decision off." },
    ],
    features: [
      "Free inspection booking on every page",
      "Storm and hail damage pages that explain the insurance process",
      "Before-and-after project galleries with locations",
      "Pages for roof replacement, repair, gutters, siding and commercial roofing",
      "Financing options and manufacturer warranty details",
      "Service-area pages for each town and county you cover",
      "A review collection process to grow your Google rating",
    ],
    relatedServices: ["lead-generation-websites", "seo-and-marketing"],
    relatedPosts: ["home-service-website-checklist", "local-seo-checklist-home-service-businesses"],
    faqs: [
      { q: "What makes a roofing website convert?", a: "Proof. Real project photos, reviews, warranty details and credentials, placed right next to a simple inspection booking form." },
      { q: "Should my roofing site explain insurance claims?", a: "Yes, if you do insurance work. A plain-English page on how storm damage claims work answers the question that stops most homeowners from calling." },
      { q: "Can you show our roofing projects by town?", a: "Yes. Tagging gallery projects by location helps both trust and local search, because neighbors recognize the streets." },
      costAnswer("a roofing"),
      { q: "How many reviews does a roofer need?", a: "More than you'd think. BrightLocal's 2026 survey found 47% of consumers won't use a business with fewer than 20 reviews, and 68% want at least four stars. Recent reviews matter most." },
    ],
  },
  {
    slug: "cleaning",
    name: "Cleaning companies",
    keyword: "cleaning company website design",
    short: "Instant quotes, online booking and recurring clients.",
    icon: "cleaning",
    wizard: "cleaning",
    workTags: ["services"],
    metaTitle: "Cleaning Company Website Design",
    metaDescription:
      "Cleaning company website design and marketing: instant quotes, online booking, recurring plans and local SEO for home and commercial cleaners. Fixed price.",
    heroTitle: "Cleaning company website design that fills the calendar.",
    heroLede:
      "People choosing a cleaner want to know three things: the price, whether they can trust you in their home, and when you can come. We design cleaning websites that answer all three and let customers book on the spot.",
    answer: {
      q: "What should a cleaning company website include?",
      a: "A cleaning company website should include an instant quote form based on home size, cleaning type and frequency, online booking, separate pages for standard, deep and move-out cleaning, clear recurring plan options, proof of insurance and background checks, real reviews, and pages for the neighborhoods you serve.",
    },
    problems: [
      { title: "Price is the first question", body: "If visitors can't get a rough quote quickly, they move on to a competitor who shows one." },
      { title: "Trust is personal", body: "You're coming into their home or office. Real reviews, team photos and clear policies make the difference." },
      { title: "Recurring clients are the business", body: "One-off cleans pay the bills; weekly and biweekly clients build the business. The site should sell the plan, not just the visit." },
    ],
    features: [
      "Instant quote form by home size, cleaning type and frequency",
      "Online booking with deposits or card on file",
      "Pages for standard, deep, move-in/move-out, office and post-construction cleaning",
      "Recurring plan options with clear pricing",
      "Trust section: reviews, insurance, background checks and satisfaction guarantee",
      "Service-area pages for the neighborhoods you cover",
      "Automatic booking confirmations and reminders",
    ],
    relatedServices: ["small-business-websites", "lead-generation-websites"],
    relatedPosts: ["home-service-website-checklist", "how-much-does-a-small-business-website-cost"],
    faqs: [
      { q: "Can my cleaning website give customers an instant quote?", a: "Yes. A quote calculator based on home size, cleaning type and frequency gives visitors a number straight away and sends you a qualified lead." },
      { q: "Can clients book and pay online?", a: "Yes. We set up online booking with deposits or card-on-file payments through Stripe or PayPal, plus automatic confirmations and reminders." },
      { q: "My cleaning business has no website. Is it worth it?", a: "For most cleaning businesses, yes. People look for cleaners on Google and expect prices, reviews and a way to book. One of our cleaning clients started getting enquiries within days of launch." },
      costAnswer("a cleaning company"),
      { q: "Should a cleaning website show prices?", a: "Yes, at least starting prices or an instant estimate. Price is the first thing people want to know, and showing it filters out poor-fit enquiries." },
    ],
  },
  {
    slug: "contractors",
    name: "Contractors and remodelers",
    keyword: "contractor website design",
    short: "Project galleries and quote requests for big-ticket work.",
    icon: "contractors",
    wizard: "contractors",
    workTags: ["services"],
    metaTitle: "Contractor Website Design for Remodelers",
    metaDescription:
      "Contractor website design and marketing for general contractors and remodelers: project galleries, quote forms with photos, credentials and local SEO.",
    heroTitle: "Contractor website design that sells the next project.",
    heroLede:
      "Remodels, additions, concrete and flooring jobs are big decisions. Clients compare portfolios, check credentials and want to know you'll show up. We build contractor websites that do the selling before the site visit.",
    answer: {
      q: "What should a contractor website include?",
      a: "A contractor website should include project galleries organized by job type with before-and-after photos, a quote request form that asks for project type, budget, timeline and photos, a page for each service line, license, insurance and warranty details, a page explaining your process, and pages for the towns you work in.",
    },
    problems: [
      { title: "Your work is the pitch", body: "Most contractor sites hide their best projects. Great photos, organized by project type, sell more than any headline." },
      { title: "Quote requests arrive half-empty", body: "Without the right questions, you waste site visits on jobs that were never a fit." },
      { title: "Referrals still check the website", body: "Even a warm referral looks you up. A dated site can undo a friend's recommendation." },
    ],
    features: [
      "Project galleries organized by type, with before-and-after views",
      "Quote request form with project type, budget range, timeline and photo upload",
      "Pages for each service line: kitchens, baths, additions, concrete, flooring and more",
      "License, insurance and warranty details shown clearly",
      "A process page explaining how a project runs from estimate to handover",
      "Service-area pages for the towns you work in",
      "Review and referral sections that build credibility",
    ],
    relatedServices: ["lead-generation-websites", "custom-software"],
    relatedPosts: ["home-service-website-checklist", "local-seo-checklist-home-service-businesses"],
    faqs: [
      { q: "How should a contractor show their portfolio?", a: "By project type, with a short story for each: the problem, what you did, and the result, plus before-and-after photos. That's far more persuasive than a single photo grid." },
      { q: "Can the quote form filter out bad-fit jobs?", a: "Yes. Asking for project type, budget range, timeline and photos up front means you only visit the jobs that fit." },
      { q: "Do you build websites for specialty contractors?", a: "Yes. We've built for a concrete floor coating contractor, Florida Surface Pro, and the same approach works for flooring, painting, fencing, decks and other specialty trades." },
      costAnswer("a contractor"),
      { q: "Do contractors need a blog?", a: "Not to start. Service pages, a strong gallery and reviews matter more. A blog helps later, answering the questions homeowners search before they hire, such as costs and timelines." },
    ],
  },
  {
    slug: "landscaping",
    name: "Landscaping companies",
    keyword: "landscaping website design",
    short: "Seasonal services, design projects and maintenance contracts.",
    icon: "landscaping",
    wizard: "landscaping",
    workTags: ["services"],
    metaTitle: "Landscaping and Lawn Care Website Design",
    metaDescription:
      "Landscaping and lawn care website design and marketing: seasonal service pages, project galleries, maintenance plans, quote forms and local SEO. Fixed price.",
    heroTitle: "Landscaping website design that grows with the seasons.",
    heroLede:
      "Spring clean-ups, summer maintenance, fall leaf removal, winter snow work: your services change with the calendar, and so do the searches. We design landscaping websites that show the right offer at the right time and turn one-off jobs into maintenance contracts.",
    answer: {
      q: "What should a landscaping website include?",
      a: "A landscaping website should include seasonal service pages you can switch on and off, galleries for design and hardscape projects, simple maintenance plan sign-ups, a quote form with property size and photos, a separate page for commercial and HOA work, and pages for each town you cover.",
    },
    problems: [
      { title: "Demand is seasonal", body: "If your site still promotes snow removal in May, you're missing the spring rush." },
      { title: "Design work needs a portfolio", body: "Hardscape and design-build clients want to see finished projects before they call." },
      { title: "Maintenance is the steady income", body: "Weekly lawn care contracts smooth out the year, but only if your site sells them clearly." },
    ],
    features: [
      "Seasonal service pages you can switch on and off yourself",
      "Project galleries for design, hardscape and installations",
      "Maintenance plan options with simple sign-up",
      "Quote request form with property size and photo upload",
      "Commercial property maintenance page for HOAs and businesses",
      "Service-area pages for each town you cover",
      "Google Business Profile and review setup at launch",
    ],
    relatedServices: ["small-business-websites", "seo-and-marketing"],
    relatedPosts: ["home-service-website-checklist", "local-seo-checklist-home-service-businesses"],
    faqs: [
      { q: "Can I update seasonal offers myself?", a: "Yes. We build the site so you can switch featured services and promotions on and off without a developer." },
      { q: "Should I separate residential and commercial landscaping?", a: "Usually, yes. Homeowners and property managers ask different questions, so separate pages convert better for both." },
      { q: "Have you built websites for landscapers before?", a: "Yes, including the website for Indy Cardinal Landscaping. You'll find it in our work." },
      costAnswer("a landscaping"),
      { q: "What's the difference between a landscaping and a lawn care website?", a: "Lawn care sites sell recurring maintenance, so plan sign-ups and instant quotes matter most. Landscaping sites sell design and installation, so galleries and consultation requests matter most. Many businesses need both." },
    ],
  },
  {
    slug: "home-care-and-clinics",
    name: "Home care agencies and clinics",
    keyword: "home care agency website design",
    short: "Trust-first websites for families, patients and caregivers.",
    icon: "health",
    wizard: "health",
    workTags: ["health"],
    metaTitle: "Home Care Agency and Clinic Website Design",
    metaDescription:
      "Home care agency, home health and clinic website design: clear services, family inquiry forms, caregiver recruiting pages, online check-in and local SEO.",
    heroTitle: "Home care agency and clinic website design people trust.",
    heroLede:
      "Families choosing care for a parent, and patients choosing a clinic, need reassurance before anything else. We design calm, clear websites that explain your services, show your credentials and make the next step easy.",
    answer: {
      q: "What should a home care agency website include?",
      a: "A home care agency website should include plain-language pages for each type of care, an easy inquiry form for families, a careers page with a short caregiver application, licensing and accreditation details, the areas you serve, real testimonials, and accessible design with readable text and strong contrast.",
    },
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
    relatedServices: ["small-business-websites", "custom-software"],
    relatedPosts: ["local-seo-checklist-home-service-businesses"],
    faqs: [
      { q: "Have you built websites for home care and medical clients?", a: "Yes. Our work includes websites for several home care agencies and for Midtown New York Doctors, a walk-in urgent care clinic in Manhattan." },
      { q: "Can a website help a home care agency recruit caregivers?", a: "Yes. A dedicated careers section with a short application form keeps applications coming in alongside client inquiries." },
      { q: "Can patients book or check in online?", a: "Yes. We can add online booking or connect the check-in system you already use." },
      { q: "How much does a home care agency website cost?", a: "Industry guides published in 2026 put freelancer-built small business sites at roughly $500 to $5,000 and agency builds at $5,000 to $15,000. We quote a fixed price after a short questionnaire; careers pages and online booking are the usual extras." },
      { q: "Is accessibility important for a care website?", a: "Yes. Many visitors are older adults or family members on phones. Readable text, strong contrast, clear buttons and keyboard navigation make the site usable for everyone." },
    ],
  },
  {
    slug: "ecommerce",
    name: "Ecommerce and Shopify brands",
    keyword: "Shopify development and marketing",
    short: "Stores that convert, and ads that bring buyers to them.",
    icon: "ecommerce",
    wizard: "retail",
    workTags: ["store"],
    metaTitle: "Shopify Development and Marketing Agency",
    metaDescription:
      "Shopify development and marketing for ecommerce brands: stores that convert, dropshipping and fulfilment setup, AI video ads and TikTok and Meta campaigns.",
    heroTitle: "Shopify development and marketing in one team.",
    heroLede:
      "A beautiful store with no traffic doesn't sell, and ads pointed at a weak store waste money. We handle both sides: a Shopify store built to convert, and TikTok and Meta campaigns that bring the right buyers to it.",
    answer: {
      q: "What does a Shopify development and marketing agency do?",
      a: "A Shopify development and marketing agency builds or rebuilds your store, then drives traffic to it. That covers theme and product page design, checkout and payments, fulfilment apps such as AutoDS, tracking pixels, ad creative, and running paid campaigns on TikTok, Meta and Google, with reporting on sales and return on ad spend.",
    },
    problems: [
      { title: "Traffic that doesn't buy", body: "Slow pages, thin product details and a clunky checkout leak sales before customers reach the cart." },
      { title: "Ads without tracking", body: "Without pixels and conversion tracking set up properly, you can't tell which campaigns make money." },
      { title: "Fulfilment that breaks", body: "Dropshipping apps, suppliers and marketplace settings need to work together, or orders get stuck." },
    ],
    features: [
      "Shopify or WooCommerce store designed around your products",
      "Product pages with strong photos, details, reviews, and clear shipping and returns",
      "Fast checkout with Shop Pay, Apple Pay, Google Pay and PayPal",
      "Dropshipping and fulfilment setup with AutoDS and supplier networks",
      "TikTok, Meta and Google pixels and conversion tracking",
      "AI video ad creative for TikTok and Meta",
      "Paid campaigns that scale only when they're profitable",
    ],
    relatedServices: ["online-stores", "seo-and-marketing"],
    relatedPosts: ["shopify-vs-woocommerce", "what-is-aeo-answer-engine-optimization"],
    faqs: [
      { q: "Can you run ads as well as build the Shopify store?", a: "Yes. We build the store and run TikTok and Meta campaigns, so the people making the ads and the people fixing the store are the same team." },
      { q: "Do you work with dropshipping stores?", a: "Yes. We set up AutoDS with Amazon and Alibaba suppliers and fix fulfilment issues between Shopify, TikTok Shop and your apps. See our Gladiolaz case study." },
      { q: "How much ad budget do I need to start?", a: "Less than most people think. We've launched TikTok campaigns at $20 a day that brought in orders within the first two weeks. What matters is tracking every order so spend only grows when it pays." },
      { q: "How much does Shopify cost per month?", a: "Shopify's own pricing page lists Basic at $29 a month billed yearly ($39 monthly), Grow at $79 and Advanced at $299, plus card fees from 2.9% + 30¢ on Basic. Apps and themes are extra." },
      { q: "Can you fix a Shopify store that gets traffic but no sales?", a: "Usually. The common causes are slow pages, weak product pages, surprise costs at checkout and missing trust signals. We audit those first, then test fixes against your conversion rate." },
    ],
  },
];

export const getMarket = (slug: string) => markets.find((m) => m.slug === slug);
