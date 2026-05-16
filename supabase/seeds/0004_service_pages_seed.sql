-- =============================================================================
-- Webcore CMS — Phase 8 service pages seed
-- Seeds service_page_content for all 6 services from the values previously
-- hardcoded in src/routes/services.*.tsx.
--
-- Taxonomy (9 section types, sort_order 1-9 per service):
--   1 hero          2 overview       3 features
--   4 deliverables  5 tech_stack     6 process
--   7 testimonials  8 faqs           9 cta
--
-- Requires migration 0002 (adds 'overview' to the section_type CHECK).
-- Also backfills services.seo_title / seo_description-equivalent columns are
-- NOT in the services table; SEO for the dynamic route is keyed by the
-- existing static PageKey in src/lib/seo.ts (kept identical on purpose).
--
-- Safe to re-run: clears service_page_content before inserting.
-- Also upserts the 6 parent rows in public.services (FK dependency).
-- =============================================================================

TRUNCATE public.service_page_content;

-- =============================================================================
-- Parent rows: public.services  (required by FK service_page_content_service_slug_fkey)
-- =============================================================================

INSERT INTO public.services
  (slug, title, description, tag, metric, icon_name, color, href, cta_text, sort_order, is_active)
VALUES
  ('it-consultation',    'IT Consultation',    'Vendor-neutral technology strategy, architecture audits and roadmap planning.',  'Strategy',     '120+ audits',         'Lightbulb', '#6366f1', '/services/it-consultation',    'Learn more', 1, true),
  ('cms-development',    'CMS Development',    'Headless and composable CMS platforms that give editorial teams full control.',   'Content',      '10× publishing speed','Layers',    '#8b5cf6', '/services/cms-development',    'Learn more', 2, true),
  ('web-development',    'Web Development',    'Fast, conversion-optimised websites from marketing sites to e-commerce.',        'Engineering',  '98 avg. Lighthouse',  'Globe',     '#6366f1', '/services/web-development',    'Learn more', 3, true),
  ('software-development','Software Development','Custom SaaS, ERPs, internal tools and data systems built to scale.',           'Engineering',  '200+ products shipped','Database', '#06b6d4', '/services/software-development','Learn more', 4, true),
  ('seo-geo',            'SEO & GEO',          'Technical SEO, content strategy and generative engine optimisation.',            'Growth',       '3× avg. traffic',    'Search',    '#10b981', '/services/seo-geo',            'Learn more', 5, true),
  ('graphic-design',     'Graphic Design',     'Brand identity systems, editorial collateral and UI design.',                    'Design',       '300+ brands built',   'Palette',   '#ec4899', '/services/graphic-design',     'Learn more', 6, true)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- 1. IT CONSULTATION  (slug: it-consultation)
-- =============================================================================

INSERT INTO public.service_page_content
  (service_slug, section_type, heading, subheading, body, data_json, sort_order, is_visible)
VALUES
('it-consultation', 'hero',
 'Strategic clarity for modern technology.',
 'Strategic clarity for|modern technology.',
 'Webcore Solutions helps businesses in Dubai and globally make confident technology decisions — from architecture audits to vendor selection and long-term roadmap planning.',
 '{
   "badge": { "icon": "Lightbulb", "label": "IT Consultation" },
   "glow_color": "#6366f1",
   "pills": [
     { "icon": "Shield",   "label": "Vendor-neutral advice" },
     { "icon": "Award",    "label": "Senior practitioners only" },
     { "icon": "FileText", "label": "Board-ready deliverables" }
   ],
   "cta_primary":   { "text": "Book a free consultation", "href": "/contact" },
   "cta_secondary": { "text": "All services", "href": "/services" },
   "stats": [
     { "v": "120+", "l": "Audits delivered",       "icon": "Award",      "color": "#6366f1", "bg": "rgba(99,102,241,0.12)" },
     { "v": "94%",  "l": "Recommend to peers",     "icon": "TrendingUp", "color": "#10b981", "bg": "rgba(16,185,129,0.12)" },
     { "v": "2–4w", "l": "Typical audit duration", "icon": "Clock",      "color": "#f59e0b", "bg": "rgba(245,158,11,0.12)" },
     { "v": "100%", "l": "Vendor-neutral advice",  "icon": "ShieldCheck","color": "#06b6d4", "bg": "rgba(6,182,212,0.12)" }
   ]
 }'::jsonb,
 1, true),

('it-consultation', 'overview',
 'Technology decisions your board can stand behind.',
 'Strategy Overview',
 'We work alongside your leadership team to cut through complexity — turning ambiguous technology choices into clear, confident decisions backed by real-world data and senior practitioner experience.',
 '{
   "heading_accent": "board can stand behind.",
   "image": "it-1",
   "image_alt": "Strategic IT consultation session in progress",
   "glow_color": "#6366f1",
   "tint_color": "rgba(99,102,241,0.22)",
   "badge_top": { "label": "Vendor-neutral" },
   "badge_bottom": { "icon": "Lightbulb", "label": "IT Consultation", "border": "rgba(99,102,241,0.30)", "bg": "rgba(79,70,229,0.48)", "icon_color": "#a5b4fc" },
   "proof_points": [
     { "icon": "Shield",   "color": "#6366f1", "label": "100% vendor-neutral advice", "sub": "No affiliate relationships — only what''s right for your business" },
     { "icon": "FileText", "color": "#06b6d4", "label": "Board-ready deliverables",   "sub": "Executive decks, risk registers and roadmaps your leadership can act on" },
     { "icon": "Users",    "color": "#10b981", "label": "Senior practitioners only",  "sub": "You work directly with architects and CTOs — no junior handoffs" }
   ],
   "stats_row": [
     { "v": "120+", "l": "Audits completed", "color": "#6366f1" },
     { "v": "2–4w", "l": "Typical duration",  "color": "#f59e0b" },
     { "v": "100%", "l": "Vendor-neutral",    "color": "#10b981" }
   ],
   "footer_metrics": [
     { "v": "120+",    "l": "Audits delivered",          "color": "#6366f1" },
     { "v": "94%",     "l": "Client referrals",          "color": "#06b6d4" },
     { "v": "30 days", "l": "Post-engagement support",   "color": "#10b981" }
   ]
 }'::jsonb,
 2, true),

('it-consultation', 'features',
 'Every advisory capability, in one engagement.',
 'What We Do',
 'From a one-off audit to an embedded fractional CTO — we cover the full spectrum of strategic technology guidance.',
 '{
   "items": [
     { "icon": "Search",     "color": "#6366f1", "bg": "rgba(99,102,241,0.10)", "t": "Tech Stack Audits",        "d": "Deep, honest reviews of your architecture, code health, security posture, and team workflows — with a prioritised action plan, not a laundry list." },
     { "icon": "Map",        "color": "#06b6d4", "bg": "rgba(6,182,212,0.10)",  "t": "Architecture Design",      "d": "Future-proof system blueprints built around your business constraints — with clear trade-offs documented so leadership can make confident decisions." },
     { "icon": "Globe",      "color": "#10b981", "bg": "rgba(16,185,129,0.10)", "t": "Cloud Strategy",           "d": "AWS, Azure, GCP and hybrid plans tuned to your growth trajectory and cost model — no over-engineering, no vendor lock-in." },
     { "icon": "BarChart3",  "color": "#f59e0b", "bg": "rgba(245,158,11,0.10)", "t": "Vendor & Tool Selection",  "d": "Unbiased, structured evaluation of SaaS platforms, agencies and integration partners. We have no affiliate relationships — only your best interests." },
     { "icon": "Users",      "color": "#ec4899", "bg": "rgba(236,72,153,0.10)", "t": "Team Augmentation",        "d": "Embed senior engineers, architects and fractional CTOs with your team on demand — from one day a week to full-time for a sprint." },
     { "icon": "TrendingUp", "color": "#f43f5e", "bg": "rgba(244,63,94,0.10)",  "t": "Roadmap Planning",         "d": "12–24 month delivery roadmaps aligned to commercial outcomes, with effort estimates, risk flags and quarterly milestones your board can track." }
   ]
 }'::jsonb,
 3, true),

('it-consultation', 'deliverables',
 'What you walk away with.',
 'Deliverables',
 NULL,
 '{
   "glow_color": "#6366f1",
   "items": [
     "Executive briefing deck (board-ready)",
     "Technical architecture document",
     "Risk & dependency register",
     "Quarterly roadmap with cost model",
     "30 / 60 / 90 day action plan",
     "Vendor comparison matrix",
     "Post-engagement Q&A support (30 days)"
   ]
 }'::jsonb,
 4, true),

('it-consultation', 'tech_stack',
 'We speak your stack.',
 'Platforms & Tools',
 'Deep hands-on experience across all major cloud platforms and infrastructure tooling — so our advice is always grounded in real-world implementation.',
 '{
   "glow_color": "#06b6d4",
   "items": [
     { "name": "AWS",        "color": "#f59e0b" },
     { "name": "Azure",      "color": "#06b6d4" },
     { "name": "GCP",        "color": "#10b981" },
     { "name": "Kubernetes", "color": "#6366f1" },
     { "name": "Terraform",  "color": "#8b5cf6" },
     { "name": "Datadog",    "color": "#ec4899" },
     { "name": "Snowflake",  "color": "#f43f5e" }
   ],
   "callout": { "icon": "Shield", "lead": "100% vendor-neutral.", "text": "We have no affiliate relationships and no incentive to recommend any particular platform. Our only brief is what''s right for your business." }
 }'::jsonb,
 5, true),

('it-consultation', 'process',
 'From brief to roadmap — five clear steps.',
 'Our Process',
 'A structured advisory process refined across 120+ technology engagements.',
 '{
   "steps": [
     { "n": "01", "t": "Discovery",  "d": "Stakeholder interviews, goals, constraints, business context.", "icon": "Eye",    "color": "#6366f1" },
     { "n": "02", "t": "Audit",      "d": "Stack, codebase, ops, security, vendors and team structure.",   "icon": "Search", "color": "#06b6d4" },
     { "n": "03", "t": "Synthesis",  "d": "Findings consolidated into risks, gaps and quick wins.",        "icon": "Layers", "color": "#f59e0b" },
     { "n": "04", "t": "Roadmap",    "d": "Prioritised plan with effort, cost model and 30/60/90 days.",   "icon": "Map",    "color": "#10b981" },
     { "n": "05", "t": "Enablement", "d": "Workshops, documentation and ongoing advisory support.",        "icon": "Zap",    "color": "#f43f5e" }
   ]
 }'::jsonb,
 6, true),

('it-consultation', 'testimonials',
 'What our clients say.',
 'Client Stories',
 'Start your IT consultation',
 '{
   "items": [
     { "name": "Michael Torres", "role": "Head of Engineering, Avanta Systems", "quote": "The technology roadmap Webcore Solutions produced was the most actionable document we''d had in three years. It cut our infrastructure costs by 30% in the first quarter.", "photo": "/michael-torres.webp", "stars": 5, "color": "#f59e0b" },
     { "name": "Rania Aziz", "role": "COO, Meridian Group", "quote": "We were locked into a stack that couldn''t scale. Webcore''s IT audit identified exactly what to rip out and what to keep. Six months later, our systems are stable and our team moves faster.", "photo": "/rania-aziz.webp", "stars": 5, "color": "#6366f1" },
     { "name": "James Hartley", "role": "VP Technology, Apex Financial", "quote": "Webcore''s cloud migration roadmap was thorough and risk-aware. The phased approach they recommended meant we didn''t lose a single day of uptime during the transition.", "photo": "/james-hartley.webp", "stars": 5, "color": "#06b6d4" }
   ]
 }'::jsonb,
 7, true),

('it-consultation', 'faqs',
 'Common questions about IT consultation.',
 'FAQs',
 NULL,
 '{
   "items": [
     { "q": "How long does a typical engagement run?", "a": "Most tech audits take 2–4 weeks from kickoff to final report delivery. Ongoing advisory retainers typically run month-to-month with a 30-day notice period. Larger architecture or transformation projects are scoped individually during discovery." },
     { "q": "Do you offer fractional CTO services?", "a": "Yes — we embed senior technical leaders with your team on a part-time basis, typically 1–3 days per week. This works well for scaling startups that need executive-level guidance without the cost of a full-time hire." },
     { "q": "We''re not a tech company — can you still help us?", "a": "Absolutely. Some of our most impactful engagements have been with non-technical leadership teams who need a trusted advisor to translate technology decisions into business language. We specialise in bridging that gap." },
     { "q": "How is your advice different from a big consultancy?", "a": "We have no vendor relationships, no affiliate fees and no incentive to recommend anything other than the right solution for your context. You work directly with senior practitioners — not a junior team reporting to a partner you met once." },
     { "q": "What do you need from us to get started?", "a": "A 45-minute discovery call is all it takes to scope the engagement. We''ll prepare a brief questionnaire in advance so we can make the most of that time and come with an informed perspective on your situation." },
     { "q": "Do you sign NDAs?", "a": "Yes — we sign mutual NDAs before any sensitive information is shared. We take confidentiality seriously and have worked with publicly listed companies, government agencies and pre-IPO startups." }
   ]
 }'::jsonb,
 8, true),

('it-consultation', 'cta',
 'Ready to make confident technology decisions?',
 'Free strategy session',
 'Book a free 45-minute discovery call. We''ll review your current setup and map out the right path forward — no obligation, no sales pitch.',
 '{
   "badge_icon": "Lightbulb",
   "heading_break": "Ready to make confident| technology decisions?",
   "stats": [
     { "v": "120+", "l": "Audits done" },
     { "v": "2–4w", "l": "Typical timeline" },
     { "v": "100%", "l": "Vendor-neutral" }
   ],
   "cta_primary":   { "text": "Book free consultation", "href": "/contact" },
   "cta_secondary": { "text": "View all services", "href": "/services" },
   "reassurance": ["No commitment", "Free of charge"]
 }'::jsonb,
 9, true);

-- =============================================================================
-- 2. CMS DEVELOPMENT  (slug: cms-development)
-- =============================================================================

INSERT INTO public.service_page_content
  (service_slug, section_type, heading, subheading, body, data_json, sort_order, is_visible)
VALUES
('cms-development', 'hero',
 'Content platforms that empower your team.',
 'Content platforms that|empower your team.',
 'Webcore Solutions builds headless and composable CMS platforms for businesses in Dubai and beyond — giving editorial teams full content control without developer dependency.',
 '{
   "badge": { "icon": "Layers", "label": "CMS Development" },
   "glow_color": "#8b5cf6",
   "heading_accent": "empower your team.",
   "pills": [
     { "icon": "Zap",      "label": "10× publishing speed" },
     { "icon": "Globe",    "label": "Multi-site & multi-language" },
     { "icon": "FileText", "label": "Full editor training included" }
   ],
   "cta_primary":   { "text": "Start your project", "href": "/contact" },
   "cta_secondary": { "text": "All services", "href": "/services" },
   "stats": [
     { "v": "120+", "l": "CMS platforms delivered", "icon": "Award",      "color": "#8b5cf6", "bg": "rgba(139,92,246,0.12)" },
     { "v": "10×",  "l": "Publishing speed gain",   "icon": "TrendingUp", "color": "#10b981", "bg": "rgba(16,185,129,0.12)" },
     { "v": "3–6w", "l": "Typical delivery window", "icon": "Clock",      "color": "#f59e0b", "bg": "rgba(245,158,11,0.12)" },
     { "v": "100%", "l": "Editor-friendly handoffs","icon": "ShieldCheck","color": "#06b6d4", "bg": "rgba(6,182,212,0.12)" }
   ]
 }'::jsonb,
 1, true),

('cms-development', 'overview',
 'A CMS your editors will actually love using.',
 'Platform Overview',
 'Purpose-built for editorial speed — every workflow is designed around the people who use it daily. No tickets, no queues, no waiting. Your team publishes on their own terms from day one.',
 '{
   "heading_accent": "actually love",
   "image": "cms-1",
   "image_alt": "Editorial workspace — CMS platform in use",
   "glow_color": "#8b5cf6",
   "tint_color": "rgba(109,40,217,0.22)",
   "badge_top": { "label": "Production-ready" },
   "badge_bottom": { "icon": "Sparkles", "label": "Editorial Platform", "border": "rgba(139,92,246,0.30)", "bg": "rgba(109,40,217,0.48)", "icon_color": "#c4b5fd" },
   "proof_points": [
     { "icon": "Zap",      "color": "#8b5cf6", "label": "10× faster publishing",       "sub": "Editors ship content independently — zero developer dependency" },
     { "icon": "Globe",    "color": "#06b6d4", "label": "Multi-site & multi-language", "sub": "One structured source of truth for every market and locale" },
     { "icon": "RefreshCw","color": "#10b981", "label": "Zero-downtime migrations",    "sub": "From any legacy platform with full content and URL fidelity" }
   ],
   "stats_row": [
     { "v": "120+", "l": "Platforms built", "color": "#8b5cf6" },
     { "v": "3–6w", "l": "Delivery window", "color": "#f59e0b" },
     { "v": "100%", "l": "Editor adoption", "color": "#10b981" }
   ],
   "footer_metrics": [
     { "v": "10×",     "l": "Faster publishing",    "color": "#8b5cf6" },
     { "v": "120+",    "l": "Platforms delivered",  "color": "#06b6d4" },
     { "v": "30 days", "l": "Post-launch support",  "color": "#10b981" }
   ]
 }'::jsonb,
 2, true),

('cms-development', 'features',
 'Every CMS capability, under one roof.',
 'What We Build',
 'From headless architecture to editorial workflow design — we cover the entire content platform stack in-house, end to end.',
 '{
   "items": [
     { "icon": "LayoutTemplate", "color": "#8b5cf6", "bg": "rgba(139,92,246,0.10)", "t": "Headless CMS Architecture",      "d": "Decouple your content layer from your presentation layer — delivering content to any channel, device or platform without rebuilding from scratch." },
     { "icon": "Puzzle",         "color": "#06b6d4", "bg": "rgba(6,182,212,0.10)",  "t": "Composable Content Platforms",   "d": "Modular content models built around your editorial workflow — not the other way around. Stack best-of-breed tools that grow with your organisation." },
     { "icon": "Workflow",       "color": "#f59e0b", "bg": "rgba(245,158,11,0.10)", "t": "Editorial Workflow Design",      "d": "Structured publishing flows with role-based permissions, review queues and scheduled publishing — ship content fast without stepping on each other." },
     { "icon": "RefreshCw",      "color": "#10b981", "bg": "rgba(16,185,129,0.10)", "t": "Migration & Re-platforming",     "d": "Safe, zero-downtime migrations from WordPress, Drupal, Contentful and more — with full content, media and metadata fidelity." },
     { "icon": "Database",       "color": "#f43f5e", "bg": "rgba(244,63,94,0.10)",  "t": "Custom Content Modelling",       "d": "Content schemas engineered for flexibility and longevity — supporting localisation, multi-site and personalisation from day one." },
     { "icon": "Lock",           "color": "#ec4899", "bg": "rgba(236,72,153,0.10)", "t": "Governance & Permissions",       "d": "Fine-grained access control, audit logs, content locking and approval workflows — so the right people publish the right content, every time." }
   ]
 }'::jsonb,
 3, true),

('cms-development', 'deliverables',
 'What you walk away with.',
 'Deliverables',
 NULL,
 '{
   "glow_color": "#8b5cf6",
   "items": [
     "Headless CMS fully configured and production-ready",
     "Custom content models and structured schemas",
     "Role-based permissions and editorial workflows",
     "Frontend integration (Next.js, Nuxt, or your stack)",
     "API documentation and content delivery guide",
     "Editor training sessions and written user guides",
     "30-day post-launch support included"
   ]
 }'::jsonb,
 4, true),

('cms-development', 'tech_stack',
 'The right CMS for your needs.',
 'Platforms & Tools',
 'We''re platform-agnostic — we evaluate every option against your specific requirements and recommend the one that serves your editors and your architecture best.',
 '{
   "glow_color": "#06b6d4",
   "items": [
     { "name": "Sanity",      "color": "#8b5cf6" },
     { "name": "Contentful",  "color": "#06b6d4" },
     { "name": "Strapi",      "color": "#f59e0b" },
     { "name": "Payload CMS", "color": "#10b981" },
     { "name": "WordPress",   "color": "#3b82f6" },
     { "name": "Storyblok",   "color": "#ec4899" },
     { "name": "Directus",    "color": "#f43f5e" }
   ],
   "callout": { "icon": "Award", "lead": "Editor-first philosophy.", "text": "Every CMS we build is designed so non-technical editors feel confident and autonomous — no developer dependency for day-to-day publishing." }
 }'::jsonb,
 5, true),

('cms-development', 'process',
 'From brief to live platform — five clear steps.',
 'Our Process',
 'A structured CMS delivery process refined across 120+ content platform projects.',
 '{
   "steps": [
     { "n": "01", "t": "Discovery", "d": "Content audit, editorial workflow mapping and platform evaluation.", "icon": "Eye",      "color": "#8b5cf6" },
     { "n": "02", "t": "Model",     "d": "Content schema design, taxonomy planning and governance structure.", "icon": "Database", "color": "#06b6d4" },
     { "n": "03", "t": "Build",     "d": "CMS configuration, custom fields, integrations and API connections.", "icon": "Code2",    "color": "#f59e0b" },
     { "n": "04", "t": "Train",     "d": "Editor onboarding, documentation and workflow rehearsal sessions.",   "icon": "Users",    "color": "#10b981" },
     { "n": "05", "t": "Launch",    "d": "Migration, go-live support, monitoring and ongoing optimisation.",    "icon": "Zap",      "color": "#f43f5e" }
   ]
 }'::jsonb,
 6, true),

('cms-development', 'testimonials',
 'What our clients say.',
 'Client Stories',
 'Start your CMS project',
 '{
   "items": [
     { "name": "Sophie Carver", "role": "Head of Content, Resolve Media", "quote": "We moved from a rigid CMS that required a developer for every change to a headless platform built by Webcore. Our editors were fully independent within a week of training.", "photo": "/sophie-carver.webp", "stars": 5, "color": "#f59e0b" },
     { "name": "Omar Al Nasser", "role": "Digital Director, Kestrel Retail", "quote": "The composable content platform Webcore Solutions built handles our 10,000-SKU catalogue without breaking a sweat. Publishing time went from 2 hours to 15 minutes.", "photo": "/omar-al-nasser.webp", "stars": 5, "color": "#8b5cf6" },
     { "name": "Emma Clarke", "role": "Marketing Manager, Horizon Group", "quote": "We needed a WordPress build that non-technical editors could actually use. Webcore designed the editorial workflow from scratch and it''s genuinely a pleasure to work in.", "photo": "/emma-clarke.webp", "stars": 5, "color": "#06b6d4" }
   ]
 }'::jsonb,
 7, true),

('cms-development', 'faqs',
 'Common questions about CMS development.',
 'FAQs',
 NULL,
 '{
   "items": [
     { "q": "Which CMS platform is right for my project?", "a": "It depends on your editorial team size, content complexity, tech stack and budget. We evaluate Sanity, Contentful, Strapi, Payload and others against your specific requirements — and always recommend the platform that serves your editors best, not the one that''s easiest for us to build on." },
     { "q": "What is a headless CMS and do I need one?", "a": "A headless CMS separates content management from content delivery — your editors work in a familiar interface while your developers consume content via API, delivering it to any channel (web, app, kiosk, voice). If you publish to more than one channel or need frontend flexibility, headless is almost always the right choice." },
     { "q": "Can you migrate our existing content from WordPress or Drupal?", "a": "Yes — we handle migrations from any platform. We export, transform and import your content, media and metadata with zero data loss and maintain your URL structure throughout so you don''t lose any SEO equity in the process." },
     { "q": "Will our editors need technical skills to use the new CMS?", "a": "No. A well-built CMS should be invisible — editors focus on content, not configuration. We design intuitive interfaces, sensible field labels and contextual help text so non-technical teams feel confident from day one. We also provide training sessions and written guides." },
     { "q": "How do you handle multi-language and multi-site setups?", "a": "We design content models with localisation and multi-site in mind from the start — using locale fields, content variants and shared asset libraries so your team manages global content from a single source of truth without duplicating structures." },
     { "q": "Do you provide ongoing CMS support after launch?", "a": "Yes. We offer monthly retainers covering CMS updates, new content model extensions, editor support and performance monitoring. Many clients keep us on as their embedded CMS team as their content needs evolve." }
   ]
 }'::jsonb,
 8, true),

('cms-development', 'cta',
 'Ready to give your team full editorial control?',
 'Free platform consultation',
 'Book a free 45-minute discovery call. We''ll review your content needs and recommend the right CMS architecture — no obligation.',
 '{
   "badge_icon": "Layers",
   "heading_break": "Ready to give your team| full editorial control?",
   "stats": [
     { "v": "120+", "l": "Platforms shipped" },
     { "v": "10×",  "l": "Publishing speed" },
     { "v": "3–6w", "l": "Delivery window" }
   ],
   "cta_primary":   { "text": "Start your project", "href": "/contact" },
   "cta_secondary": { "text": "View all services", "href": "/services" },
   "reassurance": ["No commitment", "Free of charge"]
 }'::jsonb,
 9, true);

-- =============================================================================
-- 3. WEB DEVELOPMENT  (slug: web-development)
-- =============================================================================

INSERT INTO public.service_page_content
  (service_slug, section_type, heading, subheading, body, data_json, sort_order, is_visible)
VALUES
('web-development', 'hero',
 'Websites that convert and scale.',
 'Websites that|convert and scale.',
 'Webcore Solutions designs and builds websites for businesses in Dubai and internationally — from marketing sites to high-traffic e-commerce, engineered for performance, SEO and long-term growth.',
 '{
   "badge": { "icon": "Globe", "label": "Web Development" },
   "glow_color": "#6366f1",
   "heading_accent": "convert and scale.",
   "pills": [
     { "icon": "Gauge",             "label": "98 avg. Lighthouse score" },
     { "icon": "MonitorSmartphone", "label": "Mobile-first always" },
     { "icon": "FileText",          "label": "Figma design system included" }
   ],
   "cta_primary":   { "text": "Start your project", "href": "/contact" },
   "cta_secondary": { "text": "All services", "href": "/services" },
   "stats": [
     { "v": "180+", "l": "Sites shipped",          "icon": "Globe",      "color": "#6366f1", "bg": "rgba(99,102,241,0.12)" },
     { "v": "98",   "l": "Avg. Lighthouse score",  "icon": "Gauge",      "color": "#10b981", "bg": "rgba(16,185,129,0.12)" },
     { "v": "4–8w", "l": "Typical build duration", "icon": "Clock",      "color": "#f59e0b", "bg": "rgba(245,158,11,0.12)" },
     { "v": "100%", "l": "Mobile-first delivery",  "icon": "ShieldCheck","color": "#06b6d4", "bg": "rgba(6,182,212,0.12)" }
   ]
 }'::jsonb,
 1, true),

('web-development', 'overview',
 'Built for performance, designed to convert.',
 'Our Craft',
 'Every site we ship is engineered from the ground up — custom design systems, clean componentised code and a relentless focus on Core Web Vitals so your visitors stay and your rankings climb.',
 '{
   "heading_accent": "designed to convert.",
   "image": "web-1",
   "image_alt": "Web development in progress — clean code and responsive design",
   "glow_color": "#6366f1",
   "tint_color": "rgba(99,102,241,0.22)",
   "badge_top": { "label": "Mobile-first" },
   "badge_bottom": { "icon": "Globe", "label": "Web Development", "border": "rgba(99,102,241,0.30)", "bg": "rgba(79,70,229,0.48)", "icon_color": "#a5b4fc" },
   "proof_points": [
     { "icon": "Gauge",             "color": "#6366f1", "label": "98 avg. Lighthouse score",     "sub": "Performance is a first-class requirement on every build, not a last-minute pass" },
     { "icon": "MonitorSmartphone", "color": "#06b6d4", "label": "Mobile-first by default",      "sub": "Designed and tested on real devices — not browser emulators" },
     { "icon": "FileText",          "color": "#10b981", "label": "Figma design system included", "sub": "Full token library, component docs and brand guide handed to your team" }
   ],
   "stats_row": [
     { "v": "180+", "l": "Sites shipped",         "color": "#6366f1" },
     { "v": "4–8w", "l": "Typical build",         "color": "#f59e0b" },
     { "v": "100%", "l": "Mobile-first delivery", "color": "#10b981" }
   ],
   "footer_metrics": [
     { "v": "180+",    "l": "Sites shipped",       "color": "#6366f1" },
     { "v": "98",      "l": "Avg. Lighthouse",     "color": "#06b6d4" },
     { "v": "30 days", "l": "Post-launch support", "color": "#10b981" }
   ]
 }'::jsonb,
 2, true),

('web-development', 'features',
 'Every web capability, under one roof.',
 'What We Build',
 'From a simple marketing site to a fully custom e-commerce platform — we cover the entire web development stack in-house, end to end.',
 '{
   "items": [
     { "icon": "MonitorSmartphone", "color": "#6366f1", "bg": "rgba(99,102,241,0.10)", "t": "Business Websites",                 "d": "Fast, responsive, SEO-ready marketing sites engineered to rank, load instantly and convert visitors into customers — built on a solid technical foundation from day one." },
     { "icon": "ShoppingCart",      "color": "#06b6d4", "bg": "rgba(6,182,212,0.10)",  "t": "E-commerce & WooCommerce",          "d": "Conversion-tuned storefronts with optimised checkout flows, product discovery and performance at any scale — from boutique shops to high-volume catalogues." },
     { "icon": "Palette",           "color": "#f59e0b", "bg": "rgba(245,158,11,0.10)", "t": "Custom Website Design",             "d": "Bespoke design systems rooted in your brand identity — not templates. Every component is crafted in Figma and refined until it feels unmistakably yours." },
     { "icon": "Code2",             "color": "#10b981", "bg": "rgba(16,185,129,0.10)", "t": "WordPress Development",              "d": "Custom themes, bespoke plugins, Gutenberg blocks and complex third-party integrations — every WordPress build is headless-ready and editor-friendly." },
     { "icon": "Gauge",             "color": "#ec4899", "bg": "rgba(236,72,153,0.10)", "t": "Performance & Core Web Vitals",     "d": "Sub-second loads, perfect Lighthouse scores and optimised CWV — because speed is a conversion strategy, not a technical afterthought." },
     { "icon": "Shield",            "color": "#f43f5e", "bg": "rgba(244,63,94,0.10)",  "t": "Accessibility (WCAG 2.2)",          "d": "Inclusive, keyboard-navigable, screen-reader tested experiences that meet WCAG 2.2 AA — expanding your audience and reducing legal exposure." }
   ]
 }'::jsonb,
 3, true),

('web-development', 'deliverables',
 'What you walk away with.',
 'Deliverables',
 NULL,
 '{
   "glow_color": "#6366f1",
   "items": [
     "Design system in Figma (tokens, components, docs)",
     "Production-ready, version-controlled codebase",
     "CMS setup with editor training session",
     "SEO baseline — sitemap, schema, meta layer",
     "Analytics & tag manager configuration",
     "Performance audit report (Lighthouse / CWV)",
     "30-day post-launch support included"
   ]
 }'::jsonb,
 4, true),

('web-development', 'tech_stack',
 'We speak your stack.',
 'Tech Stack',
 'Deep hands-on experience across all major cloud platforms and infrastructure tooling — so our advice is always grounded in real-world implementation.',
 '{
   "glow_color": "#06b6d4",
   "items": [
     { "name": "Next.js",     "color": "#6366f1" },
     { "name": "React",       "color": "#06b6d4" },
     { "name": "TypeScript",  "color": "#3b82f6" },
     { "name": "Tailwind",    "color": "#06b6d4" },
     { "name": "WordPress",   "color": "#10b981" },
     { "name": "WooCommerce", "color": "#8b5cf6" },
     { "name": "Shopify",     "color": "#f59e0b" }
   ],
   "callout": { "icon": "Shield", "lead": "Performance-first builds.", "text": "Every site is engineered around Core Web Vitals, accessibility and SEO from day one — speed is a conversion strategy, not an afterthought." }
 }'::jsonb,
 5, true),

('web-development', 'process',
 'From brief to launch — five clear steps.',
 'Our Process',
 'A structured web delivery process refined across 180+ website projects.',
 '{
   "steps": [
     { "n": "01", "t": "Discovery", "d": "Goals, audience, competitor audit and content inventory.", "icon": "Eye",     "color": "#6366f1" },
     { "n": "02", "t": "Design",    "d": "Wireframes, design system and high-fidelity Figma mockups.", "icon": "Palette", "color": "#f59e0b" },
     { "n": "03", "t": "Build",     "d": "Componentised frontend, CMS integration, API connections.",  "icon": "Code2",   "color": "#06b6d4" },
     { "n": "04", "t": "QA",        "d": "Performance, accessibility, cross-browser and device testing.", "icon": "Gauge",  "color": "#10b981" },
     { "n": "05", "t": "Launch",    "d": "Deploy, monitor, iterate — ongoing support available.",      "icon": "Zap",     "color": "#f43f5e" }
   ]
 }'::jsonb,
 6, true),

('web-development', 'testimonials',
 'What our clients say.',
 'Client Stories',
 'Start your web project',
 '{
   "items": [
     { "name": "Ahmed Khalil", "role": "Founder, Dunescape", "quote": "Our new site loads in under a second and our conversion rate jumped 40% in the first month. The team''s attention to detail — from animations to accessibility — is genuinely elite.", "photo": "/ahmed-khalil.webp", "stars": 5, "color": "#6366f1" },
     { "name": "Sarah Lin", "role": "CTO, NorthPeak", "quote": "We moved from a sluggish WordPress theme to a custom Next.js build. The difference is night and day — both for our users and for our developers maintaining it.", "photo": "/sarah-lin.webp", "stars": 5, "color": "#06b6d4" },
     { "name": "Connor James", "role": "Managing Director", "quote": "The Figma design system they built has transformed how fast we can iterate. We launch new landing pages in hours, not weeks — and they look consistent every time.", "photo": "/connor-james.webp", "stars": 5, "color": "#10b981" }
   ]
 }'::jsonb,
 7, true),

('web-development', 'faqs',
 'Common questions about web development.',
 'FAQs',
 NULL,
 '{
   "items": [
     { "q": "Do you handle hosting and deployment?", "a": "Yes — we manage deployment and hosting on Vercel, Cloudflare Pages, AWS or your existing infrastructure. We configure CI/CD pipelines, custom domains, SSL and CDN so you have nothing to worry about on launch day." },
     { "q": "Can you maintain the site after launch?", "a": "Absolutely. Monthly retainers cover ongoing updates, security patches, content changes and growth experiments like A/B testing and CRO. Many clients keep us on indefinitely as their embedded web team." },
     { "q": "We already have a site — can you improve it rather than rebuild?", "a": "Yes, and often that''s the right call. We''ll audit your existing site, identify the highest-impact improvements and scope a targeted optimisation engagement. A full rebuild is only recommended when the architecture genuinely can''t support your goals." },
     { "q": "How do you approach mobile and responsive design?", "a": "Every project is designed and built mobile-first. We test across real devices — not just browser emulators — and optimise for touch interactions, viewport sizing and mobile Core Web Vitals separately from desktop." },
     { "q": "Do you build on page builders like Elementor or Divi?", "a": "We don''t use drag-and-drop page builders for production builds — they introduce performance and maintenance overhead that compounds over time. We build custom Gutenberg blocks or headless frontends that give you full editorial control without the bloat." },
     { "q": "What''s included in the Figma design system?", "a": "Design tokens (colours, typography, spacing), a full component library documented with usage notes, responsive layouts for every key page and a brand style guide. We also run a handoff session so your team can use and extend the system independently." }
   ]
 }'::jsonb,
 8, true),

('web-development', 'cta',
 'Ready to build a website that actually performs?',
 'Free scoping call',
 'Book a free 45-minute scoping call. We''ll review your goals, current setup and give you a clear picture of what''s possible — no obligation.',
 '{
   "badge_icon": "Globe",
   "heading_break": "Ready to build a website| that actually performs?",
   "stats": [
     { "v": "180+", "l": "Sites shipped" },
     { "v": "98",   "l": "Avg. Lighthouse" },
     { "v": "100%", "l": "Mobile-first" }
   ],
   "cta_primary":   { "text": "Start your project", "href": "/contact" },
   "cta_secondary": { "text": "View all services", "href": "/services" },
   "reassurance": ["No commitment", "Free of charge"]
 }'::jsonb,
 9, true);

-- =============================================================================
-- 4. SOFTWARE DEVELOPMENT  (slug: software-development)
-- =============================================================================

INSERT INTO public.service_page_content
  (service_slug, section_type, heading, subheading, body, data_json, sort_order, is_visible)
VALUES
('software-development', 'hero',
 'Custom software, engineered to scale.',
 'Custom software,|engineered to scale.',
 'Webcore Solutions builds custom software for businesses in Dubai and internationally — SaaS platforms, ERPs, internal tools and data systems built with the rigour your business deserves.',
 '{
   "badge": { "icon": "Database", "label": "Software Development" },
   "glow_color": "#06b6d4",
   "heading_accent": "engineered to scale.",
   "pills": [
     { "icon": "Lock",      "label": "Full IP ownership" },
     { "icon": "Shield",    "label": "Production-grade from day 1" },
     { "icon": "GitBranch", "label": "CI/CD included" }
   ],
   "cta_primary":   { "text": "Book a free consultation", "href": "/contact" },
   "cta_secondary": { "text": "All services", "href": "/services" },
   "stats": [
     { "v": "200+", "l": "Products shipped",      "icon": "Award",      "color": "#6366f1", "bg": "rgba(99,102,241,0.12)" },
     { "v": "99%",  "l": "On-time delivery rate", "icon": "TrendingUp", "color": "#10b981", "bg": "rgba(16,185,129,0.12)" },
     { "v": "4–8w", "l": "MVP to production",     "icon": "Clock",      "color": "#f59e0b", "bg": "rgba(245,158,11,0.12)" },
     { "v": "100%", "l": "IP owned by you",       "icon": "ShieldCheck","color": "#06b6d4", "bg": "rgba(6,182,212,0.12)" }
   ]
 }'::jsonb,
 1, true),

('software-development', 'overview',
 'Production-grade code, built to last.',
 'Our Engineering',
 'Every system we ship is architected for the long term — clean separation of concerns, comprehensive test coverage and CI/CD pipelines that let your team move fast without breaking things.',
 '{
   "heading_accent": "built to last.",
   "image": "software-1",
   "image_alt": "Software engineering team building a production-grade system",
   "glow_color": "#06b6d4",
   "tint_color": "rgba(6,182,212,0.20)",
   "badge_top": { "label": "Production-grade" },
   "badge_bottom": { "icon": "Database", "label": "Software Development", "border": "rgba(6,182,212,0.30)", "bg": "rgba(6,100,180,0.48)", "icon_color": "#67e8f9" },
   "proof_points": [
     { "icon": "Lock",      "color": "#6366f1", "label": "100% IP ownership on delivery",   "sub": "Every file, schema and line of code belongs to you outright — no licensing fees or lock-in" },
     { "icon": "Shield",    "color": "#06b6d4", "label": "Production-grade from day one",    "sub": "Tests, CI/CD, observability and security baked in — not bolted on before launch" },
     { "icon": "GitBranch", "color": "#10b981", "label": "Sprint-based, transparent delivery","sub": "Fortnightly demos, clear milestones and a change process that keeps scope under control" }
   ],
   "stats_row": [
     { "v": "200+", "l": "Products shipped",  "color": "#6366f1" },
     { "v": "4–8w", "l": "MVP to production", "color": "#f59e0b" },
     { "v": "99%",  "l": "On-time delivery",  "color": "#10b981" }
   ],
   "footer_metrics": [
     { "v": "200+",    "l": "Products shipped",    "color": "#6366f1" },
     { "v": "99%",     "l": "On-time delivery",    "color": "#06b6d4" },
     { "v": "30 days", "l": "Post-launch support", "color": "#10b981" }
   ]
 }'::jsonb,
 2, true),

('software-development', 'features',
 'Every software capability, under one roof.',
 'What We Build',
 'From SaaS platforms to AI integrations — we cover the entire custom software stack in-house, end to end.',
 '{
   "items": [
     { "icon": "Globe",       "color": "#6366f1", "bg": "rgba(99,102,241,0.10)", "t": "SaaS Platforms",  "d": "Multi-tenant architectures with billing, role-based access control and full observability — built to scale from launch to enterprise without rewriting the core." },
     { "icon": "BarChart3",   "color": "#06b6d4", "bg": "rgba(6,182,212,0.10)",  "t": "Internal Tools",  "d": "Operational dashboards, admin panels and workflow automation that replace brittle spreadsheets — and actually get used by the teams they''re built for." },
     { "icon": "Layers",      "color": "#10b981", "bg": "rgba(16,185,129,0.10)", "t": "Data Management", "d": "ETL pipelines, data warehouses, governance frameworks and BI tooling — transforming raw data into decisions that compound over time." },
     { "icon": "Code2",       "color": "#f59e0b", "bg": "rgba(245,158,11,0.10)", "t": "API Development", "d": "REST and GraphQL APIs documented to OpenAPI standards — versioned, typed and built for reliability at the integration layer your partners depend on." },
     { "icon": "Smartphone",  "color": "#ec4899", "bg": "rgba(236,72,153,0.10)", "t": "Mobile Apps",     "d": "Cross-platform experiences with React Native for speed, or native Swift and Kotlin where performance demands it — without compromise at either end." },
     { "icon": "BrainCircuit","color": "#f43f5e", "bg": "rgba(244,63,94,0.10)",  "t": "AI Integration",  "d": "LLM-powered features, RAG pipelines and intelligent automations embedded directly into your product — grounded, reliable and built for production." }
   ]
 }'::jsonb,
 3, true),

('software-development', 'deliverables',
 'What you walk away with.',
 'Deliverables',
 NULL,
 '{
   "glow_color": "#6366f1",
   "items": [
     "Product specification & technical requirements",
     "System architecture diagrams",
     "Production codebase with CI/CD pipeline",
     "Test coverage & QA reports",
     "Deployment runbook & ops documentation",
     "30-day post-launch support window",
     "Full IP transfer & source code handoff"
   ]
 }'::jsonb,
 4, true),

('software-development', 'tech_stack',
 'We speak your stack.',
 'Platforms & Tools',
 'Deep hands-on experience across modern backend, data and AI tooling — so our solutions are always grounded in real-world implementation.',
 '{
   "glow_color": "#06b6d4",
   "items": [
     { "name": "TypeScript", "color": "#6366f1" },
     { "name": "Node.js",    "color": "#10b981" },
     { "name": "Python",     "color": "#f59e0b" },
     { "name": "PostgreSQL", "color": "#06b6d4" },
     { "name": "Redis",      "color": "#f43f5e" },
     { "name": "Kubernetes", "color": "#8b5cf6" },
     { "name": "OpenAI",     "color": "#ec4899" },
     { "name": "tRPC",       "color": "#f59e0b" }
   ],
   "callout": { "icon": "Lock", "lead": "You own everything.", "text": "Full intellectual property transfer on delivery — every line of code, every schema and every asset belongs to you outright, with no licensing fees or lock-in." }
 }'::jsonb,
 5, true),

('software-development', 'process',
 'From brief to ship — five clear steps.',
 'Our Process',
 'A structured software delivery process refined across 200+ product builds.',
 '{
   "steps": [
     { "n": "01", "t": "Discovery", "d": "Requirements, success metrics and technical constraints.", "icon": "Eye",    "color": "#6366f1" },
     { "n": "02", "t": "Architect", "d": "System design, data models and infrastructure blueprint.", "icon": "Server", "color": "#06b6d4" },
     { "n": "03", "t": "Build",     "d": "Sprint-based delivery with fortnightly live demos.",       "icon": "Code2",  "color": "#f59e0b" },
     { "n": "04", "t": "Test",      "d": "Unit, integration, load and security testing.",            "icon": "Shield", "color": "#10b981" },
     { "n": "05", "t": "Ship",      "d": "Deploy, monitor, iterate — and own what you''ve built.",   "icon": "Zap",    "color": "#f43f5e" }
   ]
 }'::jsonb,
 6, true),

('software-development', 'testimonials',
 'What our clients say.',
 'Client Stories',
 'Start your software project',
 '{
   "items": [
     { "name": "Liam Chen", "role": "CTO, Pillar SaaS", "quote": "Webcore Solutions took a complex data architecture and built a system that''s handled 10× the load we originally projected. The codebase is clean and our engineers love maintaining it.", "photo": "/liam-chen.webp", "stars": 5, "color": "#6366f1" },
     { "name": "Nadia Petrov", "role": "Founder, Fieldwork Tools", "quote": "From discovery to our first paying users was fourteen weeks. The team understood what a B2B SaaS needs at early stage — fast iteration, clean APIs, a solid auth layer.", "photo": "/nadia-petrov.webp", "stars": 5, "color": "#06b6d4" },
     { "name": "Andrew Walsh", "role": "Head of Product, CoreBridge", "quote": "We had a legacy internal tool that cost our ops team hours every day. Webcore rebuilt it in eight weeks. The time savings paid for the engagement within the first month.", "photo": "/andrew-walsh.webp", "stars": 5, "color": "#10b981" }
   ]
 }'::jsonb,
 7, true),

('software-development', 'faqs',
 'Common questions about software development.',
 'FAQs',
 NULL,
 '{
   "items": [
     { "q": "Do you sign NDAs before discussing our project?", "a": "Always — we sign a mutual NDA before any sensitive technical details are shared. We''ve worked with pre-IPO startups, listed companies and government agencies. Confidentiality is treated as a baseline, not a negotiation." },
     { "q": "Who owns the source code?", "a": "You do. Full intellectual property transfer is included on final delivery. Every line of code, every design asset, every database schema belongs to you outright — no licensing restrictions, no ongoing fees." },
     { "q": "How do you handle changes to scope mid-project?", "a": "We use a lightweight change request process. Minor scope adjustments are absorbed into the sprint; material changes are scoped, estimated and approved before work begins. You always know what something will cost before we build it." },
     { "q": "What does the typical engagement timeline look like?", "a": "Most MVPs take 4–8 weeks from kickoff to production deployment. Larger platforms with complex integrations typically run 12–20 weeks. We scope each project precisely during discovery so you have a reliable timeline before committing." },
     { "q": "Do you offer ongoing support and maintenance after launch?", "a": "Yes — we offer retainer-based maintenance packages covering bug fixes, dependency updates, security patches and performance monitoring. We can also embed engineers with your team long-term as the product scales." },
     { "q": "Can you work alongside our existing in-house team?", "a": "Absolutely. Many of our engagements are collaborative — we integrate into your Slack, your Git workflow and your sprint ceremonies. We''re equally comfortable leading a build or augmenting a team that already has strong engineers." }
   ]
 }'::jsonb,
 8, true),

('software-development', 'cta',
 'Ready to build software that scales with you?',
 'Free technical consultation',
 'Book a free 45-minute discovery call. We''ll review your requirements and map out the right architecture — no obligation.',
 '{
   "badge_icon": "Database",
   "heading_break": "Ready to build software| that scales with you?",
   "stats": [
     { "v": "200+", "l": "Products shipped" },
     { "v": "99%",  "l": "On-time delivery" },
     { "v": "100%", "l": "IP owned by you" }
   ],
   "cta_primary":   { "text": "Book free consultation", "href": "/contact" },
   "cta_secondary": { "text": "View all services", "href": "/services" },
   "reassurance": ["No commitment", "Free of charge"]
 }'::jsonb,
 9, true);

-- =============================================================================
-- 5. SEO & GEO  (slug: seo-geo)
-- =============================================================================

INSERT INTO public.service_page_content
  (service_slug, section_type, heading, subheading, body, data_json, sort_order, is_visible)
VALUES
('seo-geo', 'hero',
 'Visibility that compounds over time.',
 'Visibility that|compounds over time.',
 'Webcore Solutions''s SEO and GEO services help Dubai businesses and international brands rank higher and get cited by AI tools — through technical SEO, content strategy and authority-building.',
 '{
   "badge": { "icon": "Search", "label": "SEO & GEO" },
   "glow_color": "#10b981",
   "heading_accent": "compounds over time.",
   "pills": [
     { "icon": "Shield",     "label": "White-hat methodology" },
     { "icon": "Clock",      "label": "First wins in 60 days" },
     { "icon": "TrendingUp", "label": "Avg. 3× traffic increase" }
   ],
   "cta_primary":   { "text": "Book a free consultation", "href": "/contact" },
   "cta_secondary": { "text": "All services", "href": "/services" },
   "stats": [
     { "v": "200+", "l": "Sites ranked on page one", "icon": "Award",      "color": "#10b981", "bg": "rgba(16,185,129,0.12)" },
     { "v": "3×",   "l": "Avg. traffic increase",    "icon": "TrendingUp", "color": "#06b6d4", "bg": "rgba(6,182,212,0.12)" },
     { "v": "60d",  "l": "First wins delivered",     "icon": "Clock",      "color": "#f59e0b", "bg": "rgba(245,158,11,0.12)" },
     { "v": "100%", "l": "White-hat methodology only","icon": "ShieldCheck","color": "#8b5cf6", "bg": "rgba(139,92,246,0.12)" }
   ]
 }'::jsonb,
 1, true),

('seo-geo', 'overview',
 'Organic growth that compounds for years.',
 'Our Approach',
 'Every engagement starts with a rigorous audit and ends with a strategy built on data — not guesswork. We combine technical precision, content authority and generative engine optimization to drive rankings that hold and traffic that converts.',
 '{
   "heading_accent": "compounds for years.",
   "image": "seo-1",
   "image_alt": "SEO and GEO strategy in action — organic search growth",
   "glow_color": "#10b981",
   "tint_color": "rgba(16,185,129,0.20)",
   "badge_top": { "label": "White-hat only" },
   "badge_bottom": { "icon": "Search", "label": "SEO & GEO", "border": "rgba(16,185,129,0.30)", "bg": "rgba(5,90,60,0.48)", "icon_color": "#6ee7b7" },
   "proof_points": [
     { "icon": "Shield",     "color": "#10b981", "label": "100% white-hat methodology",          "sub": "No shortcuts, no risk — only sustainable techniques that compound in value and never put your domain at risk" },
     { "icon": "TrendingUp", "color": "#06b6d4", "label": "Average 3× organic traffic increase", "sub": "Consistent results across 200+ sites — from local businesses to enterprise SaaS platforms" },
     { "icon": "Clock",      "color": "#f59e0b", "label": "First wins delivered within 60 days", "sub": "Quick technical and on-page wins in the first sprint so you see momentum before the long-term gains kick in" }
   ],
   "stats_row": [
     { "v": "200+", "l": "Sites ranked",      "color": "#10b981" },
     { "v": "3×",   "l": "Traffic increase",  "color": "#06b6d4" },
     { "v": "60d",  "l": "First wins",        "color": "#f59e0b" }
   ],
   "footer_metrics": [
     { "v": "200+", "l": "Sites ranked",     "color": "#10b981" },
     { "v": "3×",   "l": "Avg. traffic lift","color": "#06b6d4" },
     { "v": "60d",  "l": "First wins",       "color": "#f59e0b" }
   ]
 }'::jsonb,
 2, true),

('seo-geo', 'features',
 'Every search capability, under one roof.',
 'What We Do',
 'From technical SEO to generative engine optimization — we cover the entire organic search stack in-house, end to end.',
 '{
   "items": [
     { "icon": "Settings",  "color": "#10b981", "bg": "rgba(16,185,129,0.10)", "t": "Technical SEO",                "d": "Core Web Vitals, crawlability, schema markup, site architecture and indexation — a bulletproof technical foundation that search engines reward." },
     { "icon": "Target",    "color": "#06b6d4", "bg": "rgba(6,182,212,0.10)",  "t": "Keyword & Content Strategy",   "d": "Search intent mapping, topic cluster architecture and editorial calendars — built to capture demand at every stage of the buyer journey." },
     { "icon": "MapPin",    "color": "#f59e0b", "bg": "rgba(245,158,11,0.10)", "t": "GEO & AI Search",              "d": "Generative engine optimization, answer-ready content, entity signals and AI-search structure for brands that need to be understood and cited." },
     { "icon": "Link2",     "color": "#8b5cf6", "bg": "rgba(139,92,246,0.10)", "t": "Authority & Link Building",    "d": "White-hat digital PR and outreach that earns high-authority backlinks — sustainably increasing your domain''s trust and topical authority." },
     { "icon": "FileText",  "color": "#f43f5e", "bg": "rgba(244,63,94,0.10)",  "t": "Content Optimisation",         "d": "On-page tuning of existing content to recover rankings, strengthen relevance signals and improve click-through rates from the SERPs." },
     { "icon": "BarChart2", "color": "#ec4899", "bg": "rgba(236,72,153,0.10)", "t": "Reporting & Analytics",        "d": "Transparent monthly dashboards connecting organic traffic, keyword movements and leads to real revenue — so you always know your ROI." }
   ]
 }'::jsonb,
 3, true),

('seo-geo', 'deliverables',
 'What you walk away with.',
 'Deliverables',
 NULL,
 '{
   "glow_color": "#10b981",
   "items": [
     "Full SEO audit with prioritised action plan",
     "Keyword & topic strategy document",
     "Technical fixes & schema implementation",
     "Monthly content briefs & editorial calendar",
     "Authority link-building campaigns",
     "Live GA4 & Search Console dashboard",
     "Monthly performance report with commentary"
   ]
 }'::jsonb,
 4, true),

('seo-geo', 'tech_stack',
 'The tools behind the results.',
 'Tools & Platforms',
 'We use the industry''s most trusted SEO and analytics tooling — so every recommendation is grounded in real data, not guesswork.',
 '{
   "glow_color": "#06b6d4",
   "items": [
     { "name": "Ahrefs",         "color": "#10b981" },
     { "name": "SEMrush",        "color": "#f59e0b" },
     { "name": "Search Console", "color": "#06b6d4" },
     { "name": "GA4",            "color": "#f43f5e" },
     { "name": "Screaming Frog", "color": "#8b5cf6" },
     { "name": "Schema.org",     "color": "#ec4899" }
   ],
   "callout": { "icon": "Shield", "lead": "100% white-hat.", "text": "No link farms, no PBNs, no paid placements — only sustainable techniques that compound in value and never put your domain at risk." }
 }'::jsonb,
 5, true),

('seo-geo', 'process',
 'From audit to measurable growth — five clear steps.',
 'Our Process',
 'A structured organic-growth process refined across 200+ search engagements.',
 '{
   "steps": [
     { "n": "01", "t": "Audit",    "d": "Technical, content & backlink deep-dive.",              "icon": "Search",    "color": "#10b981" },
     { "n": "02", "t": "Strategy", "d": "Keyword, topic & AI-search roadmap tailored to you.",   "icon": "Target",    "color": "#06b6d4" },
     { "n": "03", "t": "Optimise", "d": "On-page, technical fixes and schema deployment.",       "icon": "Settings",  "color": "#f59e0b" },
     { "n": "04", "t": "Create",   "d": "High-quality content & authority link campaigns.",      "icon": "Layers",    "color": "#8b5cf6" },
     { "n": "05", "t": "Measure",  "d": "Track, report, refine — every single month.",           "icon": "BarChart2", "color": "#f43f5e" }
   ]
 }'::jsonb,
 6, true),

('seo-geo', 'testimonials',
 'What our clients say.',
 'Client Stories',
 'Start your SEO project',
 '{
   "items": [
     { "name": "Tariq Hassan", "role": "Marketing Director, Atlas Commerce", "quote": "Our organic traffic doubled in five months after Webcore Solutions restructured our technical SEO foundation. The keyword strategy they produced was the most thorough we''ve seen from any agency.", "photo": "/tariq-hassan.webp", "stars": 5, "color": "#10b981" },
     { "name": "Claire Bennett", "role": "CMO, Nexus Digital", "quote": "We were invisible on AI search tools. Webcore''s GEO work changed that — we''re now being cited by Perplexity and Gemini for queries in our core market.", "photo": "/claire-bennett.webp", "stars": 5, "color": "#06b6d4" },
     { "name": "Daniyar Bekova", "role": "CEO, Steppe Commerce", "quote": "The SEO audit identified seventeen critical issues we had no idea about. Within three months of fixes, we climbed from page 5 to position 2 for our primary keyword.", "photo": "/daniyar-bekova.webp", "stars": 5, "color": "#f59e0b" }
   ]
 }'::jsonb,
 7, true),

('seo-geo', 'faqs',
 'Common questions about SEO & GEO.',
 'FAQs',
 NULL,
 '{
   "items": [
     { "q": "How long before I see results from SEO?", "a": "Most clients see measurable traction within 60–90 days — initial quick wins from technical fixes and on-page optimisation. Compounding authority-driven gains typically materialise between months 4–6 and accelerate from there. SEO is a long-term investment, but the returns are durable in a way paid channels are not." },
     { "q": "Do you guarantee specific rankings?", "a": "No reputable SEO agency can or should guarantee specific rankings — search algorithms are controlled by Google, not us. What we guarantee is rigorous process, full transparency, measurable progress month-on-month, and a strategic approach that builds lasting organic authority." },
     { "q": "What is GEO optimization and do I need it?", "a": "GEO, or generative engine optimization, structures content, entities, schema and direct answers so AI-powered search systems can understand, summarize and cite your brand more confidently." },
     { "q": "Will you write the content or do we need to?", "a": "We provide detailed content briefs, topic outlines and optimisation recommendations each month. We can also produce the content in-house through our editorial team — or work alongside your writers. Both models work well; we scope based on your preference and resources." },
     { "q": "How do you build links without risking a penalty?", "a": "We use white-hat digital PR and editorial outreach only — no link farms, no paid placements, no private blog networks. Every link we build is earned through genuine value: original research, expert commentary and relationship-driven outreach to relevant publications in your industry." },
     { "q": "How do you measure and report success?", "a": "We connect GA4 and Search Console to a live performance dashboard and deliver a monthly report that maps keyword movements, traffic trends and organic lead volume to revenue impact. You''ll always know exactly what''s working, what''s next, and why." }
   ]
 }'::jsonb,
 8, true),

('seo-geo', 'cta',
 'Ready to build organic visibility that compounds for years?',
 'Free SEO audit',
 'Book a free 45-minute discovery call. We''ll audit your current SEO health and map out the highest-impact opportunities.',
 '{
   "badge_icon": "Search",
   "heading_break": "Ready to build organic visibility| that compounds for years?",
   "stats": [
     { "v": "200+", "l": "Sites ranked" },
     { "v": "60d",  "l": "First wins" },
     { "v": "100%", "l": "White-hat only" }
   ],
   "cta_primary":   { "text": "Book free consultation", "href": "/contact" },
   "cta_secondary": { "text": "View all services", "href": "/services" },
   "reassurance": ["No commitment", "Free of charge"]
 }'::jsonb,
 9, true);

-- =============================================================================
-- 6. GRAPHIC DESIGN  (slug: graphic-design)
-- =============================================================================

INSERT INTO public.service_page_content
  (service_slug, section_type, heading, subheading, body, data_json, sort_order, is_visible)
VALUES
('graphic-design', 'hero',
 'Brand identity that commands attention.',
 'Brand identity that|commands attention.',
 'Webcore Solutions creates brand identity for businesses in Dubai and globally — from distinctive logos to editorial-grade brand systems that earn trust at first glance.',
 '{
   "badge": { "icon": "Palette", "label": "Graphic Design" },
   "glow_color": "#ec4899",
   "heading_accent": "commands attention.",
   "pills": [
     { "icon": "Pen",     "label": "Full IP ownership" },
     { "icon": "Feather", "label": "3 concepts presented" },
     { "icon": "Package", "label": "Print-ready source files" }
   ],
   "cta_primary":   { "text": "Book a free consultation", "href": "/contact" },
   "cta_secondary": { "text": "All services", "href": "/services" },
   "stats": [
     { "v": "300+", "l": "Brand identities delivered", "icon": "Award",      "color": "#ec4899", "bg": "rgba(236,72,153,0.12)" },
     { "v": "98%",  "l": "Client satisfaction rate",   "icon": "TrendingUp", "color": "#8b5cf6", "bg": "rgba(139,92,246,0.12)" },
     { "v": "3",    "l": "Concepts per project",       "icon": "Sparkles",   "color": "#06b6d4", "bg": "rgba(6,182,212,0.12)" },
     { "v": "100%", "l": "Full IP transferred to you", "icon": "ShieldCheck","color": "#10b981", "bg": "rgba(16,185,129,0.12)" }
   ]
 }'::jsonb,
 1, true),

('graphic-design', 'overview',
 'Design that earns trust at first glance.',
 'Our Creative Craft',
 'Every brand we build starts with strategy and ends with a system — not just a logo. We create visual identities that are distinctive, consistent and built to work everywhere your business shows up.',
 '{
   "heading_accent": "at first glance.",
   "image": "graphics-1",
   "image_alt": "Creative design team crafting a brand identity system",
   "glow_color": "#ec4899",
   "tint_color": "rgba(236,72,153,0.20)",
   "badge_top": { "label": "Full IP transfer" },
   "badge_bottom": { "icon": "Palette", "label": "Graphic Design", "border": "rgba(236,72,153,0.30)", "bg": "rgba(100,20,80,0.48)", "icon_color": "#f9a8d4" },
   "proof_points": [
     { "icon": "Pen",      "color": "#ec4899", "label": "100% IP ownership on delivery",            "sub": "Every file, every mark, every asset belongs to you outright — no licensing fees or lock-in, ever" },
     { "icon": "Sparkles", "color": "#8b5cf6", "label": "3 distinct creative concepts per project", "sub": "We present three fully developed directions so you can choose the route that best fits your vision" },
     { "icon": "Package",  "color": "#06b6d4", "label": "Print-ready source files included",        "sub": "Figma, .AI, .PSD, .EPS and print-optimised PDFs — every format you''ll ever need, handed over on delivery" }
   ],
   "stats_row": [
     { "v": "300+", "l": "Brand projects",       "color": "#ec4899" },
     { "v": "3",    "l": "Concepts per project", "color": "#8b5cf6" },
     { "v": "98%",  "l": "Client satisfaction",  "color": "#06b6d4" }
   ],
   "footer_metrics": [
     { "v": "300+", "l": "Brand identities",  "color": "#ec4899" },
     { "v": "98%",  "l": "Satisfaction rate", "color": "#8b5cf6" },
     { "v": "100%", "l": "IP owned by you",   "color": "#06b6d4" }
   ]
 }'::jsonb,
 2, true),

('graphic-design', 'features',
 'Every design capability, under one roof.',
 'What We Design',
 'From logo design to full brand systems — we cover the entire visual identity stack in-house, end to end.',
 '{
   "items": [
     { "icon": "Pen",        "color": "#ec4899", "bg": "rgba(236,72,153,0.10)", "t": "Logo Design",           "d": "Marks that are timeless, scalable and unmistakably yours — crafted to work at every size, in every context, for decades." },
     { "icon": "Grid",       "color": "#8b5cf6", "bg": "rgba(139,92,246,0.10)", "t": "Brand Systems",         "d": "Type, colour, voice and motion — codified and consistent across every touchpoint, from your website to your packaging." },
     { "icon": "BookOpen",   "color": "#06b6d4", "bg": "rgba(6,182,212,0.10)",  "t": "Brochures & Collateral","d": "Print-ready editorial pieces that position your brand at the premium end of the market and sell without saying a word." },
     { "icon": "FileText",   "color": "#f59e0b", "bg": "rgba(245,158,11,0.10)", "t": "Company Profiles",      "d": "Editorial-grade capability documents built for high-stakes pitches, investor decks, and enterprise procurement processes." },
     { "icon": "CreditCard", "color": "#10b981", "bg": "rgba(16,185,129,0.10)", "t": "Visiting Cards",        "d": "Premium business cards designed with finish, weight and character — because a first impression should be impossible to forget." },
     { "icon": "Monitor",    "color": "#f43f5e", "bg": "rgba(244,63,94,0.10)",  "t": "Web & UI Design",       "d": "Beautiful, conversion-focused interfaces in Figma — pixel-perfect, responsive, and handed off ready for development." }
   ]
 }'::jsonb,
 3, true),

('graphic-design', 'deliverables',
 'What you walk away with.',
 'Deliverables',
 NULL,
 '{
   "glow_color": "#ec4899",
   "items": [
     "Logo suite — primary, monogram & all lockups",
     "Full brand guidelines PDF (50+ pages)",
     "Source files — Figma, .AI, .PSD, .EPS",
     "Print-ready collateral (CMYK, bleed-ready)",
     "Social media template kit",
     "Web & favicon asset exports"
   ]
 }'::jsonb,
 4, true),

('graphic-design', 'tech_stack',
 'The tools we design with.',
 'Tools & Software',
 'We work in the industry''s leading design and production tools — so your files are always editable, print-ready and future-proof.',
 '{
   "glow_color": "#8b5cf6",
   "items": [
     { "name": "Figma",             "color": "#ec4899" },
     { "name": "Adobe Illustrator", "color": "#f59e0b" },
     { "name": "Photoshop",         "color": "#06b6d4" },
     { "name": "InDesign",          "color": "#8b5cf6" },
     { "name": "After Effects",     "color": "#10b981" },
     { "name": "Procreate",         "color": "#f43f5e" }
   ],
   "callout": { "icon": "Package", "lead": "You own everything.", "text": "Full IP transfer on delivery — every source file, every mark and every asset belongs to you outright, with no licensing restrictions or future royalties." }
 }'::jsonb,
 5, true),

('graphic-design', 'process',
 'From brief to brand — five clear steps.',
 'Our Process',
 'A structured creative process refined across 300+ brand identity projects.',
 '{
   "steps": [
     { "n": "01", "t": "Discovery", "d": "Brand questionnaire, goals, competitive audit.",       "icon": "Eye",      "color": "#ec4899" },
     { "n": "02", "t": "Explore",   "d": "Mood boards, visual directions, reference curation.",  "icon": "Sparkles", "color": "#8b5cf6" },
     { "n": "03", "t": "Create",    "d": "Initial concepts presented across 3 directions.",      "icon": "Pen",      "color": "#06b6d4" },
     { "n": "04", "t": "Refine",    "d": "Deep iteration on the chosen route with your team.",   "icon": "Brush",    "color": "#f59e0b" },
     { "n": "05", "t": "Deliver",   "d": "Source files, brand guidelines, asset handoff.",       "icon": "Package",  "color": "#10b981" }
   ]
 }'::jsonb,
 6, true),

('graphic-design', 'testimonials',
 'What our clients say.',
 'Client Stories',
 'Start your brand project',
 '{
   "items": [
     { "name": "Isabella Moreau", "role": "Brand Manager, Lune Hospitality", "quote": "Webcore Solutions took a brief that was all over the place and delivered a brand identity that felt completely right. Every team member said ''that''s us'' the first time they saw it.", "photo": "/isabella-moreau.webp", "stars": 5, "color": "#ec4899" },
     { "name": "Khalid Al-Farsi", "role": "Founder, Prestige Auto UAE", "quote": "The company profile Webcore produced for our investor meetings is genuinely impressive — it communicates credibility in a way our old materials never did.", "photo": "/khalid-al-farsi.webp", "stars": 5, "color": "#8b5cf6" },
     { "name": "Rachel Kim", "role": "Marketing Lead, Latitude Consulting", "quote": "The visual identity system Webcore designed has scaled across 40+ assets without losing consistency. The Figma file they delivered is the most organised brand library I''ve ever worked with.", "photo": "/rachel-kim.webp", "stars": 5, "color": "#06b6d4" }
   ]
 }'::jsonb,
 7, true),

('graphic-design', 'faqs',
 'Common questions about graphic design.',
 'FAQs',
 NULL,
 '{
   "items": [
     { "q": "How many logo concepts will you present?", "a": "We present 3 distinct directions — each with a clear strategic rationale. Once you choose a direction, we iterate deeply until the mark is exactly right. Most clients land on a final logo within 2–3 revision rounds." },
     { "q": "Do I get full IP ownership of my designs?", "a": "Yes, absolutely. Full intellectual property transfer is included on final delivery. You own every file, every mark, every asset — with no licensing restrictions or future royalties." },
     { "q": "What file formats will I receive?", "a": "You receive editable source files in Figma and Adobe formats (.AI, .PSD, .EPS), plus export-ready assets in SVG, PNG and PDF. Print files are prepared in CMYK with proper bleed and trim marks." },
     { "q": "Can you work with an existing brand rather than starting from scratch?", "a": "Yes — we offer brand refresh and brand extension services. We conduct an audit of your existing assets, identify what''s worth keeping, and build a coherent system around your strongest elements." },
     { "q": "How long does a full brand identity project take?", "a": "A complete logo and brand guidelines project typically takes 3–5 weeks from brief to final delivery. If you need collateral (brochures, business cards, profiles) alongside the identity, we scope an additional 1–3 weeks depending on volume." },
     { "q": "Do you offer print management or production?", "a": "We deliver print-ready files built to professional print specifications (CMYK, 300dpi, bleed and slug). We can also recommend trusted print partners in your region and review printer proofs on your behalf." }
   ]
 }'::jsonb,
 8, true),

('graphic-design', 'cta',
 'Ready to build a brand that earns attention?',
 'Free brand consultation',
 'Book a free 45-minute discovery call. We''ll audit your current brand and map out the right creative direction.',
 '{
   "badge_icon": "Palette",
   "heading_break": "Ready to build a brand| that earns attention?",
   "stats": [
     { "v": "300+", "l": "Brand projects" },
     { "v": "3",    "l": "Concepts shown" },
     { "v": "100%", "l": "IP transferred" }
   ],
   "cta_primary":   { "text": "Book free consultation", "href": "/contact" },
   "cta_secondary": { "text": "View all services", "href": "/services" },
   "reassurance": ["No commitment", "Free of charge"]
 }'::jsonb,
 9, true);

-- =============================================================================
-- End of seed 0004
-- =============================================================================
