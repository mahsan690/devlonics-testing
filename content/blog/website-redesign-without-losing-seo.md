---
title: "How to Redesign Your Website Without Losing Google Rankings"
description: "A website redesign can wipe out years of search traffic if URLs change carelessly. A step-by-step checklist based on Google's guidance and our own WordPress-to-new-site move."
date: 2026-10-16
category: Web design
cover: migrate
coverTone: dark
keyword: website redesign seo
takeaways:
  - "Map every old URL to its closest new page and set up permanent (301 or 308) redirects; Google says these don't lose ranking signals."
  - "Keep redirects for at least a year, as Google recommends, and redirect straight to the final page without chains."
  - "Expect temporary ranking movement: Google says the new URLs can take a few weeks or more to replace the old ones."
  - "Submit the new sitemap, check Search Console daily for the first two weeks and fix any 404s fast."
faqs:
  - q: "Will a website redesign hurt my SEO?"
    a: "It can if URLs change without redirects, content that ranked is removed, or the new site is slower. Done carefully, with every old URL redirected and the best content kept, a redesign usually holds rankings and often improves them."
  - q: "How long do I need to keep redirects after a redesign?"
    a: "Google recommends keeping redirects in place generally for at least a year. There's little cost to keeping them longer, and old links from other sites keep working."
  - q: "Should I keep the same URLs when I redesign?"
    a: "Where you can, yes. Keeping the URLs of pages that already rank is the safest option. Change them only when the old structure is genuinely confusing, and redirect every old address when you do."
related:
  - website-design
  - lead-generation

---

A redesign can lose years of Google traffic in a week if old page addresses stop working. The fix is not complicated: map every old URL to its new home, redirect it permanently, keep the content that ranked, and watch Search Console closely after launch. We just did this ourselves, moving devlonics.com from WordPress to a new site, so this checklist is what we actually followed.

## Why do redesigns lose rankings?

Google ranks pages, not websites. When a page's address changes and nothing points the old address to the new one, Google sees a missing page, and the links and history attached to it are wasted. Common causes:

- **URLs change without redirects,** so old links and bookmarks hit 404 errors.
- **Pages that ranked are deleted** or merged into thinner pages.
- **Titles and headings change,** dropping the phrases the page ranked for.
- **The new site is slower** or harder to crawl.

## What does Google recommend?

Google's [guide to site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) is the authority here. The key points:

- **Map old URLs to new ones,** including images and other files that get traffic.
- **Use server-side permanent redirects.** Google states that "301 and other permanent redirects don't cause a loss in PageRank."
- **Avoid redirect chains:** send each old URL straight to its final destination.
- **Keep redirects for as long as possible,** "generally at least 1 year."
- **Submit your new sitemap** to speed up discovery.
- **Expect temporary fluctuation:** for medium-sized sites, Google says it can take "a few weeks or more" for new URLs to replace old ones.

## The redesign SEO checklist

### Before launch

1. **List every URL on the old site.** Pull them from the sitemap, Google Search Console's pages report, Google Analytics and the CMS.
2. **Note which pages get traffic and links.** Those must keep their content and get a precise redirect.
3. **Build a redirect map:** one row per old URL with its closest new page. Avoid sending everything to the homepage.
4. **Carry over what ranks:** titles, headings and the content that answers the searches each page ranks for.
5. **Test on a staging site:** speed, mobile layout, structured data and every redirect.

### Launch day

6. **Switch on redirects at the same moment** the new site goes live.
7. **Check a sample of old URLs** in a browser: each should land on the right page in one hop.
8. **Submit the new sitemap** in Google Search Console and Bing Webmaster Tools.
9. **Use the Change of Address tool** only if the domain itself changes. Google notes it isn't needed for a redesign on the same domain.

### The first month

10. **Watch Search Console daily for two weeks:** 404 errors, pages not indexed and drops in clicks.
11. **Fix 404s fast** by adding the missing redirects.
12. **Compare traffic by page** against the old site, not just total traffic.

## What we did when devlonics.com moved

Our old WordPress site had a handful of real pages plus theme demo content: sample portfolio items, dated sample posts and archive pages. On the new site, home, services, about and contact kept their addresses. Everything else got a permanent redirect to its nearest equivalent: news to the blog, portfolio items to our work page, dated posts and category archives to the blog, and the old WordPress sitemaps to the new sitemap. We then submitted the new sitemap and verified the domain in Search Console.

It's the same process we use on client redesigns, whether the move is WordPress to WordPress, WordPress to Shopify or to a custom build.

## Redesigning soon?

Our [small business website](/services/website-design) and [lead generation website](/services/lead-generation) projects include a full redirect map, staging site and post-launch Search Console checks. [Get a fixed quote](/contact) for your redesign.

## Sources

- [Google Search Central: Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
