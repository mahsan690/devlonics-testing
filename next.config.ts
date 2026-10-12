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
