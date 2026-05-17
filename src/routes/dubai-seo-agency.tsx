import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  MapPin,
  Bot,
  Languages,
  BarChart3,
  FileSearch,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";
import { getSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/dubai-seo-agency")({
  head: () =>
    getSeoHead("dubaiSeoAgency", {
      faqs: [
        {
          q: "What does a Dubai SEO agency cost per month in 2026?",
          a: "Dubai SEO retainers in 2026 typically range from AED 6,000 to AED 30,000 per month depending on scope. Webcore Solutions Dubai offers fixed-scope SEO retainers with deliverables defined up front — no vague hourly bills, no guaranteed-ranking nonsense.",
        },
        {
          q: "Do you handle Arabic SEO as well as English?",
          a: "Yes. We build dual-language content models, right-to-left page templates, and Arabic-aware schema. Several of our UAE clients run bilingual SEO programs that index separately for Arabic and English search queries.",
        },
        {
          q: "What is GEO and why does our Dubai SEO agency care?",
          a: "GEO stands for Generative Engine Optimization — structuring content, entities, and schema so AI search engines like ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot can cite your business accurately. As a Dubai SEO agency, we treat GEO as an extension of traditional SEO, not a separate service.",
        },
      ],
    }),
  component: DubaiSeoAgency,
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, type: "tween" as const, ease: [0.22, 1, 0.36, 1] as const },
});

const capabilities = [
  {
    icon: FileSearch,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
    title: "Technical SEO audits",
    desc: "Crawlability, indexation, schema, Core Web Vitals, internal linking, rendering issues — fixed at the source.",
  },
  {
    icon: MapPin,
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
    title: "Local SEO for Dubai businesses",
    desc: "Google Business Profile optimization, UAE directory citations, local link building, NAP consistency.",
  },
  {
    icon: Bot,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
    title: "GEO and AI search optimization",
    desc: "Schema, entities, llms.txt, citation-ready content so ChatGPT, Perplexity, and Google AI Overviews surface your brand.",
  },
  {
    icon: Languages,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    title: "Arabic-English bilingual SEO",
    desc: "Dual-language indexing, hreflang setup, right-to-left content templates, Arabic-aware keyword research.",
  },
  {
    icon: BarChart3,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.10)",
    title: "Content strategy and execution",
    desc: "Topical authority mapping, long-tail UAE-specific content, in-house writers who understand the region.",
  },
  {
    icon: Search,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.10)",
    title: "Monthly performance reporting",
    desc: "Plain-language reports with rankings, traffic, conversions, and what to do next — no vanity metrics.",
  },
];

function DubaiSeoAgency() {
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
            <Search className="h-3.5 w-3.5 text-primary" />
            Dubai SEO agency · GEO-ready
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "tween", ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            <span className="gradient-text">Dubai SEO</span> for Google, Bing, and AI search.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Webcore Solutions is a Dubai SEO agency whose specialists combine technical SEO, local
            citations, Arabic-English content, and Generative Engine Optimization (GEO) for
            businesses in the UAE, UK, Europe, Pakistan, and the US. Fixed retainers, no guaranteed-ranking nonsense.
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
              Request an SEO audit
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/services/seo-geo"
              className="group inline-flex items-center gap-2 rounded-2xl glass px-7 py-3.5 font-semibold transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              See full SEO &amp; GEO service
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <motion.div {...fadeUp()} className="max-w-2xl mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            What our Dubai SEO agency delivers
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Technical depth, local context, AI readiness.
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

      {/* HONEST SECTION */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <motion.div {...fadeUp()} className="glass rounded-3xl p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            What we will not promise
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
            Honest expectations from a Dubai SEO agency.
          </h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              Most SEO agencies in Dubai quote a price and promise first-page rankings inside 30 days on Google, Bing, and AI search.
              That claim is either dishonest or relies on short-term tactics that will earn a manual
              penalty. Webcore Solutions does neither, and we say so on the first call.
            </p>
            <p>
              What our Dubai SEO retainer actually delivers: a full technical audit in weeks one and two,
              a prioritised implementation plan in month two, measurable crawl and indexation improvements
              by month three, and competitive ranking movements for target UAE queries typically between
              months four and six — depending on domain age, competition, and the starting baseline.
            </p>
            <p>
              For new domains entering competitive UAE markets — real estate, fintech, healthcare, legal —
              meaningful organic traction takes six to twelve months of consistent execution. We communicate
              this in writing before any engagement begins. SEO compounds like interest: the returns are
              real, but they require patience and discipline, not shortcuts that vanish after the next
              algorithm update. Our methodology combines technical audits, content gap analysis, and structured link-building — adapted for both traditional search and the AI-driven search results that are rapidly reshaping how businesses get found. We track rankings across Google, Bing, and AI answer engines so nothing slips through.
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
              Book a Dubai SEO discovery call.
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-7 leading-relaxed">
              45 minutes. We review your current site, run a quick crawl, and tell you
              where we would start. Whether you hire us or not.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              Book the Dubai SEO call
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
