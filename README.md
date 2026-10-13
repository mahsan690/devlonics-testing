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
| Quote form endpoint | `app/api/enquiry/route.ts` (Resend) and `lib/lead.ts` (FormSubmit) |
| Blog posts (Markdown) | `content/blog/*.md` |
| Inboxes that receive quote requests | `lib/site.ts` → `leadInboxes` |

### Adding a market

Add an entry to `lib/markets.ts` and to the list in `scripts/build-llms.mjs`. The page, sitemap, schema, footer and 404 guard update automatically.

## Publishing a blog post

1. Create `content/blog/your-post-slug.md`. The file name becomes the URL (`/blog/your-post-slug`).
2. Start it with frontmatter, then write the post in Markdown:

```md
---
title: "Your Headline (under ~65 characters)"
description: "The meta description, 140–160 characters."
date: 2026-11-01
category: Local SEO
keyword: main search phrase
takeaways:
  - "Two to five short bullet points shown at the top."
faqs:
  - q: "A question people search?"
    a: "A direct answer in 40–60 words."
related:
  - seo-and-marketing
  - hvac
---

Your opening paragraph answers the headline directly...

## Use question-style H2 headings
```

3. Commit to `main` (the GitHub web editor works fine). Vercel rebuilds and the post appears on the blog, home page, sitemap, RSS feed and `llms.txt`.

A post dated in the future stays hidden until a build runs on or after that date; `draft: true` hides it entirely. The build stops with a clear message if required fields are missing. `related` takes service or market slugs and shows them as links under the post.

The build also checks every internal link in a post: a link to a page that doesn't exist, or to a post scheduled later than the one linking to it, stops the build and names the link.

### Scheduled posts

The **Publish scheduled posts** action (`.github/workflows/publish-scheduled-posts.yml`) runs every day at 12:05 UTC, which is 8:05 am Eastern and 5:05 pm in Pakistan. When posts are dated today it adds them to `content/blog/.published.log` and commits, which makes Vercel rebuild so they go live. It then waits until each new post answers on devlonics.com and submits the addresses to IndexNow (Bing and other IndexNow search engines), using the key file in `public/`. To publish by hand, open GitHub → Actions → Publish scheduled posts → Run workflow; leave the date empty for today.

The 20-day calendar, the off-page SEO plan and a ready-to-paste LinkedIn post for each article are in the Devlonic Blog Calendar doc.

### Cover images

A featured image at `public/blog/<slug>.webp` (1600×900) is picked up automatically, and a post without one shows no image. `node scripts/make-covers.mjs` draws a simple brand illustration for any post that's missing one, using `cover` and `coverTone` from the frontmatter. Service page images live in `public/services/`.

The covers are made in Canva. Canva export links are temporary, so they're brought in by the **Import Canva images** action: list each export link and destination in `content/canva-imports.json`, for example `{ "images": [ { "url": "<Canva export link>", "out": "public/blog/my-post.webp" } ] }`, and push. The action downloads from Canva hosts only, converts each image to WebP, commits it and empties the list.

## Keyword research

`research/keyword-seeds.txt` holds seed phrases, one per line. Pushing a change to it runs the **Keyword suggestions** action, which collects Google and Bing autocomplete suggestions for every seed into `research/keyword-suggestions.json` and commits the file. The page-by-page keyword map is in the Devlonic SEO Keyword Map doc.

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Needed? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | When you connect a domain | Canonical URL, e.g. `https://devlonics.com`. Until then the Vercel production URL is used. |
| `RESEND_API_KEY` | Recommended | Sends quote requests through [Resend](https://resend.com). |
| `LEAD_FROM_EMAIL` | With Resend | Sender on a domain verified in Resend, e.g. `Website <leads@devlonics.com>`. |
| `LEAD_TO_EMAIL` | Optional | Comma-separated inboxes for Resend delivery. Defaults to `leadInboxes` in `lib/site.ts` (info@ and m-ahsan@devlonics.com). |
| `NEXT_PUBLIC_FORMSUBMIT_ID` | Optional | The random alias FormSubmit gives you after activation, used in place of `info@devlonics.com` in the page code. |
| `GOOGLE_SITE_VERIFICATION` | When verifying Search Console | The `content` value of Google's HTML-tag verification. |
| `BING_SITE_VERIFICATION` | When verifying Bing Webmaster Tools | The `content` value of Bing's `msvalidate.01` tag. |

Without `RESEND_API_KEY`, quote requests are delivered through FormSubmit, from the visitor's browser (FormSubmit blocks requests from Vercel's servers with a 403). Each request goes to the first inbox in `leadInboxes` and is copied to the rest. The **first** submission makes FormSubmit email an "Activate Form" link to `info@devlonics.com`; that one isn't delivered, and every request after the click is. If FormSubmit asks again after a domain change, click the new link.

If delivery fails for any reason, the form shows an **Email my request** button that opens the visitor's email app with their answers already filled in, so no lead is lost. With Resend set up, a Resend failure falls back to FormSubmit automatically.

### Indexing

Search engines index the site only in production on its real domain. Preview deployments and the temporary `*.vercel.app` address carry a `noindex` tag. When devlonics.com is connected in Vercel, set `NEXT_PUBLIC_SITE_URL=https://devlonics.com` and redeploy: canonicals, sitemap and schema switch to the domain and indexing turns on.

## Old WordPress addresses

`next.config.ts` permanently redirects the old WordPress URLs (`/news`, `/portfolio/*`, dated posts, `/category/*`, `/author/*`, `/feed`, `/wp-sitemap*.xml`, `/sample-page`) to their nearest new page. `/`, `/services`, `/about` and `/contact` keep their addresses.

## Portfolio images

The 2026 projects (`public/work/2026-*.webp`) are in the repo. Older portfolio and review images are copied from the devlonics.com media library before each build by `scripts/fetch-portfolio.mjs`. Run the **Sync portfolio images** action once (GitHub → Actions) to commit them to the repo before moving the devlonics.com domain.

## SEO and AEO built in

- Per-page titles, descriptions and canonical URLs
- JSON-LD: Organization + ProfessionalService (service-area, no street address), WebSite, Service, FAQPage, BreadcrumbList, Person (founder), Blog, BlogPosting
- Every service and market page targets one search phrase and opens with a direct, quotable answer
- `sitemap.xml` with real modified dates, `robots.txt` (AI crawlers allowed), `llms.txt`, blog RSS feed
- Generated share images per service, market and blog post
- Preview deployments are `noindex`; only production is indexable
