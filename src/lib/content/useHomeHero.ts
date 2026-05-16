import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Row = Database["public"]["Tables"]["home_hero"]["Row"];

export type HomeHero = {
  badgeLabel: string;
  badgeFlag: string;
  headingLine1: string;
  headingLine2: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
};

const FALLBACK: HomeHero = {
  badgeLabel: "Premium Software & Digital Studio",
  badgeFlag: "Est. Dubai, UAE",
  headingLine1: "Transforming Ideas",
  headingLine2: "into Digital Reality",
  subtitle:
    "A digital studio building production-grade websites, custom software, and growth systems. We pair senior engineers with proven SEO and brand strategy to ship products 450+ companies trust across five continents.",
  ctaPrimaryText: "Start a Project",
  ctaPrimaryHref: "/contact",
  ctaSecondaryText: "View Our Work",
  ctaSecondaryHref: "/services",
};

export function useHomeHero() {
  return useQuery<HomeHero>({
    queryKey: ["content", "home-hero"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("home_hero")
        .select("*")
        .eq("id", "main")
        .single();

      if (error || !data) return FALLBACK;
      const row = data as unknown as Row;

      return {
        badgeLabel: row.badge_label ?? FALLBACK.badgeLabel,
        badgeFlag: row.badge_flag ?? FALLBACK.badgeFlag,
        headingLine1: row.heading_line1 ?? FALLBACK.headingLine1,
        headingLine2: row.heading_line2 ?? FALLBACK.headingLine2,
        subtitle: row.subtitle ?? FALLBACK.subtitle,
        ctaPrimaryText: row.cta_primary_text ?? FALLBACK.ctaPrimaryText,
        ctaPrimaryHref: row.cta_primary_href ?? FALLBACK.ctaPrimaryHref,
        ctaSecondaryText: row.cta_secondary_text ?? FALLBACK.ctaSecondaryText,
        ctaSecondaryHref: row.cta_secondary_href ?? FALLBACK.ctaSecondaryHref,
      };
    },
  });
}
