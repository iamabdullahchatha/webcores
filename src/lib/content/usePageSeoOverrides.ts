import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Row = Database["public"]["Tables"]["page_seo_overrides"]["Row"];

export type PageSeoOverrideRow = Row;

export function usePageSeoOverrides() {
  return useQuery<Record<string, PageSeoOverrideRow>>({
    queryKey: ["content", "page-seo-overrides"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_seo_overrides")
        .select("*");

      if (error || !data) return {};

      return (data as unknown as Row[]).reduce<Record<string, Row>>((acc, row) => {
        acc[row.id] = row;
        return acc;
      }, {});
    },
  });
}
