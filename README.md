# Devlonic Solutions website

Marketing site for Devlonic Solutions: websites, online stores, apps and custom software for small businesses in New Jersey, Texas and Florida.

Built with Next.js 16 (App Router, Cache Components), Tailwind CSS 4, GSAP, Lenis and Three.js. Hosted on Vercel.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also writes public/llms.txt and fetches portfolio images)
```

## Where things live

| What | File |
| --- | --- |
| Contact details, founder, quote turnaround | `lib/site.ts` |
| Services (copy, FAQs, included items) | `lib/services.ts` |
| Markets we serve (industry pages) | `lib/markets.ts` |
| Portfolio and the Gladiolaz case study | `lib/work.ts` |
| Testimonials (verbatim, never edit) | `lib/testimonials.ts` |
| Home and pricing FAQs | `lib/faqs.ts` |
| Structured data (JSON-LD) | `lib/schema.ts` |
| 3D hero mark | `components/HeroMark3D.tsx` |
| Quote form | `components/QuoteWizard.tsx` |
| Quote form endpoint | `app/api/enquiry/route.ts` |

### Adding a market

Add an entry to `lib/markets.ts`, then add its slug to `KNOWN.markets` in `proxy.ts` and to the list in `scripts/build-llms.mjs`. The page, sitemap, schema and footer update automatically.

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Needed? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | When you connect a domain | Canonical URL, e.g. `https://devlonics.com`. Until then the Vercel production URL is used. |
| `RESEND_API_KEY` | Recommended | Sends quote requests through [Resend](https://resend.com). |
| `LEAD_FROM_EMAIL` | With Resend | Sender on a domain verified in Resend, e.g. `Website <leads@devlonics.com>`. |
| `LEAD_TO_EMAIL` | Optional | Inbox for quote requests. Defaults to `info@devlonics.com`. |

Without `RESEND_API_KEY`, quote requests are delivered through FormSubmit. The **first** submission makes FormSubmit email an activation link to `info@devlonics.com`; click it once and every request after that is delivered.

## Portfolio images

The 2026 projects (`public/work/2026-*.webp`) are in the repo. Older portfolio and review images are copied from the devlonics.com media library before each build by `scripts/fetch-portfolio.mjs`. Run the **Sync portfolio images** action once (GitHub → Actions) to commit them to the repo before moving the devlonics.com domain.

## SEO and AEO built in

- Per-page titles, descriptions and canonical URLs
- JSON-LD: Organization + ProfessionalService (service-area, no street address), WebSite, Service, FAQPage, BreadcrumbList
- `sitemap.xml`, `robots.txt` (AI crawlers allowed), `llms.txt`
- Generated share images per service and market page
- Preview deployments are `noindex`; only production is indexable
