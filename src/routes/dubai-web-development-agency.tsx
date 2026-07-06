import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Gauge,
  ShoppingCart,
  Code2,
  Shield,
  Sparkles,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";
import { getSeoHead } from "@/lib/seo";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Route = createFileRoute("/dubai-web-development-agency")({
  head: () =>
    getSeoHead("dubaiWebDevAgency", {
      faqs: [
        {
          q: "What does a Dubai web development agency typically charge in 2026?",
          a: "Dubai web development pricing in 2026 ranges from AED 18,000 for a small marketing site to AED 250,000+ for a custom ecommerce or SaaS frontend. Webcore Solutions Dubai uses fixed-scope pricing with no hourly billing surprises, and we share a transparent quote after a 45-minute discovery call.",
        },
        {
          q: "Do you build websites for businesses outside Dubai?",
          a: "Yes. We are headquartered in Dubai but deliver web development for clients across the UAE, the UK, the US, Europe, and Pakistan. About 40 percent of our web work is for clients outside the UAE.",
        },
        {
          q: "What technologies does your Dubai web development team use?",
          a: "We build on Next.js and React for custom frontends, WordPress and WooCommerce for content-driven or ecommerce sites, and Shopify for catalogue-heavy retail. Every site is mobile-first, WCAG 2.2 AA accessible, and tuned for Core Web Vitals.",
        },
      ],
    }),
  component: DubaiWebDevAgency,
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
    icon: Globe,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
    title: "Business and marketing sites",
    desc: "Fast, responsive, SEO-ready websites built to rank on Google UAE and convert UAE-based visitors.",
  },
  {
    icon: ShoppingCart,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    title: "Ecommerce and WooCommerce",
    desc: "Storefronts tuned for AED checkout, COD workflows, VAT compliance, and Dubai-friendly payment gateways.",
  },
  {
    icon: Code2,
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
    title: "Custom React and Next.js builds",
    desc: "Componentised frontends, headless CMS integrations, and API-driven pages that scale beyond brochureware.",
  },
  {
    icon: Gauge,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
    title: "Core Web Vitals and accessibility",
    desc: "Sub-second loads, WCAG 2.2 AA accessibility, and Lighthouse 95+ scores on every project before launch.",
  },
  {
    icon: Shield,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.10)",
    title: "WordPress without the bloat",
    desc: "Custom Gutenberg blocks, editor-friendly admin, no drag-and-drop page builders that wreck performance.",
  },
  {
    icon: Sparkles,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.10)",
    title: "Arabic-English bilingual",
    desc: "Right-to-left layouts, dual-language content models, and Arabic-aware search and indexing.",
  },
];

function PageExplainer() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-20">
      <div className="glass rounded-3xl p-8 md:p-12 prose prose-slate dark:prose-invert max-w-none">
        <h2>What &ldquo;web development&rdquo; actually means at Webcore</h2>
        <p>
          When we say web development, we mean engineering, not page-builder assembly. This very
          website is built on the stack we recommend to most clients: React for the interface, Vite
          for the build, TanStack Router for type-safe routing, and Supabase for the database,
          authentication, and storage. It is a deliberate choice — we ship the architecture we run
          ourselves, so the performance and reliability you see here are the baseline, not a showcase.
        </p>
        <p>
          For content-heavy or ecommerce projects we also build on WordPress, WooCommerce, and
          Shopify, and we connect them to a{" "}
          <Link to="/services/cms-development">headless CMS</Link> when an editor team needs to move
          quickly without touching code. The stack follows the brief; the engineering standard does
          not change.
        </p>
        <h2>Bilingual Arabic and English, built in from the start</h2>
        <p>
          A UAE website frequently has to serve both Arabic and English audiences. Retrofitting
          right-to-left layout onto a left-to-right design is slow and fragile, so we plan RTL from
          the first wireframe: mirrored layouts, logical CSS properties, Arabic-aware typography, and
          dual-language content models that index separately for search. Done early, bilingual support
          costs a fraction of what it costs as an afterthought.
        </p>
        <h2>A business website versus a conversion-optimised one</h2>
        <p>
          Most agencies will build you a business website: it looks correct, lists your services, and
          loads. A conversion-optimised website is a different object. It is structured around a
          measurable goal — a booked call, a submitted quote, a completed checkout — with the page
          hierarchy, calls to action, form design, and load performance all arranged to serve that
          goal. We design for the second outcome, because a site that ranks but does not convert is an
          expensive brochure. A common example: two visually similar landing pages can differ by a
          factor of two or more in enquiry rate purely because one removed friction from the contact
          step and made the next action obvious. That difference is engineering, not decoration.
        </p>
        <h2>How a project runs</h2>
        <h3>Discovery to handover</h3>
        <p>
          Every build moves through six defined stages: discovery, a focused design sprint,
          development, quality assurance, launch, and handover. Each stage has a deliverable you sign
          off before the next begins, which is what makes a fixed-scope quote possible. There are no
          open-ended hourly phases where scope quietly expands, and because the scope is fixed, the
          incentive to pad hours simply does not exist.
        </p>
        <h3>Quality assurance and accessibility</h3>
        <p>
          Before launch, every site is tested across real devices and browsers, not just a desktop
          preview. We hold builds to WCAG 2.2 AA accessibility — keyboard navigation, colour contrast,
          semantic landmarks, and screen-reader labelling — because accessibility is both a legal
          expectation for UAE business sites and a measurable improvement to reach. Forms, error
          states, and edge cases are exercised deliberately rather than assumed to work.
        </p>
        <h3>Performance as a deliverable</h3>
        <p>
          <Link to="/services/web-development">Core Web Vitals</Link> are a contractual deliverable,
          not a post-launch nice-to-have. Every template is measured against the mobile thresholds for
          loading, interactivity, and visual stability before we will call it done. If a page does not
          pass, it does not ship.
        </p>
        <h2>What happens after launch</h2>
        <p>
          Handover means you own the code, the repository, the hosting accounts, and the documentation
          — there is no lock-in that forces you to stay. Beyond that we offer optional support
          retainers for updates, monitoring, security patching, and incremental improvements. Clients
          who prefer to take the site fully in-house can, and we hand over a codebase that a competent
          team can actually maintain.
        </p>
        <p>
          We also deploy to modern hosting that suits the build — static and edge-rendered front ends
          on platforms such as Vercel or Cloudflare, managed WordPress where the project calls for it —
          with SSL, backups, and a staging environment configured as standard. The goal is a site that
          is fast to launch, safe to change, and inexpensive to keep running for years rather than one
          that becomes a maintenance burden the moment the original team walks away.
        </p>
      </div>
    </section>
  );
}

function DubaiWebDevAgency() {
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
            <Globe className="h-3.5 w-3.5 text-primary" />
            Dubai web development agency · 12 years in UAE
          </motion.div>

          <motion.h1
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "tween", ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            <span className="gradient-text">Dubai web development</span> that ships and ranks.
          </motion.h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Webcore Solutions is a Dubai web development agency that has built 180+ websites
            for UAE businesses since 2012 — websites that ships on time and ranks on Google. Fixed-scope pricing, in-house team, Core Web
            Vitals on every release.
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
              Scope a Dubai web project
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/services/web-development"
              className="group inline-flex items-center gap-2 rounded-2xl glass px-7 py-3.5 font-semibold transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              Web development services in Dubai
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <motion.div {...fadeUp(0, prefersReduced)} className="max-w-2xl mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            What we build
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Every kind of Dubai website, under one roof.
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

      {/* WHY DUBAI BUSINESSES PICK WEBCORE */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <motion.div {...fadeUp(0, prefersReduced)} className="glass rounded-3xl p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Why Dubai businesses pick Webcore Solutions
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
            The honest version.
          </h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              Dubai has hundreds of web development agencies. Most are competent. A smaller group
              delivers work that earns client trust for years after launch. Webcore Solutions is in
              that second group, and we have 450+ projects and a 4.9-star average to show for it.
            </p>
            <p>
              We are not the cheapest Dubai web development option. Businesses searching for
              bargain-rate agency work will find dozens of freelancers and offshore resellers who
              undercut our quotes. For small, straightforward projects that is a legitimate choice.
              We refer those enquiries elsewhere rather than compete on price we cannot match without
              cutting corners.
            </p>
            <p>
              Where a Dubai web development agency like Webcore Solutions earns its rate: high-traffic
              WooCommerce or Shopify launches, custom Next.js platforms built for sub-one-second load
              times, WordPress migrations that preserve years of accumulated SEO equity, and brand
              sites that must meet UAE Federal Law No. 29 accessibility requirements.
            </p>
            <p>
              Those are the projects where twelve years of in-house UAE delivery, a fixed-scope quote
              process, and a senior team who answer Dubai timezone calls make the difference between
              a website that launches and a website that performs. Our process starts with architecture — we plan the data layer, routing, and performance targets before writing a single line of code. Every site we ship is tested across devices, optimised for Core Web Vitals, and built to be handed over cleanly with full documentation.
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
              Get a Dubai web development quote.
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-7 leading-relaxed">
              45-minute scoping call. Fixed-scope quote within 48 hours. No hourly billing.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              Request a Dubai web quote
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
