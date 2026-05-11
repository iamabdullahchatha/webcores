import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Database, ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown,
  Zap, Star, Layers, GitBranch, Settings, Package, Eye,
  FileText, TrendingUp, Shield, Globe, BarChart3,
  Cpu, Code2, Server, Workflow, BrainCircuit, Smartphone,
  Lock, Award,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";
import { getSeoHead } from "@/lib/seo";
import imgSoftware1 from "@/assets/software-1.webp";

export const Route = createFileRoute("/services/software-development")({
  head: () => getSeoHead("softwareDevelopment", { faqs }),
  component: SoftwareDevelopment,
});

/* ─── Data ──────────────────────────────────────────────────────────── */
const features = [
  {
    icon: Globe,
    color: "#6366f1",
    bg: "rgba(99,102,241,0.10)",
    t: "SaaS Platforms",
    d: "Multi-tenant architectures with billing, role-based access control and full observability — built to scale from launch to enterprise without rewriting the core.",
  },
  {
    icon: BarChart3,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
    t: "Internal Tools",
    d: "Operational dashboards, admin panels and workflow automation that replace brittle spreadsheets — and actually get used by the teams they're built for.",
  },
  {
    icon: Layers,
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
    t: "Data Management",
    d: "ETL pipelines, data warehouses, governance frameworks and BI tooling — transforming raw data into decisions that compound over time.",
  },
  {
    icon: Code2,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    t: "API Development",
    d: "REST and GraphQL APIs documented to OpenAPI standards — versioned, typed and built for reliability at the integration layer your partners depend on.",
  },
  {
    icon: Smartphone,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.10)",
    t: "Mobile Apps",
    d: "Cross-platform experiences with React Native for speed, or native Swift and Kotlin where performance demands it — without compromise at either end.",
  },
  {
    icon: BrainCircuit,
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.10)",
    t: "AI Integration",
    d: "LLM-powered features, RAG pipelines and intelligent automations embedded directly into your product — grounded, reliable and built for production.",
  },
];

const processSteps = [
  { n: "01", t: "Discovery",  d: "Requirements, success metrics and technical constraints.", icon: Eye,    color: "#6366f1" },
  { n: "02", t: "Architect",  d: "System design, data models and infrastructure blueprint.",  icon: Server, color: "#06b6d4" },
  { n: "03", t: "Build",      d: "Sprint-based delivery with fortnightly live demos.",        icon: Code2,  color: "#f59e0b" },
  { n: "04", t: "Test",       d: "Unit, integration, load and security testing.",             icon: Shield, color: "#10b981" },
  { n: "05", t: "Ship",       d: "Deploy, monitor, iterate — and own what you've built.",    icon: Zap,    color: "#f43f5e" },
];

const deliverables = [
  "Product specification & technical requirements",
  "System architecture diagrams",
  "Production codebase with CI/CD pipeline",
  "Test coverage & QA reports",
  "Deployment runbook & ops documentation",
  "30-day post-launch support window",
  "Full IP transfer & source code handoff",
];

const techStack = [
  { name: "TypeScript", color: "#6366f1" },
  { name: "Node.js",    color: "#10b981" },
  { name: "Python",     color: "#f59e0b" },
  { name: "PostgreSQL", color: "#06b6d4" },
  { name: "Redis",      color: "#f43f5e" },
  { name: "Kubernetes", color: "#8b5cf6" },
  { name: "OpenAI",     color: "#ec4899" },
  { name: "tRPC",       color: "#f59e0b" },
];

const stats = [
  { v: "200+", l: "Products shipped"      },
  { v: "99%",  l: "On-time delivery rate" },
  { v: "4–8w", l: "MVP to production"     },
  { v: "100%", l: "IP owned by you"       },
];

const testimonials = [
  {
    name: "Ahmed Khalil",
    role: "Founder, Dunescape",
    quote: "Webcore rebuilt our entire data pipeline in six weeks. The performance improvement was immediate and the codebase is cleaner than anything we'd shipped internally. Exceptional work.",
    photo: "/ahmed-khalil.webp",
    stars: 5,
  },
  {
    name: "Sarah Lin",
    role: "CTO, NorthPeak",
    quote: "We needed a complex SaaS platform built fast without cutting corners. Webcore delivered production-ready code with tests, docs and CI/CD from day one. They raised the bar for our whole engineering org.",
    photo: "/sarah-lin.webp",
    stars: 5,
  },
  {
    name: "Connor James",
    role: "Managing Director",
    quote: "The internal tooling they built replaced five different spreadsheets and halved our ops overhead. ROI was visible within the first month. I wish we'd engaged them two years earlier.",
    photo: "/connor-james.webp",
    stars: 5,
  },
];

const faqs = [
  {
    q: "Do you sign NDAs before discussing our project?",
    a: "Always — we sign a mutual NDA before any sensitive technical details are shared. We've worked with pre-IPO startups, listed companies and government agencies. Confidentiality is treated as a baseline, not a negotiation.",
  },
  {
    q: "Who owns the source code?",
    a: "You do. Full intellectual property transfer is included on final delivery. Every line of code, every design asset, every database schema belongs to you outright — no licensing restrictions, no ongoing fees.",
  },
  {
    q: "How do you handle changes to scope mid-project?",
    a: "We use a lightweight change request process. Minor scope adjustments are absorbed into the sprint; material changes are scoped, estimated and approved before work begins. You always know what something will cost before we build it.",
  },
  {
    q: "What does the typical engagement timeline look like?",
    a: "Most MVPs take 4–8 weeks from kickoff to production deployment. Larger platforms with complex integrations typically run 12–20 weeks. We scope each project precisely during discovery so you have a reliable timeline before committing.",
  },
  {
    q: "Do you offer ongoing support and maintenance after launch?",
    a: "Yes — we offer retainer-based maintenance packages covering bug fixes, dependency updates, security patches and performance monitoring. We can also embed engineers with your team long-term as the product scales.",
  },
  {
    q: "Can you work alongside our existing in-house team?",
    a: "Absolutely. Many of our engagements are collaborative — we integrate into your Slack, your Git workflow and your sprint ceremonies. We're equally comfortable leading a build or augmenting a team that already has strong engineers.",
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────── */
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

/* ─── 3D Tilt Card ───────────────────────────────────────────────────── */
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

/* ─── FAQ Item ───────────────────────────────────────────────────────── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      {...fadeUp(index * 0.07)}
      className={`relative border rounded-2xl overflow-hidden transition-all duration-300 ${
        open ? "border-primary/25 glass" : "border-border/40 glass hover:border-primary/20"
      }`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full transition-all duration-300 ${open ? "gradient-primary opacity-100" : "opacity-0"}`} />
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="relative w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-primary/3 transition-colors duration-200"
      >
        <span className="font-semibold text-sm md:text-base pr-4">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "gradient-primary" : "bg-primary/10 hover:bg-primary/15"}`}
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

/* ─── Testimonial Photo ──────────────────────────────────────────────── */
function TestimonialPhoto({ photo, name }: { photo: string; name: string }) {
  const [err, setErr] = useState(false);
  return err ? (
    <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0 ring-1 ring-border/30">
      {name[0]}
    </div>
  ) : (
    <img src={photo} alt={name} onError={() => setErr(true)} loading="lazy" decoding="async"
      className="h-9 w-9 rounded-full object-cover object-top shrink-0 ring-1 ring-border/30" />
  );
}

/* ─── Software Overview (image section) ─────────────────────────────── */
function SoftwareOverview() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 pb-8">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── Left: narrative copy ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <SectionLabel>Our Engineering</SectionLabel>

          <h2 className="text-3xl md:text-[2.25rem] font-bold leading-tight mb-5">
            Production-grade code,{" "}
            <span className="gradient-text">built to last.</span>
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
            Every system we ship is architected for the long term — clean separation of
            concerns, comprehensive test coverage and CI/CD pipelines that let your team
            move fast without breaking things.
          </p>

          {/* Three proof-point rows */}
          <ul className="space-y-5 mb-9">
            {[
              {
                icon: Lock, color: "#6366f1",
                label: "100% IP ownership on delivery",
                sub: "Every file, schema and line of code belongs to you outright — no licensing fees or lock-in",
              },
              {
                icon: Shield, color: "#06b6d4",
                label: "Production-grade from day one",
                sub: "Tests, CI/CD, observability and security baked in — not bolted on before launch",
              },
              {
                icon: GitBranch, color: "#10b981",
                label: "Sprint-based, transparent delivery",
                sub: "Fortnightly demos, clear milestones and a change process that keeps scope under control",
              },
            ].map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 + i * 0.09, duration: 0.5, ease: "easeOut" as const }}
                className="flex items-start gap-4 group"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200"
                  style={{ background: `${item.color}18`, boxShadow: `0 2px 10px ${item.color}20` }}
                >
                  <item.icon className="h-4 w-4" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none mb-1.5">{item.label}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{item.sub}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Compact stat row */}
          <div className="flex items-center gap-8 pt-6 border-t border-border/25">
            {[
              { v: "200+", l: "Products shipped",    color: "#6366f1" },
              { v: "4–8w", l: "MVP to production",   color: "#f59e0b" },
              { v: "99%",  l: "On-time delivery",    color: "#10b981" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-xl font-bold leading-none" style={{ color: s.color }}>{s.v}</p>
                <p className="text-[11px] text-muted-foreground mt-1.5 leading-none">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: contained image card ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative"
        >
          {/* Soft ambient glow */}
          <div
            className="absolute -inset-5 rounded-3xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 70% at 55% 45%, rgba(6,182,212,0.12) 0%, transparent 72%)",
              filter: "blur(24px)",
            }}
          />

          {/* Card wrapper */}
          <div
            className="relative rounded-2xl overflow-hidden border border-border/25 group"
            style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)" }}
          >
            {/* Image — 4:3 aspect */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
              <img
                src={imgSoftware1}
                alt="Software engineering team building a production-grade system"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="eager"
                decoding="async"
              />

              {/* Bottom gradient for caption readability */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.12) 38%, transparent 66%)",
                }}
              />

              {/* Subtle brand tint — top-left */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(130deg, rgba(6,182,212,0.20) 0%, transparent 48%)",
                }}
              />

              {/* Top-right: live indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-md border border-white/12"
                style={{ background: "rgba(0,0,0,0.38)" }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-[10px] font-semibold text-white/80 tracking-wide">Production-grade</span>
              </motion.div>

              {/* Bottom-left: caption badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                className="absolute bottom-3.5 left-3.5 flex items-center gap-2 rounded-md px-3 py-1.5 backdrop-blur-md border border-cyan-400/30"
                style={{ background: "rgba(6,100,180,0.48)" }}
              >
                <Database className="h-2.5 w-2.5 text-cyan-300 shrink-0" />
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/90">
                  Software Development
                </span>
              </motion.div>
            </div>

            {/* Card footer: three metrics */}
            <div
              className="grid grid-cols-3 divide-x divide-border/25"
              style={{ background: "hsl(var(--card))" }}
            >
              {[
                { v: "200+",    l: "Products shipped",    color: "#6366f1" },
                { v: "99%",     l: "On-time delivery",    color: "#06b6d4" },
                { v: "30 days", l: "Post-launch support", color: "#10b981" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.62 + i * 0.07, duration: 0.4, ease: "easeOut" as const }}
                  className="flex flex-col items-center py-4 px-3"
                >
                  <span
                    className="text-[15px] font-bold leading-none tabular-nums"
                    style={{ color: s.color }}
                  >
                    {s.v}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-1.5 text-center leading-snug">
                    {s.l}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative offset border */}
          <div
            className="absolute -bottom-2.5 -right-2.5 w-20 h-20 rounded-xl pointer-events-none border border-primary/10"
            style={{ background: "rgba(6,182,212,0.03)" }}
          />
        </motion.div>

      </div>
    </section>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────── */
function SoftwareDevelopment() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Layout>

      {/* ════════════════════════════════ HERO ════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[78vh] flex items-center">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />

        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.22, 0.45, 0.22] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-16 rounded-full pointer-events-none"
          style={{ width: 520, height: 520, background: "radial-gradient(circle, hsl(var(--primary)/0.14) 0%, transparent 70%)" }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.10, 0.22, 0.10] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 left-12 rounded-full pointer-events-none"
          style={{ width: 320, height: 320, background: "radial-gradient(circle, hsl(var(--primary)/0.10) 0%, transparent 70%)" }} />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-1/3 left-1/4 rounded-full pointer-events-none"
          style={{ width: 280, height: 280, background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-32 md:pt-24 md:pb-36">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Left — copy */}
              <div>
                <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.08, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-7">
                  <Database className="h-3.5 w-3.5 text-primary" />
                  Software Development
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl md:text-6xl lg:text-[66px] font-bold leading-[1.04] tracking-tight">
                  Custom software,{" "}
                  <span className="gradient-text">engineered to scale.</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25, type: "tween", ease: "easeOut" }}
                  className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                  ERPs, dashboards, internal tools, SaaS platforms and data management systems
                  — built with the rigour your business deserves, and the velocity your roadmap demands.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.38, type: "tween", ease: "easeOut" }}
                  className="mt-7 flex flex-wrap gap-2.5">
                  {[
                    { icon: Lock,      label: "Full IP ownership"          },
                    { icon: Shield,    label: "Production-grade from day 1" },
                    { icon: GitBranch, label: "CI/CD included"              },
                  ].map((p) => (
                    <span key={p.label}
                      className="inline-flex items-center gap-1.5 glass border border-border/40 rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground/80">
                      <p.icon className="h-3 w-3 text-primary" />
                      {p.label}
                    </span>
                  ))}
                </motion.div>

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
                    <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </motion.div>
              </div>

              {/* Right — floating stat cards */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                className="relative hidden md:grid grid-cols-2 gap-4">
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

      {/* ════════════════ SOFTWARE OVERVIEW (image section) ════════════════ */}
      <SoftwareOverview />

      {/* ═══════════════════════════════ FEATURES ═════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <motion.div {...fadeUp()} className="mb-14">
          <SectionLabel>What We Build</SectionLabel>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Every engineering capability,<br />in one team.
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              From a focused internal tool to a full SaaS platform — we cover every layer of the stack with senior engineers who've done it before.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.55, type: "tween", ease: "easeOut" }}
              className="group">
              <Card3D className="relative bg-card/60 backdrop-blur-sm border border-border/35 rounded-2xl p-7 h-full hover:border-border/60 transition-all duration-300 overflow-hidden">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl opacity-[0.05] pointer-events-none"
                  style={{ background: f.color }} />
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: f.bg, boxShadow: `0 4px 16px ${f.color}18` }}>
                    <f.icon className="h-5 w-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="font-bold text-base mb-2">{f.t}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.d}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                  style={{ background: `linear-gradient(to right, transparent, ${f.color}55, transparent)` }} />
              </Card3D>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════ DELIVERABLES + TECH STACK ══════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">

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

          <motion.div {...fadeUp(0.1)}>
            <div className="glass border border-border/35 rounded-2xl p-8 h-full">
              <SectionLabel>Tech Stack</SectionLabel>
              <h3 className="text-2xl font-bold mb-2">Our engineering toolset.</h3>
              <p className="text-sm text-muted-foreground mb-7 leading-relaxed">
                Battle-tested technologies chosen for reliability, ecosystem depth and long-term maintainability — not hype cycles.
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
              <div className="mt-8 flex items-start gap-3 p-4 bg-primary/5 border border-primary/15 rounded-xl">
                <Lock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">100% IP transfer on delivery.</span>{" "}
                  Every file, every schema, every line of code belongs to you outright. No licensing fees, no vendor lock-in, no strings attached.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════ PROCESS ════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-18">
          <SectionLabel>Our Process</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">
            From brief to production —<br />five clear steps.
          </h2>
          <p className="mt-4 text-muted-foreground text-sm">
            A structured engineering process refined across 200+ software projects.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.3, type: "tween", ease: "easeOut" }}
            className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-border/60 to-transparent origin-left" />

          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((p, i) => (
              <motion.div key={p.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1, duration: 0.5, type: "tween", ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group relative text-center cursor-default">
                <div className="relative mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${p.color}cc, ${p.color}88)`,
                    boxShadow: `0 6px 24px ${p.color}40`,
                  }}>
                  <div className="absolute inset-0 rounded-full blur-xl opacity-30 -z-10 pointer-events-none" style={{ background: p.color }} />
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

      {/* ══════════════════════ TESTIMONIALS ═══════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <motion.div {...fadeUp()} className="mb-12">
          <SectionLabel>Client Stories</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">What our clients say.</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55, type: "tween", ease: "easeOut" }}>
              <Card3D className="bg-card/60 backdrop-blur-sm border border-border/35 rounded-2xl p-6 h-full hover:border-border/60 transition-colors duration-300">
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                  <TestimonialPhoto photo={t.photo} name={t.name} />
                  <div>
                    <p className="font-semibold text-sm leading-none">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                  </div>
                  <div className="ml-auto w-7 h-7 rounded-full flex items-center justify-center bg-primary/10">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════ FAQs ═══════════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <SectionLabel>FAQs</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">
            Common questions<br />about software projects.
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

      {/* ════════════════════════════ CTA ══════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-4 py-10 pb-28">
        <motion.div {...fadeUp()}
          className="relative overflow-hidden rounded-2xl gradient-primary shadow-elegant">

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-grid-sd" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid-sd)" />
            </svg>
            <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.13, 0.25, 0.13] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-14 -right-14 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <motion.div animate={{ scale: [1, 1.28, 1], opacity: [0.10, 0.18, 0.10] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white/10 blur-3xl" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-95 h-95 rounded-full border border-white/6 pointer-events-none" />
            {[...Array(6)].map((_, i) => (
              <motion.div key={i}
                animate={{ opacity: [0, 1, 0], scale: [0.4, 1.3, 0.4] }}
                transition={{ duration: 2.8 + i * 0.55, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                className="absolute w-1 h-1 rounded-full bg-white/60"
                style={{ top: `${12 + i * 13}%`, left: `${6 + i * 12}%` }}
              />
            ))}
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-10 md:px-12">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70 mb-4">
                <Database className="h-3 w-3 text-cyan-300" />
                Free project consultation
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                Ready to build software<br className="hidden md:block" /> your business can rely on?
              </h2>
              <p className="text-white/60 text-sm mt-2.5 leading-relaxed max-w-sm">
                Book a free 45-minute discovery call. We'll review your requirements and map out the right technical approach — no obligation, no sales pitch.
              </p>
              <div className="flex items-center gap-6 mt-5">
                {[
                  { v: "200+", l: "Products shipped"  },
                  { v: "4–8w", l: "MVP to production" },
                  { v: "100%", l: "IP owned by you"   },
                ].map((s) => (
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
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-foreground px-7 py-3 text-sm font-semibold shadow-elegant hover:opacity-95 transition-all duration-200 w-full">
                  Book free consultation
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}>
                <Link to="/services"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white/12 text-white border border-white/20 px-7 py-3 text-sm font-semibold hover:bg-white/20 transition-all duration-200 w-full">
                  View all services
                  <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </Link>
              </motion.div>
              <div className="flex items-center justify-center gap-4 mt-1">
                {["No commitment", "Free of charge"].map((label) => (
                  <div key={label} className="flex items-center gap-1.5 text-[10px] text-white/45">
                    <CheckCircle2 className="h-3 w-3" />
                    {label}
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