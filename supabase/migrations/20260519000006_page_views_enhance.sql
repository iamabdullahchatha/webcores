-- Enhance page_views with device type, page title, and UTM parameters
ALTER TABLE public.page_views
  ADD COLUMN IF NOT EXISTS page_title   TEXT,
  ADD COLUMN IF NOT EXISTS device_type  TEXT CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  ADD COLUMN IF NOT EXISTS utm_source   TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium   TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT;

-- Indexes for new query patterns
CREATE INDEX IF NOT EXISTS idx_page_views_device
  ON public.page_views (device_type, viewed_at DESC);

CREATE INDEX IF NOT EXISTS idx_page_views_path_count
  ON public.page_views (page_path, viewed_at DESC);
