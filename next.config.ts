import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // October 2026 repositioning to local service businesses only. The old
      // pages live on the backup/web-shopify-ai-2026-10 branch.
      { source: "/services/small-business-websites/:path*", destination: "/services/website-design", permanent: true },
      { source: "/services/lead-generation-websites/:path*", destination: "/services/lead-generation", permanent: true },
      { source: "/services/seo-and-marketing/:path*", destination: "/services/google-business-profile", permanent: true },
      { source: "/services/custom-software/:path*", destination: "/services/automation", permanent: true },
      { source: "/services/online-stores/:path*", destination: "/services", permanent: true },
      { source: "/services/app-development/:path*", destination: "/services", permanent: true },
      { source: "/markets/ecommerce/:path*", destination: "/markets", permanent: true },
      { source: "/work/gladiolaz/:path*", destination: "/work", permanent: true },
      { source: "/blog/shopify-vs-woocommerce/:path*", destination: "/blog", permanent: true },
      { source: "/blog/shopify-store-not-selling/:path*", destination: "/blog", permanent: true },
      { source: "/blog/tiktok-ads-for-shopify-small-budget/:path*", destination: "/blog", permanent: true },
      { source: "/ai", destination: "/services/automation", permanent: true },
      { source: "/ai/case-studies/:slug(ai-voice-receptionist-home-services|hubspot-solar-sales-system|ai-google-ads-reporting|med-spa-clickup-automation|physiotherapy-monday-automation)", destination: "/work/:slug", permanent: true },
      { source: "/ai/:path*", destination: "/work", permanent: true },

      // The state pages were replaced by industry pages.
      { source: "/web-design", destination: "/markets", permanent: true },
      { source: "/web-design/:slug*", destination: "/markets", permanent: true },

      // Old WordPress site (devlonics.com until October 2026). Its /, /services,
      // /about and /contact keep their addresses; everything else moves here.
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/portfolio/:slug*", destination: "/work", permanent: true },
      { source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug*", destination: "/blog", permanent: true },
      { source: "/category/:slug*", destination: "/blog", permanent: true },
      { source: "/author/:slug*", destination: "/about", permanent: true },
      { source: "/feed", destination: "/blog/rss.xml", permanent: true },
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap-:rest(.*)", destination: "/sitemap.xml", permanent: true },
      { source: "/sample-page", destination: "/", permanent: true },
      { source: "/uicore-cd/:slug*", destination: "/", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
