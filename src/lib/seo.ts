export const SITE_URL = "https://www.webcoreuae.com";
export const SITE_NAME = "Webcore Solutions";
export const BRAND_NAME = "Webcore UAE";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#local-business`;

type FaqItem = {
  q: string;
  a: string;
};

type PageMeta = {
  label: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  schemaType?: "WebPage" | "AboutPage" | "CollectionPage" | "FAQPage" | "ContactPage";
};

const areaServed = [
  { "@type": "City", name: "Dubai" },
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "Place", name: "Europe" },
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "Pakistan" },
];

const sameAs = [
  "https://www.linkedin.com/in/webcore-solutions-939b88408",
  "https://www.facebook.com/profile.php?id=61587249472207",
  "https://wa.me/447570792516",
];

export const pageSeo = {
  home: {
    label: "Home",
    path: "/",
    title: "Webcore UAE | Software, Web Development & SEO Agency in Dubai",
    description:
      "Webcore UAE is a Dubai digital agency delivering software development, web development, CMS, SEO, GEO, IT consultation and brand design for growing teams.",
    keywords: [
      "Webcore UAE",
      "Dubai digital agency",
      "software development Dubai",
      "web development Dubai",
      "SEO agency UAE",
      "GEO optimization",
    ],
  },
  about: {
    label: "About",
    path: "/about",
    title: "About Webcore UAE | Dubai Digital Agency & Technology Team",
    description:
      "Meet Webcore UAE, a Dubai-founded software, web, SEO and design team serving clients across the UAE, UK, Europe, America and Pakistan.",
    keywords: ["about Webcore UAE", "Dubai technology agency", "software agency UAE"],
    schemaType: "AboutPage",
  },
  services: {
    label: "Services",
    path: "/services",
    title: "Digital Services in Dubai | Web, Software, SEO, CMS & Design",
    description:
      "Explore Webcore UAE services: IT consultation, CMS development, web development, software development, SEO, GEO and graphic design for modern businesses.",
    keywords: ["digital services Dubai", "web development services UAE", "software services UAE"],
    schemaType: "CollectionPage",
  },
  faqs: {
    label: "FAQs",
    path: "/faqs",
    title: "FAQs | Webcore UAE Process, Pricing, Services & Support",
    description:
      "Answers to common questions about Webcore UAE services, pricing, project timelines, support, technology choices and international partnerships.",
    keywords: ["Webcore UAE FAQs", "digital agency questions", "software project pricing UAE"],
    schemaType: "FAQPage",
  },
  contact: {
    label: "Contact",
    path: "/contact",
    title: "Contact Webcore UAE | Book a Free Digital Strategy Call",
    description:
      "Contact Webcore UAE for software development, web development, SEO, GEO, CMS, IT consultation and brand design support in Dubai and internationally.",
    keywords: ["contact Webcore UAE", "Dubai software consultation", "book web development call"],
    schemaType: "ContactPage",
  },
  itConsultation: {
    label: "IT Consultation",
    path: "/services/it-consultation",
    title: "IT Consultation Dubai | Technology Audits & Roadmaps",
    description:
      "Strategic IT consultation in Dubai for technology audits, architecture planning, cloud strategy, vendor selection and scale-ready roadmaps.",
    keywords: ["IT consultation Dubai", "technology audit UAE", "fractional CTO Dubai"],
  },
  cmsDevelopment: {
    label: "CMS Development",
    path: "/services/cms-development",
    title: "CMS Development Dubai | Headless CMS & Content Platforms",
    description:
      "Headless and composable CMS development for Dubai and global teams that need structured content, editorial workflows and scalable publishing.",
    keywords: ["CMS development Dubai", "headless CMS UAE", "WordPress development Dubai"],
  },
  webDevelopment: {
    label: "Web Development",
    path: "/services/web-development",
    title: "Web Development Dubai | High-Performance Business Websites",
    description:
      "Web development in Dubai for fast business websites, e-commerce stores, WordPress builds and conversion-focused digital experiences.",
    keywords: ["web development Dubai", "website development UAE", "ecommerce development Dubai"],
  },
  softwareDevelopment: {
    label: "Software Development",
    path: "/services/software-development",
    title: "Software Development Dubai | SaaS, APIs & Business Systems",
    description:
      "Custom software development for SaaS platforms, APIs, data systems, internal tools and AI integrations built for reliability and scale.",
    keywords: ["software development Dubai", "custom software UAE", "SaaS development Dubai"],
  },
  seoGeo: {
    label: "SEO & GEO",
    path: "/services/seo-geo",
    title: "SEO & GEO Services Dubai | Search, AI & Local Visibility",
    description:
      "SEO and GEO services in Dubai covering technical SEO, local SEO, content optimization, schema, AI search readiness and sustainable authority growth.",
    keywords: ["SEO services Dubai", "GEO services UAE", "AI search optimization Dubai"],
  },
  graphicDesign: {
    label: "Graphic Design",
    path: "/services/graphic-design",
    title: "Graphic Design Dubai | Logo, Brand Identity & Collateral",
    description:
      "Graphic design services in Dubai for logos, brand systems, company profiles, brochures, visiting cards, web visuals and premium collateral.",
    keywords: ["graphic design Dubai", "logo design UAE", "brand identity Dubai"],
  },
} satisfies Record<string, PageMeta>;

export type PageKey = keyof typeof pageSeo;

const servicePageKeys = [
  "itConsultation",
  "cmsDevelopment",
  "webDevelopment",
  "softwareDevelopment",
  "seoGeo",
  "graphicDesign",
] as const satisfies ReadonlyArray<PageKey>;

const serviceTypes: Record<(typeof servicePageKeys)[number], string> = {
  itConsultation: "IT consultation and technology advisory",
  cmsDevelopment: "CMS development and content platform engineering",
  webDevelopment: "Web development and ecommerce development",
  softwareDevelopment: "Custom software development",
  seoGeo: "SEO, GEO and AI search optimization",
  graphicDesign: "Graphic design and brand identity design",
};

export function absoluteUrl(path: string) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function getBreadcrumbItems(page: PageMeta) {
  const items = [{ name: "Home", item: absoluteUrl("/") }];

  if (page.path.startsWith("/services/")) {
    items.push({ name: "Services", item: absoluteUrl("/services") });
  }

  if (page.path !== "/") {
    items.push({ name: page.label, item: absoluteUrl(page.path) });
  }

  return items;
}

function breadcrumbSchema(page: PageMeta) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(page.path)}#breadcrumbs`,
    itemListElement: getBreadcrumbItems(page).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/web-app-manifest-512x512.png`,
    image: `${SITE_URL}/og-image.png`,
    email: "info@webcoreuae.com",
    telephone: "+971 50 716 9200",
    foundingDate: "2012",
    foundingLocation: {
      "@type": "Place",
      name: "Dubai, United Arab Emirates",
    },
    founder: {
      "@type": "Person",
      name: "Muhammad Abdullah Chattha",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+971 50 716 9200",
        contactType: "sales",
        areaServed: "AE",
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+44 7570 792516",
        contactType: "customer support",
        areaServed: ["GB", "AE", "PK", "US"],
        availableLanguage: ["en"],
      },
    ],
    areaServed,
    sameAs,
    knowsAbout: [
      "Software development",
      "Web development",
      "Technical SEO",
      "Generative engine optimization",
      "Answer engine optimization",
      "Local SEO",
      "CMS development",
      "IT consultation",
      "Graphic design",
      "Core Web Vitals",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital agency services",
      itemListElement: servicePageKeys.map((key) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: pageSeo[key].label,
          serviceType: serviceTypes[key],
          url: absoluteUrl(pageSeo[key].path),
        },
      })),
    },
  };
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: BRAND_NAME,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

function localBusinessSchema() {
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": LOCAL_BUSINESS_ID,
    name: SITE_NAME,
    alternateName: BRAND_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    logo: `${SITE_URL}/web-app-manifest-512x512.png`,
    telephone: "+971 50 716 9200",
    email: "info@webcoreuae.com",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed,
    parentOrganization: { "@id": ORG_ID },
    sameAs,
  };
}

function webPageSchema(page: PageMeta, key: PageKey) {
  const isServicePage = servicePageKeys.includes(key as (typeof servicePageKeys)[number]);

  return {
    "@type": page.schemaType ?? "WebPage",
    "@id": `${absoluteUrl(page.path)}#webpage`,
    url: absoluteUrl(page.path),
    name: page.title,
    description: page.description,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    about: isServicePage ? { "@id": `${absoluteUrl(page.path)}#service` } : { "@id": ORG_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${absoluteUrl(page.path)}#breadcrumbs` },
    inLanguage: "en",
  };
}

function serviceSchema(key: PageKey) {
  if (!servicePageKeys.includes(key as (typeof servicePageKeys)[number])) {
    return null;
  }

  const serviceKey = key as (typeof servicePageKeys)[number];
  const page = pageSeo[serviceKey];

  return {
    "@type": "Service",
    "@id": `${absoluteUrl(page.path)}#service`,
    name: page.label,
    description: page.description,
    serviceType: serviceTypes[serviceKey],
    url: absoluteUrl(page.path),
    provider: { "@id": ORG_ID },
    areaServed,
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Startups, SMEs and enterprise teams",
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/contact"),
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
  };
}

function faqSchema(page: PageMeta, faqs: FaqItem[]) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(page.path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function getSeoHead(
  key: PageKey,
  options: {
    faqs?: FaqItem[];
    extraSchemas?: Array<Record<string, unknown>>;
  } = {},
) {
  const page = pageSeo[key];
  const canonical = absoluteUrl(page.path);
  const graph = [
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
    webPageSchema(page, key),
    breadcrumbSchema(page),
    serviceSchema(key),
    options.faqs?.length ? faqSchema(page, options.faqs) : null,
    ...(options.extraSchemas ?? []),
  ].filter(Boolean);

  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "keywords", content: page.keywords.join(", ") },
      { name: "author", content: SITE_NAME },
      { name: "publisher", content: SITE_NAME },
      { name: "geo.region", content: "AE-DU" },
      { name: "geo.placename", content: "Dubai" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_AE" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE_NAME} digital agency services` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@webcoresolutions" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
      { name: "twitter:image:alt", content: `${SITE_NAME} digital agency services` },
      { "script:ld+json": { "@context": "https://schema.org", "@graph": graph } },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function getRootHead() {
  return {
    meta: [
      { name: "application-name", content: SITE_NAME },
      { name: "apple-mobile-web-app-title", content: BRAND_NAME },
      { name: "format-detection", content: "telephone=no" },
    ],
  };
}
