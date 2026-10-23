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
  testimonial?: string; // name in lib/testimonials.ts
  caseStudy?: string; // slug in lib/case-studies.ts, shown as proof
  moreFaqs: Faq[];
};

const jobber = { label: "Jobber, 2026 Home Service Trends Report (1,050 US owners, Dec 2025)", url: "https://www.getjobber.com/home-service-trends-report/" };
const brightlocal = { label: "BrightLocal, Local Consumer Review Survey 2026", url: "https://www.brightlocal.com/research/local-consumer-review-survey/" };
const googleRanking = { label: "Google Business Profile Help: How Google determines local ranking", url: "https://support.google.com/business/answer/7091" };
const ftc = { label: "FTC: Final rule banning fake reviews and testimonials (2024)", url: "https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials" };
const serviceDirect = { label: "Abby Connect, summarizing Service Direct's home service call performance study", url: "https://www.abby.com/blog/are-your-home-service-calls-performing-well/" };
const ppcLand = { label: "PPC Land: Google LSA advertisers face missed-call charges from October 1, 2026", url: "https://ppc.land/google-lsa-advertisers-face-missed-call-charges-from-october-1/" };

export const landing: Record<string, ServiceLanding> = {
  "website-design": {
    secondaryKeywords: ["contractor website design", "website redesign cost", "website redesign services", "home service website design", "website design for small business"],
    problems: [
      { title: "The site looks older than your business", body: "A dated, slow website makes a good company look small. Homeowners compare you with the next result in seconds." },
      { title: "Visits, but the phone stays quiet", body: "Usually the number is hard to find on a phone, the form asks for too much, and there's nothing near the button that says you're the safe choice." },
      { title: "You can't change anything without a developer", body: "New services, photos and reviews never make it onto the site because every edit is a project." },
    ],
    sections: [
      {
        heading: "Contractor website design that answers the basics",
        paragraphs: [
          "Jobber's survey of 1,050 US home service owners found that 43% don't clearly list their service areas on their website, 65% don't show business hours and 74% have no FAQ section. Those are the three things a homeowner checks before calling.",
          "Every site we design answers them on the first screen: what you do, where you work, when you're open and how to reach you. Then each service and each main town gets its own page, so you can show up for searches like a trade plus a city name.",
        ],
        source: jobber,
      },
      {
        heading: "A website redesign that keeps your Google rankings",
        paragraphs: [
          "The biggest risk in a redesign is losing the traffic you already have. Before anything changes, we list every page that gets visits or links, map it to its new address and set up permanent redirects. Then we submit the new sitemap and watch Search Console daily for the first two weeks.",
          "We moved our own site from WordPress to a new build this year the same way, and wrote up the checklist in our guide to redesigning without losing rankings.",
        ],
      },
      {
        heading: "What a website redesign costs",
        paragraphs: [
          "The price depends on how many pages move across, how much content we write and the features you need, such as a quote funnel, a booking step or CRM integration. You get one fixed price in writing within one business day of filling in the form, before any work starts.",
        ],
      },
    ],
    testimonial: "Gavin Smith",
    caseStudy: "florida-surface-pro",
    moreFaqs: [
      { q: "What should a home service website include?", a: "Your phone number one tap away on every page, a short quote form, the towns you serve, your hours, real reviews and photos, license and insurance details, a page for each service and a short FAQ. Most leads are lost when one of these is missing." },
      { q: "Do you work with contractors outside home services?", a: "Yes, as long as you serve customers in a local area: clinics, med spas, home care agencies, flooring and concrete contractors, auto services and more. The same rules apply: make it easy to trust you and easy to call." },
    ],
  },

  "reputation-management": {
    secondaryKeywords: ["google review management services", "review management for local businesses", "small business reputation management", "online reputation management services usa"],
    problems: [
      { title: "Your newest review is months old", body: "Customers want to see that you're doing good work now. Old reviews read like a business that has slowed down." },
      { title: "A competitor has twice your reviews", body: "Reviews are one of the signals Google uses to rank map results, and the first thing a customer compares." },
      { title: "Bad reviews sit there with no reply", body: "Future customers read how you handle complaints. Silence looks like you don't care." },
    ],
    sections: [
      {
        heading: "Why recent reviews matter more than total reviews",
        paragraphs: [
          "BrightLocal's 2026 survey found that 74% of consumers only consider reviews from the last three months, and 32% look for reviews from the last two weeks. 31% will only use businesses rated 4.5 stars or higher, up from 17% the year before.",
          "That's why we set up automatic requests after every job instead of a one-off review push. A steady flow keeps your newest review recent and your rating stable.",
        ],
        source: brightlocal,
      },
      {
        heading: "Google review management: replying to every review",
        paragraphs: [
          "The same survey found that 89% of consumers expect business owners to respond to reviews, and 50% are put off by generic replies. We write a specific reply to each review in your voice, thank customers by what they mentioned, and answer complaints calmly with a way to make it right.",
        ],
        source: brightlocal,
      },
      {
        heading: "Reputation management that stays within the law",
        paragraphs: [
          "The FTC's rule on consumer reviews, final in 2024, bans fake reviews, buying reviews of a particular sentiment, undisclosed reviews from staff or family, and pressuring people to remove negative ones. Knowing violations can bring civil penalties.",
          "Our process asks every customer for an honest review with no strings attached. That's still allowed, and it's still the approach that works.",
        ],
        source: ftc,
      },
    ],
    testimonial: "Thania Alonso",
    moreFaqs: [
      { q: "Which review sites do you manage?", a: "Google first, because it drives map rankings and most calls. We also monitor and reply on Yelp, Facebook, BBB and industry sites like Angi or Houzz where your customers leave reviews." },
      { q: "Do I have to approve every reply?", a: "At the start, yes, so we learn your voice. After that, many owners approve only replies to negative reviews and let us post the thank-yous." },
    ],
  },

  "google-business-profile": {
    secondaryKeywords: ["google business profile optimization service", "local seo for contractors", "local seo for hvac contractors", "local seo for roofing contractors", "google my business optimization service"],
    problems: [
      { title: "You don't show up in the map results", body: "Searches for a trade plus 'near me' show a map with three businesses first. If you're not one of them, most of those calls go elsewhere." },
      { title: "The profile was set up once and forgotten", body: "Missing services, old photos, wrong hours and no posts tell Google and customers very little about you." },
      { title: "It got suspended, or you're afraid it will", body: "Suspensions hit many home service profiles in 2026. Most come down to the name, the address or the service area." },
    ],
    sections: [
      {
        heading: "How Google decides who shows up in Maps",
        paragraphs: [
          "Google says local results are based mainly on relevance, distance and prominence, and that there's no way to request or pay for a better local ranking. Relevance comes from your categories, services and website pages; prominence from reviews, links and how well known you are.",
          "Our work targets the parts you control: the right categories and services, a complete and active profile, steady reviews, and website pages for each service and town.",
        ],
        source: googleRanking,
      },
      {
        heading: "Local SEO for contractors, beyond the profile",
        paragraphs: [
          "The profile and the website work as a pair. We build a page for each service and each main town you cover, with real local detail rather than a copy with the town name swapped, add LocalBusiness schema, and make your business name, address and phone identical across the directories that matter.",
          "BrightLocal's 2026 survey also found 45% of consumers now use AI tools like ChatGPT to research local businesses. Consistent details and clear answers on your site help you show up there too.",
        ],
        source: brightlocal,
      },
    ],
    moreFaqs: [
      { q: "How long does it take to rank in Google Maps?", a: "Fixing categories, services and details can change which searches you appear for within weeks. Moving up against established competitors takes longer and depends mostly on reviews and how close searchers are to you." },
      { q: "Can you manage profiles for several locations?", a: "Yes. Each location gets its own verified profile, photos, posts and review requests, plus its own page on your website." },
    ],
  },

  "lead-generation": {
    secondaryKeywords: ["lead generation services for contractors", "website crm integration", "speed to lead system", "lead generation for roofing contractors", "quote form"],
    problems: [
      { title: "Leads get lost between the form and the follow-up", body: "An email sits in an inbox, someone retypes it into the CRM later, and by then the customer has booked someone else." },
      { title: "Half-finished forms disappear", body: "Long forms that ask for the address first lose people halfway, and with them the only way to call back." },
      { title: "You can't tell which ads bring jobs", body: "Without the ad source on each lead, every marketing decision is a guess." },
    ],
    sections: [
      {
        heading: "Speed to lead: why seconds matter",
        paragraphs: [
          "Jobber's survey of 1,050 US home service owners found more than 55% of customers expect a reply within the hour, and 28% expect an immediate one. Response speed was the third factor customers weigh when picking a provider, after price and reviews.",
          "A lead flow makes fast replies possible: the lead reaches your phone and CRM the moment it's sent, with everything your team needs to call back.",
        ],
        source: jobber,
      },
      {
        heading: "Website to CRM integration, without copy and paste",
        paragraphs: [
          "Most service businesses still move web leads into their CRM by hand or through a fragile email parser. We connect the form to your CRM directly where it has an API, or through Zapier or n8n where it doesn't, so each lead becomes a customer record with its project details, preferred time and ad source.",
          "For Florida Surface Pro we built a quote funnel that sends every finished lead into Builder Prime within seconds, emails the team and logs it to a Google Sheet, and saves unfinished leads too.",
        ],
      },
    ],
    testimonial: "Thania Alonso",
    caseStudy: "florida-surface-pro",
    moreFaqs: [
      { q: "Can you rebuild a quote page another agency made?", a: "Yes. We rebuilt Florida Surface Pro's funnel from a separate Lovable page into their own WordPress site, matching the design and adding partial leads, a preferred-time step and their CRM." },
      { q: "Do I own the leads and the form?", a: "Yes. The form lives on your website, leads go to your accounts, and nothing is locked into a platform you'd have to keep paying for." },
    ],
  },

  "local-ads": {
    secondaryKeywords: ["google local service ads management", "facebook ads for local service business", "geo targeting google ads", "local marketing for small businesses"],
    problems: [
      { title: "You pay for clicks from outside your area", body: "Loose targeting spends your budget on people you'd never drive to." },
      { title: "Ads send people to your homepage", body: "A visitor who clicked an ad for water heater repair shouldn't have to hunt for it." },
      { title: "Calls ring out while the ads keep running", body: "Since October 2026, Google bills Local Services Ads for missed calls during business hours." },
    ],
    sections: [
      {
        heading: "Google Local Services Ads management",
        paragraphs: [
          "From October 1, 2026, Google counts a missed call during your listed business hours as a billable Local Services Ads lead if the caller stays on the line for more than 20 seconds. In Service Direct's call study, in-house teams answered about 66% of calls.",
          "So before we raise a budget, we fix the phone side: overflow routing, honest business hours, missed-call text-back and a monthly review of charged leads.",
        ],
        source: ppcLand,
      },
      {
        heading: "Facebook ads for local service businesses",
        paragraphs: [
          "In Jobber's 2026 survey, 32% of home service owners named Facebook as a lead source, second only to referrals. Ads with real before-and-after photos, short job videos and a fast reply to every message do more than polished graphics.",
          "We target homeowners in your service area, send them to a short quote form, and track every lead back to the ad that brought it.",
        ],
        source: jobber,
      },
    ],
    moreFaqs: [
      { q: "Is the ad spend included in your price?", a: "No. You pay Google and Meta directly from your own ad accounts, so you always own the accounts and see every dollar. Our management fee is separate and fixed." },
      { q: "Can you run ads for several towns?", a: "Yes. We split campaigns by town or zip code where it helps, so you can spend more where jobs are most profitable." },
    ],
  },

  automation: {
    secondaryKeywords: ["missed call text back", "speed to lead automation", "ai receptionist for small business", "follow-up automation"],
    problems: [
      { title: "Missed calls go to the next company", body: "In Service Direct's call study, owners guessed they answered 97% of calls; the measured in-house rate was 66%." },
      { title: "Quotes go out and nobody follows up", body: "Most open quotes need a reminder or two. When the office is busy, they never get one." },
      { title: "The same data gets typed three times", body: "Website, CRM and spreadsheet each get the lead by hand, with mistakes along the way." },
    ],
    sections: [
      {
        heading: "The money a missing system costs",
        paragraphs: [
          "Service Direct's call performance study found owners believed they answered 97% of calls, while the measured in-house answer rate was 66%. Businesses using an answering service answered 99%. Every unanswered call is a customer who may already be dialing a competitor.",
          "A text back to every missed call, an instant reply to every web lead and a reminder on every open quote are cheap to run and catch a lot of that lost work.",
        ],
        source: serviceDirect,
      },
      {
        heading: "An AI receptionist for after-hours calls",
        paragraphs: [
          "For businesses that get calls at night or on weekends, an AI receptionist can answer, take details, book simple jobs and send emergencies to the on-call tech. We built one for an HVAC and plumbing company that posts a summary of every call to Slack and logs each lead.",
        ],
      },
    ],
    caseStudy: "ai-voice-receptionist-home-services",
    moreFaqs: [
      { q: "Do I need new software for this?", a: "Usually not. We build on the phone system, CRM and calendar you already use, and add a small automation tool such as n8n, Make.com or Zapier to connect them." },
      { q: "What if an automation breaks?", a: "Each one logs what it does and alerts us if a step fails. During the first weeks we watch them closely and fix anything that doesn't behave." },
    ],
  },
};
