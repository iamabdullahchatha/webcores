-- =============================================================================
-- Webcore CMS — Migration 0003
-- Fix: CMS write policies were gated on is_cms_user() which requires
-- app_metadata.role in the JWT. For a single-owner CMS where every
-- authenticated session is the site owner, allow any authenticated user
-- to write to all content tables.
--
-- Also re-applies the overview section_type fix from 0002 so this
-- migration is self-contained and safe to run on a fresh DB.
-- Safe to re-run: all DROPs use IF EXISTS.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Ensure 'overview' is in the section_type CHECK constraint
-- ---------------------------------------------------------------------------
ALTER TABLE public.service_page_content
  DROP CONSTRAINT IF EXISTS service_page_content_section_type_check;

ALTER TABLE public.service_page_content
  ADD CONSTRAINT service_page_content_section_type_check
  CHECK (section_type IN (
    'hero', 'overview', 'features', 'process', 'deliverables',
    'tech_stack', 'stats', 'testimonials', 'faqs', 'cta'
  ));

-- ---------------------------------------------------------------------------
-- 2. Replace cms write policies: authenticated (not is_cms_user()) for all
--    content tables so the site owner can edit without special JWT claims.
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  tbl TEXT;
  content_tables TEXT[] := ARRAY[
    'site_settings', 'home_hero', 'home_stats', 'services',
    'service_page_content', 'process_steps', 'portfolio_items',
    'testimonials', 'faqs', 'why_choose_us', 'trust_logos',
    'global_regions', 'media_library'
  ];
BEGIN
  FOREACH tbl IN ARRAY content_tables LOOP
    -- Drop old policy names (both naming conventions used historically)
    EXECUTE format('DROP POLICY IF EXISTS "%s cms write" ON public.%I', tbl, tbl);
    -- Also drop the new name in case this migration was partially run before
    EXECUTE format('DROP POLICY IF EXISTS "%s authenticated write" ON public.%I', tbl, tbl);
    -- Drop and recreate public read to ensure it's up to date
    EXECUTE format('DROP POLICY IF EXISTS "%s public read" ON public.%I', tbl, tbl);
    EXECUTE format(
      'CREATE POLICY "%s public read" ON public.%I
         FOR SELECT TO anon, authenticated USING (true)',
      tbl, tbl
    );

    -- New write policy: any authenticated session (owner is the only user)
    EXECUTE format(
      'CREATE POLICY "%s authenticated write" ON public.%I
         FOR ALL TO authenticated
         USING (true)
         WITH CHECK (true)',
      tbl, tbl
    );
  END LOOP;
END;
$$;

-- blog_posts keeps its own policy (already correct)

-- =============================================================================
-- End of migration 0003
-- =============================================================================
