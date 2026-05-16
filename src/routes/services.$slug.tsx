import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { getStaticSeoHead, type PageKey } from "@/lib/seo";
import { useServicePage } from "@/lib/content";
import { DynamicSeo } from "@/components/DynamicSeo";
import { ServiceSections } from "@/components/service/sections";
import { SectionLabel } from "@/components/service/primitives";
import { ArrowLeft } from "lucide-react";

const SLUG_TO_PAGEKEY: Record<string, PageKey> = {
  "it-consultation":      "itConsultation",
  "cms-development":      "cmsDevelopment",
  "web-development":      "webDevelopment",
  "software-development": "softwareDevelopment",
  "seo-geo":              "seoGeo",
  "graphic-design":       "graphicDesign",
};

export const Route = createFileRoute("/services/$slug")({
  // TODO: When SSR/loaders land, pass page_seo_overrides data into head() so
  // title/description are SSR-rendered. Until then, DynamicSeo patches client-side.
  head: ({ params }) => {
    const key = SLUG_TO_PAGEKEY[params.slug];
    return key ? getStaticSeoHead(key) : {};
  },
  component: ServiceDetail,
});

function ServiceSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="relative min-h-[78vh] flex items-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-32 md:pt-24 md:pb-36 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-7 w-36 rounded-full bg-white/10" />
              <div className="space-y-3">
                <div className="h-14 w-4/5 rounded-xl bg-white/10" />
                <div className="h-14 w-3/5 rounded-xl bg-white/10" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-white/8" />
                <div className="h-4 w-5/6 rounded bg-white/8" />
                <div className="h-4 w-2/3 rounded bg-white/8" />
              </div>
              <div className="flex gap-2.5">
                {[1, 2, 3].map((i) => <div key={i} className="h-7 w-28 rounded-full bg-white/10" />)}
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-44 rounded-2xl bg-primary/40" />
                <div className="h-12 w-36 rounded-2xl bg-white/10" />
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-36 rounded-2xl bg-white/8 border border-white/10" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overview skeleton */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-5">
            <div className="h-4 w-24 rounded bg-muted/40" />
            <div className="space-y-2">
              <div className="h-8 w-3/4 rounded-lg bg-muted/30" />
              <div className="h-8 w-1/2 rounded-lg bg-muted/30" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-full rounded bg-muted/25" />
              <div className="h-3.5 w-5/6 rounded bg-muted/25" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-9 h-9 rounded-xl bg-muted/30 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 w-2/3 rounded bg-muted/30" />
                  <div className="h-3 w-full rounded bg-muted/20" />
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <div className="aspect-4/3 rounded-2xl bg-muted/25 border border-border/20" />
          </div>
        </div>
      </div>

      {/* Features skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-14 space-y-3">
          <div className="h-4 w-20 rounded bg-muted/40" />
          <div className="h-10 w-72 rounded-lg bg-muted/30" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-44 rounded-2xl bg-muted/20 border border-border/20" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading, isError } = useServicePage(slug);

  useEffect(() => {
    const svc = data?.service;
    if (!svc) return;
    if (svc.seo_title) {
      document.title = svc.seo_title;
    }
    if (svc.seo_description) {
      let el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
      }
      el.setAttribute("content", svc.seo_description);
    }
  }, [data?.service]);

  if (isLoading && !data?.sections?.length) {
    return (
      <Layout>
        <ServiceSkeleton />
      </Layout>
    );
  }

  if (isError || !data || !data.sections.length) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
          <SectionLabel>Not found</SectionLabel>
          <h1 className="text-3xl font-bold">This service doesn't exist</h1>
          <p className="mt-2 text-muted-foreground">
            It may have been moved or deactivated.
          </p>
          <Link
            to="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all services
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <DynamicSeo pageId={`service:${slug}`} />
      <ServiceSections sections={data.sections} />
    </Layout>
  );
}
