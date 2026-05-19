CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id                 UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name               TEXT        NOT NULL,
  email              TEXT        NOT NULL,
  phone              TEXT,
  service            TEXT,
  subject            TEXT,
  message            TEXT        NOT NULL,
  ip_address         TEXT,
  status             TEXT        NOT NULL DEFAULT 'new'
                     CHECK (status IN ('new', 'in_progress', 'resolved')),
  honeypot_triggered BOOLEAN     NOT NULL DEFAULT false,
  submitted_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cms_users_read_contacts" ON public.contact_submissions
  FOR SELECT TO authenticated USING (public.is_cms_user());

CREATE POLICY "cms_users_update_contacts" ON public.contact_submissions
  FOR UPDATE TO authenticated USING (public.is_cms_user());

-- No INSERT policy for anon. Service-role key bypasses RLS.

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status_at
  ON public.contact_submissions (status, submitted_at DESC);
