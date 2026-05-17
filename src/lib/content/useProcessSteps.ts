import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { Sparkles, Lightbulb, Code2, Zap, type LucideIcon } from "lucide-react";

type Row = Database["public"]["Tables"]["process_steps"]["Row"];

const ICON_MAP: Record<string, LucideIcon> = { Sparkles, Lightbulb, Code2, Zap };

export type ProcessStep = {
  n: string;
  t: string;
  d: string;
  icon: LucideIcon;
  color: string;
};

const FALLBACK: ProcessStep[] = [
  { n: "01", t: "Discovery Call",   d: "We map your vision, constraints and success metrics in a focused 45-min session.",                                              icon: Sparkles,  color: "#ec4899" },
  { n: "02", t: "Strategy & Scope", d: "A clear technical plan, architecture decisions and timeline — before a single line of code.",                                   icon: Lightbulb, color: "#f59e0b" },
  { n: "03", t: "Build & Iterate",  d: "Weekly demos, async updates, and continuous feedback loops keep you fully in control.",                                         icon: Code2,     color: "#10b981" },
  { n: "04", t: "Launch & Scale",   d: "QA, performance hardening, live deployment, and ongoing support built into every engagement.",                                  icon: Zap,       color: "#8b5cf6" },
];

export function useProcessSteps() {
  return useQuery<ProcessStep[]>({
    queryKey: ["content", "process-steps"],
    staleTime: 5 * 60 * 1000,
    placeholderData: () => FALLBACK,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("process_steps")
        .select("*")
        .order("sort_order");

      if (error || !data?.length) return FALLBACK;

      return (data as unknown as Row[]).map((row, i) => {
        const fb = FALLBACK[i % FALLBACK.length];
        return {
          n: row.number,
          t: row.title,
          d: row.description ?? fb.d,
          icon: ICON_MAP[row.icon_name ?? ""] ?? fb.icon,
          color: row.color ?? fb.color,
        };
      });
    },
  });
}
