export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  short: string; // one line, used in lists
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLede: string;
  forWho: string[];
  included: string[];
  approach: { title: string; body: string }[];
  stack: string[];
  workTags: string[]; // matches Project.tags in lib/work.ts
  wizardChoice: string; // pre-selects this option in the quote form
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "lead-generation-websites",
    name: "Lead generation websites",
    short: "For service businesses that live on calls, quotes and bookings.",
    metaTitle: "Lead Generation Website Design for Small Businesses",
    metaDescription:
      "Websites for contractors, home services, clinics and local businesses that turn visitors into calls, quote requests and bookings. Fixed-price builds.",
    heroTitle: "A website that books the job before a competitor picks up.",
    heroLede:
      "Most local customers decide within a few seconds whether to call you or hit back. We build sites for service businesses where every page is arranged around one thing: getting that call, form or booking.",
    forWho: [
      "Contractors and trades: roofing, HVAC, plumbing, electrical, remodeling",
      "Home services: cleaning, landscaping, pest control, moving",
      "Clinics, home care agencies and wellness practices",
      "Professional services that sell by consultation",
    ],
    included: [
      "A page for each service you sell, so each one can rank on its own",
      "Service-area pages for the towns and cities you cover",
      "Tap-to-call and a short quote form on every page",
      "Google reviews and project photos placed next to each call to action",
      "Call and form tracking set up in Google Analytics 4",
      "Google Business Profile tidy-up and local schema markup",
      "On-page SEO, sitemap and fast hosting set up at launch",
    ],
    approach: [
      {
        title: "Phone number in the first screen",
        body: "On a phone, your number and a call button sit at the top of every page. Nobody should have to scroll or hunt for it.",
      },
      {
        title: "Forms people actually finish",
        body: "We ask for the minimum: name, phone, what they need. Every extra field costs you enquiries, so we cut what you don't use.",
      },
      {
        title: "Proof next to the ask",
        body: "Reviews, licenses, before-and-after photos and guarantees go right beside the button, where the decision happens.",
      },
      {
        title: "Measured from day one",
        body: "You'll see how many calls and form fills the site produces each month, and which pages they came from.",
      },
    ],
    stack: ["WordPress + Elementor", "Next.js", "Google Analytics 4", "Google Business Profile"],
    workTags: ["services", "health"],
    wizardChoice: "website",
    faqs: [
      {
        q: "What makes a website good at generating leads?",
        a: "Speed, clarity and a short path to contact. The visitor should know what you do, where you work and how to reach you within the first screen, and every page should end with a clear next step. Trust signals such as reviews, licenses and real photos need to sit close to that next step.",
      },
      {
        q: "How do I know if the new site is working?",
        a: "We set up tracking for calls, form submissions and booking clicks before launch. You get a simple monthly view of how many leads came in and which pages and searches brought them.",
      },
      {
        q: "Can you rebuild my current site instead of starting over?",
        a: "Yes. If your domain has history in Google, we keep the URLs that rank, redirect the rest properly and rebuild the design and structure around them so you don't lose traffic in the switch.",
      },
      {
        q: "Do I need a page for every city I serve?",
        a: "Usually, yes, for the main towns. A dedicated service-area page with genuinely local details gives Google a reason to show you for searches like 'roofer in' plus your town. We write them so they're useful to a reader, not copy-pasted with the town name swapped.",
      },
    ],
  },
  {
    slug: "small-business-websites",
    name: "Small business websites",
    short: "A clean, fast site that explains what you do and makes you look established.",
    metaTitle: "Small Business Website Design | Fixed Price",
    metaDescription:
      "Professional websites for small businesses: custom design, mobile-first, SEO-ready and easy to edit yourself. Fixed price, agreed up front.",
    heroTitle: "Look like the established choice, whatever your size.",
    heroLede:
      "For businesses that need a sharp, credible home online: who you are, what you offer, why you, and how to get in touch. Designed around your brand, not a template everyone else is using.",
    forWho: [
      "New businesses launching their first proper website",
      "Established businesses whose site looks dated or breaks on phones",
      "Consultants, agencies, restaurants, studios and local shops",
      "Anyone who wants to edit their own text and photos after launch",
    ],
    included: [
      "Custom design based on your logo, colors and photos",
      "Home, about, services, contact and any extra pages you need",
      "Mobile-first layout tested on real phones",
      "An editor you can use yourself, with a short recorded walkthrough",
      "Contact forms that send straight to your inbox",
      "On-page SEO, sitemap, analytics and social sharing images",
      "Help writing the copy if you're starting from a blank page",
    ],
    approach: [
      {
        title: "Design first, then build",
        body: "You see and approve the homepage design before we build anything, so there are no surprises at the end.",
      },
      {
        title: "Words that sound like you",
        body: "We can work from your notes, interview you, or polish what you have. Plain language beats jargon for every customer.",
      },
      {
        title: "Yours to run",
        body: "Change prices, add photos or post news without calling a developer. We hand over the keys and show you how.",
      },
    ],
    stack: ["WordPress + Elementor", "Divi", "Next.js", "Tailwind CSS"],
    workTags: ["services", "brand"],
    wizardChoice: "website",
    faqs: [
      {
        q: "Will I be able to update the website myself?",
        a: "Yes. We build on editors that are easy to learn, such as WordPress with Elementor, and record a short walkthrough of the edits you'll make most often.",
      },
      {
        q: "Do you use templates?",
        a: "No. Each site is designed for the business. We do use proven building blocks for things like forms and galleries so the site stays fast and reliable.",
      },
      {
        q: "What do I need to provide?",
        a: "Your logo, any photos you have, and the basics about your business. If you don't have copy, we'll help write it. If you don't have photos, we'll source licensed stock that fits.",
      },
    ],
  },
  {
    slug: "online-stores",
    name: "Online stores",
    short: "Shopify and WooCommerce stores built to sell, with payments and shipping sorted.",
    metaTitle: "Shopify & WooCommerce Store Development",
    metaDescription:
      "Online stores on Shopify and WooCommerce: product pages that convert, Stripe, PayPal, Apple Pay and Google Pay checkout, shipping, inventory and dropshipping setup.",
    heroTitle: "An online store that's ready to take orders on day one.",
    heroLede:
      "We set up the whole store: catalog, product pages, checkout, payments, shipping, taxes and the emails customers get after they buy. Then we help you get the first orders through the door.",
    forWho: [
      "Brands moving from marketplaces or social selling to their own store",
      "Retailers adding online ordering alongside a physical shop",
      "Dropshipping and print-on-demand businesses",
      "Existing stores with low conversion or a slow, cluttered theme",
    ],
    included: [
      "Shopify or WooCommerce setup and a theme designed for your brand",
      "Product, collection and cart pages designed to convert",
      "Stripe, PayPal, Apple Pay and Google Pay checkout",
      "Shipping zones, sales tax settings and order notifications",
      "Product import, variants and inventory setup",
      "Dropshipping apps and supplier connections where needed",
      "Abandoned-cart emails, analytics and Meta and TikTok pixels",
    ],
    approach: [
      {
        title: "Product pages do the selling",
        body: "Clear photos, honest details, shipping and returns spelled out, and reviews near the buy button. That's where most stores win or lose.",
      },
      {
        title: "A checkout with no friction",
        body: "Express payment options, guest checkout and no surprise costs at the last step.",
      },
      {
        title: "Built to grow into ads",
        body: "Tracking is in place from launch, so when you start running ads you can see exactly which products and campaigns make money.",
      },
    ],
    stack: ["Shopify / Liquid", "WooCommerce", "Stripe", "PayPal", "AutoDS"],
    workTags: ["store"],
    wizardChoice: "store",
    faqs: [
      {
        q: "Should I use Shopify or WooCommerce?",
        a: "Shopify suits most new stores: hosting, security and updates are handled for you, and the app ecosystem is huge. WooCommerce suits businesses that already run WordPress or need unusual product rules. We'll recommend one based on your products and budget.",
      },
      {
        q: "Can you migrate my existing store?",
        a: "Yes. We move products, customers and order history where the platforms allow it, and set up redirects so your search rankings and old links keep working.",
      },
      {
        q: "Do you help with marketing after launch?",
        a: "Yes. We run performance marketing on Meta and TikTok and can set up ongoing SEO for your product and collection pages.",
      },
    ],
  },
  {
    slug: "app-development",
    name: "Web and mobile apps",
    short: "iPhone, Android and web apps for bookings, memberships, orders and accounts.",
    metaTitle: "App Development for Small Businesses | iOS, Android & Web",
    metaDescription:
      "Custom iPhone, Android and web apps for small businesses: bookings, memberships, customer accounts, ordering and payments. Scoped in phases with a fixed price per phase.",
    heroTitle: "An app your customers keep on their home screen.",
    heroLede:
      "When your customers come back every week, an app makes it easy: book again, reorder, check a membership or pay in a tap. We design and build it, then publish it to the App Store and Google Play.",
    forWho: [
      "Gyms, studios and clubs with memberships and class bookings",
      "Restaurants and shops with repeat orders or loyalty programs",
      "Service businesses that want customers to manage their own appointments",
      "Founders with an app idea who need a first version to test",
    ],
    included: [
      "Product planning: the screens, the flows and what to build first",
      "Interface design for iPhone and Android",
      "Customer accounts, bookings, payments and push notifications",
      "An admin panel so your team can manage content and orders",
      "App Store and Google Play submission",
      "Analytics and crash reporting",
    ],
    approach: [
      {
        title: "Start small, ship early",
        body: "We build the smallest version that's genuinely useful, get it into customers' hands, then add features based on what they actually use.",
      },
      {
        title: "One codebase where it makes sense",
        body: "For most business apps, one cross-platform build serves both iPhone and Android, which keeps cost and maintenance down.",
      },
      {
        title: "A fixed price per phase",
        body: "Each phase is scoped and priced before it starts, so you're never signing a blank check.",
      },
    ],
    stack: ["React Native", "Next.js", "Laravel API", "Stripe"],
    workTags: ["app"],
    wizardChoice: "app",
    faqs: [
      {
        q: "Do I need an app, or will a website do?",
        a: "If customers use your service once or twice, a fast website is usually enough. An app pays off when they come back often, for bookings, reorders or memberships, and benefit from notifications and saved accounts.",
      },
      {
        q: "How long does an app take?",
        a: "A focused first version typically takes a few months. We break it into phases so something usable is ready early, and each phase has its own timeline and price.",
      },
      {
        q: "Who owns the code?",
        a: "You do. The code, the app store listings and the accounts are yours.",
      },
    ],
  },
  {
    slug: "custom-software",
    name: "Custom software",
    short: "CRMs, client portals, booking systems and dashboards built around how you work.",
    metaTitle: "Custom Software Development: CRMs, Portals & Booking Systems",
    metaDescription:
      "Custom CRMs, client portals, booking engines, dashboards and internal tools for small businesses, built in Laravel and Next.js around the way your team actually works.",
    heroTitle: "Stop running the business on spreadsheets and sticky notes.",
    heroLede:
      "When off-the-shelf software doesn't fit, your team ends up working around it. We build tools shaped around your process: one place for customers, jobs, bookings, invoices and reports.",
    forWho: [
      "Teams juggling spreadsheets, inboxes and three apps that don't talk",
      "Businesses whose clients need a portal for documents, status or payments",
      "Companies outgrowing a booking or CRM tool",
      "Operations that need a dashboard of the numbers that matter",
    ],
    included: [
      "Discovery: we map how work flows today and where time is lost",
      "Clickable prototype you can test with your team before the build",
      "Secure login and roles for staff, clients and admins",
      "Integrations with payments, email, calendars and accounting tools",
      "Data import from your spreadsheets or old system",
      "Hosting, backups and ongoing support",
    ],
    approach: [
      {
        title: "Built from how you work",
        body: "We sit with the people who'll use it and design around their day, not around a feature checklist.",
      },
      {
        title: "Delivered in phases",
        body: "The most painful problem gets solved first. You start using the software early and steer what comes next.",
      },
      {
        title: "Automation where it saves hours",
        body: "Reminders, follow-ups, reports and data entry that happen on their own, including AI-assisted steps where they genuinely help.",
      },
    ],
    stack: ["Laravel / PHP", "Next.js", "MySQL / PostgreSQL", "REST APIs"],
    workTags: ["software"],
    wizardChoice: "software",
    faqs: [
      {
        q: "Why not just use an off-the-shelf tool?",
        a: "Often you should, and we'll say so. Custom software makes sense when your process is a competitive advantage, when you're paying for several tools that don't connect, or when staff spend hours a week on manual workarounds.",
      },
      {
        q: "Can it connect to the tools we already use?",
        a: "Usually, yes. Most modern tools such as Stripe, QuickBooks, Google Workspace and calendar apps have APIs we can connect to.",
      },
      {
        q: "What happens after it's built?",
        a: "We host it, back it up, fix issues and keep improving it on a support plan. The code is yours if you ever want to move it.",
      },
    ],
  },
  {
    slug: "seo-and-marketing",
    name: "SEO and marketing",
    short: "Local SEO, AI search visibility, and paid ads on Google, Meta and TikTok.",
    metaTitle: "Local SEO & Digital Marketing for Small Businesses",
    metaDescription:
      "Local SEO, Google Business Profile, AI search (AEO) optimization and paid ads on Google, Meta and TikTok for service businesses and ecommerce brands.",
    heroTitle: "Get found by people who are ready to buy.",
    heroLede:
      "A great website still needs visitors. We help the right ones find you through Google search and Maps, AI assistants like ChatGPT, and targeted ads, and we report on what each channel brings in.",
    forWho: [
      "Local businesses that want to show up in the Google Maps pack",
      "Businesses with a new website and no traffic yet",
      "Online stores ready to scale with paid ads",
      "Anyone who wants their business named in AI-generated answers",
    ],
    included: [
      "Technical SEO audit and fixes",
      "Google Business Profile optimization and review strategy",
      "Local landing pages and service-area content",
      "Answer-focused content and schema for AI search (AEO)",
      "Meta, TikTok and Google Ads setup and management",
      "Monthly report: rankings, traffic, calls, leads and sales",
    ],
    approach: [
      {
        title: "Local first",
        body: "For most service businesses, the Map Pack and 'near me' searches bring the highest-intent customers. That's where we start.",
      },
      {
        title: "Answers, not keyword stuffing",
        body: "AI assistants and Google both reward pages that answer real questions clearly. We write content that does exactly that.",
      },
      {
        title: "Spend tied to results",
        body: "Ads start small, get measured against leads and sales, and only scale when the numbers say they should.",
      },
    ],
    stack: ["Google Search Console", "Google Business Profile", "Meta Ads", "TikTok Ads", "GA4"],
    workTags: ["store", "services"],
    wizardChoice: "marketing",
    faqs: [
      {
        q: "What is AEO?",
        a: "Answer engine optimization means structuring your site so AI assistants such as ChatGPT, Gemini, Perplexity and Google's AI Overviews can understand it and cite it. That means clear answers to common questions, accurate business details everywhere and structured data on your pages.",
      },
      {
        q: "How long does SEO take to work?",
        a: "Technical fixes and Google Business Profile work can show results within weeks. Ranking for competitive terms usually takes several months of steady content and reviews. We report progress monthly so you can see the trend.",
      },
      {
        q: "Do you need a big ad budget?",
        a: "No. We've launched campaigns on as little as $20 a day. The key is tracking every order or lead so the budget only grows when it's paying for itself.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
