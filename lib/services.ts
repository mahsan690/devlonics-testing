export type Faq = { q: string; a: string };

// Service pages. Devlonic works only with local service businesses in the US
// (contractors, home services, clinics and other businesses that sell to
// people in a service area). Copy is written around one primary search phrase
// per page (`keyword`), with the direct answer up top (`answer`) so search
// engines and AI assistants can quote it. Slugs are URLs: don't change them.

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

const allTrades = ["hvac", "plumbing", "roofing", "cleaning", "contractors", "landscaping", "home-care-and-clinics"];

export const services: Service[] = [
  {
    slug: "website-design",
    name: "Website design and redesign",
    keyword: "website redesign for small business",
    short: "A fast, modern website that makes you look like the safe choice and turns visits into calls.",
    metaTitle: "Website Redesign for Local Service Businesses",
    metaDescription:
      "Website design and redesign for contractors and local service businesses: tap-to-call, quote forms, reviews and service-area pages. Fixed price, US-wide.",
    heroTitle: "Website design and redesign for local service businesses.",
    heroLede:
      "Homeowners judge your business by your website before they ever call. We design and redesign websites for contractors, home services and clinics that look established, load fast on a phone and make calling you the obvious next step.",
    answer: {
      q: "When should a service business redesign its website?",
      a: "Redesign when the site is slow or hard to use on a phone, when it doesn't show your services, towns, reviews and phone number clearly, when you can't update it yourself, or when visits aren't turning into calls. A redesign keeps the pages that already rank and rebuilds everything around getting the enquiry.",
    },
    forWho: [
      "Contractors and trades: HVAC, plumbing, roofing, electrical, remodeling, flooring",
      "Home services: cleaning, landscaping, pest control, pools, moving",
      "Home care agencies, clinics, med spas and wellness practices",
      "Any local business whose site looks dated next to its competitors",
    ],
    included: [
      "A modern design built for phones first, where most of your visitors are",
      "Tap-to-call and a short quote form on every page",
      "A page for every service you sell and every main town you cover",
      "Reviews, licenses and real job photos beside each call to action",
      "Redirects from your old pages, so you keep the rankings you've earned",
      "Call and form tracking in Google Analytics 4 from day one",
      "An editor you can use yourself, plus a recorded walkthrough",
    ],
    approach: [
      { title: "Your number in the first screen", body: "On a phone, the call button sits at the top of every page. Nobody should scroll to find out how to reach you." },
      { title: "Proof beside the ask", body: "Reviews, licenses, before-and-after photos and guarantees sit next to the button, where the decision gets made." },
      { title: "Keep what already ranks", body: "We map every old address to its new page and redirect it, so a redesign doesn't cost you the Google traffic you already have." },
      { title: "Measured from day one", body: "You see how many calls and form fills the site produces each month, and which pages and searches they came from." },
    ],
    timeline: "Most redesigns launch in 3 to 6 weeks from approved design.",
    stack: ["WordPress + Elementor", "Next.js", "Google Analytics 4", "Google Search Console"],
    workTags: ["services", "health"],
    relatedMarkets: allTrades,
    relatedPosts: ["website-redesign-without-losing-seo", "home-service-website-checklist", "how-much-does-a-small-business-website-cost"],
    wizardChoice: "website",
    faqs: [
      { q: "How much does a website redesign cost?", a: "It depends on how many pages move across, how much content we write and which features you need, such as booking or a quote funnel. We quote every redesign as a fixed price after a short questionnaire, and it always includes redirects from your old pages." },
      { q: "Will a redesign hurt my Google rankings?", a: "Not when it's done carefully. We keep the pages that already rank, redirect every old address to its closest new page, submit the new sitemap and watch Search Console for the first weeks. Google says permanent redirects pass ranking signals." },
      { q: "Can I update the website myself afterwards?", a: "Yes. We build on an editor you can use without code, and hand over a recorded walkthrough of the changes you'll make most, like new photos, reviews and service details." },
      { q: "Do you build new websites as well as redesigns?", a: "Yes. If you don't have a website yet, we design one from scratch around your services, towns and reviews, with the same tracking and quote form as a redesign." },
      { q: "How long does a website redesign take?", a: "Most launch three to six weeks after you approve the design. The timeline depends on the number of service and town pages and how quickly content and feedback come back." },
    ],
  },
  {
    slug: "reputation-management",
    name: "Reputation management",
    keyword: "online reputation management for small business",
    short: "More 5-star Google reviews, a reply to every review, and a plan for the bad ones.",
    metaTitle: "Reputation Management for Service Businesses",
    metaDescription:
      "Online reputation management for local service businesses: review requests after every job, replies to every review and monitoring across Google, Yelp and Facebook.",
    heroTitle: "Online reputation management for local service businesses.",
    heroLede:
      "Most customers read your reviews before they read your website. We get you a steady stream of new Google reviews, reply to every one in your voice, and catch problems early, all within Google's and the FTC's rules.",
    answer: {
      q: "What is reputation management for a small business?",
      a: "Reputation management is the work of earning recent, genuine reviews, replying to every review, and spotting and resolving complaints before they spread. For a local service business it mostly happens on Google, plus Yelp, Facebook and industry sites, and it directly affects how often you show up in Maps and how many people call.",
    },
    forWho: [
      "Service businesses with fewer reviews than their main competitors",
      "Businesses whose newest review is months old",
      "Owners who don't have time to reply to every review",
      "Anyone dealing with an unfair or damaging review",
    ],
    included: [
      "Automatic review requests by text and email after every finished job",
      "A short review link and QR code for your team and invoices",
      "Replies to every new review, written in your voice and approved by you",
      "Alerts for low ratings, so you can call the customer the same day",
      "Monitoring across Google, Yelp, Facebook and your industry sites",
      "Help reporting reviews that break Google's policies",
      "A monthly report: new reviews, average rating and response rate",
    ],
    approach: [
      { title: "Ask everyone, at the right moment", body: "Requests go out right after the job, to every customer, with a direct link. Google bans asking only happy customers, so we don't." },
      { title: "Reply to every review", body: "A thank-you for the good ones and a calm, specific reply to the bad ones. Future customers read your replies as closely as the reviews." },
      { title: "Fix problems before they post", body: "Low ratings trigger an alert to you first, so an unhappy customer gets a call instead of a public one-star." },
      { title: "Stay inside the rules", body: "No incentives, no fake reviews, no gating. The FTC's review rule carries civil penalties, and Google removes reviews it thinks were manipulated." },
    ],
    timeline: "Set up in the first week, then managed month to month.",
    stack: ["Google Business Profile", "Text and email review requests", "Your CRM or job software"],
    workTags: ["services", "health"],
    relatedMarkets: allTrades,
    relatedPosts: ["how-to-get-more-google-reviews", "ftc-fake-review-rule-small-business", "reputation-management-for-service-businesses"],
    wizardChoice: "reviews",
    faqs: [
      { q: "How do I get more Google reviews?", a: "Ask every customer, right after the job, with a direct link that opens the review box. Automatic texts and emails make sure nobody is forgotten. Don't offer incentives or ask only happy customers: both break Google's policies and the FTC's rule on reviews." },
      { q: "Can you remove bad reviews?", a: "Only Google can remove a review, and only when it breaks Google's policies, such as spam, conflicts of interest or off-topic content. We report those for you. For genuine bad reviews, a calm, specific reply and a fixed problem usually do more for your reputation than removal would." },
      { q: "Do you write fake reviews or buy reviews?", a: "Never. Fake and paid reviews are banned by the FTC's rule on consumer reviews, which allows civil penalties, and Google can remove them or restrict your profile. Every review we help you get comes from a real customer." },
      { q: "How fast will my rating improve?", a: "Most businesses see new reviews within the first week of automatic requests. How fast the average moves depends on how many jobs you finish each month and how many reviews you already have." },
    ],
  },
  {
    slug: "google-business-profile",
    name: "Google Business Profile and local SEO",
    keyword: "Google Business Profile management services",
    short: "A complete, active Google profile and website pages that put you in the map results.",
    metaTitle: "Google Business Profile Management Services",
    metaDescription:
      "Google Business Profile management and local SEO for service businesses: setup, optimization, weekly posts, photos and service-area pages that get you into Maps.",
    heroTitle: "Google Business Profile management that puts you on the map.",
    heroLede:
      "When someone searches for your trade near them, the map results get the calls. We set up, optimize and manage your Google Business Profile, and build the website pages behind it, so you show up in more of the searches that turn into jobs.",
    answer: {
      q: "What does Google Business Profile management include?",
      a: "Google Business Profile management covers setting up and verifying the profile, choosing the right categories and services, accurate hours and service areas, regular photos and posts, answering questions, and keeping the details consistent everywhere online. Together with reviews and a website page for each service and town, it drives where you rank in Google Maps.",
    },
    forWho: [
      "Businesses that don't show up in the map results for their main services",
      "Profiles that are unverified, incomplete or suspended",
      "Service-area businesses expanding into new towns",
      "Owners who set up a profile once and never touched it again",
    ],
    included: [
      "Profile setup or clean-up, verification and the right primary category",
      "Services, service areas, hours, photos and booking links filled in properly",
      "Weekly posts and fresh job photos to keep the profile active",
      "Your name, address and phone made consistent across directories",
      "Service and town pages on your website that support the profile",
      "Help with suspensions, edits and Google's guidelines",
      "Monthly report: calls, direction requests and searches from the profile",
    ],
    approach: [
      { title: "Get the basics exactly right", body: "Category, services, service area and hours drive which searches you appear for. Most profiles we see have at least one of them wrong." },
      { title: "Stay inside Google's guidelines", body: "No keyword-stuffed names, virtual offices or fake addresses. Those are the common reasons profiles get suspended." },
      { title: "Show you're active", body: "Regular posts, new photos from real jobs and a steady stream of reviews tell Google and customers that you're open and busy." },
      { title: "Back it up with your website", body: "A page for each service and each main town gives Google more reasons to show you, and gives customers somewhere to land." },
    ],
    timeline: "Profile optimized in the first two weeks, then managed month to month.",
    stack: ["Google Business Profile", "Google Search Console", "Local directories", "Your website"],
    workTags: ["services", "health"],
    relatedMarkets: allTrades,
    relatedPosts: ["local-seo-checklist-home-service-businesses", "google-business-profile-suspended", "service-area-pages-seo"],
    wizardChoice: "profile",
    faqs: [
      { q: "How do I get my business to show up on Google Maps?", a: "Google says local results are based on relevance, distance and prominence, and that you can't pay for a better ranking. You improve what you control: a complete, verified profile with the right categories, steady new reviews, and website pages for each service and town." },
      { q: "My Google Business Profile was suspended. Can you help?", a: "Yes. We find the likely cause, such as the business name, address or service area, fix it on the profile and your website, gather proof of the business, and file one clean appeal through Google's appeals tool." },
      { q: "Do I need a physical address for a Google Business Profile?", a: "You need a real address to verify, but service-area businesses that visit customers should hide it and list the areas they serve instead. A virtual office or mailbox address breaks Google's guidelines and often leads to suspension." },
      { q: "Is local SEO included?", a: "Yes. Profile management works together with local SEO on your website: service and town pages, consistent business details, LocalBusiness schema and technical fixes, so Google has the full picture." },
    ],
  },
  {
    slug: "lead-generation",
    name: "Lead generation and lead flow",
    keyword: "lead generation for contractors",
    short: "Quote forms and booking steps that capture every enquiry and send it straight to your email, phone and CRM.",
    metaTitle: "Lead Generation for Contractors, With Lead Flow",
    metaDescription:
      "Lead generation for contractors and service businesses: quote funnels, booking steps and a lead flow that sends every enquiry to your email, phone and CRM in seconds.",
    heroTitle: "Lead generation for contractors, with a lead flow that never drops one.",
    heroLede:
      "Getting the enquiry is half the job. The other half is getting it to the right person in seconds, with everything they need to call back. We build quote funnels and booking steps that capture more leads, and a lead flow that sends each one to your inbox, your phone and your CRM automatically.",
    answer: {
      q: "What is a lead flow?",
      a: "A lead flow is the path an enquiry takes from your website to a booked job. A good one captures the lead even if the form isn't finished, alerts your team instantly by email or text, creates the customer in your CRM with every detail, sends the customer a confirmation, and logs where the lead came from, with nobody copying data by hand.",
    },
    forWho: [
      "Businesses that copy leads from email into their CRM by hand",
      "Teams that lose enquiries when people abandon a long form",
      "Companies running ads to a quote page that leaks leads",
      "Call centers and offices that confirm appointments by phone",
    ],
    included: [
      "A multi-step quote form or funnel designed for phones",
      "Contact details asked early, so unfinished forms still become leads",
      "A preferred day and time step, with your own hours and days off",
      "Instant email and text alerts with the full lead details",
      "Leads created in your CRM automatically: Jobber, Housecall Pro, ServiceTitan, HubSpot, Builder Prime and others",
      "Ad source and campaign saved with every lead",
      "A Google Sheet or dashboard of every lead, with CSV export",
    ],
    approach: [
      { title: "Ask in the right order", body: "Name and phone come before the address, so if someone stops halfway you still have a way to call them back." },
      { title: "Send it everywhere at once", body: "Your inbox, your phone and your CRM get the lead within seconds, with the same details, so whoever picks it up has the full picture." },
      { title: "Let customers pick a time", body: "A preferred-time step gives your office a head start on scheduling, without handing your calendar to a third-party booking tool." },
      { title: "Know what each lead cost", body: "Every lead carries its ad source and campaign, so you can see which ads and pages bring booked jobs, not just clicks." },
    ],
    timeline: "Most quote funnels and lead flows go live in 2 to 4 weeks.",
    stack: ["WordPress or Next.js", "Your CRM's API", "Zapier or n8n", "Google Sheets", "Google Analytics 4"],
    workTags: ["services", "health"],
    relatedMarkets: allTrades,
    relatedPosts: ["speed-to-lead-home-service-businesses", "website-to-crm-lead-flow", "measure-website-roi-call-tracking-ga4"],
    wizardChoice: "leads",
    faqs: [
      { q: "Can you connect my website form to my CRM?", a: "Usually, yes. If your CRM or job software has an API, a native integration or works with Zapier, we can create each lead in it automatically. We've connected quote forms straight to Builder Prime, and can connect Jobber, Housecall Pro, ServiceTitan, HubSpot, GoHighLevel and most others through their APIs or Zapier." },
      { q: "What happens if someone doesn't finish the form?", a: "We ask for contact details early. If the visitor stops before the end, the partial lead is saved and sent to your team after a short delay, so you can still call them back." },
      { q: "Do I need a booking calendar like Calendly?", a: "Not necessarily. Many service businesses do better with a preferred day and time step, which your office confirms by phone. It captures the customer's availability without letting them book slots your crew can't keep." },
      { q: "How fast should we call new leads back?", a: "As fast as you can. Jobber's 2026 survey found more than 55% of home service customers expect a reply within the hour, and 28% expect an immediate one. Instant alerts make that possible." },
    ],
  },
  {
    slug: "local-ads",
    name: "Local ads",
    keyword: "local advertising for small business",
    short: "Ads shown only to people in your service area who are looking for what you do.",
    metaTitle: "Local Ads for Service Businesses: Google & Meta",
    metaDescription:
      "Local advertising for service businesses: Google Local Services Ads, search ads and Facebook and Instagram ads targeted to your service area. More calls, tracked.",
    heroTitle: "Local ads that make the phone ring in your service area.",
    heroLede:
      "We run ads only where you work, to people who are looking for your service right now or are likely to need it soon. Every call and form is tracked, so you see what each dollar brings back.",
    answer: {
      q: "What is local advertising for a service business?",
      a: "Local advertising means paid ads shown only to people inside your service area: Google Local Services Ads and search ads for people searching for your trade, and Facebook and Instagram ads for homeowners nearby. Done well, every ad leads to a call or a quote form, and every lead is tracked back to the ad that brought it.",
    },
    forWho: [
      "Businesses that need more calls than search and referrals bring in",
      "Owners paying for ads without knowing which ones work",
      "Companies moving from Local Services Ads into Google Ads",
      "Seasonal businesses that need to fill quiet months",
    ],
    included: [
      "Google Local Services Ads setup and management",
      "Google search ads for your highest-value services and towns",
      "Facebook and Instagram ads targeted to your service area",
      "A landing page or quote funnel built for each campaign",
      "Call tracking and conversion tracking for every ad",
      "Weekly checks on spend, wasted searches and missed calls",
      "A monthly report in plain English: spend, leads and cost per lead",
    ],
    approach: [
      { title: "Target the area you serve", body: "Ads run only in the zip codes and towns you want to drive to, so you don't pay for calls you'll turn down." },
      { title: "Send clicks to a page that converts", body: "Every campaign gets a focused landing page or quote funnel, not your homepage." },
      { title: "Answer the phone", body: "Google now bills Local Services Ads for missed calls during business hours, so we set up call routing and alerts before we spend a dollar." },
      { title: "Track to the booked job", body: "Calls and forms are tied to the ad that brought them, so budget moves to what actually books work." },
    ],
    timeline: "Campaigns launch in 1 to 2 weeks, then managed month to month. Ad spend is paid to Google and Meta directly.",
    stack: ["Google Local Services Ads", "Google Ads", "Meta Ads", "Call tracking", "Google Analytics 4"],
    workTags: ["services", "health"],
    relatedMarkets: allTrades,
    relatedPosts: ["google-local-services-ads-missed-calls", "local-services-ads-moving-to-google-ads", "facebook-marketing-home-service-business"],
    wizardChoice: "ads",
    faqs: [
      { q: "Should I use Local Services Ads or Google search ads?", a: "Often both. Local Services Ads charge per lead and appear above everything else for many home services; search ads give you more control over keywords, towns and landing pages. We start with whichever fits your trade and budget, then test the other." },
      { q: "How much should a local business spend on ads?", a: "Enough to get a steady number of leads for your highest-value job, measured over a few weeks. We set a starting budget with you based on your cost per job and close rate, and adjust it from real results. Ad spend is paid to Google and Meta directly." },
      { q: "Do Facebook ads work for home service businesses?", a: "They can. In Jobber's 2026 survey, 32% of home service owners named Facebook as a lead source, second only to referrals. Real before-and-after photos and fast replies to messages matter more than polished graphics." },
      { q: "Will I know which ads bring in jobs?", a: "Yes. We set up call tracking and conversion tracking before launch, so each call and form is tied to its campaign. Your monthly report shows leads and cost per lead, not just clicks." },
    ],
  },
  {
    slug: "automation",
    name: "Automation",
    keyword: "speed to lead automation",
    short: "Small systems that stop the money your business is already losing: missed calls, slow follow-ups and forgotten reviews.",
    metaTitle: "Automation for Service Businesses",
    metaDescription:
      "Automation for local service businesses: missed-call text-back, AI receptionists, instant follow-ups and review requests that stop leads and money slipping away.",
    heroTitle: "Automation that stops the money your business is already losing.",
    heroLede:
      "Missed calls, slow callbacks and forgotten follow-ups cost service businesses jobs every week. We set up small, reliable systems that answer, follow up and remind for you, so fewer leads slip through the cracks.",
    answer: {
      q: "What can a service business automate?",
      a: "The easiest wins are a text back to every missed call, an instant reply to every web lead, follow-ups on quotes that haven't been accepted, appointment reminders, review requests after each job, and new leads added to your CRM automatically. An AI receptionist can also answer calls after hours and book simple jobs.",
    },
    forWho: [
      "Businesses that miss calls on job sites or after hours",
      "Offices that chase quotes and reminders by hand",
      "Owners who want leads in the CRM without copy and paste",
      "Teams growing faster than the office can keep up with",
    ],
    included: [
      "Missed-call text-back within a minute of a missed call",
      "An AI receptionist that answers after hours and books simple jobs",
      "Instant replies and follow-up sequences for new leads and open quotes",
      "Appointment reminders by text and email",
      "Review requests sent after every finished job",
      "Leads and jobs synced between your website, CRM and spreadsheets",
    ],
    approach: [
      { title: "Fix the biggest leak first", body: "We look at where leads and hours are lost today, and automate the one that costs you most before anything else." },
      { title: "Keep a person in charge", body: "Emergencies, pricing and anything unusual go to your team, with the full conversation attached." },
      { title: "Use the tools you have", body: "We build on your phone system, CRM and calendar where we can, instead of adding another app to learn." },
      { title: "Show what it saves", body: "Each automation reports what it did: calls answered, texts sent, leads saved and reviews requested." },
    ],
    timeline: "Most automations go live in 1 to 3 weeks.",
    stack: ["n8n", "Make.com", "Zapier", "VAPI", "Your CRM", "Twilio or your phone system"],
    workTags: ["services", "health"],
    relatedMarkets: allTrades,
    relatedPosts: ["ai-for-home-service-businesses", "speed-to-lead-home-service-businesses", "online-booking-for-home-service-businesses"],
    wizardChoice: "automation",
    faqs: [
      { q: "What is missed-call text-back?", a: "When a call rings out, the caller automatically gets a text within a minute, such as 'Sorry we missed you, this is ABC Plumbing. How can we help?' It turns a caller who would have tried the next company into a conversation." },
      { q: "Is an AI receptionist good enough to answer my calls?", a: "For common questions and simple bookings, it can be, especially after hours. We train it on your services, prices and areas, test it on real calls, and always give it a way to transfer emergencies to a person." },
      { q: "How much does automation cost?", a: "Each automation gets a fixed setup price. Running costs, such as text messages, AI usage and automation hosting, are billed by those providers to your own accounts, so you see exactly what you pay." },
      { q: "Will automation replace my office staff?", a: "No. It takes the repetitive work off them, like reminders, follow-ups and data entry, so they can spend their time on customers and scheduling." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
