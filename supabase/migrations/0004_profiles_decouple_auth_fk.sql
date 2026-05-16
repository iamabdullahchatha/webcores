-- =============================================================================
-- Webcore CMS — Migration 0004
-- Drop the REFERENCES auth.users FK on profiles.id so that invite rows
-- (pending users who haven't set a password yet) can be inserted before
-- the corresponding auth.users row exists.
--
-- On accept-invite the profile row gets updated with the real auth UUID
-- via the accept-invite page. The login_history FK is changed to match.
--
-- Safe to re-run: uses IF EXISTS / DO NOTHING guards.
-- =============================================================================

-- Drop the FK constraint that ties profiles.id to auth.users
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- login_history references profiles(id); keep it but relax to SET NULL on delete
-- so that deleting a profile row doesn't cascade-delete login history.
ALTER TABLE public.login_history
  DROP CONSTRAINT IF EXISTS login_history_user_id_fkey;

ALTER TABLE public.login_history
  ADD CONSTRAINT login_history_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE SET NULL;

-- =============================================================================
-- End of migration 0004
-- =============================================================================
