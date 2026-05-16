import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Row = Database["public"]["Tables"]["testimonials"]["Row"];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  stars: number;
  image: string | null;
};

const HOME_FALLBACK: Testimonial[] = [
  // 5-star
  { name: "Layla Al-Mansoori", role: "Marketing Director, Khaleej Retail Group", quote: "After five months on our Arabic-English SEO rebuild, organic traffic from UAE searches climbed 84 percent. The Webcore team navigated our bilingual content workflow without missing a milestone.", stars: 5, image: null },
  { name: "Rohan Verma",       role: "Head of Product, FinTrack MENA",           quote: "Webcore Solutions delivered our investor dashboard in ten focused weeks. Two larger Dubai agencies had quoted us double that timeline, and our user NPS still jumped from 42 to 71 after launch.",   stars: 5, image: null },
  { name: "Hana Said",         role: "Founder, Saharaboutique",                  quote: "The refreshed storefront and new brand identity moved our checkout conversion rate from 1.6 to 4.2 percent. First-month revenue beat our internal forecast by almost forty percent.",                stars: 5, image: null },
  { name: "Daniel Whittaker",  role: "Operations Lead, Brightline Logistics UK", quote: "Webcore Solutions consolidated three legacy systems into one operations platform our regional teams actually use. Manual reconciliation hours dropped 60 percent and uptime stayed above 99.9 percent all year.", stars: 5, image: null },
  { name: "Sara Al-Hashimi",   role: "CEO, Pinnacle Properties Dubai",           quote: "Our new website went from wireframes to live in six weeks — well ahead of the GITEX deadline we were targeting. The Lighthouse score hit 97 on the first audit and leads from organic search doubled within ninety days.", stars: 5, image: null },
  { name: "James Okafor",      role: "Co-founder, Vestro Capital",               quote: "The brand identity Webcore built for our Series-A pitch was the first thing every investor commented on. Clean, authoritative, and completely distinct from anything else in the fintech space. We closed the round two weeks later.", stars: 5, image: null },
  // 4-star
  { name: "Nour Khalil",       role: "Content Manager, Gulf Media Network",      quote: "Switching to the headless CMS Webcore set up was a big change for our editorial team, but the onboarding sessions were thorough and patient. Publishing workflows are genuinely faster now — we ship content same-day instead of waiting on developers.", stars: 4, image: null },
  { name: "Priya Menon",       role: "E-commerce Director, Saffron Living",      quote: "The WooCommerce build is solid and our average load time dropped from 6.2 seconds to under 1.1. The project ran slightly over the initial scope because we kept adding features, but Webcore handled the change requests without complaint.", stars: 4, image: null },
  { name: "Tom Aldridge",      role: "Head of Growth, ClearRoute SaaS",          quote: "The SEO audit surfaced issues we had no idea existed — eleven critical crawl errors and a toxic backlink cluster from a previous agency. Three months of fixes later we moved from page four to page one for our main keyword.", stars: 4, image: null },
];

export function useTestimonials(pageScope: string = "home") {
  return useQuery<Testimonial[]>({
    queryKey: ["content", "testimonials", pageScope],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("page_scope", pageScope)
        .eq("is_active", true)
        .order("sort_order");

      if (error || !data?.length) {
        return pageScope === "home" ? HOME_FALLBACK : [];
      }

      return (data as unknown as Row[]).map((row) => ({
        name: row.name,
        role: row.role ?? "",
        quote: row.quote,
        stars: row.stars,
        image: row.avatar_url ?? null,
      }));
    },
  });
}
