import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Row = Database["public"]["Tables"]["site_settings"]["Row"];

export type SiteSettings = {
  siteName: string;
  phoneUae: string;
  phoneUk: string;
  email: string;
  whatsappUrl: string;
  addressLine1: string;
  addressLine2: string | null;
  socialLinkedin: string;
  socialFacebook: string;
};

const FALLBACK: SiteSettings = {
  siteName: "Webcore Solutions",
  phoneUae: "+971 50 716 9200",
  phoneUk: "+44 7570 792516",
  email: "info@webcoreuae.com",
  whatsappUrl: "https://wa.me/447570792516",
  addressLine1: "Dubai, United Arab Emirates",
  addressLine2: null,
  socialLinkedin: "https://www.linkedin.com/in/webcore-solutions-939b88408",
  socialFacebook: "https://www.facebook.com/profile.php?id=61587249472207",
};

export function useSiteSettings() {
  return useQuery<SiteSettings>({
    queryKey: ["content", "site-settings"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "main")
        .single();

      if (error || !data) return FALLBACK;
      const row = data as unknown as Row;

      return {
        siteName: row.site_name ?? FALLBACK.siteName,
        phoneUae: row.phone_uae ?? FALLBACK.phoneUae,
        phoneUk: row.phone_uk ?? FALLBACK.phoneUk,
        email: row.email ?? FALLBACK.email,
        whatsappUrl: row.whatsapp_url ?? FALLBACK.whatsappUrl,
        addressLine1: row.address_line1 ?? FALLBACK.addressLine1,
        addressLine2: row.address_line2 ?? null,
        socialLinkedin: row.social_linkedin ?? FALLBACK.socialLinkedin,
        socialFacebook: row.social_facebook ?? FALLBACK.socialFacebook,
      };
    },
  });
}
