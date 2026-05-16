BEGIN;

-- ─────────────────────────────────────────────────────────────
-- 1. page_seo_overrides table
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.page_seo_overrides (
  id              TEXT PRIMARY KEY,
  seo_title       TEXT,
  seo_description TEXT,
  seo_keywords    TEXT,
  og_title        TEXT,
  og_description  TEXT,
  updated_at      TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.page_seo_overrides ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'page_seo_overrides'
      AND policyname = 'auth_all'
  ) THEN
    CREATE POLICY "auth_all"
      ON public.page_seo_overrides
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'page_seo_overrides'
      AND policyname = 'anon_select'
  ) THEN
    CREATE POLICY "anon_select"
      ON public.page_seo_overrides
      FOR SELECT
      TO anon
      USING (true);
  END IF;
END $$;

-- ─────────────────────────────────────────────────────────────
-- 2. page_views table (analytics, no PII)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.page_views (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path    TEXT        NOT NULL,
  session_id   TEXT        NOT NULL,
  referrer     TEXT,
  user_agent   TEXT,
  country_code TEXT,
  viewed_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS pv_viewed_at ON public.page_views (viewed_at DESC);
CREATE INDEX IF NOT EXISTS pv_path      ON public.page_views (page_path);
CREATE INDEX IF NOT EXISTS pv_composite ON public.page_views (viewed_at, page_path);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'page_views'
      AND policyname = 'anon_insert'
  ) THEN
    CREATE POLICY "anon_insert"
      ON public.page_views
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'page_views'
      AND policyname = 'auth_select'
  ) THEN
    CREATE POLICY "auth_select"
      ON public.page_views
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- ─────────────────────────────────────────────────────────────
-- 3. site_settings — logo columns
-- ─────────────────────────────────────────────────────────────
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS logo_url TEXT,
  ADD COLUMN IF NOT EXISTS logo_alt TEXT;

-- ─────────────────────────────────────────────────────────────
-- 4. services — SEO columns
-- ─────────────────────────────────────────────────────────────
ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS seo_title       TEXT,
  ADD COLUMN IF NOT EXISTS seo_description TEXT,
  ADD COLUMN IF NOT EXISTS seo_keywords    TEXT;

-- ─────────────────────────────────────────────────────────────
-- 5. home_hero — SEO columns
-- ─────────────────────────────────────────────────────────────
ALTER TABLE public.home_hero
  ADD COLUMN IF NOT EXISTS seo_title       TEXT,
  ADD COLUMN IF NOT EXISTS seo_description TEXT,
  ADD COLUMN IF NOT EXISTS seo_keywords    TEXT;

COMMIT;
