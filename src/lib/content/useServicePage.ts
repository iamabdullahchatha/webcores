import { useQuery, type QueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { serviceFallback } from "./seedFallback.generated";

import imgIt1       from "@/assets/it-1.webp";
import imgCms1      from "@/assets/cms-1.webp";
import imgWeb1      from "@/assets/web-1.webp";
import imgSoftware1 from "@/assets/software-1.webp";
import imgSeo1      from "@/assets/seo-1.webp";
import imgGraphics1 from "@/assets/graphics-1.webp";

type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
type SectionRow = Database["public"]["Tables"]["service_page_content"]["Row"];

const OVERVIEW_IMAGE_MAP: Record<string, string> = {
  "it-1":       imgIt1,
  "cms-1":      imgCms1,
  "web-1":      imgWeb1,
  "software-1": imgSoftware1,
  "seo-1":      imgSeo1,
  "graphics-1": imgGraphics1,
};

export function resolveServiceImage(slug: string | null | undefined): string {
  return OVERVIEW_IMAGE_MAP[slug ?? ""] ?? imgWeb1;
}

export type ServicePage = {
  service: ServiceRow;
  sections: SectionRow[];
};

async function queryFn(slug: string): Promise<ServicePage | null> {
  const { data: service, error: svcErr } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (svcErr || !service) return null;

  const { data: sections, error: secErr } = await supabase
    .from("service_page_content")
    .select("*")
    .eq("service_slug", slug)
    .eq("is_visible", true)
    .order("sort_order");

  if (secErr) return null;

  return {
    service: service as unknown as ServiceRow,
    sections: (sections ?? []) as unknown as SectionRow[],
  };
}

export function fetchServicePage(slug: string, qc: QueryClient) {
  return qc.prefetchQuery({
    queryKey: ["content", "service-page", slug],
    staleTime: 60_000,
    queryFn: () => queryFn(slug),
  });
}

export function useServicePage(slug: string) {
  return useQuery<ServicePage | null>({
    queryKey: ["content", "service-page", slug],
    staleTime: 60_000,
    // Show the seeded content during SSR / first paint so crawlers and users
    // see a real page instead of a skeleton. The live Supabase fetch still
    // runs and replaces this — the DB stays the source of truth.
    placeholderData: (prev) => prev ?? serviceFallback[slug] ?? undefined,
    queryFn: () => queryFn(slug),
  });
}
