import { site, absoluteUrl } from "./site";
import { markets, type Market } from "./markets";
import type { Faq, Service } from "./services";
import type { CaseStudy } from "./case-studies";

// Structured data (JSON-LD). Devlonic is a remote, service-area business:
// no street address is published and the service area is the United States.

const orgId = `${site.url}/#organization`;
const us = { "@type": "Country", name: "United States" };

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: site.name,
        url: site.url,
        logo: absoluteUrl("/brand/devlonic-logo.svg"),
        image: absoluteUrl("/opengraph-image"),
        description: site.description,
        email: site.email,
        telephone: site.phoneHref.replace("tel:", ""),
        priceRange: "$$",
        founder: {
          "@type": "Person",
          name: site.founder.name,
          jobTitle: site.founder.role,
          sameAs: [site.founder.linkedin, site.founder.portfolio],
        },
        areaServed: us,
        audience: markets.map((m) => ({ "@type": "BusinessAudience", audienceType: m.name })),
        knowsAbout: [
          "Website design", "Website redesign", "Reputation management", "Google Business Profile",
          "Local SEO", "Lead generation", "CRM integration", "Google Local Services Ads", "Google Ads", "Meta ads",
          "Marketing automation", "Missed-call text-back", "AI receptionists",
        ],
        sameAs: [site.profiles.upwork, site.profiles.linkedin, site.profiles.trustpilot],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: site.phoneHref.replace("tel:", ""),
          email: site.email,
          areaServed: "US",
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": orgId },
        inLanguage: "en-US",
      },
    ],
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.metaDescription,
    url: absoluteUrl(`/services/${s.slug}`),
    image: absoluteUrl(`/services/${s.slug}.webp`),
    provider: { "@id": orgId },
    areaServed: us,
  };
}

export function marketServiceSchema(m: Market) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: m.metaTitle,
    serviceType: "Marketing for local service businesses",
    description: m.metaDescription,
    url: absoluteUrl(`/markets/${m.slug}`),
    provider: { "@id": orgId },
    areaServed: us,
    audience: { "@type": "BusinessAudience", audienceType: m.name },
  };
}

const founderId = `${site.url}/about#founder`;

// The founder as a Person: blog posts name him as author (E-E-A-T).
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": founderId,
    name: site.founder.name,
    jobTitle: site.founder.role,
    worksFor: { "@id": orgId },
    url: absoluteUrl("/about"),
    sameAs: [site.founder.linkedin, site.founder.portfolio, site.profiles.upwork],
    knowsAbout: ["WordPress", "Web design", "Local SEO", "Lead generation", "CRM integration", "Automation"],
  };
}

export function blogPostingSchema(p: { slug: string; title: string; description: string; date: string; updated: string; category: string; keyword: string; words: number; image?: string }) {
  const url = absoluteUrl(`/blog/${p.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: p.title,
    description: p.description,
    url,
    mainEntityOfPage: url,
    image: p.image ? [absoluteUrl(p.image), `${url}/opengraph-image`] : `${url}/opengraph-image`,
    datePublished: p.date,
    dateModified: p.updated,
    articleSection: p.category,
    ...(p.keyword ? { keywords: p.keyword } : {}),
    wordCount: p.words,
    inLanguage: "en-US",
    author: { "@type": "Person", "@id": founderId, name: site.founder.name, url: absoluteUrl("/about") },
    publisher: { "@id": orgId },
  };
}

export function blogSchema(posts: { slug: string; title: string; date: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog#blog`,
    name: `${site.name} blog`,
    url: absoluteUrl("/blog"),
    publisher: { "@id": orgId },
    blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: absoluteUrl(`/blog/${p.slug}`), datePublished: p.date })),
  };
}

export function caseStudySchema(cs: CaseStudy) {
  const url = absoluteUrl(`/work/${cs.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: cs.title,
    description: cs.cardLine ?? cs.summary,
    image: absoluteUrl(`/case-studies/${cs.slug}.webp`),
    url,
    mainEntityOfPage: url,
    keywords: cs.stack.join(", "),
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    about: cs.client ? { "@type": "Organization", name: cs.client, ...(cs.url ? { url: cs.url } : {}) } : { "@type": "Thing", name: cs.industry },
  };
}
