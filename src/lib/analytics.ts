import { supabase } from "@/lib/supabase/client";

const SESSION_KEY = "wc_session_id";

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export async function trackPageView(pagePath: string) {
  try {
    await supabase.from("page_views").insert({
      page_path: pagePath,
      session_id: getSessionId(),
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
    } as any);
  } catch {
    // analytics must never break the app
  }
}
