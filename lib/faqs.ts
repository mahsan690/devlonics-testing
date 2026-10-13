import type { Faq } from "./services";
import { site } from "./site";

// Questions phrased the way people search them. Answers lead with the direct
// answer in the first sentence, so they can be quoted on their own.

export const homeFaqs: Faq[] = [
  {
    q: "How much does a website cost for a small business?",
    a: `Industry pricing guides published in 2026 put freelancer-built small business sites at roughly $500 to $5,000 and agency builds at about $5,000 to $15,000, with online stores costing more. We quote every project as a fixed price, in writing, within ${site.quoteTurnaround} of your request.`,
  },
  {
    q: "How long does it take to build a website?",
    a: "A landing page usually takes one to two weeks. A full business website typically takes three to six weeks from approved design to launch, and a Shopify store four to eight weeks. Apps and custom software are delivered in phases. Your quote includes a specific timeline.",
  },
  {
    q: "Which industries do you build websites for?",
    a: "Mostly US service businesses, such as HVAC, plumbing, roofing, cleaning, contractors, landscaping, home care and clinics, plus ecommerce and Shopify brands. Each has its own page under Markets we serve. If your industry isn't listed, the same approach still applies.",
  },
  {
    q: "Do you build on WordPress or Shopify?",
    a: "Both. Service businesses usually get WordPress with Elementor, so you can edit pages yourself; online stores usually get Shopify. We also build in Next.js and Laravel when a project needs custom features. We recommend a platform based on what you sell and who will maintain the site.",
  },
  {
    q: "Will I be able to update the website myself?",
    a: "Yes. We build on editors that are easy to learn and record a walkthrough of the edits you'll make most often. If you'd rather not touch it, a care plan covers updates for you.",
  },
  {
    q: "Who owns the website, domain and content?",
    a: "You do. Your domain, hosting account and content stay in your name, and you get full admin access at launch.",
  },
  {
    q: "Is SEO included with a new website?",
    a: "Technical SEO is included on every site: fast loading, unique page titles and descriptions, schema markup, an XML sitemap and Google Search Console setup. Ongoing local SEO, content and AI search optimization are available as a monthly service.",
  },
  {
    q: "What makes a good website for a service business?",
    a: "A good service business website makes the next step obvious on every page: your phone number one tap away, a short quote form, the services and towns you cover, real reviews and photos, and clear answers to common questions. It loads fast on a phone and tracks every call and form, so you can see what it earns.",
  },
  {
    q: "Are you a local web design agency?",
    a: `We're a remote web design studio led by ${site.founder.name}, serving businesses across the US. Remote work keeps prices lower, and you still get one point of contact, calls scheduled in your time zone and written progress updates.`,
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: "Why don't you publish a price list?",
    a: "Because two 'five-page websites' can be very different jobs. A fixed quote based on what you need is fairer than a package you have to squeeze into, and it only takes a couple of minutes to request one.",
  },
  {
    q: "Do you offer small business website design packages?",
    a: "We quote each project individually rather than selling fixed packages, but most fall into four common shapes: a landing page, a service business website, an online store, or an app or custom software build. Each quote lists exactly what's included, the price and the timeline.",
  },
  {
    q: "Is the budget I enter in the quote form binding?",
    a: "No. It helps us recommend the right approach. If your budget and your wish list don't line up, we'll suggest what to build first and what can wait.",
  },
  {
    q: "What are the ongoing costs after launch?",
    a: "Expect a domain renewal (typically $10 to $20 a year for a standard domain), hosting (from about $5 a month for shared hosting to $30 or more for managed hosting), and a monthly subscription if you use Shopify. Care plans for updates, backups and edits are optional.",
  },
  {
    q: "Do you fix problems after launch?",
    a: `Yes. If something we built breaks in the first ${site.freeFixesDays} days after launch, we fix it at no charge. After that, changes are covered by a care plan or quoted as a small fixed-price job.`,
  },
  {
    q: "How do payments work?",
    a: "The payment schedule is set out in your written quote before any work starts, so you know exactly what's due and when.",
  },
];
