import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Globe,
  Layers,
  Search,
  Palette,
  CheckCircle2,
  Star,
  Users,
  Award,
  Briefcase,
  Quote,
  MapPin,
  Lightbulb,
  ShieldCheck,
  Heart,
  Zap,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webcore Solutions — Transforming Ideas into Digital Reality" },
      {
        name: "description",
        content:
          "Premium software, web & IT solutions for global businesses. Founded in Dubai, serving Europe, UK, America & Pakistan.",
      },
      { property: "og:title", content: "Webcore Solutions" },
      {
        property: "og:description",
        content: "Software, Web & IT Solutions for Global Businesses.",
      },
    ],
  }),
  component: Index,
});

/* ─── Animation Configs ────────────────────────────────────────────── */
const fadeUp = (delay = 0, duration = 0.65) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration,
    delay,
    type: "tween" as const,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: {
    duration: 0.6,
    delay,
    type: "tween" as const,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

/* ─── Data ─────────────────────────────────────────────────────────── */
const services = [
  {
    icon: Lightbulb,
    title: "IT Consultation",
    desc: "Cut through complexity with a roadmap built for scale. We align your tech strategy with your growth goals.",
    tag: "Strategy",
    metric: "3× faster decisions",
  },
  {
    icon: Layers,
    title: "CMS Development",
    desc: "Headless, composable content platforms that give your team full editorial control — without dev bottlenecks.",
    tag: "Platform",
    metric: "10× publishing speed",
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "High-performance websites and e-commerce stores designed to convert visitors into paying customers.",
    tag: "Web",
    metric: "Sub-1s load times",
  },
  {
    icon: Code2,
    title: "Software Development",
    desc: "Custom data systems and applications engineered to scale from day one — built on solid architecture.",
    tag: "Engineering",
    metric: "99.9% uptime SLA",
  },
  {
    icon: Search,
    title: "SEO & GEO",
    desc: "Dominate search rankings locally and globally with data-driven organic growth strategies.",
    tag: "Growth",
    metric: "Top 3 rankings",
  },
  {
    icon: Palette,
    title: "Brand & Design",
    desc: "Visual identities that communicate authority instantly — logos, brand systems, and marketing collateral.",
    tag: "Design",
    metric: "Brand recognition +40%",
  },
];

const process = [
  {
    n: "01",
    t: "Discovery Call",
    d: "We map your vision, constraints and success metrics in a focused 45-min session.",
    icon: Sparkles,
  },
  {
    n: "02",
    t: "Strategy & Scope",
    d: "A clear technical plan, architecture decisions and timeline — before a single line of code.",
    icon: Lightbulb,
  },
  {
    n: "03",
    t: "Build & Iterate",
    d: "Weekly demos, async updates, and continuous feedback loops keep you fully in control.",
    icon: Code2,
  },
  {
    n: "04",
    t: "Launch & Scale",
    d: "QA, performance hardening, live deployment, and ongoing support built into every engagement.",
    icon: Zap,
  },
];

const stats = [
  { v: "12+", l: "Years Experience", icon: Award },
  { v: "450+", l: "Clients Worldwide", icon: Users },
  { v: "25+", l: "Team Members", icon: Briefcase },
  { v: "5", l: "Countries Served", icon: Globe },
];

const testimonials = [
  {
    name: "Sarah Lin",
    role: "CTO, NorthPeak",
    quote: "Webcore rebuilt our platform end-to-end. Load times dropped 78% and conversions jumped immediately.",
    stars: 5,
  },
  {
    name: "Ahmed Khalil",
    role: "Founder, Dunescape",
    quote: "They didn't just deliver code — they delivered clarity. The system they built has scaled effortlessly for 3 years.",
    stars: 5,
  },
  {
    name: "Maria Costa",
    role: "VP Eng, Fluxio",
    quote: "From discovery to deploy in 8 weeks, zero surprises. Their process is genuinely best-in-class.",
    stars: 5,
  },
  {
    name: "James O'Connor",
    role: "CEO, Loomline",
    quote: "We doubled qualified leads in 90 days. Worth every penny and then some.",
    stars: 5,
  },
  {
    name: "Yuki Tanaka",
    role: "Product Lead, Hexa",
    quote: "The rarest find: a team that's equally sharp on design and engineering. Our users noticed immediately.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "Director, Ascend Co",
    quote: "Finally, an agency that treats deadlines as commitments, not suggestions. Delivered on time, every time.",
    stars: 5,
  },
];

const portfolio = [
  {
    title: "NorthPeak Platform",
    category: "SaaS Dashboard",
    desc: "Enterprise analytics platform serving 50K+ users with real-time data pipelines.",
    gradientStyle: { background: "linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)" },
    metric: "4× performance uplift",
  },
  {
    title: "Dunescape E-Commerce",
    category: "Web Development",
    desc: "High-converting luxury retail store built on custom WooCommerce architecture.",
    gradientStyle: { background: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)" },
    metric: "$2M+ first-year GMV",
  },
  {
    title: "Fluxio CMS",
    category: "CMS Development",
    desc: "Headless content platform empowering a 40-person editorial team globally.",
    gradientStyle: { background: "linear-gradient(135deg, #047857 0%, #0d9488 100%)" },
    metric: "10× publishing speed",
  },
  {
    title: "Loomline SEO",
    category: "SEO & Growth",
    desc: "Comprehensive organic strategy that tripled qualified traffic within 6 months.",
    gradientStyle: { background: "linear-gradient(135deg, #c2410c 0%, #d97706 100%)" },
    metric: "3× organic traffic",
  },
  {
    title: "Hexa Brand System",
    category: "Brand & Design",
    desc: "Full visual identity and design system for a Series-A fintech startup.",
    gradientStyle: { background: "linear-gradient(135deg, #be185d 0%, #e11d48 100%)" },
    metric: "NPS score +34 pts",
  },
  {
    title: "Ascend ERP",
    category: "Software Development",
    desc: "Custom ERP system unifying operations across 12 regional offices.",
    gradientStyle: { background: "linear-gradient(135deg, #0369a1 0%, #2563eb 100%)" },
    metric: "40% ops cost reduction",
  },
];

const regions = [
  { name: "Europe",   emoji: "🇪🇺" },
  { name: "UK",       emoji: "🇬🇧" },
  { name: "America",  emoji: "🇺🇸" },
  { name: "Dubai",    emoji: "🇦🇪" },
  { name: "Pakistan", emoji: "🇵🇰" },
];

const values = [
  {
    icon: Heart,
    t: "Client Obsession",
    d: "We succeed when you succeed. Every decision traces back to your outcomes, not our convenience.",
  },
  {
    icon: Lightbulb,
    t: "Deep Curiosity",
    d: "We ask better questions, challenge assumptions, and consistently find solutions others miss.",
  },
  {
    icon: ShieldCheck,
    t: "Radical Integrity",
    d: "Honest scopes. Transparent pricing. No surprises. Just dependable delivery, every single time.",
  },
];

const clientLogos = [
  "NorthPeak", "Dunescape", "Fluxio", "Loomline",
  "Hexa", "Ascend Co", "Vantara", "CloudSync", "Meridian", "Proxia",
];

/* ─── Helpers ───────────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-bold uppercase tracking-widest text-primary mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      {children}
    </div>
  );
}

/* Count-up hook */
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ s, delay }: { s: (typeof stats)[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const numericVal = parseInt(s.v.replace(/\D/g, ""));
  const suffix = s.v.replace(/[0-9]/g, "");
  const count = useCountUp(numericVal, 1800, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, type: "tween", ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.04 }}
      className="group glass rounded-2xl px-5 py-5 cursor-default"
    >
      <s.icon className="h-5 w-5 text-primary mb-3 group-hover:scale-110 transition-transform duration-200" />
      <div className="text-3xl md:text-4xl font-bold gradient-text">
        {inView ? count : 0}{suffix}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
    </motion.div>
  );
}

/* Tilt card */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 22 });

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y]
  );

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

/* ─── Index Page ────────────────────────────────────────────────────── */
function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <Layout>

      {/* ══════════════════════════════════════════ HERO ══════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />

        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-20 rounded-full pointer-events-none"
          style={{ width: 600, height: 600, background: "radial-gradient(circle, hsl(var(--primary)/0.18) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute bottom-0 left-10 rounded-full pointer-events-none"
          style={{ width: 380, height: 380, background: "radial-gradient(circle, hsl(var(--primary)/0.14) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 900, height: 900, background: "radial-gradient(circle, hsl(var(--primary)/0.06) 0%, transparent 65%)" }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-36 md:pt-24 md:pb-44">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, type: "tween", ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-9"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Premium Software & Digital Studio
                <span className="w-px h-3 bg-border/60" />
                <span className="text-primary">Est. Dubai, UAE</span>
              </motion.div>

              {/* Headline — NO underline animation */}
              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                Transforming{" "}
                <span className="gradient-text">Ideas</span>
                <br className="hidden md:block" />
                into{" "}
                <span className="gradient-text">Digital Reality</span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "tween", ease: "easeOut" }}
                className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
              >
                We turn ambitious product ideas into fast, scalable, and beautifully
                designed digital products — trusted by 450+ companies across 5 continents.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, type: "tween", ease: "easeOut" }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-8 py-4 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] active:scale-95"
                >
                  Book Free Consultation
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 rounded-2xl glass px-8 py-4 font-semibold hover:shadow-glow transition-all duration-200 hover:-translate-y-1"
                >
                  View Our Work
                  <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-10 flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  {["S", "A", "M", "J", "Y"].map((l, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full gradient-primary border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">450+ companies</span>{" "}
                  trust us to build their digital future
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, type: "tween", ease: "easeOut" }}
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {stats.map((s, i) => (
                  <StatCard key={s.l} s={s} delay={0.6 + i * 0.08} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════ TRUST STRIP ═══════════════════════ */}
      <section className="relative border-y border-border/40 py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-muted/20 to-background pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-7">
            Trusted by 450+ companies worldwide
          </p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            <motion.div
              className="flex gap-10 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            >
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div
                  key={i}
                  className="shrink-0 px-5 py-2 rounded-xl glass text-sm font-bold text-muted-foreground/60 hover:text-foreground transition-colors duration-200 cursor-default whitespace-nowrap"
                >
                  {logo}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ ABOUT ═════════════════════ */}
      <section className="relative mx-auto max-w-7xl px-4 py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <SectionLabel>About Us</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              A Dubai-born studio<br />serving the world.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Founded in Dubai, UAE under the leadership of{" "}
              <span className="text-foreground font-semibold">Muhammad Abdullah Chattha</span>,
              Webcore Solutions partners with ambitious teams across Europe, UK, America, Dubai
              and Pakistan to ship product that performs — and endures.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                "12+ years of compounded engineering craft",
                "Trusted by 450+ global clients — from startups to enterprises",
                "25+ engineers, designers & growth strategists",
              ].map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1, type: "tween", ease: "easeOut" }}
                  className="flex items-center gap-3 group"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200 shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-sm font-medium">{t}</span>
                </motion.li>
              ))}
            </ul>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 mt-9 text-primary font-semibold text-sm"
            >
              Learn more about us
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>

          <motion.div {...scaleIn(0.1)} className="relative">
            <div className="absolute -inset-8 gradient-primary opacity-10 blur-3xl rounded-full pointer-events-none" />
            <div
              className="relative grid grid-cols-2 gap-4 p-6 rounded-3xl glass"
              style={{ transform: "perspective(900px) rotateY(-5deg) rotateX(3deg)" }}
            >
              {[
                { icon: Award,     v: "12+",  l: "Years Experience" },
                { icon: Users,     v: "450+", l: "Clients Worldwide" },
                { icon: Briefcase, v: "25+",  l: "Team Members"     },
                { icon: Star,      v: "5★",   l: "Avg. Rating"      },
              ].map((item, i) => (
                <motion.div
                  key={item.l}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  whileHover={{ scale: 1.06 }}
                  className="group rounded-2xl bg-card/80 shadow-elegant flex flex-col items-center justify-center p-6 gap-2 cursor-default"
                >
                  <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform duration-200">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-2xl font-bold gradient-text">{item.v}</div>
                  <div className="text-xs text-muted-foreground text-center leading-tight">{item.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ VALUES ═════════════════════ */}
      <section className="relative mx-auto max-w-7xl px-4 py-24">
        <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">
            The principles behind<br />every pixel we ship.
          </h2>
          <p className="mt-4 text-muted-foreground">
            We hold ourselves to a standard most agencies don't mention.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <TiltCard key={v.t} className="cursor-default">
              <motion.div
                {...fadeUp(i * 0.12)}
                whileHover={{ y: -8 }}
                className="group relative glass rounded-3xl p-8 overflow-hidden hover:shadow-glow transition-all duration-300 h-full"
              >
                <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full gradient-primary opacity-5 blur-2xl group-hover:opacity-20 transition-opacity duration-300" />
                <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-elegant group-hover:scale-110 transition-transform duration-300">
                  <v.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{v.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.d}</p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════ SERVICES ════════════════════ */}
      <section className="relative mx-auto max-w-7xl px-4 py-24">
        <motion.div {...fadeUp()} className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div>
            <SectionLabel>Services</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold">
              Everything you need.<br />Under one roof.
            </h2>
          </div>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-primary font-semibold text-sm"
          >
            View all services
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <TiltCard key={s.title}>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10 }}
                className="group relative glass rounded-3xl p-7 overflow-hidden hover:shadow-glow transition-all duration-300 h-full"
              >
                <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full gradient-primary opacity-5 blur-2xl group-hover:opacity-20 transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {s.tag}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                      {s.metric}
                    </span>
                  </div>
                  <div
                    className="rounded-2xl gradient-primary flex items-center justify-center mb-5 shadow-elegant group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                    style={{ width: 52, height: 52 }}
                  >
                    <s.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{s.desc}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200"
                  >
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════ PROCESS ════════════════════ */}
      <section className="relative mx-auto max-w-7xl px-4 py-24">
        <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-20">
          <SectionLabel>Our Process</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">
            Predictable delivery.<br />Every single time.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A battle-tested 4-step framework refined across 450+ projects and 12 years.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3, type: "tween", ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-left"
          />

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <motion.div
                key={p.n}
                {...fadeUp(0.1 + i * 0.13)}
                whileHover={{ y: -8 }}
                className="group relative text-center cursor-default"
              >
                <div className="relative mx-auto h-20 w-20 rounded-full gradient-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-glow mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 rounded-full gradient-primary blur-xl opacity-40 -z-10 group-hover:opacity-70 transition-opacity duration-300" />
                  <p.icon className="h-8 w-8" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-1">{p.n}</div>
                <h3 className="font-bold mb-2">{p.t}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ PORTFOLIO ═══════════════════ */}
      <section className="relative mx-auto max-w-7xl px-4 py-24">
        {/* Header — NO "View all projects" link */}
        <motion.div {...fadeUp()} className="mb-14">
          <SectionLabel>Portfolio</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">
            Work we're proud to<br />put our name on.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolio.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6, type: "tween", ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={p.gradientStyle}
              />

              {/* Subtle grid overlay */}
              <div className="absolute inset-0 opacity-[0.07]">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`pg-${i}`} width="28" height="28" patternUnits="userSpaceOnUse">
                      <path d="M 28 0 L 0 0 0 28" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#pg-${i})`} />
                </svg>
              </div>

              {/* Hover shimmer */}
              <div className="absolute inset-0 bg-transparent group-hover:bg-white/[0.06] transition-colors duration-300 pointer-events-none" />

              <div className="relative p-7 flex flex-col justify-between" style={{ height: 224 }}>
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/75 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {p.category}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <ExternalLink className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-white/60 text-xs font-semibold mb-1.5">{p.metric}</div>
                  <h3 className="text-xl font-bold text-white mb-1.5">{p.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-2">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════ TESTIMONIALS ════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        </div>

        <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-16 px-4">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">
            Results our clients<br />actually talk about.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Don't take our word for it — here's what teams say after working with us.
          </p>
        </motion.div>

        {[{ dir: 1, speed: 32 }, { dir: -1, speed: 26 }].map((row, ri) => (
          <div key={ri} className={`relative ${ri === 1 ? "mt-5" : ""}`}>
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            <motion.div
              className="flex gap-5"
              animate={{ x: row.dir === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{ duration: row.speed, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="shrink-0 glass rounded-3xl p-6 flex flex-col gap-4 hover:shadow-glow transition-shadow duration-300"
                  style={{ width: 380 }}
                >
                  {/* Stars — yellow fill */}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4"
                        style={{ fill: "#f59e0b", color: "#f59e0b" }}
                      />
                    ))}
                  </div>
                  <div className="flex-1">
                    <Quote className="h-5 w-5 text-primary/30 mb-2" />
                    <p className="text-sm text-foreground/80 leading-relaxed">"{t.quote}"</p>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-border/30">
                    <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════ GLOBAL REACH ═══════════════════ */}
      <section className="relative mx-auto max-w-7xl px-4 py-24">
        <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Global Reach</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">
            Wherever you build,<br />we're right there.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Teams across 5 regions rely on Webcore to keep their digital operations running.
          </p>
        </motion.div>

        <motion.div {...scaleIn(0.1)} className="relative glass rounded-3xl p-12 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="reach-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#reach-grid)" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          </div>

          <div className="relative flex flex-wrap justify-center gap-4 md:gap-5">
            {regions.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, scale: 0.6, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.06 }}
                className="group relative"
              >
                <div className="absolute inset-0 gradient-primary blur-xl opacity-25 group-hover:opacity-55 transition-opacity duration-300 rounded-full" />
                <div className="relative flex items-center gap-3 glass rounded-2xl px-6 py-3.5 font-semibold hover:shadow-glow transition-all duration-300">
                  <span className="text-xl">{r.emoji}</span>
                  <span className="text-sm">{r.name}</span>
                  <MapPin className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════ CTA ════════════════════ */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, type: "tween", ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl gradient-primary shadow-elegant"
        >
          {/* Bg decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-24 -right-24 rounded-full bg-white/10 blur-3xl"
              style={{ width: 480, height: 480 }}
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.12, 0.26, 0.12] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              className="absolute -bottom-24 -left-24 rounded-full bg-white/10 blur-3xl"
              style={{ width: 400, height: 400 }}
            />
          </div>

          <div className="relative px-10 py-16 md:px-20 md:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, type: "tween", ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80 mb-7"
            >
              <Zap className="h-3.5 w-3.5" />
              No commitment. Just clarity.
            </motion.div>

            <h2 className="text-4xl md:text-[56px] font-bold text-primary-foreground mb-5 leading-[1.08] tracking-tight">
              Your next great product<br />starts with a conversation.
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Book a free 45-minute strategy call and walk away with a clear technical
              roadmap — whether you work with us or not.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl bg-background text-foreground px-8 py-4 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200"
                >
                  Book Free Strategy Call <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/20 text-white border border-white/25 px-8 py-4 font-semibold hover:bg-white/30 transition-all duration-200"
                >
                  Explore Services <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>

            {/* Trust signals */}
            <div className="mt-9 flex flex-wrap justify-center gap-6 text-white/55 text-xs font-medium">
              {["Free consultation", "No sales pressure", "Clear deliverables", "Response within 24hrs"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-white/55" />
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