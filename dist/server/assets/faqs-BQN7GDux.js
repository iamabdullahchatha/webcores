import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-D_UF2F5s.js";
import { c as createLucideIcon, u as useTransform, Z as Zap, G as Globe, L as Layout, a as GridBackground, F as FloatingShapes, m as motion, A as ArrowRight, b as AnimatePresence, M as MessageCircle, C as CircleCheck } from "./Scene3D-BXzIJuzj.js";
import { L as Link } from "./router-DfFauod9.js";
import { u as useScroll } from "./use-scroll-CkkmOARf.js";
import { S as Shield } from "./shield-JOFxPuJS.js";
import { S as Star } from "./star-7BPJTbl0.js";
import { C as Clock } from "./clock-B4uQmsaI.js";
import { C as CircleHelp } from "./circle-help-Dy3_2VvY.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const Plus = createLucideIcon("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
const categories = [{
  label: "Process",
  icon: Zap,
  color: "from-blue-600 to-cyan-500",
  faqs: [{
    q: "How long does a typical project take?",
    a: "Most engagements run 4–12 weeks depending on scope. We share a detailed timeline after the discovery call so you know exactly what to expect at every milestone."
  }, {
    q: "Can you redesign an existing product?",
    a: "Yes — we frequently rebuild legacy systems and refresh brand experiences end-to-end. We audit what exists, identify what's worth keeping, and rebuild the rest with precision."
  }, {
    q: "What happens during the discovery call?",
    a: "We spend 45 minutes understanding your goals, constraints, and current challenges. You'll leave with clarity on scope, timeline, and cost — whether you work with us or not."
  }]
}, {
  label: "Pricing",
  icon: Shield,
  color: "from-violet-600 to-purple-500",
  faqs: [{
    q: "How do you price projects?",
    a: "Fixed-price for well-defined scopes, retainer-based for evolving roadmaps. We provide transparent, itemised quotes after discovery — no hidden fees, ever."
  }, {
    q: "Do you offer ongoing support?",
    a: "Absolutely. We offer monthly retainers for maintenance, growth work, and feature development after launch. Most clients continue working with us long-term."
  }, {
    q: "Is there a minimum project size?",
    a: "We typically work with projects starting from $3,000 USD. For smaller needs we offer advisory sessions or point-in-time audits at a flat rate."
  }]
}, {
  label: "Global",
  icon: Globe,
  color: "from-emerald-600 to-teal-500",
  faqs: [{
    q: "Do you work with international clients?",
    a: "Yes — we serve clients across Europe, the UK, America, Dubai and Pakistan with async-friendly workflows and overlapping time zone availability."
  }, {
    q: "What technologies do you use?",
    a: "Modern stacks: React, Next.js, Node.js, TypeScript, WordPress, WooCommerce, and cloud-native infrastructure. We choose the right tool for each project, not the trendiest one."
  }, {
    q: "Can we meet in person?",
    a: "Our team is based in Dubai and Pakistan. We meet in-person with Dubai-based clients and arrange travel for larger engagements when needed."
  }]
}];
const allFaqs = categories.flatMap((c) => c.faqs);
const fadeUp = (delay = 0) => ({
  initial: {
    opacity: 0,
    y: 28
  },
  whileInView: {
    opacity: 1,
    y: 0
  },
  viewport: {
    once: true,
    margin: "-60px"
  },
  transition: {
    duration: 0.65,
    delay,
    type: "tween",
    ease: [0.22, 1, 0.36, 1]
  }
});
function SectionLabel({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-bold uppercase tracking-widest text-primary mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
    children
  ] });
}
function FaqItem({
  q,
  a,
  index,
  isOpen,
  onToggle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true
  }, transition: {
    delay: index * 0.06,
    duration: 0.55,
    type: "tween",
    ease: [0.22, 1, 0.36, 1]
  }, className: `group relative rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "glass shadow-glow border border-primary/20" : "glass border border-border/40 hover:border-primary/20"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-300 ${isOpen ? "gradient-primary opacity-100" : "opacity-0"}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onToggle, className: "w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `shrink-0 h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? "gradient-primary shadow-elegant" : "bg-primary/10 group-hover:bg-primary/15"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: `h-4 w-4 transition-colors duration-200 ${isOpen ? "text-primary-foreground" : "text-primary"}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm md:text-base", children: q })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        rotate: isOpen ? 45 : 0
      }, transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1]
      }, className: `shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-colors duration-200 ${isOpen ? "gradient-primary" : "bg-primary/10"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: `h-3.5 w-3.5 transition-colors duration-200 ${isOpen ? "text-primary-foreground" : "text-primary"}` }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      height: 0,
      opacity: 0
    }, animate: {
      height: "auto",
      opacity: 1
    }, exit: {
      height: 0,
      opacity: 0
    }, transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1]
    }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-18 pr-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-primary/10 pt-4", children: a }) }) })
  ] });
}
function CategoryTab({
  cat,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: `group relative flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${active ? "gradient-primary text-primary-foreground shadow-elegant" : "glass text-foreground/70 hover:text-foreground hover:shadow-glow"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-5 w-5 rounded-md flex items-center justify-center bg-linear-to-br ${cat.color} ${active ? "opacity-100" : "opacity-70"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(cat.icon, { className: "h-3 w-3 text-white" }) }),
    cat.label
  ] });
}
function FAQs() {
  const [openIndex, setOpenIndex] = reactExports.useState(0);
  const [activeCategory, setActiveCategory] = reactExports.useState(null);
  const heroRef = reactExports.useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const displayedFaqs = activeCategory !== null ? categories[activeCategory].faqs : allFaqs;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: heroRef, className: "relative overflow-hidden min-h-[60vh] flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "var(--gradient-hero)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GridBackground, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingShapes, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        scale: [1, 1.18, 1],
        opacity: [0.2, 0.45, 0.2]
      }, transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }, className: "absolute top-8 right-12 rounded-full pointer-events-none", style: {
        width: 480,
        height: 480,
        background: "radial-gradient(circle, hsl(var(--primary)/0.18) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        scale: [1, 1.25, 1],
        opacity: [0.1, 0.25, 0.1]
      }, transition: {
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 4
      }, className: "absolute bottom-0 left-4 rounded-full pointer-events-none", style: {
        width: 320,
        height: 320,
        background: "radial-gradient(circle, hsl(var(--primary)/0.12) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: {
        y: heroY,
        opacity: heroOpacity
      }, className: "relative w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 pt-20 pb-28 md:pt-24 md:pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          scale: 0.85
        }, animate: {
          opacity: 1,
          scale: 1
        }, transition: {
          duration: 0.5,
          delay: 0.1,
          type: "tween",
          ease: [0.22, 1, 0.36, 1]
        }, className: "inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
          "FAQs"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 32
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.85,
          type: "tween",
          ease: [0.22, 1, 0.36, 1]
        }, className: "text-5xl md:text-6xl font-bold leading-[1.06] tracking-tight", children: [
          "Frequently",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "asked." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.p, { initial: {
          opacity: 0,
          y: 16
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.3,
          type: "tween",
          ease: "easeOut"
        }, className: "mt-7 text-lg text-muted-foreground leading-relaxed max-w-xl", children: [
          "Everything you wanted to know — answered. Still need help?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-primary font-semibold hover:underline underline-offset-2", children: "Just ask us." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.5,
          delay: 0.45,
          type: "tween",
          ease: "easeOut"
        }, className: "mt-8 flex flex-wrap justify-center gap-3", children: [{
          icon: Star,
          label: "Trusted by 450+ clients"
        }, {
          icon: Clock,
          label: "Response in 24hrs"
        }, {
          icon: Shield,
          label: "No commitment needed"
        }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-xs font-semibold text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "h-3 w-3" }),
          p.label
        ] }, p.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          duration: 0.5,
          delay: 0.6
        }, className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 text-sm", children: [
          "Book Free Consultation",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" })
        ] }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-4xl px-4 pt-16 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "flex flex-wrap items-center gap-3 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveCategory(null), className: `px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${activeCategory === null ? "gradient-primary text-primary-foreground shadow-elegant" : "glass text-foreground/70 hover:text-foreground hover:shadow-glow"}`, children: "All Questions" }),
      categories.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryTab, { cat, active: activeCategory === i, onClick: () => setActiveCategory(activeCategory === i ? null : i) }, cat.label))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-4xl px-4 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 12
    }, animate: {
      opacity: 1,
      y: 0
    }, exit: {
      opacity: 0,
      y: -8
    }, transition: {
      duration: 0.3
    }, className: "space-y-3", children: displayedFaqs.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FaqItem, { q: f.q, a: f.a, index: i, isOpen: openIndex === i, onToggle: () => setOpenIndex(openIndex === i ? null : i) }, f.q)) }, activeCategory ?? "all") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-4xl px-4 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(0.1), className: "relative glass rounded-3xl p-10 md:p-14 overflow-hidden text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-primary opacity-[0.05] rounded-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        scale: [1, 1.15, 1],
        opacity: [0.15, 0.3, 0.15]
      }, transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }, className: "absolute -top-10 -right-10 h-60 w-60 rounded-full pointer-events-none", style: {
        background: "radial-gradient(circle, hsl(var(--primary)/0.2) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1]
      }, transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3
      }, className: "absolute -bottom-8 -left-8 h-48 w-48 rounded-full pointer-events-none", style: {
        background: "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-elegant", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-7 w-7 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Still unsure?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Let's talk it through." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-md mx-auto mb-8 leading-relaxed", children: "Book a free 45-minute strategy call. Walk away with clarity on scope, cost and next steps — whether you work with us or not." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-8 py-4 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95", children: [
          "Book Free Consultation",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap justify-center gap-5 text-xs text-muted-foreground", children: ["No commitment required", "Response within 24 hours", "Completely free"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 text-primary/60" }),
          t
        ] }, t)) })
      ] })
    ] }) })
  ] });
}
export {
  FAQs as component
};
