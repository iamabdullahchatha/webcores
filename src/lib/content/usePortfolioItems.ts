import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import type React from "react";

type Row = Database["public"]["Tables"]["portfolio_items"]["Row"];

export type PortfolioItem = {
  title: string;
  category: string;
  desc: string;
  gradientStyle: React.CSSProperties;
  metric: string;
};

const FALLBACK: PortfolioItem[] = [
  { title: "NorthPeak Platform",   category: "SaaS Dashboard",       desc: "Enterprise analytics platform serving 50K+ users with real-time data pipelines.",      gradientStyle: { background: "linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)" }, metric: "4× performance uplift"   },
  { title: "Dunescape E-Commerce", category: "Web Development",      desc: "High-converting luxury retail store built on custom WooCommerce architecture.",         gradientStyle: { background: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)" }, metric: "$2M+ first-year GMV"     },
  { title: "Fluxio CMS",           category: "CMS Development",      desc: "Headless content platform empowering a 40-person editorial team globally.",             gradientStyle: { background: "linear-gradient(135deg, #047857 0%, #0d9488 100%)" }, metric: "10× publishing speed"   },
  { title: "Loomline SEO",         category: "SEO & Growth",         desc: "Comprehensive organic strategy that tripled qualified traffic within 6 months.",         gradientStyle: { background: "linear-gradient(135deg, #c2410c 0%, #d97706 100%)" }, metric: "3× organic traffic"     },
  { title: "Hexa Brand System",    category: "Brand & Design",       desc: "Full visual identity and design system for a Series-A fintech startup.",                 gradientStyle: { background: "linear-gradient(135deg, #be185d 0%, #e11d48 100%)" }, metric: "NPS score +34 pts"      },
  { title: "Ascend ERP",           category: "Software Development", desc: "Custom ERP system unifying operations across 12 regional offices.",                      gradientStyle: { background: "linear-gradient(135deg, #0369a1 0%, #2563eb 100%)" }, metric: "40% ops cost reduction" },
];

export function usePortfolioItems() {
  return useQuery<PortfolioItem[]>({
    queryKey: ["content", "portfolio-items"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (error || !data?.length) return FALLBACK;

      return (data as unknown as Row[]).map((row) => ({
        title: row.title,
        category: row.category ?? "",
        desc: row.description ?? "",
        gradientStyle: {
          background: `linear-gradient(135deg, ${row.gradient_from ?? "#1d4ed8"} 0%, ${row.gradient_to ?? "#0891b2"} 100%)`,
        },
        metric: row.metric ?? "",
      }));
    },
  });
}
