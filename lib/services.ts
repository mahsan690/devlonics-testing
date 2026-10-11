export type Faq = { q: string; a: string };

// Service pages. Copy is written around one primary search phrase per page
// (`keyword`), with the direct answer up top (`answer`) so search engines and
// AI assistants can quote it. Slugs are URLs: don't change them.

export type Service = {
  slug: string;
  name: string;
  keyword: string; // primary search phrase this page targets
  short: string; // one line, used in lists
  metaTitle: string; // under ~50 characters; " | Devlonic" is appended
  metaDescription: string; // 140–160 characters
  heroTitle: string; // the page H1, contains the keyword
  heroLede: string;
  answer: { q: string; a: string }; // answer-first block, 40–60 words
  forWho: string[];
  included: string[];
  approach: { title: string; body: string }[];
  timeline: string;
  stack: string[];
  workTags: string[]; // matches Project.tags in lib/work.ts
  relatedMarkets: string[]; // slugs in lib/markets.ts
  relatedPosts: string[]; // slugs in content/blog
  wizardChoice: string; // pre-selects this option in the quote form
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "lead-generation-websites",
    name: "Lead generation websites",
    keyword: "lead generation website design",
    short: "Websites for service businesses that live on calls, quote requests and bookings.",
    metaTitle: "Lead Generation Website Design for Contractors",
    metaDescription:
      "Lead generation websites for contractors, home services and clinics: tap-to-call, short quote forms, service-area pages and call tracking. Fixed price.",
    heroTitle: "Lead generation website design that books the job.",
    heroLede:
      "Most local customers decide in seconds whether to call you or go back to Google. We design websites for service businesses where every page leads to one of three things: a phone call, a quote request or a booking.",
    answer: {
      q: "What is a lead generation website?",
      a: "A lead generation website is built to turn visitors into enquiries rather than simply describe a business. It puts your phone number and a short quote form on every page, places reviews and credentials beside each call to action, gives each service and town its own page, and tracks every call and form so you can see what works.",
    },
    forWho: [
      "Contractors and trades: HVAC, plumbing, roofing, electrical, remodeling",
      "Home services: cleaning, landscaping, pest control, moving",
      "Home care agencies, clinics and wellness practices",
      "Professional services that sell through a consultation",
    ],
    included: [
      "A dedicated page for every service you sell, so each one can rank on its own",
      "Service-area pages for the towns and cities you cover",
      "Tap-to-call button and a short quote form on every page",
      "Reviews, licenses and project photos placed next to each call to action",
      "Call, form and booking tracking in Google Analytics 4",
      "Google Business Profile clean-up and LocalBusiness schema markup",
      "Technical SEO, XML sitemap and fast hosting set up at launch",
    ],
    approach: [
      { title: "Your number in the first screen", body: "On a phone, the call button sits at the top of every page. Nobody should scroll to find out how to reach you." },
      { title: "Forms people finish", body: "Name, phone and what they need. Every extra field costs enquiries, so we cut the ones you won't use." },
      { title: "Proof beside the ask", body: "Reviews, licenses, before-and-after photos and guarantees sit next to the button, where the decision gets made." },
      { title: "Measured from day one", body: "You see how many calls and form fills the site produces each month, and which pages and searches they came from." },
    ],
    timeline: "Most lead generation sites launch in 3 to 6 weeks from approved design.",
    stack: ["WordPress + Elementor", "Next.js", "Google Analytics 4", "Google Business Profile"],
    workTags: ["services", "health"],
    relatedMarkets: ["hvac", "plumbing", "roofing", "cleaning", "contractors"],
    relatedPosts: ["home-service-website-checklist", "local-seo-checklist-home-service-businesses"],
    wizardChoice: "website",
    faqs: [
      { q: "What makes a website good at generating leads?", a: "Speed, clarity and a short path to contact. Within the first screen a visitor should know what you do, where you work and how to reach you. Every page should end with a clear next step, and reviews, licenses and real photos should sit close to that step." },
      { q: "How do I know if my new website is working?", a: "We set up tracking for calls, form submissions and booking clicks before launch. Each month you can see how many leads came in and which pages and Google searches sent them." },
      { q: "Can you rebuild my current website without losing Google rankings?", a: "Yes. We keep the URLs that already rank, set up 301 redirects for the rest, and rebuild the design and structure around them so your traffic carries over." },
      { q: "Do I need a page for every city I serve?", a: "For your main towns, usually yes. A service-area page with genuinely local details, such as neighborhoods, typical jobs and local reviews, gives Google a reason to show you for searches like a trade plus your town. We write each one to be useful, not a copy with the town name swapped." },
      { q: "How long does a lead generation website take?", a: "Most launch in three to six weeks from approved design. The timeline depends on the number of service and area pages and how quickly content and feedback come back." },
    ],
  },
  {
    slug: "small-business-websites",
    name: "Small business websites",
    keyword: "small business website design",
    short: "A fast, custom website that explains what you do and makes you look established.",
    metaTitle: "Small Business Website Design, Fixed Price",
    metaDescription:
      "Custom small business website design: mobile-first, SEO-ready and easy to edit yourself. Written plan, staging site and a fixed price before we start.",
    heroTitle: "Small business website design that looks established.",
    heroLede:
      "For businesses that need a credible home online: who you are, what you offer, why you, and how to get in touch. Designed around your brand, built on an editor you can use, and priced before we start.",
    answer: {
      q: "What does a small business website need?",
      a: "A small business website needs a clear homepage, a page for each service, an about page, visible contact details and a simple contact form. It should load fast on phones, show real reviews, include basic SEO such as page titles and a sitemap, and be easy for the owner to update without a developer.",
    },
    forWho: [
      "New businesses launching their first proper website",
      "Established businesses whose site looks dated or breaks on phones",
      "Consultants, agencies, restaurants, studios and local shops",
      "Owners who want to edit their own text and photos after launch",
    ],
    included: [
      "Custom design based on your logo, colors and photos",
      "Home, about, services, contact and any extra pages you need",
      "Mobile-first layout tested on real phones",
      "An editor you can use yourself, plus a recorded walkthrough at handover",
      "Contact forms that send straight to your inbox",
      "On-page SEO, sitemap, analytics and social sharing images",
      "Help writing the copy if you're starting from a blank page",
    ],
    approach: [
      { title: "Design first, then build", body: "You approve the homepage design before development starts, so there are no surprises at the end." },
      { title: "Built on a staging site", body: "We build and test on a private copy of your site. Nothing changes on your live site until you sign off." },
      { title: "Words that sound like you", body: "We work from your notes, interview you, or polish what you have. Plain language beats jargon with every customer." },
      { title: "Yours to run", body: "Change prices, add photos or post news without calling a developer. We hand over the keys and show you how." },
    ],
    timeline: "A typical small business website launches in 3 to 6 weeks from approved design.",
    stack: ["WordPress + Elementor", "Divi", "Next.js", "Tailwind CSS"],
    workTags: ["services", "brand"],
    relatedMarkets: ["cleaning", "landscaping", "home-care-and-clinics"],
    relatedPosts: ["how-much-does-a-small-business-website-cost"],
    wizardChoice: "website",
    faqs: [
      { q: "How much does a small business website cost?", a: "Industry guides published in 2026 put freelancer-built small business sites at roughly $500 to $5,000 and agency builds at about $5,000 to $15,000. We quote every project as a fixed price after a short questionnaire, based on pages, features and content." },
      { q: "Will I be able to update the website myself?", a: "Yes. We build on editors that are easy to learn, such as WordPress with Elementor, and record a walkthrough of the edits you'll make most often." },
      { q: "Do you use templates?", a: "No. Each site is designed for the business. We do use proven building blocks for things like forms and galleries so the site stays fast and reliable." },
      { q: "What do I need to provide?", a: "Your logo, any photos you have, and the basics about your business. If you don't have copy, we'll help write it. If you don't have photos, we'll source licensed stock that fits." },
      { q: "Who owns the website when it's finished?", a: "You do. The domain, hosting account, content and site files stay in your name, and you get full admin access at launch." },
    ],
  },
  {
    slug: "online-stores",
    name: "Shopify and WooCommerce stores",
    keyword: "Shopify store development",
    short: "Shopify and WooCommerce stores built to sell, with payments, shipping and tracking sorted.",
    metaTitle: "Shopify Store Development and Setup",
    metaDescription:
      "Shopify store development and WooCommerce builds: product pages that convert, Shop Pay, Stripe and PayPal checkout, shipping, dropshipping and ad tracking.",
    heroTitle: "Shopify store development that's ready to sell on day one.",
    heroLede:
      "We set up the whole store: catalog, product pages, checkout, payments, shipping, taxes and the emails customers get after they buy. Then, if you want, we run the ads that bring in the first orders.",
    answer: {
      q: "What does Shopify store development include?",
      a: "Shopify store development covers setting up the store and theme, designing product and collection pages, configuring payments, shipping zones and taxes, importing products and variants, installing the apps you need, and connecting analytics and ad pixels. A good build also includes order emails, abandoned-cart recovery and testing checkout end to end.",
    },
    forWho: [
      "Brands moving from marketplaces or social selling to their own store",
      "Retailers adding online ordering alongside a physical shop",
      "Dropshipping and print-on-demand businesses",
      "Existing stores with low conversion or a slow, cluttered theme",
    ],
    included: [
      "Shopify or WooCommerce setup and a theme designed for your brand",
      "Product, collection and cart pages designed to convert",
      "Shop Pay, Stripe, PayPal, Apple Pay and Google Pay checkout, tested end to end",
      "Shipping zones, sales tax settings and order notifications",
      "Product import, variants and inventory setup",
      "Dropshipping apps such as AutoDS and supplier connections where needed",
      "Abandoned-cart emails, Google Analytics 4, and Meta and TikTok pixels",
    ],
    approach: [
      { title: "Product pages do the selling", body: "Clear photos, honest details, shipping and returns spelled out, and reviews near the buy button. That's where most stores win or lose." },
      { title: "A checkout with no friction", body: "Express payment options, guest checkout and no surprise costs at the last step." },
      { title: "Built to grow into ads", body: "Tracking is live from launch, so when you start running ads you can see which products and campaigns make money." },
    ],
    timeline: "Most Shopify stores launch in 4 to 8 weeks, depending on catalog size and integrations.",
    stack: ["Shopify / Liquid", "WooCommerce", "Stripe", "PayPal", "AutoDS"],
    workTags: ["store"],
    relatedMarkets: ["ecommerce"],
    relatedPosts: ["shopify-vs-woocommerce"],
    wizardChoice: "store",
    faqs: [
      { q: "Should I use Shopify or WooCommerce?", a: "Shopify suits most new stores: hosting, security and updates are handled for you, and plans start at $29 a month billed yearly. WooCommerce is free to install and suits businesses already on WordPress or with unusual product rules, but you pay for hosting and extensions. We recommend one based on your products and budget." },
      { q: "Can you migrate my existing store to Shopify?", a: "Yes. We move products, customers and order history where the platforms allow it, and set up redirects so your search rankings and old links keep working." },
      { q: "Do you set up dropshipping stores?", a: "Yes. We connect AutoDS with Amazon and Alibaba suppliers, and fix fulfilment problems between Shopify, TikTok Shop and your apps. Our Gladiolaz case study shows the full setup." },
      { q: "Do you help with marketing after launch?", a: "Yes. We run TikTok and Meta ads with AI video creative, and can set up ongoing SEO for your product and collection pages." },
      { q: "How long does it take to build a Shopify store?", a: "Most stores launch in four to eight weeks. A small catalog on an adapted theme is faster; custom sections, large imports and integrations take longer." },
    ],
  },
  {
    slug: "app-development",
    name: "Web and mobile apps",
    keyword: "app development for small businesses",
    short: "iPhone, Android and web apps for bookings, memberships, orders and accounts.",
    metaTitle: "App Development for Small Businesses",
    metaDescription:
      "Custom iPhone, Android and web app development for small businesses: bookings, memberships, customer accounts and payments, built in phases at a fixed price.",
    heroTitle: "App development for small businesses with repeat customers.",
    heroLede:
      "When customers come back every week, an app makes it easy: book again, reorder, check a membership or pay in a tap. We design and build it, then publish it to the App Store and Google Play.",
    answer: {
      q: "Does a small business need an app?",
      a: "A small business needs an app when customers come back often and benefit from saved accounts, push notifications or quick reordering, such as gyms, salons, restaurants and membership businesses. If most customers buy once or twice, a fast mobile website usually does the job at a fraction of the cost.",
    },
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
      { title: "Start small, ship early", body: "We build the smallest version that's genuinely useful, get it into customers' hands, then add features based on what they use." },
      { title: "One codebase where it makes sense", body: "For most business apps, one cross-platform build serves iPhone and Android, which keeps cost and maintenance down." },
      { title: "A fixed price per phase", body: "Each phase is scoped and priced before it starts, so you're never signing a blank check." },
    ],
    timeline: "A focused first version usually takes a few months, delivered in phases.",
    stack: ["React Native", "Next.js", "Laravel API", "Stripe"],
    workTags: ["app"],
    relatedMarkets: ["home-care-and-clinics", "ecommerce"],
    relatedPosts: ["how-much-does-a-small-business-website-cost"],
    wizardChoice: "app",
    faqs: [
      { q: "Do I need an app, or will a website do?", a: "If customers use your service once or twice, a fast website is usually enough. An app pays off when they return often, for bookings, reorders or memberships, and benefit from notifications and saved accounts." },
      { q: "How long does it take to build an app?", a: "A focused first version typically takes a few months. We break it into phases so something usable is ready early, and each phase has its own timeline and price." },
      { q: "Should I build for iPhone or Android first?", a: "For most business apps, neither: one cross-platform build covers both stores from a single codebase. Native apps make sense only for heavy device features or demanding graphics." },
      { q: "Who owns the app and its code?", a: "You do. The code, the App Store and Google Play listings and the developer accounts are in your name." },
    ],
  },
  {
    slug: "custom-software",
    name: "Custom software",
    keyword: "custom software development for small businesses",
    short: "CRMs, client portals, booking systems and dashboards built around how you work.",
    metaTitle: "Custom Software Development: CRMs and Portals",
    metaDescription:
      "Custom software development for small businesses: CRMs, client portals, booking systems and dashboards in Laravel and Next.js, scoped in phases at a fixed price.",
    heroTitle: "Custom software development that fits how your team works.",
    heroLede:
      "When off-the-shelf tools don't fit, your team ends up working around them. We build software shaped around your process: one place for customers, jobs, bookings, invoices and reports.",
    answer: {
      q: "When should a small business build custom software?",
      a: "Custom software makes sense when your process is part of what makes you competitive, when you pay for several tools that don't talk to each other, or when staff lose hours each week to spreadsheets and copy-paste. If an off-the-shelf tool covers 90% of your needs, use it instead.",
    },
    forWho: [
      "Teams juggling spreadsheets, inboxes and apps that don't connect",
      "Businesses whose clients need a portal for documents, status or payments",
      "Companies outgrowing a booking tool or CRM",
      "Operations that need one dashboard of the numbers that matter",
    ],
    included: [
      "Discovery: we map how work flows today and where time is lost",
      "A clickable prototype your team can test before the build",
      "Secure login and roles for staff, clients and admins",
      "Integrations with payments, email, calendars and accounting tools",
      "Data import from your spreadsheets or old system",
      "Hosting, backups and ongoing support",
    ],
    approach: [
      { title: "Built from how you work", body: "We sit with the people who'll use it and design around their day, not a feature checklist." },
      { title: "Delivered in phases", body: "The most painful problem gets solved first. You start using the software early and steer what comes next." },
      { title: "Automation where it saves hours", body: "Reminders, follow-ups, reports and data entry that happen on their own, including AI-assisted steps where they genuinely help." },
    ],
    timeline: "The first usable phase typically ships in 6 to 10 weeks.",
    stack: ["Laravel / PHP", "Next.js", "MySQL / PostgreSQL", "REST APIs"],
    workTags: ["software"],
    relatedMarkets: ["home-care-and-clinics", "contractors"],
    relatedPosts: [],
    wizardChoice: "software",
    faqs: [
      { q: "Why not just use an off-the-shelf tool?", a: "Often you should, and we'll say so. Custom software makes sense when your process is a competitive advantage, when you're paying for several tools that don't connect, or when staff spend hours a week on manual workarounds." },
      { q: "Can custom software connect to the tools we already use?", a: "Usually, yes. Most modern tools, including Stripe, QuickBooks, Google Workspace and calendar apps, have APIs we can connect to." },
      { q: "What is a client portal?", a: "A client portal is a secure, logged-in area where your customers can see project status, download documents, sign forms or pay invoices without emailing you. It cuts back-and-forth and makes a small business look organized." },
      { q: "What happens after the software is built?", a: "We host it, back it up, fix issues and keep improving it on a support plan. The code is yours if you ever want to move it." },
    ],
  },
  {
    slug: "seo-and-marketing",
    name: "SEO and marketing",
    keyword: "local SEO for service businesses",
    short: "Local SEO, AI search visibility, and paid ads on Google, Meta and TikTok.",
    metaTitle: "Local SEO and Ads for Service Businesses",
    metaDescription:
      "Local SEO, Google Business Profile optimization, AEO for AI search, and Google, Meta and TikTok ads for service businesses and Shopify stores. Monthly reporting.",
    heroTitle: "Local SEO and marketing that brings in buyers.",
    heroLede:
      "A great website still needs visitors. We help the right ones find you through Google Search and Maps, AI assistants like ChatGPT, and targeted ads, then report what each channel brings in.",
    answer: {
      q: "How does local SEO work?",
      a: "Google says it ranks local results on three factors: relevance, distance and prominence. Local SEO improves the two you control. Relevance comes from a complete Google Business Profile and service pages that match what people search. Prominence comes from reviews, ratings and links from other websites.",
    },
    forWho: [
      "Local businesses that want to show up in the Google Maps results",
      "Businesses with a new website and little traffic yet",
      "Shopify stores ready to scale with paid ads",
      "Anyone who wants their business named in AI-generated answers",
    ],
    included: [
      "Technical SEO audit and fixes",
      "Google Business Profile optimization and a review collection process",
      "Service and service-area landing pages",
      "Answer-focused content and schema markup for AI search (AEO)",
      "Google, Meta and TikTok ads setup and management",
      "Monthly report: rankings, traffic, calls, leads and sales",
    ],
    approach: [
      { title: "Local first", body: "For most service businesses, the Map results and 'near me' searches bring the highest-intent customers. That's where we start." },
      { title: "Answers, not keyword stuffing", body: "AI assistants and Google both reward pages that answer real questions clearly. We write content that does exactly that." },
      { title: "Ad spend tied to results", body: "Ads start small, get measured against leads and sales, and only scale when the numbers justify it." },
    ],
    timeline: "Technical and profile fixes show results within weeks; rankings for competitive terms take months.",
    stack: ["Google Search Console", "Google Business Profile", "Meta Ads", "TikTok Ads", "GA4"],
    workTags: ["store", "services"],
    relatedMarkets: ["hvac", "plumbing", "roofing", "ecommerce"],
    relatedPosts: ["local-seo-checklist-home-service-businesses", "what-is-aeo-answer-engine-optimization"],
    wizardChoice: "marketing",
    faqs: [
      { q: "What is AEO?", a: "Answer engine optimization means structuring your site so AI assistants such as ChatGPT, Gemini, Perplexity and Google's AI Overviews can understand it and cite it. That means clear answers to common questions, consistent business details everywhere, and structured data on your pages." },
      { q: "How long does SEO take to work?", a: "Technical fixes and Google Business Profile work can show results within weeks. Ranking for competitive terms usually takes several months of steady content and reviews. We report progress monthly so you can see the trend." },
      { q: "How important are Google reviews for local SEO?", a: "Very. Google lists review count and rating as part of prominence, one of its three local ranking factors. BrightLocal's 2026 survey also found 97% of consumers read reviews for local businesses and 74% only care about reviews from the last three months." },
      { q: "Do you need a big ad budget?", a: "No. We've launched TikTok campaigns at $20 a day that brought in orders within two weeks. What matters is tracking every order or lead, so the budget only grows when it pays for itself." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
