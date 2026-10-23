import type { Faq } from "./services";
import { site } from "./site";

// Questions phrased the way people search them. Answers lead with the direct
// answer in the first sentence, so they can be quoted on their own.

export const homeFaqs: Faq[] = [
  {
    q: "What does Devlonic do for local service businesses?",
    a: "We help local service businesses get more calls and booked jobs: website design and redesign, reputation management, Google Business Profile and local SEO, lead flows that send every enquiry to your email and CRM, local ads, and small automations like missed-call text-back. Each project has a fixed price agreed before work starts.",
  },
  {
    q: "Which businesses do you work with?",
    a: "Only local service businesses in the US: HVAC, plumbing, roofing, cleaning, contractors and remodelers, landscaping, home care agencies, clinics and similar businesses that serve customers in an area. Each main industry has its own page under Markets we serve.",
  },
  {
    q: "How much does a website cost for a small business?",
    a: `Industry pricing guides published in 2026 put freelancer-built small business sites at roughly $500 to $5,000 and agency builds at about $5,000 to $15,000. We quote every project as a fixed price, in writing, within ${site.quoteTurnaround} of your request.`,
  },
  {
    q: "How do I get more Google reviews?",
    a: "Ask every customer right after the job, with a direct link that opens the review box, and reply to every review. We automate the requests by text and email after each job, and stay within Google's policies and the FTC's rule on reviews: no incentives, no fake reviews and no asking only happy customers.",
  },
  {
    q: "Can my website send leads straight to my CRM?",
    a: "Usually, yes. We connect quote forms to CRMs and job software through their API or Zapier, so each lead becomes a customer record with its details, preferred time and ad source, and your team gets an instant email or text. Unfinished forms can be saved as leads too.",
  },
  {
    q: "Do you run ads for local businesses?",
    a: "Yes. We manage Google Local Services Ads, Google search ads and Facebook and Instagram ads targeted to your service area, with call and form tracking so you see the cost per lead. Ad spend is paid to Google and Meta from your own accounts.",
  },
  {
    q: "How long does a website redesign take?",
    a: "Most redesigns launch three to six weeks after you approve the design. Lead flows and quote funnels usually take two to four weeks, and review, profile and ad management start within the first one to two weeks.",
  },
  {
    q: "Who owns the website, accounts and leads?",
    a: "You do. Your domain, website, Google Business Profile, ad accounts and leads stay in your name, and you get full access from day one.",
  },
  {
    q: "Are you a local agency?",
    a: `We're a remote team led by ${site.founder.name}, serving local service businesses across the US. Remote work keeps prices lower, and you still get one point of contact, calls scheduled in your time zone and written progress updates.`,
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: "Why don't you publish a price list?",
    a: "Because two 'five-page websites' can be very different jobs. A fixed quote based on what you need is fairer than a package you have to squeeze into, and it only takes a couple of minutes to request one.",
  },
  {
    q: "Do you offer packages for small businesses?",
    a: "We quote each project individually rather than selling fixed packages, but most fall into four common shapes: a website redesign, a lead flow or quote funnel, monthly reviews and Google profile management, and monthly local ads management. Each quote lists exactly what's included, the price and the timeline.",
  },
  {
    q: "Is the budget I enter in the quote form binding?",
    a: "No. It helps us recommend the right approach. If your budget and your wish list don't line up, we'll suggest what to build first and what can wait.",
  },
  {
    q: "What are the ongoing costs after launch?",
    a: "For a website, expect a domain renewal (typically $10 to $20 a year for a standard domain) and hosting (from about $5 a month for shared hosting to $30 or more for managed hosting). Ad spend, text messages and automation tools are billed by those providers to your own accounts. Care plans for updates, backups and edits are optional.",
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
