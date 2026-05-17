import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import {
  Map,
  Globe,
  Layers,
  Code2,
  Search,
  Palette,
  Lightbulb,
  FileText,
  Home,
  Users,
  HelpCircle,
  Mail,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";
import { getSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/sitemap")({
  head: () => getSeoHead("sitemapHtml"),
  component: SitemapPage,
});

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

/* 3D Tilt Card (matches About / Home page pattern) */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 22 });

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y],
  );

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type SitemapEntry = {
  label: string;
  path: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bg: string;
};

const mainPages: SitemapEntry[] = [
  {
    label: "Home",
    path: "/",
    description: "Dubai digital agency for web development, software, SEO and more.",
    icon: Home,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
  },
  {
    label: "About",
    path: "/about",
    description: "Our story, team, mission and 12-year journey from Dubai to global markets.",
    icon: Users,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
  },
  {
    label: "Services",
    path: "/services",
    description: "Full list of digital services — web, software, CMS, SEO, design and IT.",
    icon: Layers,
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
  },
  {
    label: "FAQs",
    path: "/faqs",
    description: "Answers on process, pricing, timelines and international work.",
    icon: HelpCircle,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
  },
  {
    label: "Contact",
    path: "/contact",
    description: "Book a free strategy call or send us a project brief.",
    icon: Mail,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.10)",
  },
];

const servicePages: SitemapEntry[] = [
  {
    label: "IT Consultation",
    path: "/services/it-consultation",
    description: "Technology audits, architecture planning, cloud strategy and roadmaps.",
    icon: Lightbulb,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
  },
  {
    label: "CMS Development",
    path: "/services/cms-development",
    description: "Headless CMS, WordPress and composable content platform development.",
    icon: Layers,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
  },
  {
    label: "Web Development",
    path: "/services/web-development",
    description: "High-performance websites, ecommerce stores and React applications.",
    icon: Globe,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
  },
  {
    label: "Software Development",
    path: "/services/software-development",
    description: "Custom SaaS platforms, APIs, data systems and AI integrations.",
    icon: Code2,
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
  },
  {
    label: "SEO & GEO",
    path: "/services/seo-geo",
    description: "Technical SEO, local SEO, schema, AI search and GEO optimization.",
    icon: Search,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.10)",
  },
  {
    label: "Graphic Design",
    path: "/services/graphic-design",
    description: "Logos, brand identity, company profiles and marketing collateral.",
    icon: Palette,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.10)",
  },
];

const legalPages: SitemapEntry[] = [
  {
    label: "Privacy Policy",
    path: "/privacy-policy",
    description: "How we collect, use and protect your personal data.",
    icon: FileText,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
  },
];

function SitemapCard({ entry, index }: { entry: SitemapEntry; index: number }) {
  return (
    <TiltCard>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06, duration: 0.55, type: "tween", ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6 }}
        className="h-full"
      >
        <Link
          to={entry.path}
          className="group relative glass rounded-2xl p-5 flex items-start gap-4 hover:shadow-glow transition-all duration-300 overflow-hidden h-full"
        >
          <div
            className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none"
            style={{ background: entry.color }}
          />
          <div
            className="relative h-11 w-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
            style={{ background: entry.bg, boxShadow: `0 4px 16px ${entry.color}22` }}
          >
            <entry.icon className="h-5 w-5" style={{ color: entry.color }} />
          </div>
          <div className="relative min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors duration-200">
                {entry.label}
              </h3>
              <ArrowUpRight className="h-3.5 w-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">
              {entry.description}
            </p>
            <p className="text-[10px] text-muted-foreground/50 font-mono">
              webcoreuae.com{entry.path}
            </p>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
            style={{ background: `linear-gradient(to right, transparent, ${entry.color}55, transparent)` }}
          />
        </Link>
      </motion.div>
    </TiltCard>
  );
}

function SitemapGroup({
  title,
  entries,
  delay,
  columns = 1,
}: {
  title: string;
  entries: SitemapEntry[];
  delay: number;
  columns?: 1 | 2;
}) {
  return (
    <motion.section {...fadeUp(delay)} className="mb-14">
      <SectionLabel>{title}</SectionLabel>
      <div
        className={`grid gap-4 ${columns === 2 ? "md:grid-cols-2" : "grid-cols-1"}`}
      >
        {entries.map((entry, i) => (
          <SitemapCard key={entry.path} entry={entry} index={i} />
        ))}
      </div>
    </motion.section>
  );
}

function SitemapPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const totalPages = mainPages.length + servicePages.length + legalPages.length;

  return (
    <Layout>
      {/* ══════════════════════ HERO ═══════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-16 rounded-full pointer-events-none"
          style={{
            width: 500,
            height: 500,
            background: "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 left-8 rounded-full pointer-events-none"
          style={{
            width: 300,
            height: 300,
            background: "radial-gradient(circle, hsl(var(--primary)/0.12) 0%, transparent 70%)",
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-24 md:pt-24 md:pb-28">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-8"
              >
                <Map className="h-3.5 w-3.5 text-primary" />
                Navigation
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl font-bold leading-[1.06] tracking-tight"
              >
                <span className="gradient-text">Sitemap.</span>
                <br />
                Every page, mapped.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "tween", ease: "easeOut" }}
                className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-xl"
              >
                Every page on Webcore Solutions — organised by section, easy to scan and built for fast
                navigation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, type: "tween", ease: "easeOut" }}
                className="mt-8 flex flex-wrap justify-center gap-3"
              >
                {[
                  { label: `${totalPages} Pages`, color: "#06b6d4" },
                  { label: "3 Sections", color: "#8b5cf6" },
                  { label: "Updated 17 May 2026", color: "#10b981" },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-xs font-semibold"
                    style={{ color: tag.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: tag.color }} />
                    {tag.label}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════ SITEMAP CONTENT ═══════════════════════════ */}
      <nav
        aria-label="Full site navigation"
        className="mx-auto max-w-6xl px-4 py-20 pb-16"
      >
        <SitemapGroup title="Main Pages" entries={mainPages} delay={0} columns={2} />
        <SitemapGroup title="Services" entries={servicePages} delay={0.05} columns={2} />
        <SitemapGroup title="Legal" entries={legalPages} delay={0.1} columns={2} />
      </nav>

      {/* ══════════════════════ XML SITEMAP CTA ══════════════════════════ */}
      <section className="mx-auto max-w-4xl px-4 pb-28">
        <motion.div
          {...fadeUp()}
          className="relative glass rounded-3xl p-8 md:p-12 overflow-hidden text-center"
        >
          <div className="absolute inset-0 gradient-primary opacity-[0.05] rounded-3xl pointer-events-none" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 h-52 w-52 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary)/0.2) 0%, transparent 70%)",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.10, 0.20, 0.10] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5 shadow-elegant">
              <FileText className="h-7 w-7 text-primary-foreground" />
            </div>
            <SectionLabel>For Search Engines</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Looking for the XML sitemap?</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-7 leading-relaxed">
              Search engines and crawlers use the XML version with full image sitemaps, hreflang tags and
              lastmod dates.
            </p>
            <a
              href="/sitemap.xml"
              className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              View sitemap.xml
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>

            <div className="mt-8 pt-6 border-t border-border/30">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to home
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
