import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Database,
  Cloud,
  Cpu,
  Workflow,
  ShieldCheck,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";
import { getSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/uae-software-development-company")({
  head: () =>
    getSeoHead("uaeSoftwareDevelopmentCompany", {
      faqs: [
        {
          q: "What kind of software does a UAE software development company like Webcore Solutions build?",
          a: "Webcore Solutions builds custom SaaS platforms, internal tools, REST and GraphQL APIs, data systems, dashboards, and AI integrations for businesses across the UAE, the UK, the US, and Europe. We do not white-label or resell — every project is delivered by our in-house Dubai team.",
        },
        {
          q: "How long does a typical UAE software project take?",
          a: "Most software engagements run 10 to 20 weeks depending on scope. An MVP for a focused product can ship in 8 weeks; an enterprise platform with multiple integrations may take 16 to 24 weeks. We define milestones upfront so clients in the UAE and abroad always know what is shipping when.",
        },
        {
          q: "Can we hire your UAE software development team if we are based outside the UAE?",
          a: "Yes. Roughly half of Webcore Solutions' software work is for clients outside the UAE — including the United Kingdom, Europe, the United States, and Pakistan. Our process is async-friendly with overlapping working hours across regions.",
        },
      ],
    }),
  component: UaeSoftwareDevelopmentCompany,
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, type: "tween" as const, ease: [0.22, 1, 0.36, 1] as const },
});

const capabilities = [
  {
    icon: Code2,
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
    title: "Custom SaaS platforms",
    desc: "Multi-tenant SaaS products with payments, subscriptions, RBAC, audit logging, and clean admin tooling out of the box.",
  },
  {
    icon: Database,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
    title: "Data systems and APIs",
    desc: "PostgreSQL, MongoDB, ETL pipelines, REST and GraphQL APIs, real-time event streams with proper observability.",
  },
  {
    icon: Workflow,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    title: "Internal tools and automation",
    desc: "Operations dashboards, workflow automation, internal admin panels that replace messy spreadsheets and shared inboxes.",
  },
  {
    icon: Cpu,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
    title: "AI integrations",
    desc: "OpenAI and Anthropic API integrations, RAG systems, custom embeddings, and AI workflows that produce auditable outputs.",
  },
  {
    icon: Cloud,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.10)",
    title: "Cloud architecture",
    desc: "AWS, GCP, and Azure deployments with infrastructure-as-code, CI/CD pipelines, and cost-aware scaling.",
  },
  {
    icon: ShieldCheck,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.10)",
    title: "Security and compliance",
    desc: "GDPR-aware architecture, UAE Personal Data Protection Law alignment, OWASP-baseline application hardening.",
  },
];

function UaeSoftwareDevelopmentCompany() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[55vh] flex items-center">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />

        <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-20 md:pt-24 md:pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-7"
          >
            <Code2 className="h-3.5 w-3.5 text-primary" />
            UAE software development company · Since 2012
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "tween", ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            <span className="gradient-text">UAE software development</span> for serious systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Webcore Solutions is a UAE software development company building custom SaaS,
            APIs, data systems, and AI integrations from Dubai since 2012. In-house team,
            fixed-scope quotes, no offshore reselling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              Scope a UAE software project
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/services/software-development"
              className="group inline-flex items-center gap-2 rounded-2xl glass px-7 py-3.5 font-semibold transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              See full software service
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <motion.div {...fadeUp()} className="max-w-2xl mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            What our UAE software team delivers
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Six capabilities, one Dubai-based engineering team.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp(i * 0.06)}
              className="glass rounded-2xl p-6 hover:shadow-glow transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: c.bg, boxShadow: `0 4px 16px ${c.color}22` }}
              >
                <c.icon className="h-5 w-5" style={{ color: c.color }} />
              </div>
              <p className="text-base font-bold mb-2">{c.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY UAE SOFTWARE BUYERS PICK WEBCORE */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <motion.div {...fadeUp()} className="glass rounded-3xl p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Why UAE businesses pick Webcore Solutions for software
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
            What separates a UAE software company from a freelancer.
          </h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              The UAE software market has hundreds of capable freelancers and dozens of
              capable software development companies. For projects under AED 30,000, a
              freelancer is often the right answer. We tell prospective clients this on
              the first call.
            </p>
            <p>
              For projects above that line, the calculus changes. Multi-month builds need
              proper version control, code review, security baselines, infrastructure
              automation, documentation, and a team that does not vanish when one person
              gets sick. Most UAE freelancers cannot offer that. We can.
            </p>
            <p>
              Webcore Solutions is a registered Dubai software development company with
              a 25-person team. We have shipped 130+ custom software products since 2012,
              with measurable uptime, observable systems, and source code clients
              actually own at the end of the engagement.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-16 pb-24">
        <motion.div {...fadeUp()} className="relative glass rounded-3xl p-10 md:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 gradient-primary opacity-[0.05] pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Talk to the UAE software team.
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-7 leading-relaxed">
              45-minute scoping call. Fixed-scope quote within 72 hours. Source code and
              infrastructure handed over at launch.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              Request a software quote
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
