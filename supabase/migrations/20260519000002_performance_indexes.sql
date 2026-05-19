-- Performance indexes for admin route query patterns.
-- Safe to paste into the Supabase SQL editor and run as a single script.
-- IF NOT EXISTS makes every statement idempotent / safe to re-run.

-- ───────────────────────────── profiles ─────────────────────────────────────
-- admin.index.tsx team_members count + admin.team.tsx active/total tallies
CREATE INDEX IF NOT EXISTS idx_profiles_is_active
  ON public.profiles (is_active);

-- role-based filtering: admin.security.tsx + admin.team.tsx canAct() checks
CREATE INDEX IF NOT EXISTS idx_profiles_role
  ON public.profiles (role);

-- api/team/accept-invite.js token lookup; partial = only the few invited rows
CREATE INDEX IF NOT EXISTS idx_profiles_invite_token
  ON public.profiles (invite_token)
  WHERE invite_token IS NOT NULL;

-- ─────────────────────────── login_history ──────────────────────────────────
-- admin.security.tsx: filter by status + ordered by date
CREATE INDEX IF NOT EXISTS idx_login_history_success_at
  ON public.login_history (success, logged_in_at DESC);

-- dashboard today_logins / failed_logins_today counts
-- NOTE: CURRENT_DATE is STABLE not IMMUTABLE so it cannot appear in a partial
-- index predicate. A plain index on logged_in_at is correct — Postgres will
-- use it with an index scan when the query supplies the date range at runtime.
CREATE INDEX IF NOT EXISTS idx_login_history_logged_in_at
  ON public.login_history (logged_in_at DESC);

-- ──────────────────────────── page_views ────────────────────────────────────
-- top-pages GROUP BY page_path query (admin analytics)
CREATE INDEX IF NOT EXISTS idx_page_views_path_at
  ON public.page_views (page_path, viewed_at DESC);

-- admin.index.tsx hourly/daily visitor chart time-bucket scans
CREATE INDEX IF NOT EXISTS idx_page_views_at_desc
  ON public.page_views (viewed_at DESC);

-- ──────────────────────── service_page_content ──────────────────────────────
-- useServicePage.ts: fetch sections by slug + section_type
CREATE INDEX IF NOT EXISTS idx_service_content_slug_type
  ON public.service_page_content (service_slug, section_type);

-- useServicePage.ts: ordered visible-section render; partial skips hidden rows
CREATE INDEX IF NOT EXISTS idx_service_content_slug_order
  ON public.service_page_content (service_slug, sort_order)
  WHERE is_visible = true;

-- ──────────────────────────── testimonials ──────────────────────────────────
-- useTestimonials.ts: page_scope + is_active filter, ordered by sort_order
CREATE INDEX IF NOT EXISTS idx_testimonials_scope_active
  ON public.testimonials (page_scope, is_active, sort_order);

-- ─────────────────────────────── faqs ───────────────────────────────────────
-- useFaqs.ts: page_scope + is_active filter, ordered by sort_order
CREATE INDEX IF NOT EXISTS idx_faqs_scope_active
  ON public.faqs (page_scope, is_active, sort_order);

-- ──────────────────────────── blog_posts ────────────────────────────────────
-- SKIPPED: blog_posts (status, published_at DESC) already exists as
-- `blog_posts_status_published_at_idx` in 0001_initial_schema.sql:99-100.
