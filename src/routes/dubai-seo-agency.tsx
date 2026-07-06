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
import { useReducedMotion } from "@/hooks/useReducedMotion";

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

const fadeUp = (delay = 0, reducedMotion = false) =>
  reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.6, delay, type: "tween" as const, ease: [0.22, 1, 0.36, 1] as const },
      };

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

function PageExplainer() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-20">
      <div className="glass rounded-3xl p-8 md:p-12 prose prose-slate dark:prose-invert max-w-none">
        <h2>Why SEO in Dubai is not the same as SEO in the UK or US</h2>
        <p>
          Search behaviour in the United Arab Emirates is bilingual by default. A Dubai audience
          routinely switches between English and Arabic within a single session, and the two
          languages index as separate documents: Arabic is written right-to-left, uses a different
          morphology, and rarely maps one-to-one onto an English keyword. An agency that treats
          Arabic as a translation layer rather than a parallel content model will miss the queries
          that actually convert. We build dual-language page templates with correct <code>hreflang</code>{" "}
          annotations so Google serves the right language version to the right user.
        </p>
        <p>
          The engine mix is different too. In the UAE, Google handles the large majority of search —
          well above 95% on mobile — so Bing-first tactics imported from some US markets are largely
          wasted effort here. What does matter is local citation consistency: Google Business Profile,
          UAE directories, and Arabic-language listings whose name, address, and phone details agree
          to the character. Inconsistent citations are one of the most common reasons a Dubai business
          with good content still fails to rank locally.
        </p>
        <h2>How our Dubai SEO process actually runs</h2>
        <h3>Audit, then a keyword map</h3>
        <p>
          Every retainer opens with a technical audit covering crawlability, indexation, schema
          coverage, internal linking, and rendering. Only once that baseline is clear do we build a
          keyword map: a document that assigns every priority query to a specific URL, in both
          languages, so two pages never compete for the same term. That map becomes the content
          calendar governing the next two quarters.
        </p>
        <h3>Schema, Core Web Vitals, and reporting</h3>
        <p>
          Structured data and page performance are treated as ranking inputs, not cosmetic extras. We
          add and validate schema, then push every template to pass{" "}
          <Link to="/services/web-development">Core Web Vitals</Link> on mobile, because a slow page
          caps the ceiling on everything else. Each month you receive a plain-language report:
          rankings, organic traffic, conversions, and the specific actions queued for the month ahead.
        </p>
        <h2>What results look like, and when</h2>
        <p>
          For a typical UAE B2B client we plan against a twelve-month curve. The first three months
          produce technical traction — cleaner indexation, resolved crawl errors, and early movement
          on low-competition terms. Months four to six bring competitive ranking gains on the mapped
          target queries. Genuine topical authority, the kind that holds through algorithm updates,
          accrues across the full year. New domains in competitive sectors such as real estate,
          fintech, and healthcare sit at the slower end of that range, and we say so in writing before
          any engagement begins.
        </p>
        <h2>Why GEO is urgent in the Gulf specifically</h2>
        <p>
          Adoption of AI answer engines — ChatGPT, Perplexity, and Google AI Overviews — has been fast
          among Gulf professionals, who skew young, mobile-first, and comfortable in English. That
          makes Generative Engine Optimisation a present-tense concern in the UAE rather than a future
          one. Our <Link to="/services/seo-geo">SEO and GEO programme</Link> structures entities,
          schema, and citation-ready prose so these engines can quote your business accurately instead
          of a competitor.
        </p>
        <p>
          In practice that means maintaining an <code>llms.txt</code> file, marking up entities with
          Organization and Service schema, and writing answer-shaped passages — a direct claim
          followed immediately by its supporting evidence — that an extractive model can lift cleanly
          into a generated response. We then monitor which engines actually cite the site and refine
          accordingly, because GEO visibility is measurable rather than mystical. The same structured,
          factual writing that helps an AI engine quote you also helps a human skim-reader and a
          traditional search crawler, so the work compounds across every surface at once.
        </p>
        <h2>Transparent, fixed retainers</h2>
        <p>
          We work on fixed-scope monthly retainers with deliverables defined up front. There is no
          hourly meter, no vague &ldquo;ongoing optimisation&rdquo; line, and no guaranteed-ranking
          promise — guarantees of that kind are either dishonest or rely on tactics that earn a
          penalty. You know what we will ship each month, and what it costs, before you sign.
        </p>
      </div>
    </section>
  );
}

function DubaiSeoAgency() {
  const prefersReduced = useReducedMotion();
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[55vh] flex items-center">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />

        <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-20 md:pt-24 md:pb-24">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-7"
          >
            <Search className="h-3.5 w-3.5 text-primary" />
            Dubai SEO agency · GEO-ready
          </motion.div>

          <motion.h1
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "tween", ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            <span className="gradient-text">Dubai SEO</span> for Google, Bing, and AI search.
          </motion.h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Webcore Solutions is a Dubai SEO agency whose specialists combine technical SEO, local
            citations, Arabic-English content, and Generative Engine Optimization (GEO) for
            businesses in the UAE, UK, Europe, Pakistan, and the US. Fixed retainers, no guaranteed-ranking nonsense.
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
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
              SEO &amp; GEO optimisation services Dubai
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <motion.div {...fadeUp(0, prefersReduced)} className="max-w-2xl mb-12">
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
              {...fadeUp(i * 0.06, prefersReduced)}
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
        <motion.div {...fadeUp(0, prefersReduced)} className="glass rounded-3xl p-8 md:p-12">
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

      <PageExplainer />

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-16 pb-24">
        <motion.div {...fadeUp(0, prefersReduced)} className="relative glass rounded-3xl p-10 md:p-12 text-center overflow-hidden">
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
