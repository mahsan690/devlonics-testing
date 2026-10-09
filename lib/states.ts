import type { Faq } from "./services";

// State landing pages. To target a different state, add or swap an entry here;
// pages, sitemap, schema and the quote form all read from this list.
// Figures: SBA Office of Advocacy, 2025 Small Business Profiles (mostly 2022 Census data).

export type StatePage = {
  slug: string;
  name: string;
  abbr: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  intro: string[];
  stats: { value: string; label: string }[];
  source: { label: string; url: string };
  industries: { name: string; note: string }[];
  cities: string[];
  angle: { title: string; body: string }[];
  faqs: Faq[];
};

export const states: StatePage[] = [
  {
    slug: "new-jersey",
    name: "New Jersey",
    abbr: "NJ",
    metaTitle: "Web Design for New Jersey Small Businesses",
    metaDescription:
      "Websites, online stores and local SEO for New Jersey small businesses, from North Jersey to the Shore. Fixed-price builds and a written quote within one business day.",
    heroTitle: "Web design for New Jersey small businesses.",
    intro: [
      "New Jersey packs more towns into less space than almost anywhere in the country. A plumber in Paterson and one in Clifton are competing for the same searches, often a few blocks apart, so the business whose site loads fastest and answers the question first usually gets the call.",
      "We build websites for New Jersey businesses that make that comparison easy to win: clear service pages, real reviews, tap-to-call on every screen, and a page for each town you actually serve.",
    ],
    stats: [
      { value: "1.1M", label: "small businesses in New Jersey" },
      { value: "99.7%", label: "of all New Jersey businesses are small businesses" },
      { value: "48.8%", label: "of New Jersey employees work for a small business" },
    ],
    source: {
      label: "SBA Office of Advocacy, 2025 New Jersey Small Business Profile",
      url: "https://advocacy.sba.gov/wp-content/uploads/2025/06/New_Jersey_2025-State-Profile.pdf",
    },
    industries: [
      { name: "Home services and contractors", note: "Older housing stock keeps remodelers, roofers and HVAC companies busy year-round." },
      { name: "Health care and home care", note: "Practices and agencies need sites that build trust with patients and families." },
      { name: "Professional services", note: "Accountants, attorneys and consultants selling to a commuter-heavy, comparison-shopping market." },
      { name: "Restaurants and food businesses", note: "Menus, online ordering and reservations that work on a phone." },
    ],
    cities: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison", "Woodbridge", "Toms River", "Hoboken", "Clifton", "Trenton", "Hackensack", "Morristown"],
    angle: [
      {
        title: "Town-level local SEO",
        body: "Customers search by town, not by county. We build service-area pages for the specific municipalities you cover so you show up for 'near me' searches across your patch.",
      },
      {
        title: "Built for comparison shoppers",
        body: "In a dense market, people open three tabs and call the clearest one. Fast pages, upfront pricing cues and visible reviews give you the edge.",
      },
      {
        title: "Quick, written answers",
        body: "Call or text our New Jersey number, or send the quote form. Your price and timeline come back in writing within one business day.",
      },
    ],
    faqs: [
      {
        q: "Do you work with businesses across all of New Jersey?",
        a: "Yes. We work with businesses from Bergen and Passaic counties down through Middlesex, Monmouth and Ocean, and anywhere else in the state. Everything is done remotely, with calls and screen-shares at times that suit you.",
      },
      {
        q: "How much does a website cost for a New Jersey small business?",
        a: "Every project gets a fixed price after a short scoping questionnaire. The price depends on the number of pages, features like booking or payments, and how much content we need to create. You get the number in writing before any work starts.",
      },
      {
        q: "Can you help my business show up in Google Maps in my town?",
        a: "Yes. We optimize your Google Business Profile, build town-specific service pages, add local schema markup and set up a simple process for collecting reviews, which are the main factors in local map rankings.",
      },
      {
        q: "Do you have an office in New Jersey?",
        a: "No. We're a remote team, which keeps our prices lower. You'll still have a direct New Jersey phone number, a named person running your project and regular progress updates.",
      },
    ],
  },
  {
    slug: "texas",
    name: "Texas",
    abbr: "TX",
    metaTitle: "Web Design for Texas Small Businesses",
    metaDescription:
      "Websites, online stores and local SEO for Texas small businesses in Houston, Dallas–Fort Worth, Austin, San Antonio and beyond. Fixed-price builds and fast quotes.",
    heroTitle: "Web design for Texas small businesses.",
    intro: [
      "Texas businesses often cover a lot of ground. A roofing crew might work an entire metro area, and a home care agency might serve several counties. If your website only mentions one city, you're invisible in the rest of your service area.",
      "We build Texas websites that match how far you actually travel: a strong main site, a page for each metro and suburb you serve, and quote forms short enough to fill in from a job site.",
    ],
    stats: [
      { value: "3.5M", label: "small businesses in Texas" },
      { value: "99.8%", label: "of all Texas businesses are small businesses" },
      { value: "5.1M", label: "Texans work for a small business" },
    ],
    source: {
      label: "SBA Office of Advocacy, 2025 Texas Small Business Profile",
      url: "https://advocacy.sba.gov/wp-content/uploads/2025/06/Texas_2025-State-Profile.pdf",
    },
    industries: [
      { name: "Construction and trades", note: "Fast population growth keeps builders, roofers, electricians and HVAC contractors in demand." },
      { name: "Home services", note: "Cleaning, landscaping, pest control and moving companies competing across sprawling metros." },
      { name: "Health care and home care", note: "Clinics and agencies serving fast-growing suburbs." },
      { name: "Retail and ecommerce", note: "Texas brands selling statewide and nationwide online." },
    ],
    cities: ["Houston", "Dallas", "Fort Worth", "Austin", "San Antonio", "El Paso", "Arlington", "Plano", "Frisco", "McKinney", "The Woodlands", "Corpus Christi"],
    angle: [
      {
        title: "Metro and suburb pages",
        body: "We plan your site around your real service area, with dedicated pages for each metro and the suburbs where your best jobs come from.",
      },
      {
        title: "Made for job-site phones",
        body: "Your customers and your crews are on their phones. Every page loads fast on mobile data and puts the call button under a thumb.",
      },
      {
        title: "Room to grow",
        body: "As you add crews, services or locations, the site grows with you, with no rebuild needed.",
      },
    ],
    faqs: [
      {
        q: "Do you work with businesses all over Texas?",
        a: "Yes. We work with businesses in Houston, Dallas–Fort Worth, Austin, San Antonio and smaller towns across the state. Projects run remotely with scheduled calls in Central Time.",
      },
      {
        q: "My business covers a whole metro area. How should the website handle that?",
        a: "We create a page for each major area you serve, each with genuinely local details such as neighborhoods, typical jobs and reviews from customers there. That gives Google a reason to show you across the whole region, not just near your address.",
      },
      {
        q: "How long does it take to build a website?",
        a: "A typical business website takes three to six weeks from approved design to launch. Online stores and custom features take longer, and your quote includes a specific timeline.",
      },
      {
        q: "Do you have an office in Texas?",
        a: "No. We're a remote team serving businesses across the US. You'll have one point of contact, calls on your schedule and written updates throughout the project.",
      },
    ],
  },
  {
    slug: "florida",
    name: "Florida",
    abbr: "FL",
    metaTitle: "Web Design for Florida Small Businesses",
    metaDescription:
      "Websites, booking sites, online stores and local SEO for Florida small businesses in Miami, Orlando, Tampa, Jacksonville and beyond. Fixed-price builds and fast quotes.",
    heroTitle: "Web design for Florida small businesses.",
    intro: [
      "Florida's busiest months can make or break a small business's year. Tourism, snowbird season and storm season all send waves of customers searching at once, and the businesses that can take a booking or a quote request online at midnight are the ones that fill up.",
      "We build Florida websites that keep working when you can't answer the phone: online booking, instant quote forms, clear service areas and pages that load fast on a beach-side cell signal.",
    ],
    stats: [
      { value: "3.5M", label: "small businesses in Florida" },
      { value: "99.8%", label: "of all Florida businesses are small businesses" },
      { value: "3.8M", label: "Floridians work for a small business" },
    ],
    source: {
      label: "SBA Office of Advocacy, 2025 Florida Small Business Profile",
      url: "https://advocacy.sba.gov/wp-content/uploads/2025/06/Florida_2025-State-Profile.pdf",
    },
    industries: [
      { name: "Hospitality and tourism", note: "Tours, rentals, restaurants and attractions that live on online bookings." },
      { name: "Home services and storm work", note: "Roofers, contractors and restoration companies that need to be found fast when demand spikes." },
      { name: "Real estate and property", note: "Agents, property managers and vacation rentals that need listings that sell." },
      { name: "Health, wellness and home care", note: "Practices and agencies serving one of the country's largest retiree populations." },
    ],
    cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale", "St. Petersburg", "Naples", "Sarasota", "West Palm Beach", "Fort Myers", "Tallahassee", "Boca Raton"],
    angle: [
      {
        title: "Bookings around the clock",
        body: "Online booking, deposits and automatic confirmations, so peak-season customers can book you even when you're fully stretched.",
      },
      {
        title: "Ready for demand spikes",
        body: "Fast hosting and simple pages that stay quick when everyone is searching at once, after a storm or at the start of the season.",
      },
      {
        title: "Visible to visitors",
        body: "Local SEO that reaches both residents and people planning a trip, through Google, Maps and AI travel assistants.",
      },
    ],
    faqs: [
      {
        q: "Do you work with businesses throughout Florida?",
        a: "Yes, from Miami and Fort Lauderdale to Orlando, Tampa Bay, Jacksonville and the Gulf Coast. Projects run remotely with calls in Eastern Time.",
      },
      {
        q: "Can my website take bookings and deposits?",
        a: "Yes. We set up online booking with calendar sync, deposits or full payment through Stripe or PayPal, and automatic confirmation and reminder emails.",
      },
      {
        q: "Can you help my business show up for tourists, not just locals?",
        a: "Yes. We optimize your Google Business Profile, write pages that answer the questions visitors ask before a trip, and add structured data so search engines and AI assistants can recommend you.",
      },
      {
        q: "Do you have an office in Florida?",
        a: "No. We're a remote team serving US businesses. You'll have one point of contact, calls on your schedule and written updates through the project.",
      },
    ],
  },
];

export const getState = (slug: string) => states.find((s) => s.slug === slug);
