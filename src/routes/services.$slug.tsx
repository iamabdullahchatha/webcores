import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { getStaticSeoHead, type PageKey } from "@/lib/seo";
import { useServicePage } from "@/lib/content";
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
  head: ({ params }) => {
    const key = SLUG_TO_PAGEKEY[params.slug];
    return key ? getStaticSeoHead(key) : {};
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading, isError } = useServicePage(slug);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="h-6 w-6 animate-spin-slow rounded-full border-2 border-primary border-t-transparent" />
        </div>
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
      <ServiceSections sections={data.sections} />
    </Layout>
  );
}
