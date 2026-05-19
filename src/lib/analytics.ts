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

export async function trackPageView(pagePath: string): Promise<void> {
  try {
    const params = new URLSearchParams(window.location.search);
    const width = window.innerWidth;
    const deviceType: "mobile" | "tablet" | "desktop" =
      width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";

    await supabase.from("page_views").insert({
      page_path: pagePath,
      page_title: document.title || null,
      session_id: getSessionId(),
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
      country_code: null,
      device_type: deviceType,
      utm_source: params.get("utm_source") || null,
      utm_medium: params.get("utm_medium") || null,
      utm_campaign: params.get("utm_campaign") || null,
    });
  } catch {
    // analytics must never crash the app
  }
}
