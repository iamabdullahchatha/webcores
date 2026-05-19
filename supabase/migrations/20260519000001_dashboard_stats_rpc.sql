CREATE OR REPLACE FUNCTION public.get_dashboard_stats()
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
  today_start timestamptz := date_trunc('day', now() AT TIME ZONE 'UTC');
BEGIN
  SELECT jsonb_build_object(
    'total_posts',        (SELECT COUNT(*) FROM blog_posts),
    'published_posts',    (SELECT COUNT(*) FROM blog_posts WHERE status = 'published'),
    'draft_posts',        (SELECT COUNT(*) FROM blog_posts WHERE status = 'draft'),
    'team_members',       (SELECT COUNT(*) FROM profiles WHERE is_active = true),
    'today_logins',       (SELECT COUNT(*) FROM login_history WHERE logged_in_at >= today_start),
    'failed_logins_today',(SELECT COUNT(*) FROM login_history WHERE logged_in_at >= today_start AND success = false)
  ) INTO result;
  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_dashboard_stats() TO authenticated;
