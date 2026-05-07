import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import {
  Award, Users, Briefcase, Target, Eye, Heart,
  ArrowRight, CheckCircle2, MapPin, Zap, ChevronDown,
  Globe, Code2, Layers, TrendingUp, ShieldCheck, Clock,
  MessageSquare, Lightbulb,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Webcore Solutions" },
      { name: "description", content: "Founded in Dubai by Muhammad Abdullah Chattha. Serving Europe, UK, America, Dubai & Pakistan." },
      { property: "og:title", content: "About Webcore Solutions" },
    ],
  }),
  component: About,
});

/* ─── Data ────────────────────────────────────────────────────────── */
const stats = [
  { v: "12+",  l: "Years Experience", icon: Award,     color: "#f59e0b", bg: "rgba(245,158,11,0.10)"  },
  { v: "450+", l: "Happy Clients",    icon: Users,     color: "#06b6d4", bg: "rgba(6,182,212,0.10)"   },
  { v: "25+",  l: "Team Members",     icon: Briefcase, color: "#10b981", bg: "rgba(16,185,129,0.10)"  },
  { v: "5",    l: "Countries",        icon: Globe,     color: "#8b5cf6", bg: "rgba(139,92,246,0.10)"  },
];

const timeline = [
  { year: "2012", title: "Founded in Dubai",       desc: "Muhammad Abdullah Chattha launches Webcore with a team of 3, focused on web development for regional businesses.", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  { year: "2015", title: "First 100 Clients",      desc: "Milestone reached as Webcore expands into SEO, graphic design, and CMS development services.",                    color: "#06b6d4", bg: "rgba(6,182,212,0.12)"   },
  { year: "2018", title: "Global Expansion",       desc: "Offices and client portfolios established in UK, Europe, and America. Team grows to 15 members.",                  color: "#10b981", bg: "rgba(16,185,129,0.12)"  },
  { year: "2021", title: "Software Division",      desc: "Dedicated software engineering division launched, handling enterprise data systems and custom SaaS products.",      color: "#f59e0b", bg: "rgba(245,158,11,0.12)"  },
  { year: "2024", title: "450+ Clients Worldwide", desc: "Serving clients across 5 regions with a 25-member team of engineers, designers, and strategists.",                  color: "#ec4899", bg: "rgba(236,72,153,0.12)"  },
];

const mvv = [
  {
    icon: Target,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
    t: "Mission",
    d: "Empower global businesses with software that's both beautiful and built to scale — without compromise on either.",
  },
  {
    icon: Eye,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
    t: "Vision",
    d: "To be the most trusted and dependable digital partner for ambitious businesses across every region we serve.",
  },
  {
    icon: Heart,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.10)",
    t: "Values",
    d: "Client obsession, intellectual curiosity, and radical integrity in every line of code, every design decision.",
  },
];

const services = [
  { icon: Lightbulb,    label: "IT Consultation", color: "#f59e0b", bg: "rgba(245,158,11,0.10)"  },
  { icon: Layers,       label: "CMS Development", color: "#8b5cf6", bg: "rgba(139,92,246,0.10)"  },
  { icon: Globe,        label: "Web Development", color: "#06b6d4", bg: "rgba(6,182,212,0.10)"   },
  { icon: Code2,        label: "Software Dev",    color: "#10b981", bg: "rgba(16,185,129,0.10)"  },
  { icon: TrendingUp,   label: "SEO & GEO",       color: "#3b82f6", bg: "rgba(59,130,246,0.10)"  },
  { icon: MessageSquare,label: "Brand & Design",  color: "#ec4899", bg: "rgba(236,72,153,0.10)"  },
];

const storyBadges = [
  { icon: Globe,       text: "Dubai Headquartered",    color: "#06b6d4", bg: "rgba(6,182,212,0.10)"   },
  { icon: Users,       text: "25+ Member Team",        color: "#10b981", bg: "rgba(16,185,129,0.10)"  },
  { icon: ShieldCheck, text: "Integrity-First Culture", color: "#8b5cf6", bg: "rgba(139,92,246,0.10)"  },
];

const faqs = [
  { q: "Where is Webcore Solutions based?",               a: "We are headquartered in Dubai, UAE, with active client operations across Europe, the UK, America, and Pakistan. Our team works across time zones to serve clients globally." },
  { q: "What types of businesses do you work with?",      a: "We work with ambitious businesses of all sizes — from early-stage startups building their first product to established enterprises modernising legacy systems. Our sweet spot is teams that want premium execution, not just cheap output." },
  { q: "How long does a typical project take?",           a: "Project timelines vary by scope. A branding project typically takes 2–3 weeks. A web or CMS build ranges from 4–8 weeks. Custom software or enterprise systems are scoped individually, usually 8–20 weeks. We always agree on milestones upfront." },
  { q: "Do you offer ongoing support after launch?",      a: "Yes — every engagement includes a post-launch support period, and we offer ongoing retainer packages for maintenance, updates, and continued growth work. Most of our clients continue working with us long after launch." },
  { q: "How does pricing work?",                          a: "We operate on fixed-scope or retainer pricing — never hourly billing surprises. After a discovery call, we provide a transparent proposal with a clear scope, timeline, and cost. No hidden fees, ever." },
  { q: "What makes Webcore different from other agencies?", a: "Three things: craft, process, and integrity. We don't outsource your project to juniors, we don't overpromise on timelines, and we don't disappear after payment. You get a senior team, a clear process, and honest communication from start to finish." },
];

/* ─── Helpers ─────────────────────────────────────────────────────── */
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

/* ── 3D Tilt Card ─────────────────────────────────────────────────── */
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

/* ── FAQ Item ─────────────────────────────────────────────────────── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      {...fadeUp(index * 0.07)}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
        open
          ? "glass shadow-glow border border-primary/20"
          : "glass border border-border/40 hover:border-primary/20"
      }`}
    >
      {/* Active left accent */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-300 bg-linear-to-b from-cyan-400 to-violet-500 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-primary/3 transition-colors duration-200"
      >
        <span className="font-semibold text-sm md:text-base pr-4">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-colors duration-200 ${open ? "gradient-primary" : "bg-primary/10"}`}
        >
          <ChevronDown className={`h-4 w-4 transition-colors ${open ? "text-primary-foreground" : "text-primary"}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-primary/10 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── About Page ─────────────────────────────────────────────────── */
function About() {
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
                About Webcore Solutions
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl font-bold leading-[1.06] tracking-tight"
              >
                We design and ship{" "}
                <span className="gradient-text">premium digital</span>
                {" "}<span className="gradient-text">products.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "tween", ease: "easeOut" }}
                className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-xl"
              >
                Born in Dubai, made for the world. Webcore partners with ambitious teams
                to engineer software that performs and endures.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, type: "tween", ease: "easeOut" }}
                className="mt-8 flex flex-wrap justify-center gap-3"
              >
                {["Dubai HQ", "12+ Years", "5 Regions", "450+ Clients"].map((tag, i) => {
                  const colors = ["#f59e0b", "#06b6d4", "#8b5cf6", "#10b981"];
                  return (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-xs font-semibold"
                      style={{ color: colors[i] }}
                    >
                      <MapPin className="h-3 w-3" />
                      {tag}
                    </span>
                  );
                })}
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
                  Work with us
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════ STATS ══════════════════════════════════ */}
      <section className="relative border-y border-border/40 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-background via-muted/10 to-background pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <TiltCard key={s.l}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  className="group glass rounded-2xl px-5 py-6 text-center cursor-default hover:shadow-glow transition-all duration-300 relative overflow-hidden"
                  style={{ ["--glow" as string]: s.color }}
                >
                  {/* Color wash on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 rounded-2xl pointer-events-none"
                    style={{ background: s.color }}
                  />
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: s.bg, boxShadow: `0 4px 16px ${s.color}22` }}
                  >
                    <s.icon className="h-5 w-5" style={{ color: s.color }} />
                  </div>
                  <div className="text-3xl font-bold gradient-text">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                  {/* Bottom accent line */}
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

      {/* ══════════════════════ STORY ══════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeUp()}>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Built on craft.<br />Grown on trust.
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in Dubai, UAE under the leadership of CEO{" "}
                <span className="font-semibold text-foreground">Muhammad Abdullah Chattha</span>,
                Webcore Solutions began with a simple belief: that great software is the result of great craft.
              </p>
              <p>
                We started as a small team of three, focused on delivering web solutions to regional businesses
                who deserved better than what the market was offering. We obsessed over details others ignored —
                performance, accessibility, maintainability.
              </p>
              <p>
                Over a decade later, we serve clients across Europe, the UK, America, Dubai and Pakistan —
                building everything from custom software to e-commerce platforms, brand systems, and growth engines.
                The team is bigger, the work is more complex, but the obsession hasn't changed.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {storyBadges.map((item) => (
                <div
                  key={item.text}
                  className="inline-flex items-center gap-2 text-xs font-semibold glass rounded-full px-4 py-2"
                >
                  <div
                    className="h-5 w-5 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: item.bg }}
                  >
                    <item.icon className="h-3 w-3" style={{ color: item.color }} />
                  </div>
                  <span className="text-foreground/80">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div {...fadeUp(0.1)} className="relative">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-linear-to-b from-primary/60 via-primary/20 to-transparent" />
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-14 group"
                >
                  {/* Colored dot */}
                  <div
                    className="absolute left-0 top-1 h-10 w-10 rounded-full flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}cc, ${item.color}88)`,
                      boxShadow: `0 4px 16px ${item.color}40`,
                    }}
                  >
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div
                    className="glass rounded-2xl px-5 py-4 transition-all duration-300 group-hover:-translate-y-0.5 relative overflow-hidden"
                    style={{ ["--card-glow" as string]: item.color }}
                  >
                    {/* Left accent */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: item.color }}
                    />
                    <div className="text-xs font-bold mb-1" style={{ color: item.color }}>{item.year}</div>
                    <div className="font-bold text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
                    {/* Bottom accent */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      style={{ background: `linear-gradient(to right, ${item.color}88, transparent)` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ MISSION / VISION / VALUES ═══════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>What Drives Us</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">
            Purpose behind<br />every project.
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {mvv.map((v, i) => (
            <TiltCard key={v.t}>
              <motion.div
                {...fadeUp(i * 0.12)}
                whileHover={{ y: -8 }}
                className="group relative glass rounded-3xl p-8 overflow-hidden hover:shadow-glow transition-all duration-300 h-full cursor-default"
              >
                {/* Background blob */}
                <div
                  className="absolute -right-8 -top-8 h-36 w-36 rounded-full blur-2xl opacity-[0.06] group-hover:opacity-[0.14] transition-opacity duration-300 pointer-events-none"
                  style={{ background: v.color }}
                />
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-elegant group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                  style={{ background: v.bg, boxShadow: `0 4px 20px ${v.color}25` }}
                >
                  <v.icon className="h-7 w-7" style={{ color: v.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{v.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.d}</p>
                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                  style={{ background: `linear-gradient(to right, transparent, ${v.color}66, transparent)` }}
                />
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ══════════════════════ SERVICES QUICK LIST ════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <motion.div {...fadeUp()} className="glass rounded-3xl p-10 md:p-14 overflow-hidden relative">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-[0.07] blur-3xl pointer-events-none gradient-primary" />
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Six specialisms.<br />One trusted team.
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether you need a single service or an end-to-end digital partner, we deliver every discipline in-house — no outsourcing, no middlemen.
              </p>
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 mt-7 text-primary font-semibold text-sm"
              >
                Explore all services
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {services.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  className="group flex items-center gap-2.5 bg-background/60 rounded-xl px-3.5 py-3 transition-all duration-200 cursor-default relative overflow-hidden"
                  style={{ ["--item-color" as string]: item.color }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                    style={{ background: `${item.color}08` }}
                  />
                  <div
                    className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200 relative"
                    style={{ background: item.bg, boxShadow: `0 2px 10px ${item.color}22` }}
                  >
                    <item.icon className="h-3.5 w-3.5" style={{ color: item.color }} />
                  </div>
                  <span className="text-xs font-semibold relative">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════ FAQs ═══════════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-4 py-16 pb-24">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionLabel>FAQs</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">
            Questions we<br />hear often.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Everything you need to know before working with us. Still have questions?{" "}
            <Link to="/contact" className="text-primary font-semibold hover:underline underline-offset-2">
              Just ask.
            </Link>
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp(0.3)} className="mt-14 text-center">
          <div className="glass rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 gradient-primary opacity-[0.04] rounded-3xl pointer-events-none" />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.25, 0.12] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 h-52 w-52 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.2) 0%, transparent 70%)" }}
            />
            <div className="relative">
              <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-elegant">
                <Clock className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                Book a free 45-minute strategy call. Walk away with clarity — whether you work with us or not.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 text-sm"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                {["No commitment", "Response within 24hrs", "Free of charge"].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-primary/60" />
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