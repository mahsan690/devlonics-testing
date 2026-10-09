import { site, absoluteUrl } from "./site";
import { states } from "./states";
import type { Faq, Service } from "./services";

// Structured data (JSON-LD). Devlonic is a service-area business: no street
// address is published, and areaServed lists the states we target.

const orgId = `${site.url}/#organization`;

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
        areaServed: [
          ...states.map((s) => ({ "@type": "State", name: s.name, containedInPlace: { "@type": "Country", name: "United States" } })),
          { "@type": "Country", name: "United States" },
        ],
        knowsAbout: [
          "Web design", "Website development", "WordPress", "Shopify", "WooCommerce",
          "Local SEO", "Answer engine optimization", "App development", "Custom software",
        ],
        sameAs: [site.profiles.upwork, site.profiles.linkedin],
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

export function serviceSchema(s: Service, areaName?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: areaName ? `${s.name} in ${areaName}` : s.name,
    serviceType: s.name,
    description: s.metaDescription,
    url: absoluteUrl(`/services/${s.slug}`),
    provider: { "@id": orgId },
    areaServed: areaName
      ? { "@type": "State", name: areaName }
      : states.map((st) => ({ "@type": "State", name: st.name })),
  };
}

export function stateServiceSchema(stateName: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Web design for ${stateName} small businesses`,
    serviceType: "Web design and development",
    description,
    url: absoluteUrl(path),
    provider: { "@id": orgId },
    areaServed: { "@type": "State", name: stateName },
  };
}
