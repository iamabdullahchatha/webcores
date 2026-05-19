-- Add expiry column to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS invite_expires_at TIMESTAMPTZ;

-- Backfill existing pending invites with a 7-day window from created_at
UPDATE public.profiles
  SET invite_expires_at = created_at + INTERVAL '7 days'
  WHERE is_active = false
    AND invite_token IS NOT NULL
    AND invite_expires_at IS NULL;
