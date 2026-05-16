import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Row = Database["public"]["Tables"]["page_seo_overrides"]["Row"];

export type PageSeoOverride = {
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
};

export function usePageSeoOverride(pageId: string) {
  return useQuery<PageSeoOverride | null>({
    queryKey: ["content", "page-seo-override", pageId],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_seo_overrides")
        .select("*")
        .eq("id", pageId)
        .single();

      if (error || !data) return null;
      const row = data as unknown as Row;

      return {
        seoTitle: row.seo_title,
        seoDescription: row.seo_description,
        seoKeywords: row.seo_keywords,
        ogTitle: row.og_title,
        ogDescription: row.og_description,
      };
    },
  });
}
