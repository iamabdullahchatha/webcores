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
  {
    title: "Pinnacle Properties",
    category: "Web Development",
    desc: "High-performance real-estate marketing site with Lighthouse 97, bilingual Arabic-English content and a custom property search — live six weeks from brief.",
    gradientStyle: { background: "linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)" },
    metric: "2× organic leads in 90 days",
  },
  {
    title: "Gulf Media Network CMS",
    category: "CMS Development",
    desc: "Headless Sanity platform for a 40-person editorial team publishing across 3 regional sites. Role-based workflows replaced a ticket queue that cost 2 hours per story.",
    gradientStyle: { background: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)" },
    metric: "10× publishing speed",
  },
  {
    title: "FinTrack MENA Dashboard",
    category: "Software Development",
    desc: "Custom SaaS analytics platform with real-time data pipelines, multi-tenant auth, and a Figma-to-code design system — delivered in 10 weeks for a Series-A fintech.",
    gradientStyle: { background: "linear-gradient(135deg, #047857 0%, #0d9488 100%)" },
    metric: "NPS 42 → 71 post-launch",
  },
  {
    title: "ClearRoute SEO & GEO",
    category: "SEO & GEO",
    desc: "Full technical SEO overhaul, AI-search optimisation and authority link-building for a B2B SaaS — from page 4 to position 1 for their primary keyword in 90 days.",
    gradientStyle: { background: "linear-gradient(135deg, #c2410c 0%, #d97706 100%)" },
    metric: "3× qualified organic traffic",
  },
  {
    title: "Vestro Capital Brand",
    category: "Graphic Design",
    desc: "Full visual identity — logo suite, brand guidelines, investor deck and business collateral — built for a Series-A fintech pitch. Closed the round within two weeks of launch.",
    gradientStyle: { background: "linear-gradient(135deg, #be185d 0%, #e11d48 100%)" },
    metric: "Series-A closed in 2 weeks",
  },
  {
    title: "Brightline Ops Platform",
    category: "IT Consultation & Software",
    desc: "Technology audit across 12 regional offices followed by a custom ERP build that unified operations, eliminated three legacy systems and cut reconciliation time by 60%.",
    gradientStyle: { background: "linear-gradient(135deg, #0369a1 0%, #2563eb 100%)" },
    metric: "60% ops cost reduction",
  },
];

export function usePortfolioItems() {
  return useQuery<PortfolioItem[]>({
    queryKey: ["content", "portfolio-items"],
    staleTime: 5 * 60 * 1000,
    placeholderData: () => FALLBACK,
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
