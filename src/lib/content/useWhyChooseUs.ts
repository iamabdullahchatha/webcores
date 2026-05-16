import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { Heart, Lightbulb, ShieldCheck, type LucideIcon } from "lucide-react";

type Row = Database["public"]["Tables"]["why_choose_us"]["Row"];

const ICON_MAP: Record<string, LucideIcon> = { Heart, Lightbulb, ShieldCheck };

export type WhyChooseUsItem = {
  icon: LucideIcon;
  color: string;
  bg: string;
  t: string;
  d: string;
};

const FALLBACK: WhyChooseUsItem[] = [
  { icon: Heart,       color: "#f43f5e", bg: "rgba(244,63,94,0.10)",  t: "Client Obsession", d: "We succeed when you succeed. Every decision traces back to your outcomes, not our convenience."        },
  { icon: Lightbulb,   color: "#f59e0b", bg: "rgba(245,158,11,0.10)", t: "Deep Curiosity",   d: "We ask better questions, challenge assumptions, and consistently find solutions others miss."           },
  { icon: ShieldCheck, color: "#10b981", bg: "rgba(16,185,129,0.10)", t: "Radical Integrity",d: "Honest scopes. Transparent pricing. No surprises. Just dependable delivery, every single time."        },
];

export function useWhyChooseUs() {
  return useQuery<WhyChooseUsItem[]>({
    queryKey: ["content", "why-choose-us"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("why_choose_us")
        .select("*")
        .order("sort_order");

      if (error || !data?.length) return FALLBACK;

      return (data as unknown as Row[]).map((row, i) => {
        const fb = FALLBACK[i % FALLBACK.length];
        return {
          icon: ICON_MAP[row.icon_name ?? ""] ?? fb.icon,
          color: row.color ?? fb.color,
          bg: row.bg ?? fb.bg,
          t: row.title,
          d: row.description ?? fb.d,
        };
      });
    },
  });
}
