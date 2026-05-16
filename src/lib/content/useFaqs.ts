import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { Zap, ShieldCheck, Globe, type LucideIcon } from "lucide-react";

type Row = Database["public"]["Tables"]["faqs"]["Row"];

export type Faq = { q: string; a: string };

export type FaqCategory = {
  label: string;
  icon: LucideIcon;
  color: string;
  faqs: Faq[];
};

const CATEGORY_META: Record<string, { icon: LucideIcon; color: string }> = {
  Process: { icon: Zap,         color: "from-blue-600 to-cyan-500"     },
  Pricing: { icon: ShieldCheck, color: "from-violet-600 to-purple-500" },
  Global:  { icon: Globe,       color: "from-emerald-600 to-teal-500"  },
};

const HOME_FALLBACK: FaqCategory[] = [
  {
    label: "Process", icon: Zap, color: "from-blue-600 to-cyan-500",
    faqs: [
      { q: "How long does a typical project take?",    a: "Most engagements run 4–12 weeks depending on scope. We share a detailed timeline after the discovery call so you know exactly what to expect at every milestone." },
      { q: "Can you redesign an existing product?",    a: "Yes — we frequently rebuild legacy systems and refresh brand experiences end-to-end. We audit what exists, identify what's worth keeping, and rebuild the rest with precision." },
      { q: "What happens during the discovery call?",  a: "We spend 45 minutes understanding your goals, constraints, and current challenges. You'll leave with clarity on scope, timeline, and cost — whether you work with us or not." },
    ],
  },
  {
    label: "Pricing", icon: ShieldCheck, color: "from-violet-600 to-purple-500",
    faqs: [
      { q: "How do you price projects?",        a: "Fixed-price for well-defined scopes, retainer-based for evolving roadmaps. We provide transparent, itemised quotes after discovery — no hidden fees, ever." },
      { q: "Do you offer ongoing support?",     a: "Absolutely. We offer monthly retainers for maintenance, growth work, and feature development after launch. Most clients continue working with us long-term." },
      { q: "Is there a minimum project size?",  a: "We typically work with projects starting from $3,000 USD. For smaller needs we offer advisory sessions or point-in-time audits at a flat rate." },
    ],
  },
  {
    label: "Global", icon: Globe, color: "from-emerald-600 to-teal-500",
    faqs: [
      { q: "Do you work with international clients?", a: "Yes — we serve clients across Europe, the UK, America, Dubai and Pakistan with async-friendly workflows and overlapping time zone availability." },
      { q: "What technologies do you use?",          a: "Modern stacks: React, Next.js, Node.js, TypeScript, WordPress, WooCommerce, and cloud-native infrastructure. We choose the right tool for each project, not the trendiest one." },
      { q: "Can we meet in person?",                 a: "Our team is based in Dubai and Pakistan. We meet in-person with Dubai-based clients and arrange travel for larger engagements when needed." },
    ],
  },
];

export function useFaqs(pageScope: string = "home") {
  return useQuery<FaqCategory[]>({
    queryKey: ["content", "faqs", pageScope],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .eq("page_scope", pageScope)
        .eq("is_active", true)
        .order("sort_order");

      if (error || !data?.length) {
        return pageScope === "home" ? HOME_FALLBACK : [];
      }

      const grouped: Record<string, Faq[]> = {};
      for (const row of data as unknown as Row[]) {
        const cat = row.category ?? "General";
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push({ q: row.question, a: row.answer });
      }

      return Object.entries(grouped).map(([label, faqs]) => ({
        label,
        icon: CATEGORY_META[label]?.icon ?? Zap,
        color: CATEGORY_META[label]?.color ?? "from-blue-600 to-cyan-500",
        faqs,
      }));
    },
  });
}
