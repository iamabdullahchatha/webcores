-- =============================================================================
-- Webcore CMS — Phase 1 initial schema
-- =============================================================================
-- Safe to re-run: every CREATE uses IF NOT EXISTS, every policy uses
-- CREATE POLICY ... (drop-then-create idempotency handled below where needed).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 0. Extensions and helper functions
-- ---------------------------------------------------------------------------

CREATE EXTENSION IF NOT EXISTS "pgcrypto";  -- gen_random_uuid()

-- updated_at auto-refresh
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- RLS helper: is the caller an authenticated CMS user (owner/admin/editor)?
-- Role is stored in auth.users.raw_app_meta_data->>'role' and carried in the JWT.
CREATE OR REPLACE FUNCTION public.is_cms_user()
RETURNS BOOLEAN AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('owner', 'admin', 'editor'),
    false
  );
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS BOOLEAN AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'owner',
    false
  );
$$ LANGUAGE sql STABLE;

-- ---------------------------------------------------------------------------
-- 1. profiles
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email        TEXT UNIQUE NOT NULL,
  full_name    TEXT NOT NULL,
  role         TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'editor')),
  avatar_url   TEXT,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  invite_token TEXT UNIQUE,
  invited_by   UUID REFERENCES public.profiles(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 2. login_history
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.login_history (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  email          TEXT,
  logged_in_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address     TEXT,
  user_agent     TEXT,
  success        BOOLEAN NOT NULL,
  failure_reason TEXT
);

CREATE INDEX IF NOT EXISTS login_history_user_id_idx ON public.login_history (user_id);
CREATE INDEX IF NOT EXISTS login_history_logged_in_at_idx ON public.login_history (logged_in_at DESC);

-- ---------------------------------------------------------------------------
-- 3. blog_posts
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT UNIQUE NOT NULL,
  title            TEXT NOT NULL,
  excerpt          TEXT,
  content          TEXT,
  cover_image_url  TEXT,
  cover_image_alt  TEXT,
  author_id        UUID REFERENCES public.profiles(id),
  status           TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  published_at     TIMESTAMPTZ,
  reading_time_min INTEGER,
  seo_title        TEXT,
  seo_description  TEXT,
  tags             TEXT[],
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS blog_posts_status_published_at_idx
  ON public.blog_posts (status, published_at DESC);

-- ---------------------------------------------------------------------------
-- 4. site_settings  (singleton)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.site_settings (
  id              TEXT PRIMARY KEY DEFAULT 'main',
  site_name       TEXT,
  phone_uae       TEXT,
  phone_uk        TEXT,
  email           TEXT,
  whatsapp_url    TEXT,
  address_line1   TEXT,
  address_line2   TEXT,
  social_linkedin TEXT,
  social_facebook TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (id = 'main')
);

-- ---------------------------------------------------------------------------
-- 5. home_hero  (singleton)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.home_hero (
  id                 TEXT PRIMARY KEY DEFAULT 'main',
  badge_label        TEXT,
  badge_flag         TEXT,
  heading_line1      TEXT,
  heading_line2      TEXT,
  subtitle           TEXT,
  cta_primary_text   TEXT,
  cta_primary_href   TEXT,
  cta_secondary_text TEXT,
  cta_secondary_href TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (id = 'main')
);

-- ---------------------------------------------------------------------------
-- 6. home_stats
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.home_stats (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value      TEXT NOT NULL,
  label      TEXT NOT NULL,
  icon_name  TEXT,
  color      TEXT,
  bg         TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 7. services
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  tag         TEXT,
  metric      TEXT,
  icon_name   TEXT,
  color       TEXT,
  bg          TEXT,
  image_url   TEXT,
  image_alt   TEXT,
  href        TEXT,
  cta_text    TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS services_active_sort_idx
  ON public.services (is_active, sort_order);

-- ---------------------------------------------------------------------------
-- 8. service_page_content
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.service_page_content (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_slug TEXT NOT NULL REFERENCES public.services(slug) ON DELETE CASCADE ON UPDATE CASCADE,
  section_type TEXT NOT NULL CHECK (section_type IN (
    'hero', 'features', 'process', 'deliverables',
    'tech_stack', 'stats', 'testimonials', 'faqs', 'cta'
  )),
  heading      TEXT,
  subheading   TEXT,
  body         TEXT,
  data_json    JSONB,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  is_visible   BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS service_page_content_lookup_idx
  ON public.service_page_content (service_slug, sort_order);

-- ---------------------------------------------------------------------------
-- 9. process_steps
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.process_steps (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number      TEXT NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  icon_name   TEXT,
  color       TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 10. portfolio_items
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  category      TEXT,
  description   TEXT,
  gradient_from TEXT,
  gradient_to   TEXT,
  metric        TEXT,
  link_url      TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 11. testimonials
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.testimonials (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  role       TEXT,
  quote      TEXT NOT NULL,
  stars      INTEGER NOT NULL DEFAULT 5 CHECK (stars BETWEEN 1 AND 5),
  avatar_url TEXT,
  page_scope TEXT NOT NULL DEFAULT 'home',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active  BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS testimonials_scope_idx
  ON public.testimonials (page_scope, is_active, sort_order);

-- ---------------------------------------------------------------------------
-- 12. faqs
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.faqs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  category   TEXT,
  page_scope TEXT NOT NULL DEFAULT 'home',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active  BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS faqs_scope_idx
  ON public.faqs (page_scope, is_active, sort_order);

-- ---------------------------------------------------------------------------
-- 13. why_choose_us
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.why_choose_us (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT,
  icon_name   TEXT,
  color       TEXT,
  bg          TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 14. trust_logos
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.trust_logos (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  logo_url   TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active  BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 15. global_regions
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.global_regions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  flag       TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 16. media_library
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.media_library (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path    TEXT NOT NULL,
  public_url   TEXT NOT NULL,
  alt_text     TEXT,
  mime_type    TEXT,
  file_size_kb INTEGER,
  bucket       TEXT NOT NULL DEFAULT 'site-media',
  uploaded_by  UUID REFERENCES public.profiles(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- updated_at triggers — attach to every table that has updated_at
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  tbl TEXT;
  tables TEXT[] := ARRAY[
    'profiles', 'blog_posts', 'site_settings', 'home_hero', 'home_stats',
    'services', 'service_page_content', 'process_steps', 'portfolio_items',
    'testimonials', 'faqs', 'why_choose_us', 'trust_logos', 'global_regions',
    'media_library'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at ON public.%I', tbl);
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.%I
       FOR EACH ROW EXECUTE FUNCTION public.update_updated_at()',
      tbl
    );
  END LOOP;
END $$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

ALTER TABLE public.profiles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_history        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_hero            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_stats           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_steps        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.why_choose_us        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trust_logos          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.global_regions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library        ENABLE ROW LEVEL SECURITY;

-- profiles policies ---------------------------------------------------------
DROP POLICY IF EXISTS "profiles select authenticated"  ON public.profiles;
DROP POLICY IF EXISTS "profiles update own or owner"   ON public.profiles;
DROP POLICY IF EXISTS "profiles insert owner only"     ON public.profiles;
DROP POLICY IF EXISTS "profiles delete owner only"     ON public.profiles;

CREATE POLICY "profiles select authenticated"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "profiles update own or owner"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid() OR public.is_owner())
  WITH CHECK (id = auth.uid() OR public.is_owner());

CREATE POLICY "profiles insert owner only"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (public.is_owner());

CREATE POLICY "profiles delete owner only"
  ON public.profiles FOR DELETE
  TO authenticated
  USING (public.is_owner());

-- login_history policies ----------------------------------------------------
-- Inserts go through the service-role admin client, which bypasses RLS,
-- so no INSERT policy is needed for authenticated users.
DROP POLICY IF EXISTS "login_history select" ON public.login_history;

CREATE POLICY "login_history select"
  ON public.login_history FOR SELECT
  TO authenticated
  USING (public.is_owner() OR user_id = auth.uid());

-- blog_posts policies -------------------------------------------------------
DROP POLICY IF EXISTS "blog_posts public read published" ON public.blog_posts;
DROP POLICY IF EXISTS "blog_posts cms full access"       ON public.blog_posts;

CREATE POLICY "blog_posts public read published"
  ON public.blog_posts FOR SELECT
  TO anon, authenticated
  USING (status = 'published' OR public.is_cms_user());

CREATE POLICY "blog_posts cms full access"
  ON public.blog_posts FOR ALL
  TO authenticated
  USING (public.is_cms_user())
  WITH CHECK (public.is_cms_user());

-- Generic content tables — public read, CMS write --------------------------
-- Single DO block applies the same 2-policy pattern to every content table.

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
    EXECUTE format('DROP POLICY IF EXISTS "%s public read" ON public.%I', tbl, tbl);
    EXECUTE format('DROP POLICY IF EXISTS "%s cms write"  ON public.%I', tbl, tbl);

    EXECUTE format(
      'CREATE POLICY "%s public read" ON public.%I
         FOR SELECT TO anon, authenticated USING (true)',
      tbl, tbl
    );

    EXECUTE format(
      'CREATE POLICY "%s cms write" ON public.%I
         FOR ALL TO authenticated
         USING (public.is_cms_user())
         WITH CHECK (public.is_cms_user())',
      tbl, tbl
    );
  END LOOP;
END $$;

-- ---------------------------------------------------------------------------
-- Storage buckets and policies
-- ---------------------------------------------------------------------------

INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true),
       ('site-media',  'site-media',  true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read blog-images"   ON storage.objects;
DROP POLICY IF EXISTS "Auth upload blog-images"   ON storage.objects;
DROP POLICY IF EXISTS "Auth update blog-images"   ON storage.objects;
DROP POLICY IF EXISTS "Auth delete blog-images"   ON storage.objects;
DROP POLICY IF EXISTS "Public read site-media"    ON storage.objects;
DROP POLICY IF EXISTS "Auth upload site-media"    ON storage.objects;
DROP POLICY IF EXISTS "Auth update site-media"    ON storage.objects;
DROP POLICY IF EXISTS "Auth delete site-media"    ON storage.objects;

CREATE POLICY "Public read blog-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "Auth upload blog-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth update blog-images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth delete blog-images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Public read site-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-media');

CREATE POLICY "Auth upload site-media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'site-media' AND auth.role() = 'authenticated');

CREATE POLICY "Auth update site-media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'site-media' AND auth.role() = 'authenticated');

CREATE POLICY "Auth delete site-media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'site-media' AND auth.role() = 'authenticated');

-- =============================================================================
-- End of migration 0001
-- =============================================================================
