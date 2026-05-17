import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import {
  Award, Users, Briefcase, Globe,
  type LucideIcon,
} from "lucide-react";

type Row = Database["public"]["Tables"]["home_stats"]["Row"];

const ICON_MAP: Record<string, LucideIcon> = {
  Award, Users, Briefcase, Globe,
};

export type HomeStat = {
  v: string;
  l: string;
  icon: LucideIcon;
  color: string;
  bg: string;
};

const FALLBACK: HomeStat[] = [
  { v: "12+",  l: "Years Experience",  icon: Award,     color: "#f59e0b", bg: "rgba(245,158,11,0.10)"  },
  { v: "450+", l: "Clients Worldwide", icon: Users,     color: "#06b6d4", bg: "rgba(6,182,212,0.10)"   },
  { v: "25+",  l: "Team Members",      icon: Briefcase, color: "#10b981", bg: "rgba(16,185,129,0.10)"  },
  { v: "5",    l: "Countries Served",  icon: Globe,     color: "#8b5cf6", bg: "rgba(139,92,246,0.10)"  },
];

export function useHomeStats() {
  return useQuery<HomeStat[]>({
    queryKey: ["content", "home-stats"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("home_stats")
        .select("*")
        .order("sort_order");

      if (error || !data?.length) return FALLBACK;

      // Filter out any placeholder/invalid rows (e.g. "New stat" created by accident)
      const validRows = (data as unknown as Row[]).filter(
        (row) => row.value && row.label && row.label !== "New stat" && row.value !== "0"
      );

      if (!validRows.length) return FALLBACK;

      return validRows.map((row, i) => ({
        v: row.value,
        l: row.label,
        icon: ICON_MAP[row.icon_name ?? ""] ?? FALLBACK[i % FALLBACK.length].icon,
        color: row.color ?? FALLBACK[i % FALLBACK.length].color,
        bg: row.bg ?? FALLBACK[i % FALLBACK.length].bg,
      }));
    },
  });
}
