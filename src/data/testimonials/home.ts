export type HomeTestimonial = {
  name: string;
  role: string;
  quote: string;
  stars: number;
  image: string | null;
};

// Homepage-only testimonials. Names, roles, metrics and phrasing are unique to /
// (no overlap with any service-page testimonial array).
export const homeTestimonials: HomeTestimonial[] = [
  {
    name: "Layla Al-Mansoori",
    role: "Marketing Director, Khaleej Retail Group",
    quote:
      "After five months on our Arabic-English SEO rebuild, organic traffic from UAE searches climbed 84 percent. The Webcore team navigated our bilingual content workflow without missing a milestone.",
    stars: 5,
    image: null,
  },
  {
    name: "Rohan Verma",
    role: "Head of Product, FinTrack MENA",
    quote:
      "Webcore Solutions delivered our investor dashboard in ten focused weeks. Two larger Dubai agencies had quoted us double that timeline, and our user NPS still jumped from 42 to 71 after launch.",
    stars: 5,
    image: null,
  },
  {
    name: "Hana Said",
    role: "Founder, Saharaboutique",
    quote:
      "The refreshed storefront and new brand identity moved our checkout conversion rate from 1.6 to 4.2 percent. First-month revenue beat our internal forecast by almost forty percent.",
    stars: 5,
    image: null,
  },
  {
    name: "Daniel Whittaker",
    role: "Operations Lead, Brightline Logistics UK",
    quote:
      "Webcore Solutions consolidated three legacy systems into one operations platform our regional teams actually use. Manual reconciliation hours dropped 60 percent and uptime stayed above 99.9 percent all year.",
    stars: 5,
    image: null,
  },
];
