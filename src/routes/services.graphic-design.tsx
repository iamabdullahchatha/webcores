import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Palette, ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown,
  Zap, Star, Layers, Pen, BookOpen, CreditCard, Monitor,
  Sparkles, Package, Eye, Clock, Users, Award, Brush,
  FileText, Layout, Grid, Feather,
} from "lucide-react";
import { Layout as PageLayout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";

export const Route = createFileRoute("/services/graphic-design")({
  head: () => ({
    meta: [
      { title: "Graphic Design — Webcore Solutions" },
      { name: "description", content: "Logos, brochures, company profiles, visiting cards and brand systems." },
    ],
  }),
  component: GraphicDesign,
});

/* ─── Data ──────────────────────────────────────────────────────────── */
const features = [
  {
    icon: Pen,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.10)",
    t: "Logo Design",
    d: "Marks that are timeless, scalable and unmistakably yours — crafted to work at every size, in every context, for decades.",
  },
  {
    icon: Grid,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
    t: "Brand Systems",
    d: "Type, colour, voice and motion — codified and consistent across every touchpoint, from your website to your packaging.",
  },
  {
    icon: BookOpen,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
    t: "Brochures & Collateral",
    d: "Print-ready editorial pieces that position your brand at the premium end of the market and sell without saying a word.",
  },
  {
    icon: FileText,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    t: "Company Profiles",
    d: "Editorial-grade capability documents built for high-stakes pitches, investor decks, and enterprise procurement processes.",
  },
  {
    icon: CreditCard,
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
    t: "Visiting Cards",
    d: "Premium business cards designed with finish, weight and character — because a first impression should be impossible to forget.",
  },
  {
    icon: Monitor,
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.10)",
    t: "Web & UI Design",
    d: "Beautiful, conversion-focused interfaces in Figma — pixel-perfect, responsive, and handed off ready for development.",
  },
];

const processSteps = [
  { n: "01", t: "Discovery",  d: "Brand questionnaire, goals, competitive audit.",  icon: Eye,      color: "#ec4899" },
  { n: "02", t: "Explore",    d: "Mood boards, visual directions, reference curation.", icon: Sparkles, color: "#8b5cf6" },
  { n: "03", t: "Create",     d: "Initial concepts presented across 3 directions.",  icon: Pen,      color: "#06b6d4" },
  { n: "04", t: "Refine",     d: "Deep iteration on the chosen route with your team.", icon: Brush,    color: "#f59e0b" },
  { n: "05", t: "Deliver",    d: "Source files, brand guidelines, asset handoff.",   icon: Package,  color: "#10b981" },
];

const deliverables = [
  "Logo suite — primary, monogram & all lockups",
  "Full brand guidelines PDF (50+ pages)",
  "Source files — Figma, .AI, .PSD, .EPS",
  "Print-ready collateral (CMYK, bleed-ready)",
  "Social media template kit",
  "Web & favicon asset exports",
];

const techStack = [
  { name: "Figma",               color: "#ec4899" },
  { name: "Adobe Illustrator",   color: "#f59e0b" },
  { name: "Photoshop",           color: "#06b6d4" },
  { name: "InDesign",            color: "#8b5cf6" },
  { name: "After Effects",       color: "#10b981" },
  { name: "Procreate",           color: "#f43f5e" },
];

const stats = [
  { v: "300+", l: "Brand identities delivered" },
  { v: "98%",  l: "Client satisfaction rate"   },
  { v: "3",    l: "Concepts per project"        },
  { v: "100%", l: "Full IP transferred to you" },
];

const testimonials = [
  {
    name: "Ahmed Khalil",
    role: "Founder, Dunescape",
    quote: "The logo alone transformed how investors perceived our company. Webcore's design team is simply on another level.",
    photo: "/ahmed-khalil.webp",
    stars: 5,
  },
  {
    name: "Sarah Lin",
    role: "CTO, NorthPeak",
    quote: "Our rebrand went seamlessly. The brand system they delivered is so thorough our in-house team can work fully independently.",
    photo: "/sarah-lin.webp",
    stars: 5,
  },
  {
    name: "Connor James",
    role: "Managing Director",
    quote: "We've worked with big agencies before. Webcore gave us better quality at a fraction of the time and cost. Remarkable.",
    photo: "/connor-james.webp",
    stars: 5,
  },
];

const faqs = [
  {
    q: "How many logo concepts will you present?",
    a: "We present 3 distinct directions — each with a clear strategic rationale. Once you choose a direction, we iterate deeply until the mark is exactly right. Most clients land on a final logo within 2–3 revision rounds.",
  },
  {
    q: "Do I get full IP ownership of my designs?",
    a: "Yes, absolutely. Full intellectual property transfer is included on final delivery. You own every file, every mark, every asset — with no licensing restrictions or future royalties.",
  },
  {
    q: "What file formats will I receive?",
    a: "You receive editable source files in Figma and Adobe formats (.AI, .PSD, .EPS), plus export-ready assets in SVG, PNG and PDF. Print files are prepared in CMYK with proper bleed and trim marks.",
  },
  {
    q: "Can you work with an existing brand rather than starting from scratch?",
    a: "Yes — we offer brand refresh and brand extension services. We conduct an audit of your existing assets, identify what's worth keeping, and build a coherent system around your strongest elements.",
  },
  {
    q: "How long does a full brand identity project take?",
    a: "A complete logo and brand guidelines project typically takes 3–5 weeks from brief to final delivery. If you need collateral (brochures, business cards, profiles) alongside the identity, we scope an additional 1–3 weeks depending on volume.",
  },
  {
    q: "Do you offer print management or production?",
    a: "We deliver print-ready files built to professional print specifications (CMYK, 300dpi, bleed and slug). We can also recommend trusted print partners in your region and review printer proofs on your behalf.",
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
    <img src={photo} alt={name} onError={() => setErr(true)}
      className="h-9 w-9 rounded-full object-cover object-top shrink-0 ring-1 ring-border/30" />
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────── */
function GraphicDesign() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageLayout>

      {/* ════════════════════════════════ HERO ════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[78vh] flex items-center">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />

        {/* Ambient orbs — scale/opacity only, no color on hover */}
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.22, 0.45, 0.22] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-16 rounded-full pointer-events-none"
          style={{ width: 520, height: 520, background: "radial-gradient(circle, hsl(var(--primary)/0.14) 0%, transparent 70%)" }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.10, 0.22, 0.10] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 left-12 rounded-full pointer-events-none"
          style={{ width: 320, height: 320, background: "radial-gradient(circle, hsl(var(--primary)/0.10) 0%, transparent 70%)" }} />
        {/* Pink accent for design theme */}
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-1/3 left-1/4 rounded-full pointer-events-none"
          style={{ width: 280, height: 280, background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-32 md:pt-24 md:pb-36">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Left — copy */}
              <div>
                <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.08, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-7">
                  <Palette className="h-3.5 w-3.5 text-primary" />
                  Graphic Design
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl md:text-6xl lg:text-[66px] font-bold leading-[1.04] tracking-tight">
                  Brand identity that{" "}
                  <span className="gradient-text">commands attention.</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25, type: "tween", ease: "easeOut" }}
                  className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                  From distinctive logos to editorial-grade brand systems — design that earns
                  your audience's trust at first glance and keeps it for years.
                </motion.p>

                {/* Pill badges */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.38, type: "tween", ease: "easeOut" }}
                  className="mt-7 flex flex-wrap gap-2.5">
                  {[
                    { icon: Pen,     label: "Full IP ownership"       },
                    { icon: Feather, label: "3 concepts presented"    },
                    { icon: Package, label: "Print-ready source files" },
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

      {/* ═══════════════════════════════ FEATURES ═════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <motion.div {...fadeUp()} className="mb-14">
          <SectionLabel>What We Design</SectionLabel>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Every design discipline,<br />under one roof.
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              From the first mark on a page to a fully codified brand system — we handle every visual discipline in-house.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.55, type: "tween", ease: "easeOut" }}
              className="group">
              <Card3D className="relative bg-card/60 backdrop-blur-sm border border-border/35 rounded-2xl p-7 h-full hover:border-border/60 transition-all duration-300 overflow-hidden">
                {/* Static ambient tint — never brightens on hover */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl opacity-[0.05] pointer-events-none"
                  style={{ background: f.color }} />
                <div className="relative">
                  {/* Icon badge */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: f.bg, boxShadow: `0 4px 16px ${f.color}18` }}>
                    <f.icon className="h-5 w-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="font-bold text-base mb-2">{f.t}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.d}</p>
                </div>
                {/* Bottom line reveal on hover */}
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

          {/* Tools */}
          <motion.div {...fadeUp(0.1)}>
            <div className="glass border border-border/35 rounded-2xl p-8 h-full">
              <SectionLabel>Tools & Software</SectionLabel>
              <h3 className="text-2xl font-bold mb-2">Our design toolset.</h3>
              <p className="text-sm text-muted-foreground mb-7 leading-relaxed">
                Industry-standard tools handled by senior designers — so your files are always compatible, portable and future-proof.
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

              {/* IP callout */}
              <div className="mt-8 flex items-start gap-3 p-4 bg-primary/5 border border-primary/15 rounded-xl">
                <Award className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">100% IP transfer.</span>{" "}
                  Every file, every asset, every mark belongs to you on final delivery. No licensing, no subscriptions, no strings attached.
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
            From brief to brand —<br />five clear steps.
          </h2>
          <p className="mt-4 text-muted-foreground text-sm">
            A structured creative process refined across 300+ brand projects.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
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
                  {/* Static halo — no brightness change on hover */}
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
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
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
            Common questions<br />about design work.
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

          {/* Background detail */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-grid-gd" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid-gd)" />
            </svg>
            <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.13, 0.25, 0.13] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-14 -right-14 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <motion.div animate={{ scale: [1, 1.28, 1], opacity: [0.10, 0.18, 0.10] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white/10 blur-3xl" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-95 h-95 rounded-full border border-white/6 pointer-events-none" />
            {/* Sparkle dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div key={i}
                animate={{ opacity: [0, 1, 0], scale: [0.4, 1.3, 0.4] }}
                transition={{ duration: 2.8 + i * 0.55, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                className="absolute w-1 h-1 rounded-full bg-white/60"
                style={{ top: `${12 + i * 13}%`, left: `${6 + i * 12}%` }}
              />
            ))}
          </div>

          {/* Two-col layout */}
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-10 md:px-12">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70 mb-4">
                <Palette className="h-3 w-3 text-pink-300" />
                Free brand consultation
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                Ready to build a brand<br className="hidden md:block" /> that earns attention?
              </h2>
              <p className="text-white/60 text-sm mt-2.5 leading-relaxed max-w-sm">
                Book a free 45-minute discovery call. We'll audit your current brand and map out the right creative direction.
              </p>
              <div className="flex items-center gap-6 mt-5">
                {[
                  { v: "300+", l: "Brand projects" },
                  { v: "3",    l: "Concepts shown" },
                  { v: "100%", l: "IP transferred" },
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

    </PageLayout>
  );
}