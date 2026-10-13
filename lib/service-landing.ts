import type { Faq } from "./services";

// Landing-page content for each service page (app/services/[slug]).
// Facts and figures here come from the sources linked beside them; don't add
// numbers without a source. Testimonials are referenced by name from
// lib/testimonials.ts and quoted word for word there.

export type LandingSection = {
  heading: string; // an H2 that carries a secondary search phrase
  paragraphs: string[];
  source?: { label: string; url: string };
};

export type ServiceLanding = {
  secondaryKeywords: string[]; // supporting phrases, used naturally in the copy
  problems: { title: string; body: string }[];
  sections: LandingSection[];
  testimonial: string; // name in lib/testimonials.ts
  moreFaqs: Faq[];
};

const jobber = { label: "Jobber, 2026 Home Service Trends Report (1,050 US owners, Dec 2025)", url: "https://www.getjobber.com/home-service-trends-report/" };

export const landing: Record<string, ServiceLanding> = {
  "lead-generation-websites": {
    secondaryKeywords: [
      "home service website design",
      "contractor website design",
      "HVAC and plumbing website design",
      "lead generation website for small business",
      "service area pages",
      "call tracking",
    ],
    problems: [
      { title: "The website gets visits, but the phone stays quiet", body: "Usually the number is hard to find on a phone, the form asks for too much, and there's nothing next to the button that says you're the safe choice." },
      { title: "You pay for leads you share with three other companies", body: "Lead apps often send the same homeowner to several pros. Every call your own site brings in is one you don't pay per lead for or race competitors to answer." },
      { title: "Nobody can say which marketing actually works", body: "Without call and form tracking, you can't tell which pages, searches or ads bring in jobs, so every budget decision is a guess." },
    ],
    sections: [
      {
        heading: "Home service website design that answers the basics",
        paragraphs: [
          "Jobber's survey of 1,050 US home service owners found that 43% don't clearly list their service areas on their website, 65% don't show business hours and 74% have no FAQ section. Those are the three things a homeowner checks before calling.",
          "Every site we build answers them on the first screen: what you do, where you work, when you're open and how to reach you. Then each service and each main town gets its own page, so you can show up for searches like a trade plus a city name.",
        ],
        source: jobber,
      },
      {
        heading: "Contractor website design built around speed to lead",
        paragraphs: [
          "The same Jobber report found that more than 55% of customers expect a reply within the hour, and 28% expect an immediate one. A lead generation website only works if the lead reaches you fast.",
          "We send every form straight to your phone and inbox, add a tap-to-call bar on mobile, and can connect missed-call text-back or an answering service so after-hours enquiries don't go to a competitor.",
        ],
        source: jobber,
      },
      {
        heading: "Call tracking, so you know what each page earns",
        paragraphs: [
          "Before launch we set up tracking for calls, form submissions and booking clicks in Google Analytics 4. Each month you can see how many leads came in, which pages and searches sent them, and which ones are worth more investment.",
        ],
      },
    ],
    testimonial: "Thania Alonso",
    moreFaqs: [
      { q: "What should a home service website include?", a: "Your phone number one tap away on every page, a short quote form, the towns you serve, your hours, real reviews and photos, license and insurance details, a page for each service and a short FAQ. Most leads are lost when one of these is missing." },
      { q: "Is a lead generation website better than buying leads from Angi or Thumbtack?", a: "They do different jobs. Lead apps can fill gaps, but the same lead often goes to several pros and you pay whether or not you win the job. Your own site brings in enquiries only you receive, and the cost per lead falls as it ranks." },
      { q: "Do you build lead generation websites for roofers and remodelers?", a: "Yes. Roofers, remodelers, HVAC companies, plumbers, cleaners and landscapers are the businesses we build lead generation websites for most. Each gets pages for its own job types and towns, plus forms tuned to the details that trade needs, such as photos of the damage or the room." },
    ],
  },

  "small-business-websites": {
    secondaryKeywords: [
      "custom website design for small business",
      "affordable small business website",
      "WordPress website design",
      "website redesign services",
      "web design company for small business",
      "mobile-friendly website",
    ],
    problems: [
      { title: "Your website looks older than your business", body: "Customers judge you in seconds. A dated site makes a solid business look small or closed, and sends people to whoever looks more established." },
      { title: "It's slow or breaks on phones", body: "Most visitors arrive on a phone. Text that needs zooming, buttons too small to tap and slow pages quietly cost you enquiries every day." },
      { title: "Every small change needs a developer", body: "New prices, photos or opening hours shouldn't mean waiting a week and paying an invoice. You should be able to do it yourself." },
    ],
    sections: [
      {
        heading: "Custom website design for small businesses, at a fixed price",
        paragraphs: [
          "Every site starts with a short questionnaire and a written plan: the pages, the features, the timeline and one fixed price. You approve the homepage design before development starts, and we build on a private staging site so nothing changes on your live site until you sign off.",
          "We design around your brand and your customers, not a template, and use proven building blocks for forms and galleries so the site stays fast and easy to maintain.",
        ],
      },
      {
        heading: "WordPress website design you can edit yourself",
        paragraphs: [
          "Most small business sites we build run on WordPress with Elementor, because it's quick to learn and easy to hire help for later. You get a recorded walkthrough of the edits you'll make most often, plus full admin access, the domain and hosting in your name.",
          "If you need something faster or more custom, we build in Next.js instead. We'll recommend one in the plan and explain why.",
        ],
      },
      {
        heading: "Website redesign services that keep your Google rankings",
        paragraphs: [
          "A redesign shouldn't cost you the traffic you've earned. We map every old address to its new page and set up permanent redirects, which Google says don't lose ranking signals, then submit the new sitemap in Search Console.",
          "We did exactly this when devlonics.com moved from WordPress to this site, so we know where rankings slip if it's rushed.",
        ],
        source: { label: "Google Search Central: site moves with URL changes", url: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes" },
      },
    ],
    testimonial: "Sohan Bapary",
    moreFaqs: [
      { q: "How long does a small business website take to build?", a: "Most launch in three to six weeks from an approved design. The biggest factor is usually how quickly content, photos and feedback come back." },
      { q: "Do you offer website redesign services?", a: "Yes. We redesign existing sites on WordPress, Shopify or custom code, keep the URLs that already rank, redirect the rest and check Search Console after launch." },
      { q: "How much does a website redesign cost?", a: "It depends on how many pages move across, whether the content is rewritten, and what features are added. We quote every redesign as a fixed price, and it always includes redirects from your old addresses so you keep the Google rankings you've earned." },
    ],
  },

  "online-stores": {
    secondaryKeywords: [
      "Shopify developer",
      "Shopify website design",
      "WooCommerce development",
      "ecommerce website development",
      "Shopify store setup",
      "migrate to Shopify",
    ],
    problems: [
      { title: "Shoppers add to cart, then disappear", body: "Baymard Institute puts the average documented cart abandonment rate at 70.22%. Surprise costs at checkout are the top reason, followed by slow delivery and not trusting the site with a card." },
      { title: "The store looks fine but doesn't sell", body: "Thin product pages, unclear shipping and returns, and no reviews near the buy button make people hesitate, no matter how much traffic you send." },
      { title: "Ads run, but nobody knows what pays", body: "Without pixels and conversion tracking set up properly, you can't see which products and campaigns make money, so spend goes to the wrong places." },
    ],
    sections: [
      {
        heading: "Shopify store setup, from theme to first order",
        paragraphs: [
          "We set up the theme and design it for your brand, build product and collection pages, import products and variants, configure Shop Pay, Stripe, PayPal, Apple Pay and Google Pay, set shipping zones and taxes, and test checkout end to end before launch.",
          "Then we connect Google Analytics 4 and the Meta and TikTok pixels, so the day you start ads you can see which products and campaigns bring in sales.",
        ],
      },
      {
        heading: "Ecommerce website development that fixes the checkout leaks",
        paragraphs: [
          "Baymard's research lists the biggest reasons shoppers abandon checkout: extra costs too high (40%), delivery too slow (20%), not trusting the site with card details (19%), forced account creation (18%) and a long or complicated checkout (17%).",
          "So we show shipping costs and delivery times early, offer guest checkout and express wallets, put reviews and returns policy beside the buy button, and keep checkout to as few steps as the platform allows.",
        ],
        source: { label: "Baymard Institute: cart abandonment rate statistics", url: "https://baymard.com/lists/cart-abandonment-rate" },
      },
      {
        heading: "WooCommerce development and moving to Shopify",
        paragraphs: [
          "If your business already runs on WordPress or has unusual product rules, WooCommerce can be the better fit, and we build and maintain those too. If you're ready to leave WooCommerce, Wix or a marketplace, we migrate products, customers and order history where the platforms allow it and redirect old links so rankings carry over.",
        ],
      },
    ],
    testimonial: "Gavin Smith",
    moreFaqs: [
      { q: "Do I need a Shopify developer, or can I set it up myself?", a: "You can launch a simple store yourself. A Shopify developer earns their fee when you need a custom theme, a large product import, integrations with suppliers or apps, or tracking set up correctly for ads." },
      { q: "How do I reduce cart abandonment on Shopify?", a: "Show shipping costs and delivery times before checkout, allow guest checkout, offer express wallets like Shop Pay and Apple Pay, put reviews and your returns policy near the buy button, and send an abandoned-cart email within a few hours." },
      { q: "How much does Shopify store development cost?", a: "It depends on whether you start from a theme or need a custom design, how many products and integrations you have, and whether you need dropshipping or fulfilment set up. We send a fixed price in writing after a short questionnaire." },
    ],
  },

  "app-development": {
    secondaryKeywords: [
      "mobile app development company",
      "custom app development",
      "web app development",
      "booking app development",
      "React Native app development",
      "membership app",
    ],
    problems: [
      { title: "Bookings happen by text and phone tag", body: "Customers message to ask for a slot, you message back, and half the day goes on scheduling instead of the work itself." },
      { title: "Regulars forget to come back", body: "Without saved accounts, reminders or one-tap rebooking, even happy customers drift to whoever is easier to book." },
      { title: "Agency quotes are out of reach", body: "Big studios quote for the finished product up front. Most small businesses need a useful first version, not a year-long project." },
    ],
    sections: [
      {
        heading: "Custom app development, delivered in phases",
        paragraphs: [
          "We start with the smallest version that's genuinely useful, usually accounts, bookings or orders, and payments, and get it into customers' hands. Each later phase is scoped and priced before it starts, based on what people actually use.",
          "For most business apps, one React Native codebase covers iPhone and Android, which keeps both the build and the maintenance cost down.",
        ],
      },
      {
        heading: "Web app or mobile app: which do you need?",
        paragraphs: [
          "A web app runs in the browser, needs no app store approval and is cheaper to build, which suits portals, dashboards and booking tools. A mobile app earns its cost when customers return often and benefit from push notifications, saved cards and one-tap reordering.",
          "We'll recommend one in your plan, and often a web app first is the faster way to prove the idea.",
        ],
      },
      {
        heading: "Booking app development for service businesses",
        paragraphs: [
          "Booking apps we build let customers pick a time, pay a deposit, get reminders and reschedule without calling. Your team gets an admin panel to manage availability, staff and payments, and the data stays yours.",
        ],
      },
    ],
    testimonial: "Graziel Balbinoti",
    moreFaqs: [
      { q: "How much does app development cost for a small business?", a: "It depends on the screens, the integrations and whether you need iPhone, Android or both. We break it into phases with a fixed price for each, so you can launch a first version and spread the cost." },
      { q: "Do you build web apps as well as mobile apps?", a: "Yes. Many projects start as a web app, such as a customer portal or booking tool, and add mobile apps once customers are using it." },
      { q: "Does a small business need a mobile app?", a: "Often not at first. If customers mainly need to find you, book or buy, a fast website does the job. An app earns its cost when people use it repeatedly, for example for bookings, loyalty, ordering or a client portal, or when your team needs a tool in the field." },
    ],
  },

  "custom-software": {
    secondaryKeywords: [
      "custom CRM development",
      "client portal development",
      "business process automation",
      "internal tools development",
      "booking system development",
      "Laravel development",
    ],
    problems: [
      { title: "The business runs on spreadsheets", body: "Jobs, customers and invoices live in five places. Someone copies data between them every day, and mistakes slip through." },
      { title: "You pay for tools that don't talk to each other", body: "A CRM, a scheduler, an invoicing app and a form builder, each with its own login and subscription, and none of them share data." },
      { title: "Clients email you for every update", body: "Status checks, document requests and payment reminders eat hours that a simple client portal would handle on its own." },
    ],
    sections: [
      {
        heading: "Custom CRM development around how you sell",
        paragraphs: [
          "Off-the-shelf CRMs are built for everyone, so they fit no one exactly. We build CRMs that follow your actual pipeline: the fields you use, the stages you move jobs through, and the reminders that stop leads going cold.",
          "If an existing tool covers most of what you need, we'll say so and connect it instead. Custom software only makes sense where it saves real time or wins real work.",
        ],
      },
      {
        heading: "Client portal development",
        paragraphs: [
          "A client portal gives customers a secure login to see project status, download documents, sign forms and pay invoices. It cuts back-and-forth email and makes a small team look organized.",
        ],
      },
      {
        heading: "Business process automation and AI that saves hours",
        paragraphs: [
          "AI is already part of daily work for many small businesses: in Jobber's survey, 52% of home service owners use AI in daily operations, most often for quoting, invoicing and writing. We build automation where it pays off, such as follow-ups, reminders, reports, data entry and AI-assisted drafting, and keep people in charge of the decisions.",
        ],
        source: jobber,
      },
    ],
    testimonial: "Jason Sullivan",
    moreFaqs: [
      { q: "How much does custom software cost?", a: "It depends on the users, the workflows and the integrations. We scope the first phase around the most painful problem and give a fixed price for it, so you see value before committing to more." },
      { q: "What technology do you build custom software with?", a: "Mostly Laravel (PHP) and Next.js with MySQL or PostgreSQL, hosted on reliable cloud infrastructure. The code is yours if you ever want to move it." },
      { q: "Is a custom CRM better than an off-the-shelf CRM for a small business?", a: "Start with an off-the-shelf CRM if it fits how you sell. A custom CRM makes sense when you're paying for many seats you don't use, bending your process to fit the software, or copying data between tools by hand. We'll tell you honestly which side you're on." },
    ],
  },

  "seo-and-marketing": {
    secondaryKeywords: [
      "local SEO services",
      "Google Business Profile optimization",
      "SEO for home service businesses",
      "Google Ads for contractors",
      "Local Services Ads management",
      "AEO and AI search",
    ],
    problems: [
      { title: "Competitors show up in the map results, you don't", body: "Most high-intent local searches end in the map pack. If your profile, reviews and service pages are thin, you're invisible where buyers decide." },
      { title: "AI answers skip your business", body: "A Pew Research study found Google users clicked a result on 8% of visits when an AI summary appeared, versus 15% without one. If the AI answer doesn't mention you, fewer people ever reach your site." },
      { title: "Ad costs keep climbing", body: "Google is moving Local Services Ads into Google Ads, and from October 1, 2026 it charges missed calls over 20 seconds during business hours as leads. Spend needs closer watching than ever." },
    ],
    sections: [
      {
        heading: "Local SEO services for service businesses",
        paragraphs: [
          "Google ranks local results on relevance, distance and prominence. We improve the two you control: a complete Google Business Profile, service and service-area pages that match what people search, and a steady stream of recent reviews.",
          "Reviews matter more each year. BrightLocal's 2026 survey found 74% of consumers only consider reviews from the last three months, and 31% will only use businesses rated 4.5 stars or higher.",
        ],
        source: { label: "BrightLocal, Local Consumer Review Survey 2026", url: "https://www.brightlocal.com/research/local-consumer-review-survey/" },
      },
      {
        heading: "AEO: getting named in AI search answers",
        paragraphs: [
          "BrightLocal also found 45% of consumers now use AI tools such as ChatGPT when researching local businesses, up from 6% a year earlier. AI assistants favor sites that answer common questions clearly, keep business details consistent everywhere and use structured data.",
          "We write answer-first content for your services, add schema markup and clean up your listings so AI tools can understand and cite you.",
        ],
        source: { label: "Pew Research Center: Google users click less when an AI summary appears", url: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/" },
      },
      {
        heading: "Google Ads and Local Services Ads management",
        paragraphs: [
          "We set up and manage Google Ads, Local Services Ads, Meta and TikTok campaigns with every call, form and sale tracked back to its source. Budgets start small and only grow when the numbers justify it.",
          "With Local Services Ads now billing qualifying missed calls, we also look at how your phones are answered, because an unanswered call can cost as much as a booked job.",
        ],
        source: { label: "PPC Land: Local Services Ads missed-call charges from October 1, 2026", url: "https://ppc.land/google-lsa-advertisers-face-missed-call-charges-from-october-1/" },
      },
    ],
    testimonial: "Thania Alonso",
    moreFaqs: [
      { q: "What do local SEO services include each month?", a: "Google Business Profile updates and posts, review requests and replies, new or improved service and area pages, technical fixes, citation clean-up and a monthly report of rankings, calls and leads." },
      { q: "Do you manage Google Local Services Ads?", a: "Yes. We set up and optimize Local Services Ads alongside Google Ads, tighten service areas and job types, and review charged leads each month." },
      { q: "Do you do local SEO for HVAC and roofing contractors?", a: "Yes. Local SEO for HVAC contractors, roofers, plumbers and other home service companies is most of our SEO work: Google Business Profile optimization, review growth, service and town pages, and tracking calls from search." },
      { q: "Do you offer answer engine optimization services?", a: "Yes. Our answer engine optimization (AEO) work makes your business easy for AI assistants to understand and cite: clear answers to common questions on your pages, consistent business details across the web, structured data, and reviews and mentions on trusted sites." },
    ],
  },
};
