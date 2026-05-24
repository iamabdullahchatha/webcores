export const SITE_URL = "https://www.webcoreuae.com";
export const SITE_NAME = "Webcore Solutions";
export const BRAND_NAME = "Webcore Solutions";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#local-business`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;

// Page publish / last-updated dates (ISO 8601). Update on each meaningful content change.
const pageDates: Record<string, { datePublished: string; dateModified: string }> = {
  home:                { datePublished: "2024-01-01", dateModified: "2026-05-17" },
  about:               { datePublished: "2024-01-01", dateModified: "2026-05-17" },
  services:            { datePublished: "2024-01-01", dateModified: "2026-05-17" },
  faqs:                { datePublished: "2024-06-01", dateModified: "2026-05-12" },
  contact:             { datePublished: "2024-01-01", dateModified: "2026-05-12" },
  itConsultation:      { datePublished: "2024-02-01", dateModified: "2026-05-12" },
  cmsDevelopment:      { datePublished: "2024-02-01", dateModified: "2026-05-12" },
  webDevelopment:      { datePublished: "2024-02-01", dateModified: "2026-05-12" },
  softwareDevelopment: { datePublished: "2024-02-01", dateModified: "2026-05-12" },
  seoGeo:              { datePublished: "2024-03-01", dateModified: "2026-05-12" },
  graphicDesign:       { datePublished: "2024-02-01", dateModified: "2026-05-12" },
  privacyPolicy:       { datePublished: "2024-01-01", dateModified: "2026-05-12" },
  sitemapHtml:         { datePublished: "2024-01-01", dateModified: "2026-05-17" },
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
    title: "Web, SEO & Software Agency Dubai | Webcore Solutions",
    description:
      "Full-service digital agency delivering web development, custom software, SEO and CMS across UAE, UK, Europe and Pakistan. Trusted by 450+ clients since 2012.",
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
    title: "Digital Agency Born in Dubai | About Webcore Solutions",
    description:
      "Founded in Dubai in 2012, Webcore Solutions is a 25-person agency serving clients across the UK, Europe and Pakistan. Craft, process and radical integrity.",
    keywords: [
      "about Webcore Solutions",
      "global digital agency",
      "software agency UAE",
      "digital agency Dubai history",
      "Webcore Solutions team",
    ],
    schemaType: "AboutPage",
  },
  services: {
    label: "Services",
    path: "/services",
    title: "Web, Software & SEO Services UAE | Webcore Solutions",
    description:
      "Six in-house disciplines: web development, custom software, headless CMS, SEO & GEO, graphic design and IT consultation. Delivered across the UAE and beyond.",
    keywords: ["digital services Dubai", "web development services UAE", "software services UAE"],
    schemaType: "CollectionPage",
  },
  blog: {
    label: "Blog",
    path: "/blog",
    title: "Web Development & SEO Blog | Webcore Solutions UAE",
    description:
      "Practical field notes on web development, SEO, GEO optimisation and software architecture. Written by the Webcore Solutions team for UAE, UK, Europe and Pakistan.",
    keywords: ["Webcore Solutions blog", "web development insights", "SEO articles", "GEO articles"],
  },
  faqs: {
    label: "FAQs",
    path: "/faqs",
    title: "Web & Software Agency FAQs | Webcore Solutions UAE",
    description:
      "Answers on pricing, timelines and international work at Webcore Solutions. Fixed-price projects from $500 USD. Serving clients across the UK, UAE and Pakistan.",
    keywords: ["Webcore Solutions FAQs", "digital agency questions", "software project pricing UAE"],
  },
  contact: {
    label: "Contact",
    path: "/contact",
    title: "Get in Touch | Webcore Solutions Digital Agency UAE",
    description:
      "Book a free 45-minute strategy call or send a project brief. We reply within 24 hours with a fixed quote and clear scope. Serving UAE, UK, Europe and Pakistan.",
    keywords: ["contact Webcore Solutions", "Dubai software consultation", "book web development call"],
    schemaType: "ContactPage",
  },
  itConsultation: {
    label: "IT Consultation",
    path: "/services/it-consultation",
    title: "IT Consulting & Technology Audits Dubai | Webcore Solutions",
    description:
      "Technology audits, cloud strategy, architecture reviews and scale-ready roadmaps across UAE and UK. Senior consultants only. Request a free consultation brief.",
    keywords: ["IT consultation Dubai", "technology audit UAE", "fractional CTO Dubai"],
  },
  cmsDevelopment: {
    label: "CMS Development",
    path: "/services/cms-development",
    title: "Headless CMS Development Dubai | Webcore Solutions",
    description:
      "Headless CMS and WordPress development for teams that need fast, editor-friendly publishing. Serving UAE, UK and EU clients. Request a free consultation today.",
    keywords: ["CMS development Dubai", "headless CMS UAE", "WordPress development Dubai"],
  },
  webDevelopment: {
    label: "Web Development",
    path: "/services/web-development",
    title: "Web Development Services Dubai | Webcore Solutions",
    description:
      "Business websites, ecommerce stores, React apps and WordPress builds engineered for speed and conversion. Clients in UAE, UK and Europe. Free quote available.",
    keywords: ["web development Dubai", "website development UAE", "ecommerce development Dubai"],
  },
  softwareDevelopment: {
    label: "Software Development",
    path: "/services/software-development",
    title: "Custom Software Development UAE | Webcore Solutions",
    description:
      "Custom SaaS, APIs, data systems and AI integrations built by an in-house UAE team. Serving the Gulf, UK, Europe and US with fixed-scope quotes provided.",
    keywords: ["software development Dubai", "custom software UAE", "SaaS development Dubai"],
  },
  seoGeo: {
    label: "SEO & GEO",
    path: "/services/seo-geo",
    title: "SEO & GEO Optimisation Agency Dubai | Webcore Solutions",
    description:
      "Technical SEO, local search and GEO optimisation for UAE and global businesses. AI search-ready strategies. Get a free audit from our Dubai-based in-house team.",
    keywords: ["SEO services Dubai", "GEO services UAE", "AI search optimization Dubai"],
  },
  graphicDesign: {
    label: "Graphic Design",
    path: "/services/graphic-design",
    title: "Graphic Design & Brand Identity Dubai | Webcore Solutions",
    description:
      "Logo design, brand identity, company profiles and marketing collateral for Gulf and UK businesses. In-house designers, no outsourcing. Free brief welcome.",
    keywords: ["graphic design Dubai", "logo design UAE", "brand identity Dubai"],
  },
  privacyPolicy: {
    label: "Privacy Policy",
    path: "/privacy-policy",
    title: "Privacy Policy | GDPR & UAE Law | Webcore Solutions",
    description:
      "How Webcore Solutions collects, uses and protects your data under GDPR and UAE data protection law. Effective 1 January 2024. Last updated May 2026.",
    keywords: ["Webcore Solutions privacy policy", "data protection UAE", "GDPR digital agency Dubai"],
    schemaType: "WebPage",
  },
  sitemapHtml: {
    label: "Sitemap",
    path: "/sitemap",
    title: "Webcore Solutions Site Index | Dubai Digital Agency",
    description:
      "Every page on the Webcore Solutions website in one place — services, blog, about, FAQs, contact and dedicated landing pages for Dubai and UAE digital services.",
    keywords: ["Webcore Solutions sitemap", "all pages Webcore"],
    schemaType: "WebPage",
  },
  webcoreSolutionsDubai: {
    label: "Webcore Solutions Dubai",
    path: "/webcore-solutions-dubai",
    title: "Webcore Solutions Dubai | Verified UAE Digital Agency",
    description:
      "Trade-licensed Dubai digital agency operating since 2012. Web, software, SEO and branding for UAE, UK and global clients. 450+ delivered client projects.",
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
    title: "Dubai Web Development Agency | Websites That Rank",
    description:
      "Dubai web development agency delivering fast websites, ecommerce and React builds since 2012. Fixed-scope pricing, Core Web Vitals on every release. Free quote.",
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
    title: "Dubai SEO & GEO Agency | Local Search Specialists",
    description:
      "Dubai SEO agency covering technical SEO, local search, Arabic-English content and GEO for AI search. Fixed retainers, no ranking guarantees. Free audit today.",
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
    title: "UAE Software Development Company | Custom SaaS & APIs",
    description:
      "UAE software development company building SaaS, APIs and platforms since 2012. In-house Dubai team, no offshore reselling. Request a fixed-scope quote today.",
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

export const pageMetaDescriptions = {
  home:
    "Full-service web, software, SEO, CMS and design agency for UAE brands and global teams, trusted since 2012 for measurable delivery. Request a free quote.",
  about:
    "Meet the Dubai digital team behind Webcore Solutions, built on in-house craft, trusted delivery and long-term client partnerships. Explore our work.",
  contact:
    "Share your brief with our UAE web, software and SEO team and get a clear next step, scope guidance and pricing path within 24 hours. Book a free consultation.",
  faqs:
    "Find clear answers on pricing, timelines, support, retainers and global delivery for Webcore Solutions clients across the UK. See how we can help.",
  privacyPolicy:
    "Review how Webcore Solutions protects personal data, cookies, contact forms and privacy rights for clients in Europe and beyond. Learn how we do it.",
  sitemapHtml:
    "Browse every Webcore Solutions service, blog, location and legal page in one clean site index for Pakistan and global visitors. Get in touch today.",
  services:
    "Explore web development, software, CMS, SEO, GEO, design and IT consultation services for Gulf region businesses ready to grow. Start your project today.",
  webDevelopment:
    "Build fast websites, ecommerce stores and React experiences for UAE businesses that need stronger performance, trust and leads. Request a free quote.",
  softwareDevelopment:
    "Create custom SaaS, APIs, dashboards, data tools, secure integrations and AI workflows with a Dubai-based engineering team. Book a free consultation.",
  cmsDevelopment:
    "Launch headless CMS and WordPress platforms for UK teams that need faster publishing, cleaner workflows and editor control. Start your project today.",
  itConsultation:
    "Plan audits, cloud strategy, architecture, vendor decisions, risk reviews and roadmaps with senior consultants for Europe teams. See how we can help.",
  seoGeo:
    "Improve technical SEO, local search, content visibility and AI citations for Pakistan businesses with practical GEO strategy. Get in touch today.",
  graphicDesign:
    "Shape logos, brand systems, company profiles, sales decks and marketing collateral for Gulf region brands that need trust fast. Explore our work.",
  webcoreSolutionsDubai:
    "Choose Webcore Solutions Dubai for in-house web, software, SEO and branding delivery from a licensed agency active since 2012. Request a free quote.",
  dubaiWebDevAgency:
    "Hire a Dubai web development agency building fast, scalable websites with fixed scope, clean code and Core Web Vitals focus. Book a free consultation.",
  dubaiSeoAgency:
    "Work with a Dubai SEO and GEO agency for technical audits, local search, bilingual content, reporting and AI visibility. Start your project today.",
  uaeSoftwareDevelopmentCompany:
    "Partner with a UAE software development company for SaaS, APIs, dashboards, AI workflows and serious systems for scaling teams. See how we can help.",
  blog:
    "Read practical web, SEO, AI, ecommerce and software guides from the Webcore Solutions team for UK founders and digital operators. Learn how we do it.",
} satisfies Record<PageKey, string>;

export const blogPostMetaDescriptions: Record<string, string> = {
  "how-to-build-7-figure-ecommerce-store-from-scratch":
    "Learn how to plan, brand, launch and scale a 7-figure ecommerce store for Europe markets, from niche validation to traffic and email. Explore our work.",
  "why-smart-businesses-dont-wing-their-tech-decisions":
    "See how IT consultation helps Pakistan businesses audit tools, reduce risk, choose vendors and plan smarter technology decisions. Get in touch today.",
  "how-to-protect-your-business-website-from-hackers":
    "Protect your Gulf region business website with SSL, firewalls, backups, malware scans, monitoring, passwords and safer team habits. Request a free quote.",
  "ai-agents-for-business-automate-sales-support-operations":
    "Discover how AI agents automate sales follow-ups, support, HR, lead routing and operations for UAE companies without extra hiring. Book a free consultation.",
  "bilingual-arabic-english-seo-strategy":
    "Understand bilingual Arabic-English SEO for Dubai audiences, from search intent and translation gaps to technical setup. Start your project today.",
  "headless-cms-vs-traditional-cms":
    "Compare headless CMS and traditional CMS choices for UK teams weighing speed, editing workflows, integrations and future scale. See how we can help.",
  "claude-vs-chatgpt-codex-which-ai-coding-tool-is-better":
    "Compare Claude and ChatGPT Codex for Europe developers and teams choosing AI coding support for real software projects in 2026. Learn how we do it.",
  "why-every-growing-business-needs-a-professional-website":
    "Learn why Pakistan businesses need a professional website for trust, leads, Google visibility, performance and long-term growth. Explore our work.",
  "top-ai-tools-for-business-success":
    "Explore AI tools that help Gulf region businesses improve content, design, productivity, customer support and daily operations. Get in touch today.",
  "custom-website-vs-wordpress-which-is-better":
    "Compare custom websites and WordPress for UAE businesses choosing between control, speed, security, scalability and budget. Request a free quote.",
  "generative-engine-optimization-2026":
    "Understand GEO for Dubai brands in 2026 and how AI engines choose, cite and trust business content across search experiences. Book a free consultation.",
  "headless-commerce-vs-shopify-2026":
    "Use a practical framework for UK ecommerce teams choosing between headless commerce and Shopify based on your growth stage. Start your project today.",
  "why-your-dubai-website-isnt-getting-leads":
    "Find why your Dubai website is not generating leads and what to fix across messaging, speed, SEO, trust, calls and conversion. See how we can help.",
  "how-to-make-your-website-appear-in-chatgpt-gemini-ai-search":
    "Learn how Europe businesses can appear in ChatGPT, Gemini and AI search through clearer answers, entities and trusted citations. Learn how we do it.",
  "essential-features-high-performing-business-website":
    "Review the website features Pakistan businesses need for speed, trust, mobile usability, security, analytics, forms and conversions. Explore our work.",
  "what-is-vibe-coding-complete-beginners-guide-2026":
    "Understand vibe coding, AI builders, prompt workflows and responsible delivery for Gulf region founders creating software in 2026. Get in touch today.",
  "wordpress-vs-wix-vs-shopify":
    "Compare WordPress, Wix and Shopify for UAE businesses choosing a website platform for SEO, ecommerce, design and long-term growth. Request a free quote.",
  "why-professional-graphic-design-matters-for-brand-identity":
    "See why professional graphic design helps Dubai brands build recognition, trust, consistency and stronger visual identity. Book a free consultation.",
  "how-to-download-code-from-lovable-deploy-to-vercel-or-cloudflare":
    "Learn how UK teams can export Lovable code, remove dependencies, test locally and deploy to Vercel or Cloudflare Pages. Start your project today.",
  "types-of-seo-explained-on-page-off-page-technical":
    "Understand on-page, off-page and technical SEO for Europe businesses building stronger rankings, authority, traffic and leads. See how we can help.",
};

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
      url: `${SITE_URL}/logo.png`,
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
    image: `${SITE_URL}/og-image.webp`,
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
      url: `${SITE_URL}/og-image.webp`,
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
  const metaDescription = pageMetaDescriptions[key];
  const canonical = absoluteUrl(page.path);
  const dates = pageDates[key] ?? { datePublished: "2024-01-01", dateModified: "2026-05-12" };
  const hasFaqs = !!(options.faqs?.length);

  const isHome = key === "home";
  const isAbout = key === "about";

  const graph = [
    organizationSchema(),
    websiteSchema(),
    isHome ? professionalServiceSchema() : null,
    webPageSchema(page, key, hasFaqs),
    breadcrumbSchema(page),
    serviceSchema(key),
    hasFaqs ? faqSchema(page, options.faqs!) : null,
    isAbout ? personSchema() : null,
    ...(options.extraSchemas ?? []),
  ].filter(Boolean);

  const ogImage = `${SITE_URL}/og-image.webp`;

  return {
    meta: [
      { title: page.title },
      { name: "description", content: metaDescription },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "keywords", content: page.keywords.join(", ") },
      { name: "author", content: SITE_NAME },
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
      { property: "og:locale:alternate", content: "en_PK" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: canonical },
      ...(isHome
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:secure_url", content: ogImage },
            { property: "og:image:type", content: "image/webp" },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { property: "og:image:alt", content: `${SITE_NAME} — digital agency Dubai` },
          ]
        : [
            { property: "og:image", content: ogImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { property: "og:image:alt", content: `${SITE_NAME} — digital agency Dubai` },
          ]),
      // Twitter / X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@WebcoreUAE" },
      { name: "twitter:creator", content: "@WebcoreUAE" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: ogImage },
      { name: "twitter:image:alt", content: `${SITE_NAME} — digital agency Dubai` },
      // JSON-LD
      { "script:ld+json": { "@context": "https://schema.org", "@graph": graph } },
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", hrefLang: "en-AE", href: canonical },
      { rel: "alternate", hrefLang: "en-GB", href: canonical },
      { rel: "alternate", hrefLang: "en-PK", href: canonical },
      { rel: "alternate", hrefLang: "en", href: canonical },
      { rel: "alternate", hrefLang: "x-default", href: canonical },
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
  const description = pageMetaDescriptions[key] ?? overrides?.seo_description ?? fallback.description;
  const ogTitle = overrides?.og_title || title;
  const ogDescription = overrides?.og_description || overrides?.seo_description || fallback.description;

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
