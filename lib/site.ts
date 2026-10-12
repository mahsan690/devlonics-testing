// Central site config. Change contact details or URLs here and every page,
// the schema markup and the sitemap pick it up.

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
  tagline: "Built to convert.",
  description:
    "Web design and Shopify development for US service businesses and ecommerce brands: lead generation websites, online stores, local SEO and ads. Fixed price.",
  email: "info@devlonics.com",
  // Every quote request is delivered to all of these inboxes.
  // LEAD_TO_EMAIL (comma-separated) in Vercel overrides this list.
  leadInboxes: ["info@devlonics.com", "m-ahsan@devlonics.com"],
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
  // Figures and promises from the founder's own Upwork profile. Keep in sync.
  yearsExperience: "6+",
  projectsDelivered: "100+",
  freeFixesDays: 14,
} as const;

// Search engines index the site only in production on its real domain.
// Preview deployments and the temporary *.vercel.app address stay noindex,
// so Google never files the site under a URL it will later have to forget.
// Set NEXT_PUBLIC_SITE_URL=https://devlonics.com when the domain is connected.
export const isIndexable = (() => {
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  let host = "";
  try {
    host = new URL(site.url).hostname;
  } catch {}
  return isProduction && !host.endsWith(".vercel.app") && host !== "localhost";
})();

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/markets", label: "Markets we serve" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;

export const absoluteUrl = (path = "/") => `${site.url}${path === "/" ? "" : path}`;
