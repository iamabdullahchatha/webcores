import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/it-consultation")({
  head: () => ({
    meta: [
      { title: "IT Consultation — Webcore Solutions" },
      { name: "description", content: "Strategic technology guidance, audits and roadmaps for scaling teams." },
    ],
  }),
  component: () => (
    <ServicePage
      eyebrow="IT Consultation"
      title="Strategic clarity for"
      highlight="modern technology."
      icon={Lightbulb}
      intro="From architecture audits to vendor selection, we help leadership teams make confident technology decisions that scale with the business."
      features={[
        { t: "Tech Audits", d: "Deep reviews of your stack, code health, security posture and team workflows." },
        { t: "Architecture Design", d: "Future-proof system blueprints with clear trade-offs documented." },
        { t: "Cloud Strategy", d: "AWS, Azure, GCP and hybrid plans tuned to your cost and growth model." },
        { t: "Vendor Selection", d: "Unbiased evaluation of SaaS tools, agencies and integration partners." },
        { t: "Team Augmentation", d: "Embed senior engineers and strategists with your team on demand." },
        { t: "Roadmap Planning", d: "12–24 month delivery roadmaps aligned to business outcomes." },
      ]}
      deliverables={[
        "Executive briefing deck",
        "Technical architecture document",
        "Risk & dependency register",
        "Quarterly roadmap with cost model",
        "30/60/90 day action plan",
      ]}
      tech={["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Datadog", "Snowflake"]}
      process={[
        { n: "01", t: "Discovery", d: "Stakeholder interviews & goals." },
        { n: "02", t: "Audit", d: "Stack, code, ops & vendors." },
        { n: "03", t: "Synthesis", d: "Findings, risks & opportunities." },
        { n: "04", t: "Roadmap", d: "Prioritized plan with costs." },
        { n: "05", t: "Enablement", d: "Workshops & ongoing support." },
      ]}
      faqs={[
        { q: "How long does a typical engagement run?", a: "Most audits take 2–4 weeks; ongoing advisory runs monthly." },
        { q: "Do you offer fractional CTO services?", a: "Yes — we embed senior leaders 1–3 days per week." },
      ]}
    />
  ),
});
