import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { BackToTop } from "@/components/BackToTop";
import { InteractiveFX } from "@/components/InteractiveFX";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { isIndexable, site } from "@/lib/site";
import "./globals.css";

// Fonts are bundled locally: no request to Google Fonts on page load.
const display = localFont({
  src: "../assets/fonts/BricolageGrotesque-Variable.woff2",
  variable: "--font-bricolage",
  display: "swap",
  weight: "200 800",
});
// DM Sans is the typeface of the Devlonic wordmark.
const body = localFont({
  src: "../assets/fonts/DMSans-Variable.woff2",
  variable: "--font-dmsans",
  display: "swap",
  weight: "100 1000",
});

// Search Console / Bing Webmaster verification: set these in Vercel once the
// domain is connected (the value is the content of their meta tag).
const verification = {
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
  ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Marketing for Local Service Businesses | Devlonic",
    template: "%s | Devlonic",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/", types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "Devlonic Solutions blog" }] } },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: "Devlonic Solutions: marketing for local service businesses",
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: "Devlonic Solutions: marketing for local service businesses", description: site.description },
  robots: isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: true },
  verification,
  authors: [{ name: site.founder.name, url: `${site.url}/about` }],
  category: "Marketing",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light",
};

// Runs before first paint: skip the preloader on repeat visits in a session
// and for reduced-motion visitors, so it never flashes.
const preloaderGate = `(function(){var h=document.documentElement;try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('dv-seen')){h.classList.add('no-preloader');h.dataset.preloaded='1';}}catch(e){h.classList.add('no-preloader');h.dataset.preloaded='1';}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloaderGate }} />
      </head>
      <body className="min-h-dvh">
        <Preloader />
        <a href="#main" className="sr-only z-[60] rounded-full bg-signal px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
        <BackToTop />
        <SmoothScroll />
        <InteractiveFX />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
