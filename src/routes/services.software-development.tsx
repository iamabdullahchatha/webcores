import { createFileRoute } from "@tanstack/react-router";
import { Database } from "lucide-react";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/software-development")({
  head: () => ({
    meta: [
      { title: "Software Development — Webcore Solutions" },
      { name: "description", content: "Custom software and data management systems engineered to scale." },
    ],
  }),
  component: () => (
    <ServicePage
      eyebrow="Software Development"
      title="Custom software,"
      highlight="engineered to scale."
      icon={Database}
      intro="ERPs, dashboards, internal tools, SaaS platforms and data management systems — built with the rigor your business deserves."
      features={[
        { t: "SaaS Platforms", d: "Multi-tenant architectures with billing, RBAC and observability." },
        { t: "Internal Tools", d: "Operational dashboards that replace spreadsheets at scale." },
        { t: "Data Management", d: "ETL pipelines, warehouses, governance and BI." },
        { t: "API Development", d: "REST & GraphQL APIs documented to OpenAPI standards." },
        { t: "Mobile Apps", d: "Cross-platform with React Native or native when needed." },
        { t: "AI Integration", d: "LLM features, RAG pipelines and intelligent automations." },
      ]}
      deliverables={[
        "Product specification",
        "Architecture diagrams",
        "Production codebase + CI/CD",
        "Test coverage & QA reports",
        "Deployment & runbook docs",
      ]}
      tech={["TypeScript", "Node.js", "Python", "PostgreSQL", "Redis", "Kubernetes", "OpenAI", "tRPC"]}
      process={[
        { n: "01", t: "Discovery", d: "Requirements & success metrics." },
        { n: "02", t: "Architect", d: "System design & data models." },
        { n: "03", t: "Build", d: "Sprint-based delivery with demos." },
        { n: "04", t: "Test", d: "Unit, integration & load testing." },
        { n: "05", t: "Ship", d: "Deploy, monitor, iterate." },
      ]}
      faqs={[
        { q: "Do you sign NDAs?", a: "Always — before we discuss any specifics." },
        { q: "Who owns the source code?", a: "You do. Full IP transfer on delivery." },
      ]}
    />
  ),
});
