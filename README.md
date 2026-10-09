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
| Target states (copy, stats, cities, FAQs) | `lib/states.ts` |
| Portfolio and case study | `lib/work.ts` |
| Testimonials (verbatim, never edit) | `lib/testimonials.ts` |
| Home and pricing FAQs | `lib/faqs.ts` |
| Structured data (JSON-LD) | `lib/schema.ts` |
| 3D hero mark | `components/HeroMark3D.tsx` |
| Quote form | `components/QuoteWizard.tsx` |
| Quote form endpoint | `app/api/enquiry/route.ts` |

### Changing a target state

Edit or add an entry in `lib/states.ts`, then add its slug to the `STATES` set in `proxy.ts` and to the list in `scripts/build-llms.mjs`. Pages, sitemap, schema and the quote form update automatically.

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Needed? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | When you connect a domain | Canonical URL, e.g. `https://devlonics.com`. Until then the Vercel production URL is used. |
| `RESEND_API_KEY` | Recommended | Sends quote requests through [Resend](https://resend.com). |
| `LEAD_FROM_EMAIL` | With Resend | Sender on a domain verified in Resend, e.g. `Website <leads@devlonics.com>`. |
| `LEAD_TO_EMAIL` | Optional | Inbox for quote requests. Defaults to `info@devlonics.com`. |

Without `RESEND_API_KEY`, quote requests are delivered through FormSubmit. The **first** submission makes FormSubmit email an activation link to `info@devlonics.com`; click it once and every request after that is delivered.

## Portfolio images

`scripts/fetch-portfolio.mjs` copies portfolio and review images from the current devlonics.com media library into `public/work` before each build. Commit the `public/work` folder once it's populated so the site no longer depends on the old WordPress site.

## SEO and AEO built in

- Per-page titles, descriptions and canonical URLs
- JSON-LD: Organization + ProfessionalService (service-area, no street address), WebSite, Service, FAQPage, BreadcrumbList
- `sitemap.xml`, `robots.txt` (AI crawlers allowed), `llms.txt`
- Generated share images per service and state page
- Preview deployments are `noindex`; only production is indexable
