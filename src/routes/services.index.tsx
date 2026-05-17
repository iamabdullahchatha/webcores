import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";
import { getSeoHead } from "@/lib/seo";
import {
  Lightbulb, Layers, Globe, Database, Search, Palette,
  ArrowRight, CheckCircle2, Zap, Users, Award, ArrowUpRight,
} from "lucide-react";

/* ─── Asset imports (same images used in index.tsx) ────────────────── */
import imgCmsDevelopment from "@/assets/cms-development.webp";
import imgGraphicsDesign from "@/assets/graphics-design.webp";
import imgItConsulting   from "@/assets/it-consulting.webp";
import imgSeo            from "@/assets/seo.webp";
import imgSoftwareDev    from "@/assets/software-development.webp";
import imgWebDevelopment from "@/assets/web-development.webp";

export const Route = createFileRoute("/services/")({
  head: () => getSeoHead("services"),
  component: Services,
});

/* ─── Data ──────────────────────────────────────────────────────────── */
const services = [
  {
    icon: Lightbulb,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    t: "IT Consultation",
    anchor: "IT Consulting Services Dubai",
    d: "Strategic guidance, technology audits and clear roadmaps to help your team scale with confidence and precision.",
    to: "/services/it-consultation" as const,
    tags: ["Strategy", "Audits", "Roadmaps"],
    metric: "3× faster decisions",
    img: imgItConsulting,
  },
  {
    icon: Layers,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
    t: "CMS Development",
    anchor: "CMS Development Dubai",
    d: "Headless and custom content platforms built to evolve with your business — fast, flexible and editor-friendly.",
    to: "/services/cms-development" as const,
    tags: ["Headless CMS", "WordPress", "Custom"],
    metric: "10× publishing speed",
    img: imgCmsDevelopment,
  },
  {
    icon: Globe,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
    t: "Web Development",
    anchor: "Web Development Dubai",
    d: "Business sites, e-commerce stores and custom design solutions engineered to perform and convert.",
    to: "/services/web-development" as const,
    tags: ["E-commerce", "WordPress", "React"],
    metric: "Sub-1s load times",
    img: imgWebDevelopment,
  },
  {
    icon: Database,
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
    t: "Software Development",
    anchor: "Software Development Dubai",
    d: "SaaS products, internal tools, APIs and enterprise data systems built for reliability and growth.",
    to: "/services/software-development" as const,
    tags: ["SaaS", "APIs", "Enterprise"],
    metric: "99.9% uptime SLA",
    img: imgSoftwareDev,
  },
  {
    icon: Search,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.10)",
    t: "SEO & GEO",
    anchor: "SEO & GEO Services Dubai",
    d: "Rank higher locally and globally through sustainable, technically sound search and geo-optimisation strategies.",
    to: "/services/seo-geo" as const,
    tags: ["Local SEO", "Technical SEO", "GEO"],
    metric: "Top 3 rankings",
    img: imgSeo,
  },
  {
    icon: Palette,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.10)",
    t: "Graphic Design",
    anchor: "Graphic Design Dubai",
    d: "Logos, brochures, brand profiles and complete visual identity systems that make your business unforgettable.",
    to: "/services/graphic-design" as const,
    tags: ["Branding", "Print", "Identity"],
    metric: "Brand recognition +40%",
    img: imgGraphicsDesign,
  },
];

const stats = [
  { v: "450+", l: "Projects Delivered", icon: Award, color: "#f59e0b", bg: "rgba(245,158,11,0.10)" },
  { v: "12+",  l: "Years Experience",   icon: Zap,   color: "#8b5cf6", bg: "rgba(139,92,246,0.10)" },
  { v: "25+",  l: "Team Members",       icon: Users, color: "#10b981", bg: "rgba(16,185,129,0.10)" },
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

/* ── 3D Tilt Card ───────────────────────────────────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 22 });

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Service Card ──────────────────────────────────────────────────── */
function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  return (
    <TiltCard className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: i * 0.08, duration: 0.6, type: "tween", ease: [0.22, 1, 0.36, 1] }}
        className="h-full"
      >
        <div
          className="group relative glass rounded-3xl overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
        >
          {/* ── Image banner (mirrors index.tsx pattern) ── */}
          <div className="relative h-52 w-full overflow-hidden shrink-0">
            <img
              src={s.img}
              alt={s.t}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />

            {/* Gradient overlay — blends image into card body */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, transparent 40%, ${s.color}22 100%)`,
              }}
            />

            {/* Hover shimmer */}
            <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Tags — bottom-left */}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide glass border border-white/20 backdrop-blur-sm"
                  style={{ color: s.color }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metric badge — top-right */}
            <div className="absolute top-3 right-3">
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-bold glass border border-white/10 backdrop-blur-sm"
                style={{ color: s.color, background: `${s.color}18` }}
              >
                {s.metric}
              </span>
            </div>
          </div>

          {/* ── Card body ── */}
          <div className="p-6 relative flex flex-col flex-1">
            {/* Top accent line */}
            <div
              className="absolute top-0 left-6 right-6 h-px opacity-30 group-hover:opacity-70 transition-opacity duration-300"
              style={{ background: `linear-gradient(to right, transparent, ${s.color}, transparent)` }}
            />

            {/* Icon + Title row */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-elegant"
                style={{
                  width: 44, height: 44,
                  background: s.bg,
                  boxShadow: `0 4px 16px ${s.color}22`,
                }}
              >
                <s.icon className="h-5 w-5" style={{ color: s.color }} />
              </div>

              <div className="flex items-start justify-between gap-3 flex-1 min-w-0">
                <h3 className="text-xl font-bold leading-tight transition-colors duration-200 group-hover:text-primary truncate">
                  <Link to={s.to} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded-sm">
                    {s.anchor}
                  </Link>
                </h3>
                {/* Slide-in arrow */}
                <div
                  className="shrink-0 h-8 w-8 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-elegant"
                  style={{ background: `linear-gradient(135deg, ${s.color}cc, ${s.color}88)` }}
                >
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{s.d}</p>

            <span
              className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-200 mt-auto"
              style={{ color: s.color }}
            >
              Explore service
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>

            {/* Bottom sweep */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ background: `linear-gradient(to right, ${s.color}88, transparent)` }}
            />
          </div>
        </div>
      </motion.div>
    </TiltCard>
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
                Digital services{" "}
                <span className="gradient-text">in Dubai.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "tween", ease: "easeOut" }}
                className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-xl"
              >
                From strategy and engineering to brand and growth — every service delivered in-house, no outsourcing, no middlemen. Every service we offer is engineered around business outcomes — not just deliverables. From startups in Karachi to enterprises in London and Dubai, our clients trust us to handle the full digital stack.
              </motion.p>

              {/* Per-service colored pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, type: "tween", ease: "easeOut" }}
                className="mt-8 flex flex-wrap justify-center gap-2.5"
              >
                {services.map((s) => (
                  <span
                    key={s.t}
                    className="inline-flex items-center gap-1.5 glass rounded-full px-3.5 py-1.5 text-xs font-semibold"
                    style={{ color: s.color }}
                  >
                    <s.icon className="h-3 w-3" />
                    {s.t}
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
              <TiltCard key={s.l}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                  className="group glass rounded-2xl px-5 py-5 text-center cursor-default hover:shadow-glow transition-all duration-300 relative overflow-hidden"
                >
                  {/* Color wash on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 rounded-2xl pointer-events-none"
                    style={{ background: s.color }}
                  />
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: s.bg, boxShadow: `0 4px 14px ${s.color}22` }}
                  >
                    <s.icon className="h-4 w-4" style={{ color: s.color }} />
                  </div>
                  <div className="text-2xl font-bold gradient-text">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                    style={{ background: `linear-gradient(to right, transparent, ${s.color}66, transparent)` }}
                  />
                </motion.div>
              </TiltCard>
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
              Tell us what you need. We'll map the right services, estimate effort and timeline, then send a fixed-scope proposal within 48 hours.
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