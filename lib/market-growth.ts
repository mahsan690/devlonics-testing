import type { Faq } from "./services";

// "How to get more ___ leads" content for each market page, plus the
// supporting search phrases and extra questions each page targets.
// Phrases come from Google and Bing autocomplete for US searches
// (research/keyword-suggestions.json, collected October 2026).
// Keep claims general here; numbers live in the sourced blog posts.

export type MarketGrowth = {
  secondaryKeywords: string[];
  heading: string; // H2, carries the "how to get more ___ leads" search
  intro: string;
  points: { title: string; body: string }[];
  posts: string[]; // blog slugs; only published posts are shown
  faqs: Faq[];
};

export const marketGrowth: Record<string, MarketGrowth> = {
  hvac: {
    secondaryKeywords: ["HVAC web design", "HVAC website design company", "HVAC marketing", "HVAC marketing strategies", "AC repair near me", "air conditioning website design"],
    heading: "How to get more HVAC leads",
    intro:
      "A strong website is the base, but HVAC leads come from three places at once: Google's map results, paid search in peak season and repeat customers on maintenance plans. This is the HVAC marketing we set up for heating and cooling companies.",
    points: [
      { title: "Show up for \"AC repair near me\"", body: "A complete Google Business Profile, steady new reviews and a page for every service and town are what move you into the map results homeowners call from." },
      { title: "Answer every call in peak season", body: "Overflow routing, missed-call text-back and an answering service or AI voice receptionist for evenings, so the July rush books jobs instead of voicemails." },
      { title: "Fill spring and fall", body: "Tune-up campaigns, online booking and maintenance plan sign-ups keep technicians busy between heat waves and cold snaps." },
      { title: "Track which pages book jobs", body: "Call and form tracking per page and campaign, so budget moves to what brings in work." },
    ],
    posts: ["hvac-marketing-2026", "google-local-services-ads-missed-calls", "slow-season-marketing-home-services", "offer-financing-on-your-website"],
    faqs: [
      { q: "Are you an HVAC marketing agency or a web design company?", a: "Both. We design and build HVAC websites, then run the local SEO, Google Business Profile work and ads that send people to them, so one team is responsible for the calls. You can start with the website and add marketing later." },
      { q: "What are the best HVAC marketing strategies?", a: "The strategies that pay off most reliably are a fast website with emergency tap-to-call, a complete Google Business Profile with fresh reviews, a page for each service and town, Google Ads or Local Services Ads in peak season, and maintenance plans that bring customers back every year." },
    ],
  },

  plumbing: {
    secondaryKeywords: ["plumbing website design services", "plumbing company website design", "plumber marketing", "plumber marketing agency", "emergency plumber near me", "how to get more plumbing leads"],
    heading: "How to get more plumbing leads",
    intro:
      "Most plumbing jobs start with an urgent search and a phone call. Plumber marketing that works keeps your number in front of people at that moment and makes sure someone answers it.",
    points: [
      { title: "Win the emergency search", body: "A sticky call bar, an emergency page for burst pipes, clogs and water heaters, and a Google Business Profile that shows your real hours." },
      { title: "Answer at 2am, or call back in minutes", body: "After-hours routing, an AI voice receptionist and missed-call text-back stop urgent callers from moving on to the next plumber." },
      { title: "Own your leads", body: "Every call from your own site and profile is one you don't share with three competitors or pay per lead for." },
      { title: "Earn reviews after every job", body: "A short text with your review link right after the visit builds the steady stream of reviews that local rankings reward." },
    ],
    posts: ["emergency-plumber-marketing", "angi-vs-thumbtack-vs-your-own-website", "speed-to-lead-home-service-businesses", "how-to-get-more-google-reviews"],
    faqs: [
      { q: "Do you offer plumber marketing as well as plumbing website design?", a: "Yes. Alongside plumbing website design services we handle local SEO, Google Business Profile management, review requests and Google Ads, so the site and the marketing pointing at it work together." },
      { q: "How do I get more leads for my plumbing business?", a: "Make your number one tap away on every page, give each service and town its own page, keep your Google Business Profile complete with fresh reviews, answer or text back missed calls within minutes, and track which pages and searches bring in jobs." },
    ],
  },

  roofing: {
    secondaryKeywords: ["roofing contractor website design", "roofing web design", "roofing marketing", "roofing marketing agency", "roofing leads", "storm damage roofing leads"],
    heading: "How to get more roofing leads",
    intro:
      "Roofing is a high-trust, high-ticket decision, and demand spikes after storms. Roofing marketing that works is ready before the storm and proves you're legitimate the moment someone lands.",
    points: [
      { title: "Have storm pages ready before the storm", body: "Storm damage, hail and insurance claim pages written in advance, so you can turn ads and posts on the same day a storm hits." },
      { title: "Prove you're the real thing", body: "Licenses, insurance, manufacturer certifications, real project photos by town and honest reviews next to every inspection button." },
      { title: "Book inspections, not just calls", body: "An inspection booking form that asks for address and photos, with a fast reply, wins against roofers who call back tomorrow." },
      { title: "Show up across your service area", body: "A page for each town you roof in, with local projects, so you rank beyond the town your office is in." },
    ],
    posts: ["roofing-leads-after-storms", "ftc-fake-review-rule-small-business", "service-area-pages-seo", "offer-financing-on-your-website"],
    faqs: [
      { q: "Do you do roofing marketing as well as roofing website design?", a: "Yes. We build roofing contractor websites and run the local SEO, storm-response ads and review campaigns that bring inspection requests to them." },
      { q: "How do I get more leads for my roofing business?", a: "Prepare storm damage pages before storm season, show licenses, insurance and real projects by town, make booking an inspection simple, ask every customer for a review, and keep your Google Business Profile active with photos and posts." },
    ],
  },

  cleaning: {
    secondaryKeywords: ["cleaning service website", "cleaning business website design", "cleaning business marketing", "cleaning business marketing ideas", "house cleaning website", "commercial cleaning website"],
    heading: "How to get more cleaning clients",
    intro:
      "Cleaning customers compare a few companies quickly and pick the one that makes booking easiest. Cleaning business marketing works best when it turns one-off cleans into recurring clients.",
    points: [
      { title: "Quote and book online", body: "An instant estimate by home size and a booking calendar remove the back-and-forth that loses customers to faster competitors." },
      { title: "Sell the recurring plan", body: "Weekly and fortnightly plans shown up front, with a reason to choose them, turn first cleans into steady income." },
      { title: "Collect reviews after every clean", body: "An automatic review request after each visit builds the trust new customers look for before letting a stranger into their home." },
      { title: "Rank in each neighborhood", body: "Pages for the areas and building types you serve, from apartments to offices, help you show up for local searches." },
    ],
    posts: ["cleaning-business-marketing-recurring-clients", "online-booking-for-home-service-businesses", "how-to-get-more-google-reviews", "service-area-pages-seo"],
    faqs: [
      { q: "What are the best cleaning business marketing ideas?", a: "Instant online quotes and booking, recurring plans with a clear reason to sign up, automatic review requests after each clean, a complete Google Business Profile, neighborhood pages for local search, and referral offers for existing clients." },
      { q: "How do I get more leads for my cleaning business?", a: "Make it possible to get a price and book without a phone call, show reviews and your insurance up front, follow up on every quote within minutes, and build pages for each area you serve so you appear in local searches." },
    ],
  },

  contractors: {
    secondaryKeywords: ["contractor web design services", "general contractor website design", "construction website design", "remodeling contractor website", "contractor marketing", "how to get more construction leads"],
    heading: "How to get more remodeling and construction leads",
    intro:
      "Contractor marketing is about attracting the right projects, not just more calls. Your website should sell your best work and screen out jobs that don't fit.",
    points: [
      { title: "Show projects like the one they're planning", body: "Galleries by project type and town, with before-and-after photos and a short story, sell the next kitchen or addition." },
      { title: "Filter the leads", body: "A quote form that asks for budget range, timeline and photos means fewer site visits for jobs you won't win." },
      { title: "Make big projects affordable", body: "Financing options on project pages help homeowners say yes to larger scopes." },
      { title: "Put credentials where decisions happen", body: "License, insurance, warranties and reviews beside every quote button answer the questions that stall big decisions." },
    ],
    posts: ["contractor-website-remodeling-leads", "offer-financing-on-your-website", "careers-page-hiring-technicians", "how-to-get-more-google-reviews"],
    faqs: [
      { q: "Do you offer contractor marketing services?", a: "Yes. Besides contractor web design services, we run local SEO, Google Business Profile management and Google Ads for general contractors and remodelers, focused on the project types you want more of." },
      { q: "How do I get more leads for my construction company?", a: "Show your best projects by type and location, make the quote form ask for budget and timeline, offer financing on larger jobs, keep your Google Business Profile full of recent project photos, and ask every happy client for a review." },
    ],
  },

  landscaping: {
    secondaryKeywords: ["lawn care website design", "lawn care web design", "landscaping marketing ideas", "landscaping marketing", "lawn care marketing", "how to get more lawn care customers"],
    heading: "How to get more landscaping and lawn care customers",
    intro:
      "Landscaping demand follows the seasons, so the best landscaping marketing plans the year ahead: design and build work in spring, maintenance all summer, cleanups and snow in fall and winter.",
    points: [
      { title: "Plan campaigns by season", body: "Seasonal service pages and offers you can switch on in advance, from spring cleanups to fall aeration and snow removal." },
      { title: "Let photos sell the work", body: "Before-and-after galleries by project type do more than any description of what you do." },
      { title: "Sign customers up for maintenance", body: "Weekly mowing and maintenance plans with online sign-up create predictable income." },
      { title: "Own your neighborhoods", body: "Neighborhood pages and an active Google Business Profile help you dominate the areas you want to work in." },
    ],
    posts: ["landscaping-marketing-ideas", "slow-season-marketing-home-services", "online-booking-for-home-service-businesses", "service-area-pages-seo"],
    faqs: [
      { q: "How do I get more customers for my lawn care business?", a: "Offer online quotes and maintenance plan sign-ups, show before-and-after photos, keep your Google Business Profile active with fresh photos and reviews, build pages for the neighborhoods you serve, and run seasonal offers before each busy period." },
      { q: "What are good landscaping marketing ideas?", a: "Seasonal campaigns planned in advance, project galleries with before-and-after photos, maintenance plans with online sign-up, neighborhood pages for local SEO, review requests after every job, and referral offers for existing customers." },
    ],
  },

  "home-care-and-clinics": {
    secondaryKeywords: ["home care agency website", "home health agency website", "home care services website", "home care marketing", "home care marketing ideas", "caregiver recruiting website"],
    heading: "How to get more home care clients and caregivers",
    intro:
      "Home care agencies market to two audiences at once: families looking for care and caregivers looking for work. Home care marketing that works serves both without confusing either.",
    points: [
      { title: "Make the first call easy for families", body: "Clear service descriptions, areas served, what happens after an inquiry and a simple form for worried family members." },
      { title: "Recruit caregivers online", body: "A careers page with pay, schedules and a short application keeps your roster full, which lets you say yes to more clients." },
      { title: "Build trust and accessibility in", body: "Licensing, reviews and an accessible design for older visitors and screen-reader users." },
      { title: "Work the referral sources", body: "Pages and materials for hospitals, discharge planners and physicians who refer clients." },
    ],
    posts: ["home-care-agency-marketing", "careers-page-hiring-technicians", "ada-website-compliance-small-business", "how-to-get-more-google-reviews"],
    faqs: [
      { q: "What are the best home care marketing ideas?", a: "A clear, accessible website for families, a careers page that keeps caregiver recruiting steady, a complete Google Business Profile with reviews, local pages for the areas you serve, and relationships with hospitals, discharge planners and physicians who refer clients." },
      { q: "Do you build home health agency websites too?", a: "Yes. We build websites for home care and home health agencies and medical clinics, with clear service pages, inquiry and check-in forms, caregiver recruiting pages and accessibility built in." },
    ],
  },


};
