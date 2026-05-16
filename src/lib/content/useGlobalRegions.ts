import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Row = Database["public"]["Tables"]["global_regions"]["Row"];

export type GlobalRegion = { name: string; emoji: string };

const FALLBACK: GlobalRegion[] = [
  { name: "Europe",   emoji: "🇪🇺" },
  { name: "UK",       emoji: "🇬🇧" },
  { name: "America",  emoji: "🇺🇸" },
  { name: "Dubai",    emoji: "🇦🇪" },
  { name: "Pakistan", emoji: "🇵🇰" },
];

export function useGlobalRegions() {
  return useQuery<GlobalRegion[]>({
    queryKey: ["content", "global-regions"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("global_regions")
        .select("*")
        .order("sort_order");

      if (error || !data?.length) return FALLBACK;

      return (data as unknown as Row[]).map((row) => ({ name: row.name, emoji: row.flag }));
    },
  });
}
