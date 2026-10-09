import type { Faq } from "./services";
import { site } from "./site";

export const homeFaqs: Faq[] = [
  {
    q: "How much does a website cost?",
    a: `Every project gets a fixed price, agreed in writing before work starts. The price depends on how many pages you need, features like booking or payments, connections to other tools, and how much content we create for you. Fill in the short quote form and you'll get a written price within ${site.quoteTurnaround}.`,
  },
  {
    q: "How long does it take to build a website?",
    a: "A landing page usually takes one to two weeks. A full business website typically takes three to six weeks from approved design to launch. Online stores, apps and custom software take longer and are delivered in phases. Your quote includes a specific timeline.",
  },
  {
    q: "Do you only work with businesses in New Jersey, Texas and Florida?",
    a: "No. We work with businesses anywhere in the US. New Jersey, Texas and Florida are where we focus our local SEO research, so our state pages go deeper on those markets.",
  },
  {
    q: "Will I be able to update the website myself?",
    a: "Yes. We build on editors that are easy to learn, such as WordPress with Elementor or Shopify, and record a short walkthrough of the edits you'll make most often. If you'd rather not touch it, a care plan covers updates for you.",
  },
  {
    q: "Who owns the website, domain and content?",
    a: "You do. Your domain, hosting account and content stay in your name, and you get full admin access at launch.",
  },
  {
    q: "Can you redesign or fix my existing website?",
    a: "Yes. We can rebuild it from scratch or improve what's there. If your current site ranks in Google, we keep the pages that matter and set up redirects so you don't lose traffic in the switch.",
  },
  {
    q: "Is SEO included?",
    a: "Every site launches with technical SEO done properly: fast loading, clean page titles and descriptions, schema markup, a sitemap and Google Search Console set up. Ongoing local SEO and content are available as a monthly service.",
  },
  {
    q: "Are you a local agency?",
    a: `We're a remote web studio serving small businesses across the US, led by ${site.founder.name}. Remote work keeps our prices lower, and you still get one point of contact, calls scheduled in your time zone and written progress updates.`,
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: "Why don't you publish a price list?",
    a: "Because two 'five-page websites' can be very different jobs. A fixed quote based on what you actually need is fairer than a package you have to squeeze into. It only takes a couple of minutes to request one.",
  },
  {
    q: "Is the budget I enter in the form binding?",
    a: "No. It just helps us recommend the right approach. If your budget and your wish list don't line up, we'll suggest what to build first and what can wait.",
  },
  {
    q: "Are there ongoing costs after launch?",
    a: "Domain names and hosting have small yearly costs paid to those providers. Some platforms, like Shopify, have a monthly subscription. Care plans for updates, backups and edits are optional and billed monthly.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Changes after launch are covered by a care plan or quoted as a small fixed-price project. Your quote spells out what support is included at launch.",
  },
  {
    q: "How do payments work?",
    a: "The payment schedule is set out in your written quote before any work starts, so you know exactly what's due and when.",
  },
];
