import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import {
  Lightbulb, Layers, Globe, Code2, Search, Palette,
  type LucideIcon,
} from "lucide-react";

import imgItConsulting      from "@/assets/it-consulting.webp";
import imgCmsDevelopment    from "@/assets/cms-development.webp";
import imgWebDevelopment    from "@/assets/web-development.webp";
import imgSoftwareDev       from "@/assets/software-development.webp";
import imgSeo               from "@/assets/seo.webp";
import imgGraphicsDesign    from "@/assets/graphics-design.webp";

type Row = Database["public"]["Tables"]["services"]["Row"];

const ICON_MAP: Record<string, LucideIcon> = {
  Lightbulb, Layers, Globe, Code2, Search, Palette,
};

const IMAGE_MAP: Record<string, string> = {
  "it-consulting":        imgItConsulting,
  "cms-development":      imgCmsDevelopment,
  "web-development":      imgWebDevelopment,
  "software-development": imgSoftwareDev,
  "seo":                  imgSeo,
  "graphics-design":      imgGraphicsDesign,
};

export type Service = {
  icon: LucideIcon;
  color: string;
  bg: string;
  title: string;
  desc: string;
  tag: string;
  metric: string;
  image: string;
  to: string;
  cta: string;
};

const FALLBACK: Service[] = [
  { icon: Lightbulb, color: "#f59e0b", bg: "rgba(245,158,11,0.10)", title: "IT Consultation",     desc: "Cut through complexity with a roadmap built for scale. We align your tech strategy with your growth goals.",                                        tag: "Strategy",    metric: "3× faster decisions",    image: imgItConsulting,   to: "/services/it-consultation",      cta: "Plan your IT strategy"    },
  { icon: Layers,    color: "#8b5cf6", bg: "rgba(139,92,246,0.10)", title: "CMS Development",     desc: "Headless, composable content platforms that give your team full editorial control — without dev bottlenecks.",                                     tag: "Platform",    metric: "10× publishing speed",   image: imgCmsDevelopment, to: "/services/cms-development",      cta: "Tour our CMS work"        },
  { icon: Globe,     color: "#06b6d4", bg: "rgba(6,182,212,0.10)",  title: "Web Development",     desc: "High-performance websites and e-commerce stores designed to convert visitors into paying customers.",                                             tag: "Web",         metric: "Sub-1s load times",      image: imgWebDevelopment, to: "/services/web-development",      cta: "See website builds"       },
  { icon: Code2,     color: "#10b981", bg: "rgba(16,185,129,0.10)", title: "Software Development",desc: "Custom data systems and applications engineered to scale from day one — built on solid architecture.",                                          tag: "Engineering", metric: "99.9% uptime SLA",       image: imgSoftwareDev,    to: "/services/software-development", cta: "Read software cases"      },
  { icon: Search,    color: "#3b82f6", bg: "rgba(59,130,246,0.10)", title: "SEO & GEO",           desc: "Dominate search rankings locally and globally with data-driven organic growth strategies.",                                                        tag: "Growth",      metric: "Top 3 rankings",         image: imgSeo,            to: "/services/seo-geo",              cta: "Grow search visibility"   },
  { icon: Palette,   color: "#ec4899", bg: "rgba(236,72,153,0.10)", title: "Brand & Design",      desc: "Visual identities that communicate authority instantly — logos, brand systems, and marketing collateral.",                                        tag: "Design",      metric: "Brand recognition +40%", image: imgGraphicsDesign, to: "/services/graphic-design",       cta: "View design portfolio"    },
];

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ["content", "services"],
    staleTime: 5 * 60 * 1000,
    placeholderData: () => FALLBACK,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (error || !data?.length) return FALLBACK;

      return (data as unknown as Row[]).map((row, i) => {
        const fb = FALLBACK[i % FALLBACK.length];
        return {
          icon: ICON_MAP[row.icon_name ?? ""] ?? fb.icon,
          color: row.color ?? fb.color,
          bg: row.bg ?? fb.bg,
          title: row.title,
          desc: row.description ?? fb.desc,
          tag: row.tag ?? fb.tag,
          metric: row.metric ?? fb.metric,
          image: IMAGE_MAP[row.image_url ?? ""] ?? fb.image,
          to: row.href ?? fb.to,
          cta: row.cta_text ?? fb.cta,
        };
      });
    },
  });
}
