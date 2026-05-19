-- Admin notifications table for in-app bell
CREATE TABLE IF NOT EXISTS admin_notifications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type          TEXT NOT NULL CHECK (type IN ('contact', 'subscriber', 'team')),
  title         TEXT NOT NULL,
  body          TEXT,
  link          TEXT,
  recipient_role TEXT NOT NULL DEFAULT 'admin' CHECK (recipient_role IN ('owner', 'admin', 'all')),
  is_read       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cms users can read notifications"
  ON admin_notifications FOR SELECT
  TO authenticated
  USING (is_cms_user());

CREATE POLICY "cms users can update notifications"
  ON admin_notifications FOR UPDATE
  TO authenticated
  USING (is_cms_user())
  WITH CHECK (is_cms_user());

-- Service-role INSERT (from /api) bypasses RLS — no INSERT policy needed.

-- Index for bell query: unread first, then recent
CREATE INDEX IF NOT EXISTS idx_admin_notifications_unread
  ON admin_notifications (created_at DESC)
  WHERE is_read = FALSE;

CREATE INDEX IF NOT EXISTS idx_admin_notifications_recent
  ON admin_notifications (created_at DESC);
