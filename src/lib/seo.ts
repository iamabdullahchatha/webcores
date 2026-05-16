export const SITE_URL = "https://www.webcoreuae.com";
export const SITE_NAME = "Webcore Solutions";
export const BRAND_NAME = "Webcore Solutions";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#local-business`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;

// Page publish / last-updated dates (ISO 8601). Update on each meaningful content change.
const pageDates: Record<string, { datePublished: string; dateModified: string }> = {
  home:                { datePublished: "2024-01-01", dateModified: "2026-05-15" },
  about:               { datePublished: "2024-01-01", dateModified: "2026-05-12" },
  services:            { datePublished: "2024-01-01", dateModified: "2026-05-12" },
  faqs:                { datePublished: "2024-06-01", dateModified: "2026-05-12" },
  contact:             { datePublished: "2024-01-01", dateModified: "2026-05-12" },
  itConsultation:      { datePublished: "2024-02-01", dateModified: "2026-05-12" },
  cmsDevelopment:      { datePublished: "2024-02-01", dateModified: "2026-05-12" },
  webDevelopment:      { datePublished: "2024-02-01", dateModified: "2026-05-12" },
  softwareDevelopment: { datePublished: "2024-02-01", dateModified: "2026-05-12" },
  seoGeo:              { datePublished: "2024-03-01", dateModified: "2026-05-12" },
  graphicDesign:       { datePublished: "2024-02-01", dateModified: "2026-05-12" },
  privacyPolicy:       { datePublished: "2024-01-01", dateModified: "2026-05-12" },
  sitemapHtml:         { datePublished: "2024-01-01", dateModified: "2026-05-12" },
  webcoreSolutionsDubai:       { datePublished: "2026-05-12", dateModified: "2026-05-12" },
  dubaiWebDevAgency:           { datePublished: "2026-05-12", dateModified: "2026-05-12" },
  dubaiSeoAgency:              { datePublished: "2026-05-12", dateModified: "2026-05-12" },
  uaeSoftwareDevelopmentCompany: { datePublished: "2026-05-12", dateModified: "2026-05-12" },
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

const orgAreaServed = ["UAE", "UK", "US", "Pakistan", "Europe"];

const orgSameAs = [
  "https://www.linkedin.com/in/webcore-solutions-939b88408",
  "https://www.facebook.com/profile.php?id=61587249472207",
  "https://wa.me/447570792516",
];

const serviceAreaServed = [
  { "@type": "City", name: "Dubai" },
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "Place", name: "Europe" },
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "Pakistan" },
];

export const pageSeo = {
  home: {
    label: "Home",
    path: "/",
    title: "Web Development & SEO Agency Dubai | Webcore Solutions",
    description:
      "Webcore Solutions is a digital studio delivering production-grade websites, custom software and brand systems for 450+ clients worldwide.",
    keywords: [
      "Webcore Solutions",
      "Dubai digital agency",
      "software development Dubai",
      "web development Dubai",
      "SEO agency UAE",
      "GEO optimization",
      "web development agency",
    ],
  },
  about: {
    label: "About",
    path: "/about",
    title: "About Webcore Solutions | Digital Agency Dubai",
    description:
      "About Webcore Solutions, a Dubai digital agency delivering software, web, SEO and design for UAE, UK, US and Pakistan clients.",
    keywords: ["about Webcore Solutions", "Dubai technology agency", "software agency UAE"],
    schemaType: "AboutPage",
  },
  services: {
    label: "Services",
    path: "/services",
    title: "Digital Services in Dubai | Web, Software, SEO, CMS",
    description:
      "Webcore Solutions digital services in Dubai: web, software, ecommerce, CMS, SEO, GEO, branding, UI/UX and IT consultation.",
    keywords: ["digital services Dubai", "web development services UAE", "software services UAE"],
    schemaType: "CollectionPage",
  },
  blog: {
    label: "Blog",
    path: "/blog",
    title: "Insights & Field Notes | Webcore Solutions",
    description:
      "Practical articles on web development, software, SEO, GEO and e-commerce from the Webcore Solutions team.",
    keywords: ["Webcore Solutions blog", "web development insights", "SEO articles", "GEO articles"],
  },
  faqs: {
    label: "FAQs",
    path: "/faqs",
    title: "FAQs | Web Development & SEO in Dubai — Webcore",
    description:
      "Webcore Solutions FAQs on services, pricing, timelines, support and technology choices for our Dubai digital agency clients.",
    keywords: ["Webcore Solutions FAQs", "digital agency questions", "software project pricing UAE"],
  },
  contact: {
    label: "Contact",
    path: "/contact",
    title: "Contact Webcore Solutions | Digital Agency Dubai",
    description:
      "Contact Webcore Solutions in Dubai for web, software, SEO, GEO, CMS, branding and IT consultation. Book a free strategy call.",
    keywords: ["contact Webcore Solutions", "Dubai software consultation", "book web development call"],
    schemaType: "ContactPage",
  },
  itConsultation: {
    label: "IT Consultation",
    path: "/services/it-consultation",
    title: "IT Consulting Services Dubai | IT Consultancy UAE",
    description:
      "Strategic IT consultation in Dubai for audits, architecture, cloud strategy, vendor selection and scale-ready roadmaps.",
    keywords: ["IT consultation Dubai", "technology audit UAE", "fractional CTO Dubai"],
  },
  cmsDevelopment: {
    label: "CMS Development",
    path: "/services/cms-development",
    title: "CMS Development Dubai | WordPress & Headless CMS",
    description:
      "Headless CMS, WordPress and composable content platform development for Dubai, UK and global teams that need scalable publishing.",
    keywords: ["CMS development Dubai", "headless CMS UAE", "WordPress development Dubai"],
  },
  webDevelopment: {
    label: "Web Development",
    path: "/services/web-development",
    title: "Web Development Company in Dubai | Webcore Solutions",
    description:
      "Web development in Dubai for fast business websites, ecommerce stores, WordPress sites, React apps and conversion-led experiences.",
    keywords: ["web development Dubai", "website development UAE", "ecommerce development Dubai"],
  },
  softwareDevelopment: {
    label: "Software Development",
    path: "/services/software-development",
    title: "Software Development Company Dubai | Custom Software UAE",
    description:
      "Custom software development for SaaS platforms, APIs, data systems, internal tools, enterprise workflows and AI integrations.",
    keywords: ["software development Dubai", "custom software UAE", "SaaS development Dubai"],
  },
  seoGeo: {
    label: "SEO & GEO",
    path: "/services/seo-geo",
    title: "SEO Agency Dubai | SEO & GEO Services in UAE",
    description:
      "SEO and GEO services in Dubai for technical SEO, local SEO, content, schema, AI search readiness and sustainable authority growth.",
    keywords: ["SEO services Dubai", "GEO services UAE", "AI search optimization Dubai"],
  },
  graphicDesign: {
    label: "Graphic Design",
    path: "/services/graphic-design",
    title: "Graphic Design & Branding Agency Dubai | Logo Design",
    description:
      "Graphic design in Dubai for logos, brand identity, company profiles, brochures, web visuals and premium marketing collateral.",
    keywords: ["graphic design Dubai", "logo design UAE", "brand identity Dubai"],
  },
  privacyPolicy: {
    label: "Privacy Policy",
    path: "/privacy-policy",
    title: "Privacy Policy | Webcore Solutions",
    description:
      "Webcore Solutions privacy policy: how we collect, use and protect your data under GDPR and UAE law. Contact us for data requests.",
    keywords: ["Webcore Solutions privacy policy", "data protection UAE", "GDPR digital agency Dubai"],
    schemaType: "WebPage",
  },
  sitemapHtml: {
    label: "Sitemap",
    path: "/sitemap",
    title: "Sitemap | Webcore Solutions — All Pages",
    description:
      "Complete sitemap of all Webcore Solutions pages — services, about, FAQs and contact for the Dubai digital agency.",
    keywords: ["Webcore Solutions sitemap", "all pages Webcore"],
    schemaType: "WebPage",
  },
  webcoreSolutionsDubai: {
    label: "Webcore Solutions Dubai",
    path: "/webcore-solutions-dubai",
    title: "Webcore Solutions Dubai | UAE Web, Software & SEO Agency",
    description:
      "Webcore Solutions Dubai: the verified UAE web, software and SEO agency operating from Dubai since 2012 with 450+ projects.",
    keywords: [
      "Webcore Solutions Dubai",
      "Webcore Solutions UAE",
      "Webcore Dubai agency",
      "Dubai digital agency Webcore",
    ],
    schemaType: "WebPage",
  },
  dubaiWebDevAgency: {
    label: "Dubai Web Development Agency",
    path: "/dubai-web-development-agency",
    title: "Dubai Web Development Agency | Webcore Solutions",
    description:
      "Dubai web development agency for fast websites, ecommerce, WordPress, React and headless builds. UAE in-house team since 2012.",
    keywords: [
      "Dubai web development agency",
      "web development agency Dubai",
      "Dubai website developers",
      "UAE web development company",
    ],
    schemaType: "WebPage",
  },
  dubaiSeoAgency: {
    label: "Dubai SEO Agency",
    path: "/dubai-seo-agency",
    title: "Dubai SEO Agency | Local & GEO Search Specialists",
    description:
      "Dubai SEO agency for technical SEO, local SEO, schema, Arabic-English content, GEO and AI search visibility. UAE since 2012.",
    keywords: [
      "Dubai SEO agency",
      "SEO agency Dubai",
      "UAE SEO services",
      "GEO agency Dubai",
    ],
    schemaType: "WebPage",
  },
  uaeSoftwareDevelopmentCompany: {
    label: "UAE Software Development Company",
    path: "/uae-software-development-company",
    title: "UAE Software Development Company | Custom SaaS, APIs, Platforms",
    description:
      "UAE software development company building custom SaaS, APIs, internal tools and enterprise platforms across Dubai and the GCC.",
    keywords: [
      "UAE software development company",
      "software development company UAE",
      "Dubai software company",
      "custom software UAE",
    ],
    schemaType: "WebPage",
  },
} satisfies Record<string, PageMeta>;

export type PageKey = keyof typeof pageSeo;

export const seoRoutes = [
  { key: "home",                path: "/" },
  { key: "about",               path: "/about" },
  { key: "services",            path: "/services" },
  { key: "itConsultation",      path: "/services/it-consultation" },
  { key: "cmsDevelopment",      path: "/services/cms-development" },
  { key: "webDevelopment",      path: "/services/web-development" },
  { key: "softwareDevelopment", path: "/services/software-development" },
  { key: "seoGeo",              path: "/services/seo-geo" },
  { key: "graphicDesign",       path: "/services/graphic-design" },
  { key: "blog",                path: "/blog" },
  { key: "faqs",                path: "/faqs" },
  { key: "contact",             path: "/contact" },
  { key: "privacyPolicy",       path: "/privacy-policy" },
  { key: "sitemapHtml",         path: "/sitemap" },
  { key: "webcoreSolutionsDubai",       path: "/webcore-solutions-dubai" },
  { key: "dubaiWebDevAgency",           path: "/dubai-web-development-agency" },
  { key: "dubaiSeoAgency",              path: "/dubai-seo-agency" },
  { key: "uaeSoftwareDevelopmentCompany", path: "/uae-software-development-company" },
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
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
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

function personSchema() {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: "Muhammad Abdullah Chattha",
    jobTitle: "CEO & Founder",
    worksFor: { "@id": ORG_ID },
    url: `${SITE_URL}/about`,
    sameAs: ["https://www.linkedin.com/in/webcore-solutions-939b88408"],
    knowsAbout: [
      "Web Development",
      "Software",
      "SEO",
      "GEO",
      "CMS",
      "Digital agency management",
    ],
  };
}

function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: ["Webcore", "Webcore UAE"],
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/assets/logo-cacVyZP_.png`,
      width: 512,
      height: 512,
    },
    description:
      "Webcore Solutions is a Dubai web development and SEO agency building production-grade websites, custom software, CMS platforms, GEO and brand systems for clients worldwide.",
    foundingDate: "2013",
    founder: {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Muhammad Abdullah Chattha",
      jobTitle: "CEO & Founder",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 25,
    },
    areaServed: orgAreaServed,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+971-50-716-9200",
        contactType: "sales",
        email: "info@webcoreuae.com",
        areaServed: ["AE", "GB", "US", "EU", "PK"],
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+447570792516",
        contactType: "customer support",
        areaServed: ["GB", "AE", "PK", "US"],
        availableLanguage: ["en"],
      },
    ],
    sameAs: orgSameAs,
    knowsAbout: [
      "Web Development",
      "Software",
      "SEO",
      "GEO",
      "CMS",
      "WordPress",
      "Next.js",
      "React",
      "Ecommerce",
      "IT Consulting",
      "Brand Design",
    ],
  };
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
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

function professionalServiceSchema() {
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": LOCAL_BUSINESS_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-image.png`,
    telephone: "+971507169200",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.2048,
      longitude: 55.2708,
    },
    areaServed: orgAreaServed,
    parentOrganization: { "@id": ORG_ID },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
}

function webPageSchema(page: PageMeta, key: PageKey, hasFaqs = false) {
  const isServicePage = servicePageKeys.includes(key as (typeof servicePageKeys)[number]);
  const dates = pageDates[key] ?? { datePublished: "2024-01-01", dateModified: "2026-05-12" };

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
    about: isServicePage ? { "@id": `${absoluteUrl(page.path)}#service` } : { "@id": ORG_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${absoluteUrl(page.path)}#breadcrumbs` },
    inLanguage: "en",
    ...(hasFaqs
      ? { speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", "h3"] } }
      : {}),
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
    areaServed: serviceAreaServed,
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
  const dates = pageDates[key] ?? { datePublished: "2024-01-01", dateModified: "2026-05-12" };
  const hasFaqs = !!(options.faqs?.length);

  const isHome = key === "home";
  const isAbout = key === "about";

  const graph = [
    isHome ? organizationSchema() : null,
    isHome ? professionalServiceSchema() : null,
    isHome ? websiteSchema() : null,
    webPageSchema(page, key, hasFaqs),
    breadcrumbSchema(page),
    serviceSchema(key),
    hasFaqs ? faqSchema(page, options.faqs!) : null,
    isAbout ? personSchema() : null,
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
      { name: "geo.position", content: "25.2048;55.2708" },
      { name: "ICBM", content: "25.2048, 55.2708" },
      { name: "rating", content: "general" },
      // E-E-A-T: explicit publication & update dates
      { name: "date", content: dates.datePublished },
      { name: "last-modified", content: dates.dateModified },
      // Open Graph
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_AE" },
      { property: "og:locale:alternate", content: "en_GB" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:secure_url", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE_NAME} — digital studio` },
      // Twitter / X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@webcoresolutions" },
      { name: "twitter:creator", content: "@webcoresolutions" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
      { name: "twitter:image:alt", content: `${SITE_NAME} — digital studio` },
      // JSON-LD
      { "script:ld+json": { "@context": "https://schema.org", "@graph": graph } },
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", hrefLang: "en-ae", href: `${SITE_URL}/` },
      { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/` },
    ],
  };
}

type SeoOverrideShape = {
  seo_title?: string | null;
  seo_description?: string | null;
  og_title?: string | null;
  og_description?: string | null;
};

function setMetaTag(name: string, content: string, prop = false) {
  const attr = prop ? "property" : "name";
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function applyPageSeo(
  key: PageKey,
  overrides: SeoOverrideShape | null | undefined,
  fallback: { title: string; description: string },
) {
  const title = overrides?.seo_title || fallback.title;
  const description = overrides?.seo_description || fallback.description;
  const ogTitle = overrides?.og_title || title;
  const ogDescription = overrides?.og_description || description;

  document.title = title;
  setMetaTag("description", description);
  setMetaTag("og:title", ogTitle, true);
  setMetaTag("og:description", ogDescription, true);
  setMetaTag("twitter:title", title);
  setMetaTag("twitter:description", description);
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
