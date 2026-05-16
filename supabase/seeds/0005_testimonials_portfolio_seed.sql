-- =============================================================================
-- Webcore CMS — Seed 0005
-- Seeds 9 homepage testimonials (6 × 5-star, 3 × 4-star) and 6 portfolio
-- items mapped to the 6 services.
-- Safe to re-run: TRUNCATE before INSERT.
-- =============================================================================

TRUNCATE public.testimonials;
TRUNCATE public.portfolio_items;

-- =============================================================================
-- Testimonials  (page_scope = 'home')
-- =============================================================================

INSERT INTO public.testimonials
  (name, role, quote, stars, page_scope, sort_order, is_active)
VALUES
-- 5-star
('Layla Al-Mansoori', 'Marketing Director, Khaleej Retail Group',
 'After five months on our Arabic-English SEO rebuild, organic traffic from UAE searches climbed 84 percent. The Webcore team navigated our bilingual content workflow without missing a milestone.',
 5, 'home', 1, true),

('Rohan Verma', 'Head of Product, FinTrack MENA',
 'Webcore Solutions delivered our investor dashboard in ten focused weeks. Two larger Dubai agencies had quoted us double that timeline, and our user NPS still jumped from 42 to 71 after launch.',
 5, 'home', 2, true),

('Hana Said', 'Founder, Saharaboutique',
 'The refreshed storefront and new brand identity moved our checkout conversion rate from 1.6 to 4.2 percent. First-month revenue beat our internal forecast by almost forty percent.',
 5, 'home', 3, true),

('Daniel Whittaker', 'Operations Lead, Brightline Logistics UK',
 'Webcore Solutions consolidated three legacy systems into one operations platform our regional teams actually use. Manual reconciliation hours dropped 60 percent and uptime stayed above 99.9 percent all year.',
 5, 'home', 4, true),

('Sara Al-Hashimi', 'CEO, Pinnacle Properties Dubai',
 'Our new website went from wireframes to live in six weeks — well ahead of the GITEX deadline we were targeting. The Lighthouse score hit 97 on the first audit and leads from organic search doubled within ninety days.',
 5, 'home', 5, true),

('James Okafor', 'Co-founder, Vestro Capital',
 'The brand identity Webcore built for our Series-A pitch was the first thing every investor commented on. Clean, authoritative, and completely distinct from anything else in the fintech space. We closed the round two weeks later.',
 5, 'home', 6, true),

-- 4-star
('Nour Khalil', 'Content Manager, Gulf Media Network',
 'Switching to the headless CMS Webcore set up was a big change for our editorial team, but the onboarding sessions were thorough and patient. Publishing workflows are genuinely faster now — we ship content same-day instead of waiting on developers.',
 4, 'home', 7, true),

('Priya Menon', 'E-commerce Director, Saffron Living',
 'The WooCommerce build is solid and our average load time dropped from 6.2 seconds to under 1.1. The project ran slightly over the initial scope because we kept adding features, but Webcore handled the change requests without complaint.',
 4, 'home', 8, true),

('Tom Aldridge', 'Head of Growth, ClearRoute SaaS',
 'The SEO audit surfaced issues we had no idea existed — eleven critical crawl errors and a toxic backlink cluster from a previous agency. Three months of fixes later we moved from page four to page one for our main keyword.',
 4, 'home', 9, true);

-- =============================================================================
-- Portfolio items  (one per service)
-- =============================================================================

INSERT INTO public.portfolio_items
  (title, category, description, gradient_from, gradient_to, metric, sort_order, is_active)
VALUES
('Pinnacle Properties',
 'Web Development',
 'High-performance real-estate marketing site with Lighthouse 97, bilingual Arabic-English content and a custom property search — live six weeks from brief.',
 '#1d4ed8', '#0891b2', '2× organic leads in 90 days', 1, true),

('Gulf Media Network CMS',
 'CMS Development',
 'Headless Sanity platform for a 40-person editorial team publishing across 3 regional sites. Role-based workflows replaced a ticket queue that cost 2 hours per story.',
 '#6d28d9', '#7c3aed', '10× publishing speed', 2, true),

('FinTrack MENA Dashboard',
 'Software Development',
 'Custom SaaS analytics platform with real-time data pipelines, multi-tenant auth, and a Figma-to-code design system — delivered in 10 weeks for a Series-A fintech.',
 '#047857', '#0d9488', 'NPS 42 → 71 post-launch', 3, true),

('ClearRoute SEO & GEO',
 'SEO & GEO',
 'Full technical SEO overhaul, AI-search optimisation and authority link-building for a B2B SaaS — from page 4 to position 1 for their primary keyword in 90 days.',
 '#c2410c', '#d97706', '3× qualified organic traffic', 4, true),

('Vestro Capital Brand',
 'Graphic Design',
 'Full visual identity — logo suite, brand guidelines, investor deck and business collateral — built for a Series-A fintech pitch. Closed the round within two weeks of launch.',
 '#be185d', '#e11d48', 'Series-A closed in 2 weeks', 5, true),

('Brightline Ops Platform',
 'IT Consultation & Software',
 'Technology audit across 12 regional offices followed by a custom ERP build that unified operations, eliminated three legacy systems and cut reconciliation time by 60%.',
 '#0369a1', '#2563eb', '60% ops cost reduction', 6, true);

-- =============================================================================
-- End of seed 0005
-- =============================================================================
