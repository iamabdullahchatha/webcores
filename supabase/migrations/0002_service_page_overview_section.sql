-- =============================================================================
-- Webcore CMS — Phase 8 migration
-- Add 'overview' to the service_page_content.section_type CHECK constraint.
--
-- The 6 static service pages each have an image+copy "Overview" section
-- (e.g. "Strategy Overview", "Platform Overview", "Our Craft") that has no
-- matching value in the original 0001 constraint. This adds it.
--
-- Safe to re-run: drops the constraint by name then recreates it.
-- =============================================================================

ALTER TABLE public.service_page_content
  DROP CONSTRAINT IF EXISTS service_page_content_section_type_check;

ALTER TABLE public.service_page_content
  ADD CONSTRAINT service_page_content_section_type_check
  CHECK (section_type IN (
    'hero', 'overview', 'features', 'process', 'deliverables',
    'tech_stack', 'stats', 'testimonials', 'faqs', 'cta'
  ));

-- =============================================================================
-- End of migration 0002
-- =============================================================================
