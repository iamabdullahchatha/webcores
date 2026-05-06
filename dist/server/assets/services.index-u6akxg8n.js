import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-D_UF2F5s.js";
import { L as Link } from "./router-DfFauod9.js";
import { u as useTransform, L as Layout, a as GridBackground, F as FloatingShapes, m as motion, Z as Zap, A as ArrowRight, G as Globe, C as CircleCheck } from "./Scene3D-BXzIJuzj.js";
import { u as useScroll } from "./use-scroll-CkkmOARf.js";
import { A as Award } from "./award-BMRkICj9.js";
import { U as Users, L as Layers } from "./users-B_118NDf.js";
import { L as Lightbulb } from "./lightbulb-hsS0suQr.js";
import { D as Database } from "./database-C38GGc5l.js";
import { S as Search } from "./search-CMOt_DnO.js";
import { P as Palette } from "./palette-Cz-rwFow.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const services = [{
  icon: Lightbulb,
  t: "IT Consultation",
  d: "Strategic guidance, technology audits and clear roadmaps to help your team scale with confidence and precision.",
  to: "/services/it-consultation",
  tags: ["Strategy", "Audits", "Roadmaps"],
  accent: "from-blue-500 to-cyan-400",
  accentBg: "from-blue-500/10 to-cyan-400/5",
  // Replace src below with your image path e.g. "/images/it-consultation.jpg"
  img: null
}, {
  icon: Layers,
  t: "CMS Development",
  d: "Headless and custom content platforms built to evolve with your business — fast, flexible and editor-friendly.",
  to: "/services/cms-development",
  tags: ["Headless CMS", "WordPress", "Custom"],
  accent: "from-violet-500 to-purple-400",
  accentBg: "from-violet-500/10 to-purple-400/5",
  img: null
}, {
  icon: Globe,
  t: "Web Development",
  d: "Business sites, e-commerce stores and custom design solutions engineered to perform and convert.",
  to: "/services/web-development",
  tags: ["E-commerce", "WordPress", "React"],
  accent: "from-emerald-500 to-teal-400",
  accentBg: "from-emerald-500/10 to-teal-400/5",
  img: null
}, {
  icon: Database,
  t: "Software Development",
  d: "SaaS products, internal tools, APIs and enterprise data systems built for reliability and growth.",
  to: "/services/software-development",
  tags: ["SaaS", "APIs", "Enterprise"],
  accent: "from-orange-500 to-amber-400",
  accentBg: "from-orange-500/10 to-amber-400/5",
  img: null
}, {
  icon: Search,
  t: "SEO & GEO",
  d: "Rank higher locally and globally through sustainable, technically sound search and geo-optimisation strategies.",
  to: "/services/seo-geo",
  tags: ["Local SEO", "Technical SEO", "GEO"],
  accent: "from-rose-500 to-pink-400",
  accentBg: "from-rose-500/10 to-pink-400/5",
  img: null
}, {
  icon: Palette,
  t: "Graphic Design",
  d: "Logos, brochures, brand profiles and complete visual identity systems that make your business unforgettable.",
  to: "/services/graphic-design",
  tags: ["Branding", "Print", "Identity"],
  accent: "from-indigo-500 to-blue-400",
  accentBg: "from-indigo-500/10 to-blue-400/5",
  img: null
}];
const stats = [{
  v: "450+",
  l: "Projects Delivered",
  icon: Award
}, {
  v: "12+",
  l: "Years Experience",
  icon: Zap
}, {
  v: "25+",
  l: "Team Members",
  icon: Users
}];
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
function ServiceCard({
  s,
  i
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    opacity: 0,
    y: 36
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true,
    margin: "-40px"
  }, transition: {
    delay: i * 0.08,
    duration: 0.6,
    type: "tween",
    ease: [0.22, 1, 0.36, 1]
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: s.to, className: "group block relative glass rounded-3xl overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-2 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden h-52", children: [
      s.img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.img, alt: s.t, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `w-full h-full bg-linear-to-br ${s.accentBg} flex items-center justify-center relative`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-30", children: Array.from({
          length: 6
        }).map((_, r) => Array.from({
          length: 8
        }).map((_2, c) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute rounded-full bg-current opacity-10", style: {
          width: (r + c) % 3 === 0 ? 6 : 4,
          height: (r + c) % 3 === 0 ? 6 : 4,
          left: `${c * 14 + 4}%`,
          top: `${r * 18 + 4}%`,
          color: "hsl(var(--primary))"
        } }, `${r}-${c}`))) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: `h-24 w-24 rounded-3xl bg-linear-to-br ${s.accent} flex items-center justify-center shadow-elegant relative z-10`, whileHover: {
          rotate: [0, -6, 6, 0],
          scale: 1.05
        }, transition: {
          duration: 0.5
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-12 w-12 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-linear-to-br ${s.accent} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity duration-500` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -top-6 -left-6 h-28 w-28 rounded-full bg-linear-to-br ${s.accent} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-3 flex flex-wrap gap-1.5", children: s.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide glass border border-white/20 text-foreground/80 backdrop-blur-sm", children: tag }, tag)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-0 left-6 right-6 h-px bg-linear-to-r ${s.accent} opacity-30 group-hover:opacity-70 transition-opacity duration-300` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200", children: s.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: `shrink-0 h-8 w-8 rounded-xl bg-linear-to-br ${s.accent} flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-elegant`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-white" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5", children: s.d }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200", children: [
        "Explore service",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${s.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left` })
    ] })
  ] }) });
}
function Services() {
  const heroRef = reactExports.useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: heroRef, className: "relative overflow-hidden min-h-[70vh] flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "var(--gradient-hero)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GridBackground, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingShapes, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        scale: [1, 1.15, 1],
        opacity: [0.25, 0.5, 0.25]
      }, transition: {
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut"
      }, className: "absolute top-10 right-16 rounded-full pointer-events-none", style: {
        width: 500,
        height: 500,
        background: "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        scale: [1, 1.2, 1],
        opacity: [0.12, 0.28, 0.12]
      }, transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3
      }, className: "absolute bottom-0 left-8 rounded-full pointer-events-none", style: {
        width: 300,
        height: 300,
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
          "Our Services"
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
          "A full-stack",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "digital studio." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
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
        }, className: "mt-7 text-lg text-muted-foreground leading-relaxed max-w-xl", children: "From strategy and engineering to brand and growth — every service delivered in-house, no outsourcing, no middlemen." }),
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
          icon: Award,
          label: "450+ Projects"
        }, {
          icon: Zap,
          label: "12+ Years"
        }, {
          icon: Users,
          label: "25+ Experts"
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
          "Start a project",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" })
        ] }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative border-y border-border/40 py-10 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-r from-background via-muted/10 to-background pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 max-w-2xl mx-auto", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.1,
        duration: 0.55,
        type: "tween",
        ease: [0.22, 1, 0.36, 1]
      }, whileHover: {
        y: -4,
        scale: 1.03
      }, className: "group glass rounded-2xl px-5 py-5 text-center cursor-default hover:shadow-glow transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold gradient-text", children: s.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: s.l })
      ] }, s.l)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center max-w-2xl mx-auto mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "What We Offer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold leading-tight", children: [
          "Six specialisms.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "One trusted team."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Whether you need one service or a full-scope partner, we deliver every discipline in-house." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCard, { s, i }, s.t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-4xl px-4 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(0.1), className: "relative glass rounded-3xl p-10 md:p-14 overflow-hidden text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-primary opacity-[0.04] rounded-3xl pointer-events-none" }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-elegant", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-7 w-7 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Ready to start?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Let's build something great." }),
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
  Services as component
};
