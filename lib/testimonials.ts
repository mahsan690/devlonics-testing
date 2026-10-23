// Client reviews, quoted word for word. Never invent or edit a review.
// Sources: the previous devlonics.com and the public Trustpilot profile.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  source?: { label: "Trustpilot"; url: string; rating: number };
};

const trustpilot = "https://www.trustpilot.com/review/devlonics.com";

// On hold: the KitsXI review (Ghulam Mohiuddin) on the old site and the
// Trustpilot review by Bilal Ahmed are almost word for word the same under
// different names. Confirm which attribution is correct before adding either.

export const testimonials: Testimonial[] = [
  {
    quote:
      "I run a cleaning services business and didn’t have a website at all, so I was missing out on a lot of potential customers. After working with Devlonics, they built me a site that actually brings in leads. I started getting inquiries within days. It’s made a real difference to my business.",
    name: "Thania Alonso",
    role: "Cleaning services business owner",
    source: { label: "Trustpilot", url: trustpilot, rating: 5 },
  },
  {
    quote:
      "Devlonic Solutions completely transformed my old website into something modern, clean, and highly professional. The new design not only looks great but also significantly improves the overall layout and user experience. Their communication was excellent throughout the process, they worked efficiently, and were always willing to make adjustments until everything was exactly right.",
    name: "Gavin Smith",
    role: "E-commerce store owner",
  },
  {
    quote:
      "Devlonic Solutions is great to work with and very flexible. Their web design skills exceeded my expectations. We hired them for several web design projects, and there wasn't a single task they couldn't handle. Communication was smooth throughout, making collaboration effortless.",
    name: "Jason Sullivan",
    role: "CEO, FortuneLeads",
  },
  {
    quote:
      "Devlonic is an awesome agency to work with. Their expertise with WordPress is beyond expectations. They went above and beyond to meet the requirements for our digital marketing agency website. Recommended to others!",
    name: "Sohan Bapary",
    role: "CEO, MaetiQ",
  },
];
