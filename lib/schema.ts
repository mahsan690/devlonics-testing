import { site, absoluteUrl } from "./site";
import { markets, type Market } from "./markets";
import type { Faq, Service } from "./services";

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
          "Web design", "Website development", "WordPress", "Shopify", "WooCommerce",
          "Local SEO", "Answer engine optimization", "TikTok ads", "Meta ads",
          "App development", "Custom software",
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
    provider: { "@id": orgId },
    areaServed: us,
  };
}

export function marketServiceSchema(m: Market) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: m.metaTitle,
    serviceType: "Web design and development",
    description: m.metaDescription,
    url: absoluteUrl(`/markets/${m.slug}`),
    provider: { "@id": orgId },
    areaServed: us,
    audience: { "@type": "BusinessAudience", audienceType: m.name },
  };
}

export function caseStudySchema(cs: { name: string; headline: string; summary: string; slug: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.headline,
    description: cs.summary,
    image: absoluteUrl(`/work/${cs.image}`),
    url: absoluteUrl(`/work/${cs.slug}`),
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    about: { "@type": "Organization", name: cs.name },
  };
}
