export const SITE_URL = "https://www.webcoreuae.com";
export const SITE_NAME = "Webcore Solutions";
export const BRAND_NAME = "Webcore Solutions";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#local-business`;

// Page publish / last-updated dates (ISO 8601). Update on each meaningful content change.
const pageDates: Record<string, { datePublished: string; dateModified: string }> = {
  home:                { datePublished: "2024-01-01", dateModified: "2026-05-11" },
  about:               { datePublished: "2024-01-01", dateModified: "2026-05-11" },
  services:            { datePublished: "2024-01-01", dateModified: "2026-05-11" },
  faqs:                { datePublished: "2024-06-01", dateModified: "2026-05-11" },
  contact:             { datePublished: "2024-01-01", dateModified: "2026-05-11" },
  itConsultation:      { datePublished: "2024-02-01", dateModified: "2026-05-11" },
  cmsDevelopment:      { datePublished: "2024-02-01", dateModified: "2026-05-11" },
  webDevelopment:      { datePublished: "2024-02-01", dateModified: "2026-05-11" },
  softwareDevelopment: { datePublished: "2024-02-01", dateModified: "2026-05-11" },
  seoGeo:              { datePublished: "2024-03-01", dateModified: "2026-05-11" },
  graphicDesign:       { datePublished: "2024-02-01", dateModified: "2026-05-11" },
};

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
    title: "Webcore Solutions | Web, Software & SEO Agency Dubai",
    description:
      "Dubai digital agency for web development, software, ecommerce, CMS, SEO, GEO, branding and automation for UAE, UK, US and global teams.",
    keywords: [
      "Webcore Solutions",
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
    title: "About Webcore Solutions | Dubai Digital Agency Team",
    description:
      "Meet Webcore Solutions, a Dubai-founded software, web, SEO and design team serving clients across the UAE, UK, Europe, US and Pakistan.",
    keywords: ["about Webcore Solutions", "Dubai technology agency", "software agency UAE"],
    schemaType: "AboutPage",
  },
  services: {
    label: "Services",
    path: "/services",
    title: "Digital Services Dubai | Web, Software, SEO & CMS",
    description:
      "Explore Webcore Solutions services: web development, software development, ecommerce, CMS, SEO, GEO, branding, UI/UX and IT consultation.",
    keywords: ["digital services Dubai", "web development services UAE", "software services UAE"],
    schemaType: "CollectionPage",
  },
  faqs: {
    label: "FAQs",
    path: "/faqs",
    title: "Webcore Solutions FAQs | Process, Pricing & Support",
    description:
      "Answers about Webcore Solutions services, pricing, project timelines, support, technology choices and international digital agency work.",
    keywords: ["Webcore Solutions FAQs", "digital agency questions", "software project pricing UAE"],
    schemaType: "FAQPage",
  },
  contact: {
    label: "Contact",
    path: "/contact",
    title: "Contact Webcore Solutions | Free Digital Strategy Call",
    description:
      "Contact Webcore Solutions for web development, software, SEO, GEO, CMS, IT consultation, branding and ecommerce support in Dubai and globally.",
    keywords: ["contact Webcore Solutions", "Dubai software consultation", "book web development call"],
    schemaType: "ContactPage",
  },
  itConsultation: {
    label: "IT Consultation",
    path: "/services/it-consultation",
    title: "IT Consultation Dubai | Technology Audits & Roadmaps",
    description:
      "Strategic IT consultation in Dubai for audits, architecture, cloud strategy, vendor selection, automation and scale-ready roadmaps.",
    keywords: ["IT consultation Dubai", "technology audit UAE", "fractional CTO Dubai"],
  },
  cmsDevelopment: {
    label: "CMS Development",
    path: "/services/cms-development",
    title: "CMS Development Dubai | Headless & WordPress CMS",
    description:
      "Headless CMS, WordPress and composable content platform development for Dubai, UK and global teams that need scalable publishing.",
    keywords: ["CMS development Dubai", "headless CMS UAE", "WordPress development Dubai"],
  },
  webDevelopment: {
    label: "Web Development",
    path: "/services/web-development",
    title: "Web Development Dubai | High-Performance Websites",
    description:
      "Web development in Dubai for fast business websites, ecommerce stores, WordPress builds, React apps and conversion-focused experiences.",
    keywords: ["web development Dubai", "website development UAE", "ecommerce development Dubai"],
  },
  softwareDevelopment: {
    label: "Software Development",
    path: "/services/software-development",
    title: "Software Development Dubai | SaaS, APIs & Systems",
    description:
      "Custom software development for SaaS platforms, APIs, data systems, internal tools, enterprise workflows and AI integrations.",
    keywords: ["software development Dubai", "custom software UAE", "SaaS development Dubai"],
  },
  seoGeo: {
    label: "SEO & GEO",
    path: "/services/seo-geo",
    title: "SEO & GEO Services Dubai | Google & AI Search",
    description:
      "SEO and GEO services in Dubai for technical SEO, local SEO, content, schema, AI search readiness and sustainable authority growth.",
    keywords: ["SEO services Dubai", "GEO services UAE", "AI search optimization Dubai"],
  },
  graphicDesign: {
    label: "Graphic Design",
    path: "/services/graphic-design",
    title: "Graphic Design Dubai | Logo & Brand Identity",
    description:
      "Graphic design in Dubai for logos, brand identity systems, company profiles, brochures, web visuals and premium marketing collateral.",
    keywords: ["graphic design Dubai", "logo design UAE", "brand identity Dubai"],
  },
} satisfies Record<string, PageMeta>;

export type PageKey = keyof typeof pageSeo;

export const seoRoutes = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "services", path: "/services" },
  { key: "itConsultation", path: "/services/it-consultation" },
  { key: "cmsDevelopment", path: "/services/cms-development" },
  { key: "webDevelopment", path: "/services/web-development" },
  { key: "softwareDevelopment", path: "/services/software-development" },
  { key: "seoGeo", path: "/services/seo-geo" },
  { key: "graphicDesign", path: "/services/graphic-design" },
  { key: "faqs", path: "/faqs" },
  { key: "contact", path: "/contact" },
] as const satisfies ReadonlyArray<{ key: PageKey; path: string }>;

export const pageFaqs = {
  home: [
    {
      q: "Does Webcore Solutions work with international clients?",
      a: "Yes. Webcore Solutions serves clients across Dubai, the UAE, the UK, Europe, the United States, Pakistan and remote international markets.",
    },
    {
      q: "Which digital services does Webcore Solutions provide?",
      a: "Webcore Solutions provides web development, software development, ecommerce, CMS development, SEO, GEO, branding, UI/UX, IT consultation and business automation.",
    },
    {
      q: "Can Webcore Solutions improve both Google rankings and AI search visibility?",
      a: "Yes. The team combines technical SEO, content strategy, schema, GEO and answer-engine optimization to improve visibility in traditional and AI-powered search.",
    },
  ],
  about: [
    {
      q: "Where is Webcore Solutions based?",
      a: "Webcore Solutions is headquartered in Dubai, United Arab Emirates, with client operations across the UK, Europe, the United States, Pakistan and international remote markets.",
    },
    {
      q: "What types of companies does Webcore Solutions work with?",
      a: "Webcore Solutions works with startups, SMEs and enterprise teams that need senior execution across software, web, SEO, branding and technology strategy.",
    },
  ],
  services: [
    {
      q: "What services does Webcore Solutions provide?",
      a: "Webcore Solutions provides web development, software development, ecommerce, CMS development, SEO, GEO, IT consultation, graphic design and branding.",
    },
    {
      q: "Can services be combined?",
      a: "Yes. Services can be combined for integrated solutions, such as web development with branding, or software development with SEO optimization.",
    },
  ],
  faqs: [
    {
      q: "How long does a typical Webcore Solutions project take?",
      a: "Most projects take four to twelve weeks depending on scope, with larger custom software or enterprise engagements scoped around milestones.",
    },
    {
      q: "How does Webcore Solutions price projects?",
      a: "Webcore Solutions uses fixed-scope pricing for defined projects and retainers for ongoing product, SEO, development and support work.",
    },
    {
      q: "Does Webcore Solutions provide ongoing support?",
      a: "Yes. Ongoing retainers can cover maintenance, performance work, SEO growth, feature development and post-launch improvements.",
    },
  ],
  itConsultation: [
    {
      q: "What does IT consultation include?",
      a: "IT consultation includes technology audits, architecture planning, cloud strategy, vendor selection, automation planning and implementation roadmaps.",
    },
    {
      q: "Can Webcore Solutions audit an existing technology stack?",
      a: "Yes. Webcore Solutions can review current systems, identify risk, prioritize modernization work and create a practical roadmap for scale.",
    },
  ],
  cmsDevelopment: [
    {
      q: "Does Webcore Solutions build headless CMS platforms?",
      a: "Yes. Webcore Solutions builds headless CMS, WordPress and custom content platforms with structured content, editorial workflows and scalable publishing.",
    },
    {
      q: "Can Webcore Solutions migrate content from an old CMS?",
      a: "Yes. CMS migrations can include content modeling, redirects, metadata preservation, taxonomy cleanup and editorial workflow improvements.",
    },
  ],
  webDevelopment: [
    {
      q: "What web development services does Webcore Solutions offer?",
      a: "Webcore Solutions builds business websites, ecommerce stores, React websites, WordPress sites, landing pages and conversion-focused web experiences.",
    },
    {
      q: "Are Webcore Solutions websites optimized for Core Web Vitals?",
      a: "Yes. Builds are planned around performance, responsive UX, accessibility, crawlability and Core Web Vitals from the start.",
    },
  ],
  softwareDevelopment: [
    {
      q: "What custom software can Webcore Solutions build?",
      a: "Webcore Solutions builds SaaS platforms, APIs, dashboards, data systems, internal tools, business automation and enterprise workflows.",
    },
    {
      q: "Can Webcore Solutions integrate AI into business systems?",
      a: "Yes. AI integrations can include workflow automation, data processing, internal assistants, API integrations and productivity tools.",
    },
  ],
  seoGeo: [
    {
      q: "What is GEO optimization?",
      a: "GEO, or generative engine optimization, structures content, entities, schema and answers so AI-powered search systems can understand and cite a brand more confidently.",
    },
    {
      q: "Does Webcore Solutions provide technical SEO audits?",
      a: "Yes. Technical SEO audits can cover crawlability, indexation, metadata, schema, Core Web Vitals, internal links, rendering and content gaps.",
    },
  ],
  graphicDesign: [
    {
      q: "What graphic design services does Webcore Solutions provide?",
      a: "Webcore Solutions provides logo design, brand identity, company profiles, brochures, web visuals, marketing collateral and brand systems.",
    },
    {
      q: "Can design work be paired with web development?",
      a: "Yes. Branding, UI/UX and web development can be delivered together so the visual identity and website experience feel consistent.",
    },
  ],
} satisfies Partial<Record<PageKey, FaqItem[]>>;

export function getStaticSeoHead(key: PageKey) {
  return getSeoHead(key, { faqs: (pageFaqs as Partial<Record<PageKey, FaqItem[]>>)[key] });
}

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
    // Aggregate rating drawn from verified client base
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
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
    // Sitelinks searchbox signal
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
}

function webPageSchema(page: PageMeta, key: PageKey) {
  const isServicePage = servicePageKeys.includes(key as (typeof servicePageKeys)[number]);
  const dates = pageDates[key] ?? { datePublished: "2024-01-01", dateModified: "2026-05-11" };

  return {
    "@type": page.schemaType ?? "WebPage",
    "@id": `${absoluteUrl(page.path)}#webpage`,
    url: absoluteUrl(page.path),
    name: page.title,
    description: page.description,
    datePublished: dates.datePublished,
    dateModified: dates.dateModified,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    author: { "@id": ORG_ID },
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
  const dates = pageDates[key] ?? { datePublished: "2024-01-01", dateModified: "2026-05-11" };

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
      // E-E-A-T: explicit publication & update dates
      { name: "date", content: dates.datePublished },
      { name: "last-modified", content: dates.dateModified },
      // Open Graph
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
      // article: tags signal freshness to crawlers even on non-blog pages
      { property: "article:published_time", content: dates.datePublished },
      { property: "article:modified_time", content: dates.dateModified },
      { property: "article:author", content: `${SITE_URL}/about` },
      { property: "article:publisher", content: "https://www.facebook.com/profile.php?id=61587249472207" },
      // Twitter / X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@webcoresolutions" },
      { name: "twitter:creator", content: "@webcoresolutions" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
      { name: "twitter:image:alt", content: `${SITE_NAME} digital agency services` },
      // JSON-LD
      { "script:ld+json": { "@context": "https://schema.org", "@graph": graph } },
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", hrefLang: "en", href: canonical },
      { rel: "alternate", hrefLang: "x-default", href: canonical },
    ],
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