// Central site config. Change contact details, states or URLs here and
// every page, the schema markup and the sitemap pick it up.

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Devlonic Solutions",
  shortName: "Devlonic",
  url: resolveSiteUrl(),
  tagline: "Websites that earn their keep.",
  description:
    "Devlonic Solutions designs and builds websites, Shopify stores, apps and custom software for service businesses and ecommerce brands. Fixed price, agreed up front.",
  email: "info@devlonics.com",
  phoneDisplay: "+1 (201) 471-3717",
  phoneHref: "tel:+12014713717",
  founder: {
    name: "Muhammad Ahsan",
    role: "Founder and lead developer",
    linkedin: "https://www.linkedin.com/in/m-ahsan-top-rated-freelancer",
    portfolio: "https://www.m-ahsan.com",
  },
  profiles: {
    upwork: "https://www.upwork.com/freelancers/mahsanwordpress",
    linkedin: "https://www.linkedin.com/in/m-ahsan-top-rated-freelancer",
    trustpilot: "https://www.trustpilot.com/review/devlonics.com",
  },
  // How fast a written quote comes back. Shown in the hero, process and FAQ.
  quoteTurnaround: "one business day",
  yearsExperience: "5+",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/markets", label: "Markets we serve" },
  { href: "/about", label: "About" },
] as const;

export const absoluteUrl = (path = "/") => `${site.url}${path === "/" ? "" : path}`;
