import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Row = Database["public"]["Tables"]["trust_logos"]["Row"];

const FALLBACK = [
  "NorthPeak", "Dunescape", "Fluxio", "Loomline",
  "Hexa", "Ascend Co", "Vantara", "CloudSync", "Meridian", "Proxia",
];

export function useTrustLogos() {
  return useQuery<string[]>({
    queryKey: ["content", "trust-logos"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trust_logos")
        .select("name")
        .eq("is_active", true)
        .order("sort_order");

      if (error || !data?.length) return FALLBACK;

      return (data as unknown as Pick<Row, "name">[]).map((row) => row.name);
    },
  });
}
