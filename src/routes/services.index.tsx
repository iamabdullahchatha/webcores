import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";
import {
  Lightbulb, Layers, Globe, Database, Search, Palette,
  ArrowRight, CheckCircle2, Zap, Users, Award,
} from "lucide-react";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Webcore Solutions" },
      { name: "description", content: "IT consultation, web & software development, SEO, GEO and graphic design." },
      { property: "og:title", content: "Services — Webcore Solutions" },
    ],
  }),
  component: Services,
});

/* ─── Data ──────────────────────────────────────────────────────────── */
const services = [
  {
    icon: Lightbulb,
    t: "IT Consultation",
    d: "Strategic guidance, technology audits and clear roadmaps to help your team scale with confidence and precision.",
    to: "/services/it-consultation" as const,
    tags: ["Strategy", "Audits", "Roadmaps"],
    accent: "from-blue-500 to-cyan-400",
    accentBg: "from-blue-500/10 to-cyan-400/5",
    // Replace src below with your image path e.g. "/images/it-consultation.jpg"
    img: null as string | null,
  },
  {
    icon: Layers,
    t: "CMS Development",
    d: "Headless and custom content platforms built to evolve with your business — fast, flexible and editor-friendly.",
    to: "/services/cms-development" as const,
    tags: ["Headless CMS", "WordPress", "Custom"],
    accent: "from-violet-500 to-purple-400",
    accentBg: "from-violet-500/10 to-purple-400/5",
    img: null as string | null,
  },
  {
    icon: Globe,
    t: "Web Development",
    d: "Business sites, e-commerce stores and custom design solutions engineered to perform and convert.",
    to: "/services/web-development" as const,
    tags: ["E-commerce", "WordPress", "React"],
    accent: "from-emerald-500 to-teal-400",
    accentBg: "from-emerald-500/10 to-teal-400/5",
    img: null as string | null,
  },
  {
    icon: Database,
    t: "Software Development",
    d: "SaaS products, internal tools, APIs and enterprise data systems built for reliability and growth.",
    to: "/services/software-development" as const,
    tags: ["SaaS", "APIs", "Enterprise"],
    accent: "from-orange-500 to-amber-400",
    accentBg: "from-orange-500/10 to-amber-400/5",
    img: null as string | null,
  },
  {
    icon: Search,
    t: "SEO & GEO",
    d: "Rank higher locally and globally through sustainable, technically sound search and geo-optimisation strategies.",
    to: "/services/seo-geo" as const,
    tags: ["Local SEO", "Technical SEO", "GEO"],
    accent: "from-rose-500 to-pink-400",
    accentBg: "from-rose-500/10 to-pink-400/5",
    img: null as string | null,
  },
  {
    icon: Palette,
    t: "Graphic Design",
    d: "Logos, brochures, brand profiles and complete visual identity systems that make your business unforgettable.",
    to: "/services/graphic-design" as const,
    tags: ["Branding", "Print", "Identity"],
    accent: "from-indigo-500 to-blue-400",
    accentBg: "from-indigo-500/10 to-blue-400/5",
    img: null as string | null,
  },
];

const stats = [
  { v: "450+", l: "Projects Delivered", icon: Award },
  { v: "12+",  l: "Years Experience",   icon: Zap   },
  { v: "25+",  l: "Team Members",       icon: Users },
];

/* ─── Helpers ───────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, type: "tween" as const, ease: [0.22, 1, 0.36, 1] as const },
});

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-bold uppercase tracking-widest text-primary mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      {children}
    </div>
  );
}

/* ─── Service Card ──────────────────────────────────────────────────── */
function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.08, duration: 0.6, type: "tween", ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={s.to}
        className="group block relative glass rounded-3xl overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-2 h-full"
      >
        {/* ── Image area ── */}
        <div className="relative overflow-hidden h-52">
          {/* Gradient placeholder — swap for <img> when you have the asset */}
          {s.img ? (
            <img
              src={s.img}
              alt={s.t}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className={`w-full h-full bg-linear-to-br ${s.accentBg} flex items-center justify-center relative`}>
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 6 }).map((_, r) =>
                  Array.from({ length: 8 }).map((_, c) => (
                    <div
                      key={`${r}-${c}`}
                      className="absolute rounded-full bg-current opacity-10"
                      style={{
                        width: (r + c) % 3 === 0 ? 6 : 4,
                        height: (r + c) % 3 === 0 ? 6 : 4,
                        left: `${c * 14 + 4}%`,
                        top: `${r * 18 + 4}%`,
                        color: "hsl(var(--primary))",
                      }}
                    />
                  ))
                )}
              </div>

              {/* Large icon centrepiece */}
              <motion.div
                className={`h-24 w-24 rounded-3xl bg-linear-to-br ${s.accent} flex items-center justify-center shadow-elegant relative z-10`}
                whileHover={{ rotate: [0, -6, 6, 0], scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <s.icon className="h-12 w-12 text-white" />
              </motion.div>

              {/* Decorative blobs */}
              <div className={`absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-linear-to-br ${s.accent} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity duration-500`} />
              <div className={`absolute -top-6 -left-6 h-28 w-28 rounded-full bg-linear-to-br ${s.accent} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
            </div>
          )}

          {/* Hover overlay shimmer */}
          <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Tags floating on image */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {s.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide glass border border-white/20 text-foreground/80 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Card body ── */}
        <div className="p-6 relative">
          {/* Subtle top accent line */}
          <div className={`absolute top-0 left-6 right-6 h-px bg-linear-to-r ${s.accent} opacity-30 group-hover:opacity-70 transition-opacity duration-300`} />

          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200">
              {s.t}
            </h3>
            {/* Arrow icon that slides in on hover */}
            <motion.div
              className={`shrink-0 h-8 w-8 rounded-xl bg-linear-to-br ${s.accent} flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-elegant`}
            >
              <ArrowRight className="h-4 w-4 text-white" />
            </motion.div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-5">{s.d}</p>

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200">
            Explore service
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>

          {/* Bottom progress bar on hover */}
          <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${s.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
function Services() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Layout>

      {/* ══════════════════════ HERO ═══════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-16 rounded-full pointer-events-none"
          style={{ width: 500, height: 500, background: "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 left-8 rounded-full pointer-events-none"
          style={{ width: 300, height: 300, background: "radial-gradient(circle, hsl(var(--primary)/0.12) 0%, transparent 70%)" }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-28 md:pt-24 md:pb-32">
            <div className="flex flex-col items-center text-center">

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Our Services
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl font-bold leading-[1.06] tracking-tight"
              >
                A full-stack{" "}
                <span className="gradient-text">digital studio.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "tween", ease: "easeOut" }}
                className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-xl"
              >
                From strategy and engineering to brand and growth — every service delivered in-house, no outsourcing, no middlemen.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, type: "tween", ease: "easeOut" }}
                className="mt-8 flex flex-wrap justify-center gap-3"
              >
                {[
                  { icon: Award, label: "450+ Projects" },
                  { icon: Zap,   label: "12+ Years"     },
                  { icon: Users, label: "25+ Experts"   },
                ].map((p) => (
                  <span key={p.label} className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-xs font-semibold text-primary">
                    <p.icon className="h-3 w-3" />
                    {p.label}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 text-sm"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════ STATS STRIP ════════════════════════════ */}
      <section className="relative border-y border-border/40 py-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-background via-muted/10 to-background pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="group glass rounded-2xl px-5 py-5 text-center cursor-default hover:shadow-glow transition-all duration-300"
              >
                <s.icon className="h-5 w-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                <div className="text-2xl font-bold gradient-text">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ SERVICE CARDS ══════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>What We Offer</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Six specialisms.<br />One trusted team.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Whether you need one service or a full-scope partner, we deliver every discipline in-house.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.t} s={s} i={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════ BOTTOM CTA ═════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-4 pb-24">
        <motion.div {...fadeUp(0.1)} className="relative glass rounded-3xl p-10 md:p-14 overflow-hidden text-center">
          <div className="absolute inset-0 gradient-primary opacity-[0.04] rounded-3xl pointer-events-none" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 h-60 w-60 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.2) 0%, transparent 70%)" }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)" }}
          />
          <div className="relative">
            <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-elegant">
              <Zap className="h-7 w-7 text-primary-foreground" />
            </div>
            <SectionLabel>Ready to start?</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Let's build something great.
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Book a free 45-minute strategy call. Walk away with clarity on scope, cost and next steps — whether you work with us or not.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-8 py-4 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
            >
              Book Free Consultation
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-5 text-xs text-muted-foreground">
              {["No commitment required", "Response within 24 hours", "Completely free"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-primary/60" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

    </Layout>
  );
}