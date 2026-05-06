import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Layers, ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown,
  Zap, Shield, Globe, Code2, Database, RefreshCw, Users,
  GitBranch, Cpu, BarChart3, FileText, Settings, Package,
  Star, Clock, MessageSquare,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";

export const Route = createFileRoute("/services/cms-development")({
  head: () => ({
    meta: [
      { title: "CMS Development — Webcore Solutions" },
      { name: "description", content: "Custom-fit content platforms built to evolve with your team." },
    ],
  }),
  component: CmsDevelopment,
});

/* ─── Data ──────────────────────────────────────────────────────── */
const features = [
  {
    icon: Database,
    t: "Headless CMS Architecture",
    d: "Sanity, Contentful, Strapi, Payload — we match the platform to your editorial workflow and front-end stack, not the other way around.",
  },
  {
    icon: FileText,
    t: "Custom Editorial UX",
    d: "Authoring interfaces shaped around your content model. Editors ship content faster; developers spend less time on support.",
  },
  {
    icon: GitBranch,
    t: "Workflow & Roles",
    d: "Multi-stage approvals, draft previews, scheduled publishing, localisation and granular role matrices — all built in.",
  },
  {
    icon: Zap,
    t: "Edge Performance",
    d: "ISR, on-demand revalidation and image pipelines deliver sub-second pages globally. Your CMS will never be the bottleneck.",
  },
  {
    icon: RefreshCw,
    t: "Zero-Downtime Migrations",
    d: "Moving from WordPress, Drupal or a custom legacy system. We write migration scripts, validate content parity, and cut over without disruption.",
  },
  {
    icon: Settings,
    t: "Deep Integrations",
    d: "DAMs, CRMs, marketing automation, analytics, e-commerce. Every tool in your stack plugged in cleanly via APIs and webhooks.",
  },
];

const deliverables = [
  "Content model & taxonomy design",
  "Custom editorial interface",
  "Role & permission matrix",
  "Migration scripts & runbook",
  "Editor training & documentation",
  "Post-launch support period",
];

const techStack = [
  { name: "Sanity",      color: "#f43f5e" },
  { name: "Contentful",  color: "#06b6d4" },
  { name: "Strapi",      color: "#8b5cf6" },
  { name: "Payload",     color: "#10b981" },
  { name: "Next.js",     color: "#f59e0b" },
  { name: "GraphQL",     color: "#ec4899" },
];

const processSteps = [
  { n: "01", t: "Audit",    d: "Content structure, editorial review, legacy debt.",       icon: BarChart3,  color: "#f59e0b" },
  { n: "02", t: "Model",    d: "Schemas, taxonomies, roles, locales.",                   icon: Database,   color: "#8b5cf6" },
  { n: "03", t: "Build",    d: "CMS platform + front-end integration.",                  icon: Code2,      color: "#06b6d4" },
  { n: "04", t: "Migrate",  d: "Content transfer, validation, zero-downtime cutover.",   icon: RefreshCw,  color: "#10b981" },
  { n: "05", t: "Train",    d: "Hands-on editor training, docs, ongoing support.",        icon: Users,      color: "#f43f5e" },
];

const stats = [
  { v: "50+",  l: "CMS projects delivered" },
  { v: "4×",   l: "Faster editorial cycles" },
  { v: "100%", l: "On-time migrations"      },
  { v: "12+",  l: "Years of CMS craft"      },
];

const faqs = [
  {
    q: "Which CMS platform do you recommend?",
    a: "It depends on team size, editorial workflows, integrations and budget. After a discovery call we'll match you to the right platform — we have no vendor bias. We're equally at home with Sanity, Contentful, Strapi or Payload.",
  },
  {
    q: "Can you migrate us from WordPress or Drupal?",
    a: "Yes — we routinely migrate from WordPress, Drupal and custom legacy systems. We write migration scripts, validate content parity and perform the cutover with zero downtime.",
  },
  {
    q: "How long does a CMS build typically take?",
    a: "A standard headless CMS project with content modelling, editorial UI and front-end integration typically takes 4–8 weeks. Enterprise platforms with complex workflows or large migrations are scoped individually.",
  },
  {
    q: "Will our editors need technical knowledge?",
    a: "No. We design the editorial interface specifically for your team's skill level. Most clients see a significant improvement in content velocity within the first week after go-live.",
  },
  {
    q: "Do you provide training and documentation?",
    a: "Yes — every CMS engagement includes live editor training sessions and comprehensive documentation. We also offer a retainer-based ongoing support package for maintenance and feature additions.",
  },
];

const testimonials = [
  { name: "Ahmed Khalil",  role: "Founder, Dunescape", quote: "Our editors went from dreading the old CMS to shipping content daily. Webcore rebuilt the entire system in 6 weeks.", photo: "/ahmed-khalil.webp" },
  { name: "Sarah Lin",     role: "CTO, NorthPeak",     quote: "The content model they designed has scaled perfectly as we've grown. Exactly what thoughtful architecture looks like.",  photo: "/sarah-lin.webp"    },
  { name: "Connor James",  role: "Managing Director",  quote: "Migration from our legacy system was completely seamless. Not a single piece of content was lost.",                       photo: "/connor-james.webp" },
];

/* ─── Helpers ────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.65, delay, type: "tween" as const, ease: [0.22, 1, 0.36, 1] as const },
});

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-bold uppercase tracking-widest text-primary mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      {children}
    </div>
  );
}

/* ─── 3D Tilt Card ───────────────────────────────────────────────── */
function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -8;
    const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  8;
    el.style.transform  = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px) scale(1.015)`;
    el.style.transition = "transform 0.05s linear";
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform  = "perspective(900px) rotateX(0) rotateY(0) translateZ(0) scale(1)";
    el.style.transition = "transform 0.45s cubic-bezier(0.23,1,0.32,1)";
  }
  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
      {children}
    </div>
  );
}

/* ─── FAQ Item ───────────────────────────────────────────────────── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      {...fadeUp(index * 0.07)}
      className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${
        open ? "border-primary/25 glass" : "border-border/40 glass hover:border-primary/20"
      }`}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full transition-all duration-300 ${open ? "gradient-primary opacity-100" : "opacity-0"}`} />
      <button
        onClick={() => setOpen(!open)}
        className="relative w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-primary/[0.03] transition-colors duration-200"
      >
        <span className="font-semibold text-sm md:text-base pr-4">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "gradient-primary" : "bg-primary/10 group-hover:bg-primary/15"}`}
        >
          <ChevronDown className={`h-4 w-4 ${open ? "text-primary-foreground" : "text-primary"}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden">
            <div className="px-6 pb-5 pt-4 text-sm text-muted-foreground leading-relaxed border-t border-border/30">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
function CmsDevelopment() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Layout>

      {/* ══════════════════════════ HERO ════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[78vh] flex items-center">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />

        {/* Ambient orbs */}
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.22, 0.45, 0.22] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-16 rounded-full pointer-events-none"
          style={{ width: 520, height: 520, background: "radial-gradient(circle, hsl(var(--primary)/0.14) 0%, transparent 70%)" }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.10, 0.22, 0.10] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 left-12 rounded-full pointer-events-none"
          style={{ width: 320, height: 320, background: "radial-gradient(circle, hsl(var(--primary)/0.10) 0%, transparent 70%)" }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-32 md:pt-24 md:pb-36">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Left — copy */}
              <div>
                <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.08, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-7">
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  CMS Development
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl md:text-6xl lg:text-[66px] font-bold leading-[1.04] tracking-tight">
                  Content systems{" "}
                  <span className="gradient-text">built to evolve.</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25, type: "tween", ease: "easeOut" }}
                  className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Headless, hybrid or traditional — we design CMS platforms that editors love to use
                  and developers are proud to maintain.
                </motion.p>

                {/* Pill badges */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.38, type: "tween", ease: "easeOut" }}
                  className="mt-7 flex flex-wrap gap-2.5">
                  {[
                    { icon: Zap,    label: "Headless-first"      },
                    { icon: Shield, label: "Zero-downtime migration" },
                    { icon: Globe,  label: "Edge performance"    },
                  ].map((p) => (
                    <span key={p.label}
                      className="inline-flex items-center gap-1.5 glass border border-border/40 rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground/80">
                      <p.icon className="h-3 w-3 text-primary" />
                      {p.label}
                    </span>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.48, type: "tween", ease: "easeOut" }}
                  className="mt-9 flex flex-wrap gap-4">
                  <Link to="/contact"
                    className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] text-sm">
                    Book a free consultation
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  <Link to="/services"
                    className="group inline-flex items-center gap-2 rounded-2xl glass border border-border/40 px-7 py-3.5 font-semibold hover:border-border/70 transition-all duration-200 hover:-translate-y-0.5 text-sm">
                    All services
                    <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-all duration-200" />
                  </Link>
                </motion.div>
              </div>

              {/* Right — floating stat cards */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                className="relative hidden md:grid grid-cols-2 gap-4">
                {/* Glow */}
                <div className="absolute -inset-6 gradient-primary opacity-[0.07] blur-3xl rounded-full pointer-events-none" />

                {stats.map((s, i) => (
                  <motion.div key={s.l}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    className="glass border border-border/30 rounded-2xl p-6 text-center cursor-default"
                    style={{ transform: "perspective(600px) rotateY(-4deg) rotateX(2deg)" }}>
                    <div className="text-3xl font-bold gradient-text mb-1">{s.v}</div>
                    <div className="text-xs text-muted-foreground leading-tight">{s.l}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════ FEATURES ════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <motion.div {...fadeUp()} className="mb-14">
          <SectionLabel>What We Build</SectionLabel>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Every capability<br />your content team needs.
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              From architecture to editor experience — we handle the full CMS lifecycle, start to finish.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.55, type: "tween", ease: "easeOut" }}
              className="group">
              <Card3D className="relative bg-card/60 backdrop-blur-sm border border-border/35 rounded-2xl p-7 h-full hover:border-border/65 transition-colors duration-300 overflow-hidden">
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-muted/60 border border-border/40 flex items-center justify-center mb-5 group-hover:border-border/70 transition-colors duration-300">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-2">{f.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.d}</p>
                {/* Bottom line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center bg-border/50" />
              </Card3D>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ DELIVERABLES + TECH ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Deliverables */}
          <motion.div {...fadeUp()}>
            <div className="glass border border-border/35 rounded-2xl p-8 h-full">
              <SectionLabel>Deliverables</SectionLabel>
              <h3 className="text-2xl font-bold mb-6">What you walk away with.</h3>
              <ul className="space-y-3.5">
                {deliverables.map((d, i) => (
                  <motion.li key={d}
                    initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.45, type: "tween", ease: "easeOut" }}
                    className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{d}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div {...fadeUp(0.1)}>
            <div className="glass border border-border/35 rounded-2xl p-8 h-full">
              <SectionLabel>Tech Stack</SectionLabel>
              <h3 className="text-2xl font-bold mb-2">Our core toolset.</h3>
              <p className="text-sm text-muted-foreground mb-7 leading-relaxed">
                We're platform-agnostic and vendor-neutral. We pick the right tool for your context — not the easiest one for us.
              </p>
              <div className="flex flex-wrap gap-3">
                {techStack.map((t, i) => (
                  <motion.div key={t.name}
                    initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4, type: "tween", ease: "easeOut" }}
                    whileHover={{ y: -3, scale: 1.06 }}
                    className="inline-flex items-center gap-2 bg-card/80 border border-border/40 rounded-xl px-4 py-2.5 cursor-default hover:border-border/70 transition-all duration-200">
                    <span className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                    <span className="text-sm font-semibold">{t.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Platform-agnostic callout */}
              <div className="mt-8 flex items-start gap-3 p-4 bg-primary/[0.05] border border-primary/15 rounded-xl">
                <Package className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">Platform-agnostic.</span>{" "}
                  We recommend based on your team's needs — not based on vendor relationships. You own 100% of your infrastructure.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════ PROCESS ═════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-18">
          <SectionLabel>Our Process</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">
            From audit to live —<br />five clear steps.
          </h2>
          <p className="mt-4 text-muted-foreground text-sm">
            A structured approach refined across 50+ CMS projects.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.3, type: "tween", ease: "easeOut" }}
            className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px
            bg-gradient-to-r from-transparent via-border/60 to-transparent origin-left" />

          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((p, i) => (
              <motion.div key={p.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1, duration: 0.5, type: "tween", ease: "easeOut" }}
                whileHover={{ y: -6 }} className="group relative text-center cursor-default">
                {/* Step bubble */}
                <div className="relative mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-5
                  group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${p.color}cc, ${p.color}88)`,
                    boxShadow: `0 6px 24px ${p.color}40`,
                  }}>
                  <p.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-1">{p.n}</div>
                <h3 className="font-bold text-sm mb-1.5">{p.t}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIALS ════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <motion.div {...fadeUp()} className="mb-12">
          <SectionLabel>Client Stories</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">What our clients say.</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55, type: "tween", ease: "easeOut" }}>
              <Card3D className="bg-card/60 backdrop-blur-sm border border-border/35 rounded-2xl p-6 h-full hover:border-border/65 transition-colors duration-300">
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-sm text-foreground/75 leading-relaxed mb-5 flex-1">
                  "{t.quote}"
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                  <img src={t.photo} alt={t.name}
                    className="h-9 w-9 rounded-full object-cover object-top shrink-0 ring-1 ring-border/30"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  <div>
                    <p className="font-semibold text-sm leading-none">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════ FAQs ════════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <SectionLabel>FAQs</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">
            Common questions<br />about CMS work.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto text-sm">
            Still have questions?{" "}
            <Link to="/contact" className="text-primary font-semibold hover:underline underline-offset-2">
              Just ask us directly.
            </Link>
          </p>
        </motion.div>

        <div className="space-y-3 relative">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════ CTA ═════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-4 py-10 pb-28">
        <motion.div {...fadeUp()}
          className="relative overflow-hidden rounded-2xl gradient-primary shadow-elegant">

          {/* Background detail */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-grid-cms" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid-cms)" />
            </svg>
            <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.13, 0.25, 0.13] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-14 -right-14 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <motion.div animate={{ scale: [1, 1.28, 1], opacity: [0.10, 0.18, 0.10] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white/10 blur-3xl" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-white/[0.06] pointer-events-none" />
          </div>

          {/* Two-col layout */}
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-10 md:px-12">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1
                text-[10px] font-bold uppercase tracking-widest text-white/70 mb-4">
                <Zap className="h-3 w-3 text-yellow-300" />
                Free consultation
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                Ready to modernise<br className="hidden md:block" /> your content platform?
              </h2>
              <p className="text-white/60 text-sm mt-2.5 leading-relaxed max-w-sm">
                Book a free 45-minute discovery call. We'll audit your current setup and recommend the right path forward.
              </p>
              <div className="flex items-center gap-6 mt-5">
                {[{ v: "50+", l: "CMS projects" }, { v: "4×", l: "Faster editing" }, { v: "100%", l: "On-time" }].map((s) => (
                  <div key={s.l}>
                    <p className="text-base font-bold text-white leading-none">{s.v}</p>
                    <p className="text-[10px] text-white/45 mt-0.5 uppercase tracking-wide">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}>
                <Link to="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-foreground
                  px-7 py-3 text-sm font-semibold shadow-elegant hover:opacity-95 transition-all duration-200 w-full">
                  Book free consultation
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}>
                <Link to="/services"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white/12 text-white
                  border border-white/20 px-7 py-3 text-sm font-semibold hover:bg-white/20 transition-all duration-200 w-full">
                  View all services
                  <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </Link>
              </motion.div>
              <div className="flex items-center justify-center gap-4 mt-1">
                {["No commitment", "Free of charge"].map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-[10px] text-white/45">
                    <CheckCircle2 className="h-3 w-3" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

    </Layout>
  );
}