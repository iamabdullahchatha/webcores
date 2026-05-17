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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, type: "tween" as const, ease: [0.22, 1, 0.36, 1] as const },
});

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

function DubaiWebDevAgency() {
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
            <Globe className="h-3.5 w-3.5 text-primary" />
            Dubai web development agency · 12 years in UAE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "tween", ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            <span className="gradient-text">Dubai web development</span> that ships and ranks.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Webcore Solutions is a Dubai web development agency that has built 180+ websites
            for UAE businesses since 2012. Fixed-scope pricing, in-house team, Core Web
            Vitals on every release.
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
              Scope a Dubai web project
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/services/web-development"
              className="group inline-flex items-center gap-2 rounded-2xl glass px-7 py-3.5 font-semibold transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              See full web development service
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <motion.div {...fadeUp()} className="max-w-2xl mb-12">
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

      {/* WHY DUBAI BUSINESSES PICK WEBCORE */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <motion.div {...fadeUp()} className="glass rounded-3xl p-8 md:p-12">
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
              a website that launches and a website that performs.
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
