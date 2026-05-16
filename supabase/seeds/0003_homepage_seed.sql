-- =============================================================================
-- Webcore CMS — Phase 6 homepage seed
-- Seeds all homepage content tables from the values that were previously
-- hardcoded in src/routes/index.tsx and src/data/testimonials/home.ts.
-- Safe to re-run: every table is cleared before inserting.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- site_settings (singleton id='main')
-- ---------------------------------------------------------------------------
INSERT INTO public.site_settings (
  id, site_name,
  phone_uae, phone_uk, email,
  whatsapp_url,
  address_line1, address_line2,
  social_linkedin, social_facebook
) VALUES (
  'main', 'Webcore Solutions',
  '+971 50 716 9200', '+44 7570 792516', 'info@webcoreuae.com',
  'https://wa.me/447570792516',
  'Dubai, United Arab Emirates', NULL,
  'https://www.linkedin.com/in/webcore-solutions-939b88408',
  'https://www.facebook.com/profile.php?id=61587249472207'
)
ON CONFLICT (id) DO UPDATE SET
  site_name       = EXCLUDED.site_name,
  phone_uae       = EXCLUDED.phone_uae,
  phone_uk        = EXCLUDED.phone_uk,
  email           = EXCLUDED.email,
  whatsapp_url    = EXCLUDED.whatsapp_url,
  address_line1   = EXCLUDED.address_line1,
  address_line2   = EXCLUDED.address_line2,
  social_linkedin = EXCLUDED.social_linkedin,
  social_facebook = EXCLUDED.social_facebook,
  updated_at      = now();

-- ---------------------------------------------------------------------------
-- home_hero (singleton id='main')
-- ---------------------------------------------------------------------------
INSERT INTO public.home_hero (
  id,
  badge_label, badge_flag,
  heading_line1, heading_line2,
  subtitle,
  cta_primary_text, cta_primary_href,
  cta_secondary_text, cta_secondary_href
) VALUES (
  'main',
  'Premium Software & Digital Studio', 'Est. Dubai, UAE',
  'Transforming Ideas', 'into Digital Reality',
  'A digital studio building production-grade websites, custom software, and growth systems. We pair senior engineers with proven SEO and brand strategy to ship products 450+ companies trust across five continents.',
  'Start a Project', '/contact',
  'View Our Work', '/services'
)
ON CONFLICT (id) DO UPDATE SET
  badge_label        = EXCLUDED.badge_label,
  badge_flag         = EXCLUDED.badge_flag,
  heading_line1      = EXCLUDED.heading_line1,
  heading_line2      = EXCLUDED.heading_line2,
  subtitle           = EXCLUDED.subtitle,
  cta_primary_text   = EXCLUDED.cta_primary_text,
  cta_primary_href   = EXCLUDED.cta_primary_href,
  cta_secondary_text = EXCLUDED.cta_secondary_text,
  cta_secondary_href = EXCLUDED.cta_secondary_href,
  updated_at         = now();

-- ---------------------------------------------------------------------------
-- home_stats (4 items)
-- ---------------------------------------------------------------------------
TRUNCATE public.home_stats;

INSERT INTO public.home_stats (value, label, icon_name, color, bg, sort_order) VALUES
  ('12+',  'Years Experience',  'Award',     '#f59e0b', 'rgba(245,158,11,0.10)',  1),
  ('450+', 'Clients Worldwide', 'Users',     '#06b6d4', 'rgba(6,182,212,0.10)',   2),
  ('25+',  'Team Members',      'Briefcase', '#10b981', 'rgba(16,185,129,0.10)',  3),
  ('5',    'Countries Served',  'Globe',     '#8b5cf6', 'rgba(139,92,246,0.10)',  4);

-- ---------------------------------------------------------------------------
-- services (6 items)
-- ---------------------------------------------------------------------------
TRUNCATE public.service_page_content;
TRUNCATE public.services CASCADE;

INSERT INTO public.services (slug, title, description, tag, metric, icon_name, color, bg, image_url, image_alt, href, cta_text, sort_order) VALUES
  ('it-consultation',   'IT Consultation',    'Cut through complexity with a roadmap built for scale. We align your tech strategy with your growth goals.',                                        'Strategy',   '3× faster decisions',   'Lightbulb',  '#f59e0b', 'rgba(245,158,11,0.10)',   'it-consulting',          'IT Consulting services by Webcore Solutions',   '/services/it-consultation',   'Plan your IT strategy',   1),
  ('cms-development',   'CMS Development',    'Headless, composable content platforms that give your team full editorial control — without dev bottlenecks.',                                     'Platform',   '10× publishing speed',  'Layers',     '#8b5cf6', 'rgba(139,92,246,0.10)',   'cms-development',        'CMS Development services by Webcore Solutions', '/services/cms-development',   'Tour our CMS work',       2),
  ('web-development',   'Web Development',    'High-performance websites and e-commerce stores designed to convert visitors into paying customers.',                                             'Web',        'Sub-1s load times',     'Globe',      '#06b6d4', 'rgba(6,182,212,0.10)',    'web-development',        'Web Development services by Webcore Solutions', '/services/web-development',   'See website builds',      3),
  ('software-development', 'Software Development', 'Custom data systems and applications engineered to scale from day one — built on solid architecture.',                                      'Engineering','99.9% uptime SLA',      'Code2',      '#10b981', 'rgba(16,185,129,0.10)',   'software-development',   'Software Development by Webcore Solutions',     '/services/software-development', 'Read software cases',  4),
  ('seo-geo',           'SEO & GEO',          'Dominate search rankings locally and globally with data-driven organic growth strategies.',                                                        'Growth',     'Top 3 rankings',        'Search',     '#3b82f6', 'rgba(59,130,246,0.10)',   'seo',                    'SEO & GEO services by Webcore Solutions',       '/services/seo-geo',           'Grow search visibility',  5),
  ('graphic-design',    'Brand & Design',     'Visual identities that communicate authority instantly — logos, brand systems, and marketing collateral.',                                        'Design',     'Brand recognition +40%','Palette',    '#ec4899', 'rgba(236,72,153,0.10)',   'graphics-design',        'Brand & Design services by Webcore Solutions',  '/services/graphic-design',    'View design portfolio',   6);

-- NOTE: image_url stores the asset slug (e.g. 'it-consulting').
-- The useServices hook maps this slug → the Vite-imported webp asset URL.

-- ---------------------------------------------------------------------------
-- why_choose_us (3 items)
-- ---------------------------------------------------------------------------
TRUNCATE public.why_choose_us;

INSERT INTO public.why_choose_us (title, description, icon_name, color, bg, sort_order) VALUES
  ('Client Obsession', 'We succeed when you succeed. Every decision traces back to your outcomes, not our convenience.',                     'Heart',      '#f43f5e', 'rgba(244,63,94,0.10)',  1),
  ('Deep Curiosity',   'We ask better questions, challenge assumptions, and consistently find solutions others miss.',                        'Lightbulb',  '#f59e0b', 'rgba(245,158,11,0.10)', 2),
  ('Radical Integrity','Honest scopes. Transparent pricing. No surprises. Just dependable delivery, every single time.',                     'ShieldCheck','#10b981', 'rgba(16,185,129,0.10)', 3);

-- ---------------------------------------------------------------------------
-- process_steps (4 items)
-- ---------------------------------------------------------------------------
TRUNCATE public.process_steps;

INSERT INTO public.process_steps (number, title, description, icon_name, color, sort_order) VALUES
  ('01', 'Discovery Call',   'We map your vision, constraints and success metrics in a focused 45-min session.',                                                 'Sparkles',  '#ec4899', 1),
  ('02', 'Strategy & Scope', 'A clear technical plan, architecture decisions and timeline — before a single line of code.',                                      'Lightbulb', '#f59e0b', 2),
  ('03', 'Build & Iterate',  'Weekly demos, async updates, and continuous feedback loops keep you fully in control.',                                             'Code2',     '#10b981', 3),
  ('04', 'Launch & Scale',   'QA, performance hardening, live deployment, and ongoing support built into every engagement.',                                      'Zap',       '#8b5cf6', 4);

-- ---------------------------------------------------------------------------
-- portfolio_items (6 items)
-- ---------------------------------------------------------------------------
TRUNCATE public.portfolio_items;

INSERT INTO public.portfolio_items (title, category, description, gradient_from, gradient_to, metric, sort_order) VALUES
  ('NorthPeak Platform',   'SaaS Dashboard',    'Enterprise analytics platform serving 50K+ users with real-time data pipelines.',              '#1d4ed8', '#0891b2', '4× performance uplift',   1),
  ('Dunescape E-Commerce', 'Web Development',   'High-converting luxury retail store built on custom WooCommerce architecture.',                '#6d28d9', '#7c3aed', '$2M+ first-year GMV',      2),
  ('Fluxio CMS',           'CMS Development',   'Headless content platform empowering a 40-person editorial team globally.',                    '#047857', '#0d9488', '10× publishing speed',    3),
  ('Loomline SEO',         'SEO & Growth',      'Comprehensive organic strategy that tripled qualified traffic within 6 months.',               '#c2410c', '#d97706', '3× organic traffic',      4),
  ('Hexa Brand System',    'Brand & Design',    'Full visual identity and design system for a Series-A fintech startup.',                       '#be185d', '#e11d48', 'NPS score +34 pts',        5),
  ('Ascend ERP',           'Software Development','Custom ERP system unifying operations across 12 regional offices.',                          '#0369a1', '#2563eb', '40% ops cost reduction',  6);

-- ---------------------------------------------------------------------------
-- testimonials (4 items, page_scope='home')
-- ---------------------------------------------------------------------------
DELETE FROM public.testimonials WHERE page_scope = 'home';

INSERT INTO public.testimonials (name, role, quote, stars, avatar_url, page_scope, sort_order) VALUES
  (
    'Layla Al-Mansoori',
    'Marketing Director, Khaleej Retail Group',
    'After five months on our Arabic-English SEO rebuild, organic traffic from UAE searches climbed 84 percent. The Webcore team navigated our bilingual content workflow without missing a milestone.',
    5, NULL, 'home', 1
  ),
  (
    'Rohan Verma',
    'Head of Product, FinTrack MENA',
    'Webcore Solutions delivered our investor dashboard in ten focused weeks. Two larger Dubai agencies had quoted us double that timeline, and our user NPS still jumped from 42 to 71 after launch.',
    5, NULL, 'home', 2
  ),
  (
    'Hana Said',
    'Founder, Saharaboutique',
    'The refreshed storefront and new brand identity moved our checkout conversion rate from 1.6 to 4.2 percent. First-month revenue beat our internal forecast by almost forty percent.',
    5, NULL, 'home', 3
  ),
  (
    'Daniel Whittaker',
    'Operations Lead, Brightline Logistics UK',
    'Webcore Solutions consolidated three legacy systems into one operations platform our regional teams actually use. Manual reconciliation hours dropped 60 percent and uptime stayed above 99.9 percent all year.',
    5, NULL, 'home', 4
  );

-- ---------------------------------------------------------------------------
-- faqs (9 items across 3 categories, page_scope='home')
-- ---------------------------------------------------------------------------
DELETE FROM public.faqs WHERE page_scope = 'home';

INSERT INTO public.faqs (question, answer, category, page_scope, sort_order) VALUES
  -- Process
  ('How long does a typical project take?',
   'Most engagements run 4–12 weeks depending on scope. We share a detailed timeline after the discovery call so you know exactly what to expect at every milestone.',
   'Process', 'home', 1),
  ('Can you redesign an existing product?',
   'Yes — we frequently rebuild legacy systems and refresh brand experiences end-to-end. We audit what exists, identify what''s worth keeping, and rebuild the rest with precision.',
   'Process', 'home', 2),
  ('What happens during the discovery call?',
   'We spend 45 minutes understanding your goals, constraints, and current challenges. You''ll leave with clarity on scope, timeline, and cost — whether you work with us or not.',
   'Process', 'home', 3),
  -- Pricing
  ('How do you price projects?',
   'Fixed-price for well-defined scopes, retainer-based for evolving roadmaps. We provide transparent, itemised quotes after discovery — no hidden fees, ever.',
   'Pricing', 'home', 4),
  ('Do you offer ongoing support?',
   'Absolutely. We offer monthly retainers for maintenance, growth work, and feature development after launch. Most clients continue working with us long-term.',
   'Pricing', 'home', 5),
  ('Is there a minimum project size?',
   'We typically work with projects starting from $3,000 USD. For smaller needs we offer advisory sessions or point-in-time audits at a flat rate.',
   'Pricing', 'home', 6),
  -- Global
  ('Do you work with international clients?',
   'Yes — we serve clients across Europe, the UK, America, Dubai and Pakistan with async-friendly workflows and overlapping time zone availability.',
   'Global', 'home', 7),
  ('What technologies do you use?',
   'Modern stacks: React, Next.js, Node.js, TypeScript, WordPress, WooCommerce, and cloud-native infrastructure. We choose the right tool for each project, not the trendiest one.',
   'Global', 'home', 8),
  ('Can we meet in person?',
   'Our team is based in Dubai and Pakistan. We meet in-person with Dubai-based clients and arrange travel for larger engagements when needed.',
   'Global', 'home', 9);

-- ---------------------------------------------------------------------------
-- trust_logos (10 client names)
-- ---------------------------------------------------------------------------
TRUNCATE public.trust_logos;

INSERT INTO public.trust_logos (name, logo_url, sort_order) VALUES
  ('NorthPeak',  NULL, 1),
  ('Dunescape',  NULL, 2),
  ('Fluxio',     NULL, 3),
  ('Loomline',   NULL, 4),
  ('Hexa',       NULL, 5),
  ('Ascend Co',  NULL, 6),
  ('Vantara',    NULL, 7),
  ('CloudSync',  NULL, 8),
  ('Meridian',   NULL, 9),
  ('Proxia',     NULL, 10);

-- ---------------------------------------------------------------------------
-- global_regions (5 items)
-- ---------------------------------------------------------------------------
TRUNCATE public.global_regions;

INSERT INTO public.global_regions (name, flag, sort_order) VALUES
  ('Europe',   '🇪🇺', 1),
  ('UK',       '🇬🇧', 2),
  ('America',  '🇺🇸', 3),
  ('Dubai',    '🇦🇪', 4),
  ('Pakistan', '🇵🇰', 5);

-- =============================================================================
-- End of seed 0003
-- =============================================================================
