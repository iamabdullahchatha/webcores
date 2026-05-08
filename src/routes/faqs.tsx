import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";
import {
  Plus, ArrowRight, CheckCircle2, MessageCircle,
  Zap, Globe, Clock, Shield, Star, HelpCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Webcore Solutions" },
      { name: "description", content: "Answers to common questions about our process, pricing and partnerships." },
      { property: "og:title", content: "FAQs — Webcore Solutions" },
    ],
  }),
  component: FAQs,
});

/* ─── Data ─────────────────────────────────────────────────────────── */
const categories = [
  {
    label: "Process",
    icon: Zap,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.10)",
    gradient: "from-blue-600 to-cyan-500",
    faqs: [
      {
        q: "How long does a typical project take?",
        a: "Most engagements run 4–12 weeks depending on scope. We share a detailed timeline after the discovery call so you know exactly what to expect at every milestone.",
      },
      {
        q: "Can you redesign an existing product?",
        a: "Yes — we frequently rebuild legacy systems and refresh brand experiences end-to-end. We audit what exists, identify what's worth keeping, and rebuild the rest with precision.",
      },
      {
        q: "What happens during the discovery call?",
        a: "We spend 45 minutes understanding your goals, constraints, and current challenges. You'll leave with clarity on scope, timeline, and cost — whether you work with us or not.",
      },
    ],
  },
  {
    label: "Pricing",
    icon: Shield,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
    gradient: "from-violet-600 to-purple-500",
    faqs: [
      {
        q: "How do you price projects?",
        a: "Fixed-price for well-defined scopes, retainer-based for evolving roadmaps. We provide transparent, itemised quotes after discovery — no hidden fees, ever.",
      },
      {
        q: "Do you offer ongoing support?",
        a: "Absolutely. We offer monthly retainers for maintenance, growth work, and feature development after launch. Most clients continue working with us long-term.",
      },
      {
        q: "Is there a minimum project size?",
        a: "We typically work with projects starting from $500 USD. For smaller needs we offer advisory sessions or point-in-time audits at a flat rate.",
      },
    ],
  },
  {
    label: "Global",
    icon: Globe,
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
    gradient: "from-emerald-600 to-teal-500",
    faqs: [
      {
        q: "Do you work with international clients?",
        a: "Yes — we serve clients across Europe, the UK, America, Dubai and Pakistan with async-friendly workflows and overlapping time zone availability.",
      },
      {
        q: "What technologies do you use?",
        a: "Modern stacks: React, Next.js, Node.js, TypeScript, WordPress, WooCommerce, and cloud-native infrastructure. We choose the right tool for each project, not the trendiest one.",
      },
      {
        q: "Can we meet in person?",
        a: "Our team is based in Dubai and Pakistan. We meet in-person with Dubai-based clients and arrange travel for larger engagements when needed.",
      },
    ],
  },
];

const allFaqs = categories.flatMap((c) => c.faqs);

const heroPills = [
  { icon: Star,   label: "Trusted by 450+ clients", color: "#f59e0b", bg: "rgba(245,158,11,0.10)"  },
  { icon: Clock,  label: "Response in 24hrs",        color: "#06b6d4", bg: "rgba(6,182,212,0.10)"   },
  { icon: Shield, label: "No commitment needed",     color: "#8b5cf6", bg: "rgba(139,92,246,0.10)"  },
];

/* ─── Helpers ──────────────────────────────────────────────────────── */
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

/* ─── FAQ Accordion Item — colors intentionally unchanged ─────────── */
function FaqItem({
  q, a, index, isOpen, onToggle,
}: {
  q: string; a: string; index: number; isOpen: boolean; onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    const previousTop = buttonRef.current?.getBoundingClientRect().top;
    onToggle();
    if (typeof previousTop !== "number") return;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const nextTop = buttonRef.current?.getBoundingClientRect().top;
        if (typeof nextTop !== "number") return;
        window.scrollBy({ top: nextTop - previousTop, left: 0, behavior: "auto" });
      });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.55, type: "tween", ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "glass shadow-glow border border-primary/20"
          : "glass border border-border/40 hover:border-primary/20"
      }`}
    >
      {/* Active left accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-300 ${
          isOpen ? "gradient-primary opacity-100" : "opacity-0"
        }`}
      />

      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-primary/5"
      >
        <div className="flex items-center gap-4">
          <div
            className={`shrink-0 h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isOpen ? "gradient-primary shadow-elegant" : "bg-primary/10 group-hover:bg-primary/15"
            }`}
          >
            <HelpCircle className={`h-4 w-4 transition-colors duration-200 ${isOpen ? "text-primary-foreground" : "text-primary"}`} />
          </div>
          <span className="font-semibold text-sm md:text-base">{q}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
            isOpen ? "gradient-primary" : "bg-primary/10"
          }`}
        >
          <Plus className={`h-3.5 w-3.5 transition-colors duration-200 ${isOpen ? "text-primary-foreground" : "text-primary"}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-18 pr-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-primary/10 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Category Tab ─────────────────────────────────────────────────── */
function CategoryTab({
  cat, active, onClick,
}: {
  cat: typeof categories[0]; active: boolean; onClick: () => void;
}) {
  return (
    <TiltCard>
      <button
        type="button"
        onClick={onClick}
        className={`group relative flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 overflow-hidden ${
          active
            ? "gradient-primary text-primary-foreground shadow-elegant"
            : "glass text-foreground/70 hover:text-foreground hover:shadow-glow"
        }`}
      >
        {/* Color wash on hover when inactive */}
        {!active && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 rounded-2xl pointer-events-none"
            style={{ background: cat.color }}
          />
        )}
        <div
          className="h-5 w-5 rounded-md flex items-center justify-center shrink-0 relative"
          style={{
            background: active
              ? "rgba(255,255,255,0.25)"
              : cat.bg,
            boxShadow: `0 2px 8px ${cat.color}30`,
          }}
        >
          <cat.icon className="h-3 w-3" style={{ color: active ? "white" : cat.color }} />
        </div>
        <span className="relative">{cat.label}</span>
        {/* Bottom accent on active */}
        {active && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30" />
        )}
      </button>
    </TiltCard>
  );
}

/* ─── Main Component ───────────────────────────────────────────────── */
function FAQs() {
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const displayedFaqs = activeCategory !== null ? categories[activeCategory].faqs : allFaqs;

  const handleCategoryChange = (nextCategory: number | null) => {
    setActiveCategory(nextCategory);
    setOpenQuestions([]);
  };

  const handleQuestionToggle = (question: string) => {
    setOpenQuestions((current) =>
      current.includes(question)
        ? current.filter((q) => q !== question)
        : [...current, question],
    );
  };

  return (
    <Layout>

      {/* ══════════════════ HERO ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />

        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 right-12 rounded-full pointer-events-none"
          style={{ width: 480, height: 480, background: "radial-gradient(circle, hsl(var(--primary)/0.18) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-0 left-4 rounded-full pointer-events-none"
          style={{ width: 320, height: 320, background: "radial-gradient(circle, hsl(var(--primary)/0.12) 0%, transparent 70%)" }}
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
                FAQs
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl font-bold leading-[1.06] tracking-tight"
              >
                Frequently{" "}
                <span className="gradient-text">asked.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "tween", ease: "easeOut" }}
                className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-xl"
              >
                Everything you wanted to know — answered. Still need help?{" "}
                <Link to="/contact" className="text-primary font-semibold hover:underline underline-offset-2">
                  Just ask us.
                </Link>
              </motion.p>

              {/* Colored pills matching index.tsx pattern */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, type: "tween", ease: "easeOut" }}
                className="mt-8 flex flex-wrap justify-center gap-3"
              >
                {heroPills.map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-xs font-semibold"
                    style={{ color: p.color }}
                  >
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
                  Book Free Consultation
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════ CATEGORY STATS STRIP ═══════════════════════ */}
      <section className="relative border-y border-border/40 py-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-background via-muted/10 to-background pointer-events-none" />
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <TiltCard key={cat.label}>
                <motion.button
                  type="button"
                  onClick={() => handleCategoryChange(activeCategory === i ? null : i)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                  className={`group w-full glass rounded-2xl px-5 py-5 text-center cursor-pointer hover:shadow-glow transition-all duration-300 relative overflow-hidden ${
                    activeCategory === i ? "border border-primary/30 shadow-glow" : "border border-transparent"
                  }`}
                >
                  {/* Color wash */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 rounded-2xl pointer-events-none"
                    style={{ background: cat.color }}
                  />
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: cat.bg, boxShadow: `0 4px 16px ${cat.color}22` }}
                  >
                    <cat.icon className="h-5 w-5" style={{ color: cat.color }} />
                  </div>
                  <div className="text-sm font-bold" style={{ color: activeCategory === i ? cat.color : undefined }}>
                    {cat.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{cat.faqs.length} questions</div>
                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                    style={{ background: `linear-gradient(to right, transparent, ${cat.color}66, transparent)` }}
                  />
                </motion.button>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CATEGORY TABS ══════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-4 pt-10 pb-6">
        <motion.div {...fadeUp()} className="flex flex-wrap items-center gap-3 justify-center">
          <button
            type="button"
            onClick={() => handleCategoryChange(null)}
            className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
              activeCategory === null
                ? "gradient-primary text-primary-foreground shadow-elegant"
                : "glass text-foreground/70 hover:text-foreground hover:shadow-glow"
            }`}
          >
            All Questions
          </button>
          {categories.map((cat, i) => (
            <CategoryTab
              key={cat.label}
              cat={cat}
              active={activeCategory === i}
              onClick={() => handleCategoryChange(activeCategory === i ? null : i)}
            />
          ))}
        </motion.div>
      </section>

      {/* ══════════════════ FAQ LIST ════════════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory ?? "all"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {displayedFaqs.map((f, i) => (
              <FaqItem
                key={f.q}
                q={f.q}
                a={f.a}
                index={i}
                isOpen={openQuestions.includes(f.q)}
                onToggle={() => handleQuestionToggle(f.q)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ══════════════════ BOTTOM CTA ══════════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-4 pb-24">
        <motion.div {...fadeUp(0.1)} className="relative glass rounded-3xl p-10 md:p-14 overflow-hidden text-center">
          <div className="absolute inset-0 gradient-primary opacity-[0.05] rounded-3xl pointer-events-none" />
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
              <MessageCircle className="h-7 w-7 text-primary-foreground" />
            </div>
            <SectionLabel>Still unsure?</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Let's talk it through.
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