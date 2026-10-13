---
title: "Is Your Website Too Slow? Core Web Vitals for Small Businesses"
description: "Core Web Vitals measure how fast and stable your website feels. The three numbers that matter, the thresholds Google uses, and the fixes that make the biggest difference."
date: 2026-10-21
category: Web design
cover: speed
coverTone: signal
keyword: core web vitals small business
takeaways:
  - "Google's Core Web Vitals are Largest Contentful Paint (loading), Interaction to Next Paint (responsiveness) and Cumulative Layout Shift (stability)."
  - "Good scores are LCP of 2.5 seconds or less, INP of 200 milliseconds or less and CLS of 0.1 or less, measured at the 75th percentile of real visits."
  - "INP replaced First Input Delay as a Core Web Vital in 2024, and heavy scripts are the usual cause of poor scores."
  - "Oversized images, page builders loading everything on every page and too many plugins are the most common problems on small business sites."
faqs:
  - q: "What are good Core Web Vitals scores?"
    a: "Google's thresholds for a good experience are a Largest Contentful Paint of 2.5 seconds or less, an Interaction to Next Paint of 200 milliseconds or less and a Cumulative Layout Shift of 0.1 or less, measured at the 75th percentile of page loads."
  - q: "How do I check my website's Core Web Vitals?"
    a: "Use PageSpeed Insights for any page, which shows real-visitor data when Google has enough of it, and the Core Web Vitals report in Google Search Console for your whole site."
  - q: "Do Core Web Vitals affect Google rankings?"
    a: "They're part of Google's page experience signals. Content relevance matters far more, but between similar pages a faster, more stable site has an edge, and it converts better either way."
related:
  - small-business-websites
  - lead-generation-websites
---

Core Web Vitals are three measurements Google uses to judge how fast and stable your website feels to real visitors: how quickly the main content loads, how fast the page responds when someone taps, and whether things jump around while it loads. For a small business, they're a practical checklist for a site that doesn't lose visitors before they call.

## What are the three Core Web Vitals?

According to [web.dev, Google's guide to the metrics](https://web.dev/articles/vitals):

| Metric | What it measures | Good |
| --- | --- | --- |
| Largest Contentful Paint (LCP) | Loading: when the main content appears | 2.5 seconds or less |
| Interaction to Next Paint (INP) | Responsiveness: how fast the page reacts to taps and clicks | 200 milliseconds or less |
| Cumulative Layout Shift (CLS) | Stability: how much the layout jumps while loading | 0.1 or less |

Google assesses each at the **75th percentile** of page loads, separately for mobile and desktop. In other words, three out of four visits should meet the threshold. INP became a stable Core Web Vital in 2024, replacing First Input Delay.

## How to check your site

- **PageSpeed Insights:** enter any URL. If Google has enough real-visitor data, it shows field results; otherwise you get a lab test.
- **Google Search Console:** the Core Web Vitals report groups your pages into good, needs improvement and poor.

Test your homepage and your most important service pages on mobile, where most local customers arrive.

## The most common problems on small business sites

### Slow LCP

- **Huge hero images** uploaded straight from a camera or stock site.
- **Slow hosting** on cheap shared plans.
- **Render-blocking scripts and fonts** loading before the content.

**Fixes:** resize and compress images to modern formats like WebP or AVIF, preload the main image, use decent hosting with caching and a CDN, and limit custom fonts.

### Poor INP

- **Too many scripts:** chat widgets, trackers, sliders, popups and page builder code all compete for the browser's attention.
- **Heavy plugins** running on every page whether needed or not.

**Fixes:** remove plugins and tags you don't use, load chat and tracking after the page is interactive, and avoid sliders and animation libraries that block the main thread.

### High CLS

- **Images without dimensions,** so text jumps when they load.
- **Late-loading banners and cookie bars** pushing content down.
- **Web fonts** swapping in and changing text size.

**Fixes:** set width and height on images and embeds, reserve space for banners, and use font loading that minimizes layout changes.

## Does speed affect rankings?

Core Web Vitals are part of Google's page experience signals. Relevance and content matter far more, but between similar pages, the faster one has an edge. More importantly, people waiting on a slow page on mobile data often give up and call someone else.

## Speed is a design decision

Most slow sites aren't slow because of one bug; they're slow because of how they were built. We build [small business websites](/services/small-business-websites) and [lead generation websites](/services/lead-generation-websites) with optimized images, minimal scripts and fast hosting from the start, and test Core Web Vitals before launch. If you're planning a rebuild, our guide to [redesigning without losing rankings](/blog/website-redesign-without-losing-seo) covers the rest. [Get a fixed quote](/contact).

## Sources

- [web.dev: Web Vitals](https://web.dev/articles/vitals)
