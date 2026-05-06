import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-D_UF2F5s.js";
import { L as Link } from "./router-DfFauod9.js";
import { c as createLucideIcon, u as useTransform, L as Layout, a as GridBackground, F as FloatingShapes, m as motion, A as ArrowRight, j as ArrowUpRight, G as Globe, C as CircleCheck, Z as Zap, f as MapPin, d as useInView, k as useMotionValue, l as useSpring } from "./Scene3D-BXzIJuzj.js";
import { u as useScroll } from "./use-scroll-CkkmOARf.js";
import { S as Sparkles } from "./sparkles-BVXYaY9v.js";
import { A as Award } from "./award-BMRkICj9.js";
import { U as Users, L as Layers } from "./users-B_118NDf.js";
import { B as Briefcase, H as Heart, S as ShieldCheck } from "./shield-check-Dcji75vA.js";
import { S as Star } from "./star-7BPJTbl0.js";
import { L as Lightbulb } from "./lightbulb-hsS0suQr.js";
import { C as CodeXml } from "./code-xml-Dhz1xHxm.js";
import { S as Search } from "./search-CMOt_DnO.js";
import { P as Palette } from "./palette-Cz-rwFow.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const ExternalLink = createLucideIcon("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);
const Quote = createLucideIcon("Quote", [
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "rib7q0"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "1ymkrd"
    }
  ]
]);
const fadeUp = (delay = 0, duration = 0.65) => ({
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
    duration,
    delay,
    type: "tween",
    ease: [0.22, 1, 0.36, 1]
  }
});
const scaleIn = (delay = 0) => ({
  initial: {
    opacity: 0,
    scale: 0.92
  },
  whileInView: {
    opacity: 1,
    scale: 1
  },
  viewport: {
    once: true
  },
  transition: {
    duration: 0.6,
    delay,
    type: "tween",
    ease: [0.22, 1, 0.36, 1]
  }
});
const services = [{
  icon: Lightbulb,
  title: "IT Consultation",
  desc: "Cut through complexity with a roadmap built for scale. We align your tech strategy with your growth goals.",
  tag: "Strategy",
  metric: "3× faster decisions"
}, {
  icon: Layers,
  title: "CMS Development",
  desc: "Headless, composable content platforms that give your team full editorial control — without dev bottlenecks.",
  tag: "Platform",
  metric: "10× publishing speed"
}, {
  icon: Globe,
  title: "Web Development",
  desc: "High-performance websites and e-commerce stores designed to convert visitors into paying customers.",
  tag: "Web",
  metric: "Sub-1s load times"
}, {
  icon: CodeXml,
  title: "Software Development",
  desc: "Custom data systems and applications engineered to scale from day one — built on solid architecture.",
  tag: "Engineering",
  metric: "99.9% uptime SLA"
}, {
  icon: Search,
  title: "SEO & GEO",
  desc: "Dominate search rankings locally and globally with data-driven organic growth strategies.",
  tag: "Growth",
  metric: "Top 3 rankings"
}, {
  icon: Palette,
  title: "Brand & Design",
  desc: "Visual identities that communicate authority instantly — logos, brand systems, and marketing collateral.",
  tag: "Design",
  metric: "Brand recognition +40%"
}];
const process = [{
  n: "01",
  t: "Discovery Call",
  d: "We map your vision, constraints and success metrics in a focused 45-min session.",
  icon: Sparkles
}, {
  n: "02",
  t: "Strategy & Scope",
  d: "A clear technical plan, architecture decisions and timeline — before a single line of code.",
  icon: Lightbulb
}, {
  n: "03",
  t: "Build & Iterate",
  d: "Weekly demos, async updates, and continuous feedback loops keep you fully in control.",
  icon: CodeXml
}, {
  n: "04",
  t: "Launch & Scale",
  d: "QA, performance hardening, live deployment, and ongoing support built into every engagement.",
  icon: Zap
}];
const stats = [{
  v: "12+",
  l: "Years Experience",
  icon: Award
}, {
  v: "450+",
  l: "Clients Worldwide",
  icon: Users
}, {
  v: "25+",
  l: "Team Members",
  icon: Briefcase
}, {
  v: "5",
  l: "Countries Served",
  icon: Globe
}];
const testimonials = [{
  name: "Sarah Lin",
  role: "CTO, NorthPeak",
  quote: "Webcore rebuilt our platform end-to-end. Load times dropped 78% and conversions jumped immediately.",
  stars: 5
}, {
  name: "Ahmed Khalil",
  role: "Founder, Dunescape",
  quote: "They didn't just deliver code — they delivered clarity. The system they built has scaled effortlessly for 3 years.",
  stars: 5
}, {
  name: "Maria Costa",
  role: "VP Eng, Fluxio",
  quote: "From discovery to deploy in 8 weeks, zero surprises. Their process is genuinely best-in-class.",
  stars: 5
}, {
  name: "James O'Connor",
  role: "CEO, Loomline",
  quote: "We doubled qualified leads in 90 days. Worth every penny and then some.",
  stars: 5
}, {
  name: "Yuki Tanaka",
  role: "Product Lead, Hexa",
  quote: "The rarest find: a team that's equally sharp on design and engineering. Our users noticed immediately.",
  stars: 5
}, {
  name: "Priya Nair",
  role: "Director, Ascend Co",
  quote: "Finally, an agency that treats deadlines as commitments, not suggestions. Delivered on time, every time.",
  stars: 5
}];
const portfolio = [{
  title: "NorthPeak Platform",
  category: "SaaS Dashboard",
  desc: "Enterprise analytics platform serving 50K+ users with real-time data pipelines.",
  gradientStyle: {
    background: "linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)"
  },
  metric: "4× performance uplift"
}, {
  title: "Dunescape E-Commerce",
  category: "Web Development",
  desc: "High-converting luxury retail store built on custom WooCommerce architecture.",
  gradientStyle: {
    background: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)"
  },
  metric: "$2M+ first-year GMV"
}, {
  title: "Fluxio CMS",
  category: "CMS Development",
  desc: "Headless content platform empowering a 40-person editorial team globally.",
  gradientStyle: {
    background: "linear-gradient(135deg, #047857 0%, #0d9488 100%)"
  },
  metric: "10× publishing speed"
}, {
  title: "Loomline SEO",
  category: "SEO & Growth",
  desc: "Comprehensive organic strategy that tripled qualified traffic within 6 months.",
  gradientStyle: {
    background: "linear-gradient(135deg, #c2410c 0%, #d97706 100%)"
  },
  metric: "3× organic traffic"
}, {
  title: "Hexa Brand System",
  category: "Brand & Design",
  desc: "Full visual identity and design system for a Series-A fintech startup.",
  gradientStyle: {
    background: "linear-gradient(135deg, #be185d 0%, #e11d48 100%)"
  },
  metric: "NPS score +34 pts"
}, {
  title: "Ascend ERP",
  category: "Software Development",
  desc: "Custom ERP system unifying operations across 12 regional offices.",
  gradientStyle: {
    background: "linear-gradient(135deg, #0369a1 0%, #2563eb 100%)"
  },
  metric: "40% ops cost reduction"
}];
const regions = [{
  name: "Europe",
  emoji: "🇪🇺"
}, {
  name: "UK",
  emoji: "🇬🇧"
}, {
  name: "America",
  emoji: "🇺🇸"
}, {
  name: "Dubai",
  emoji: "🇦🇪"
}, {
  name: "Pakistan",
  emoji: "🇵🇰"
}];
const values = [{
  icon: Heart,
  t: "Client Obsession",
  d: "We succeed when you succeed. Every decision traces back to your outcomes, not our convenience."
}, {
  icon: Lightbulb,
  t: "Deep Curiosity",
  d: "We ask better questions, challenge assumptions, and consistently find solutions others miss."
}, {
  icon: ShieldCheck,
  t: "Radical Integrity",
  d: "Honest scopes. Transparent pricing. No surprises. Just dependable delivery, every single time."
}];
const clientLogos = ["NorthPeak", "Dunescape", "Fluxio", "Loomline", "Hexa", "Ascend Co", "Vantara", "CloudSync", "Meridian", "Proxia"];
function SectionLabel({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-bold uppercase tracking-widest text-primary mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
    children
  ] });
}
function useCountUp(target, duration = 2e3, start = false) {
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
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
function StatCard({
  s,
  delay
}) {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, {
    once: true
  });
  const numericVal = parseInt(s.v.replace(/\D/g, ""));
  const suffix = s.v.replace(/[0-9]/g, "");
  const count = useCountUp(numericVal, 1800, inView);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ref, initial: {
    opacity: 0,
    y: 20
  }, animate: inView ? {
    opacity: 1,
    y: 0
  } : {}, transition: {
    duration: 0.55,
    delay,
    type: "tween",
    ease: [0.22, 1, 0.36, 1]
  }, whileHover: {
    y: -6,
    scale: 1.04
  }, className: "group glass rounded-2xl px-5 py-5 cursor-default", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5 text-primary mb-3 group-hover:scale-110 transition-transform duration-200" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl md:text-4xl font-bold gradient-text", children: [
      inView ? count : 0,
      suffix
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs md:text-sm text-muted-foreground mt-1", children: s.l })
  ] });
}
function TiltCard({
  children,
  className = ""
}) {
  const ref = reactExports.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 200,
    damping: 22
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 200,
    damping: 22
  });
  const handleMouse = reactExports.useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ref, style: {
    rotateX,
    rotateY,
    transformPerspective: 900
  }, onMouseMove: handleMouse, onMouseLeave: () => {
    x.set(0);
    y.set(0);
  }, className, children });
}
function Index() {
  const heroRef = reactExports.useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: heroRef, className: "relative overflow-hidden min-h-screen flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "var(--gradient-hero)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GridBackground, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingShapes, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        scale: [1, 1.18, 1],
        opacity: [0.25, 0.55, 0.25]
      }, transition: {
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut"
      }, className: "absolute top-16 right-20 rounded-full pointer-events-none", style: {
        width: 600,
        height: 600,
        background: "radial-gradient(circle, hsl(var(--primary)/0.18) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        scale: [1, 1.25, 1],
        opacity: [0.15, 0.35, 0.15]
      }, transition: {
        duration: 13,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2.5
      }, className: "absolute bottom-0 left-10 rounded-full pointer-events-none", style: {
        width: 380,
        height: 380,
        background: "radial-gradient(circle, hsl(var(--primary)/0.14) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        scale: [1, 1.1, 1],
        opacity: [0.08, 0.18, 0.08]
      }, transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 4
      }, className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none", style: {
        width: 900,
        height: 900,
        background: "radial-gradient(circle, hsl(var(--primary)/0.06) 0%, transparent 65%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: {
        y: heroY,
        opacity: heroOpacity
      }, className: "relative w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 pt-20 pb-36 md:pt-24 md:pb-44", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 32
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.85,
        type: "tween",
        ease: [0.22, 1, 0.36, 1]
      }, className: "max-w-5xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          scale: 0.82
        }, animate: {
          opacity: 1,
          scale: 1
        }, transition: {
          duration: 0.5,
          delay: 0.1,
          type: "tween",
          ease: [0.22, 1, 0.36, 1]
        }, className: "inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
          "Premium Software & Digital Studio",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-px h-3 bg-border/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Est. Dubai, UAE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-7xl font-bold leading-tight tracking-tight", children: [
          "Transforming",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Ideas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
          "into",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Digital Reality" })
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
        }, className: "mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed", children: "We turn ambitious product ideas into fast, scalable, and beautifully designed digital products — trusted by 450+ companies across 5 continents." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 16
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.4,
          type: "tween",
          ease: "easeOut"
        }, className: "mt-10 flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-8 py-4 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] active:scale-95", children: [
            "Book Free Consultation",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", className: "group inline-flex items-center gap-2 rounded-2xl glass px-8 py-4 font-semibold hover:shadow-glow transition-all duration-200 hover:-translate-y-1", children: [
            "View Our Work",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          duration: 0.6,
          delay: 0.6
        }, className: "mt-10 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2", children: ["S", "A", "M", "J", "Y"].map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full gradient-primary border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground", children: l }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "450+ companies" }),
            " ",
            "trust us to build their digital future"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 24
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7,
          delay: 0.55,
          type: "tween",
          ease: "easeOut"
        }, className: "mt-16 grid grid-cols-2 md:grid-cols-4 gap-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { s, delay: 0.6 + i * 0.08 }, s.l)) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative border-y border-border/40 py-10 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-muted/20 to-background pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-7", children: "Trusted by 450+ companies worldwide" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "flex gap-10 items-center", animate: {
            x: ["0%", "-50%"]
          }, transition: {
            duration: 22,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }, children: [...clientLogos, ...clientLogos].map((logo, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 px-5 py-2 rounded-xl glass text-sm font-bold text-muted-foreground/60 hover:text-foreground transition-colors duration-200 cursor-default whitespace-nowrap", children: logo }, i)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative mx-auto max-w-7xl px-4 py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "About Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold leading-tight", children: [
          "A Dubai-born studio",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "serving the world."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-muted-foreground text-lg leading-relaxed", children: [
          "Founded in Dubai, UAE under the leadership of",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "Muhammad Abdullah Chattha" }),
          ", Webcore Solutions partners with ambitious teams across Europe, UK, America, Dubai and Pakistan to ship product that performs — and endures."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-7 space-y-3.5", children: ["12+ years of compounded engineering craft", "Trusted by 450+ global clients — from startups to enterprises", "25+ engineers, designers & growth strategists"].map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.li, { initial: {
          opacity: 0,
          x: -16
        }, whileInView: {
          opacity: 1,
          x: 0
        }, viewport: {
          once: true
        }, transition: {
          duration: 0.5,
          delay: 0.1 + i * 0.1,
          type: "tween",
          ease: "easeOut"
        }, className: "flex items-center gap-3 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t })
        ] }, t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/about", className: "group inline-flex items-center gap-2 mt-9 text-primary font-semibold text-sm", children: [
          "Learn more about us",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...scaleIn(0.1), className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-8 gradient-primary opacity-10 blur-3xl rounded-full pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative grid grid-cols-2 gap-4 p-6 rounded-3xl glass", style: {
          transform: "perspective(900px) rotateY(-5deg) rotateX(3deg)"
        }, children: [{
          icon: Award,
          v: "12+",
          l: "Years Experience"
        }, {
          icon: Users,
          v: "450+",
          l: "Clients Worldwide"
        }, {
          icon: Briefcase,
          v: "25+",
          l: "Team Members"
        }, {
          icon: Star,
          v: "5★",
          l: "Avg. Rating"
        }].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { animate: {
          y: [0, -8, 0]
        }, transition: {
          duration: 4 + i * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.5
        }, whileHover: {
          scale: 1.06
        }, className: "group rounded-2xl bg-card/80 shadow-elegant flex flex-col items-center justify-center p-6 gap-2 cursor-default", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-6 w-6 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold gradient-text", children: item.v }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground text-center leading-tight", children: item.l })
        ] }, item.l)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mx-auto max-w-7xl px-4 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center max-w-2xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Why Choose Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold", children: [
          "The principles behind",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "every pixel we ship."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "We hold ourselves to a standard most agencies don't mention." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: values.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TiltCard, { className: "cursor-default", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(i * 0.12), whileHover: {
        y: -8
      }, className: "group relative glass rounded-3xl p-8 overflow-hidden hover:shadow-glow transition-all duration-300 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-8 -top-8 h-36 w-36 rounded-full gradient-primary opacity-5 blur-2xl group-hover:opacity-20 transition-opacity duration-300" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-elegant group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "h-7 w-7 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: v.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: v.d }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" })
      ] }) }, v.t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mx-auto max-w-7xl px-4 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "flex items-end justify-between flex-wrap gap-4 mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold", children: [
            "Everything you need.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Under one roof."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", className: "group inline-flex items-center gap-2 text-primary font-semibold text-sm", children: [
          "View all services",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TiltCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 32
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.07,
        duration: 0.6,
        type: "tween",
        ease: [0.22, 1, 0.36, 1]
      }, whileHover: {
        y: -10
      }, className: "group relative glass rounded-3xl p-7 overflow-hidden hover:shadow-glow transition-all duration-300 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -top-10 h-48 w-48 rounded-full gradient-primary opacity-5 blur-2xl group-hover:opacity-20 transition-opacity duration-300" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full", children: s.tag }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full", children: s.metric })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl gradient-primary flex items-center justify-center mb-5 shadow-elegant group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300", style: {
            width: 52,
            height: 52
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-6 w-6 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold mb-2", children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-6", children: s.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", className: "inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200", children: [
            "Learn more ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" })
      ] }) }, s.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mx-auto max-w-7xl px-4 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center max-w-2xl mx-auto mb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Our Process" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold", children: [
          "Predictable delivery.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Every single time."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "A battle-tested 4-step framework refined across 450+ projects and 12 years." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          scaleX: 0
        }, whileInView: {
          scaleX: 1
        }, viewport: {
          once: true
        }, transition: {
          duration: 1.4,
          delay: 0.3,
          type: "tween",
          ease: [0.22, 1, 0.36, 1]
        }, className: "hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-left" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-4 gap-8", children: process.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(0.1 + i * 0.13), whileHover: {
          y: -8
        }, className: "group relative text-center cursor-default", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto h-20 w-20 rounded-full gradient-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-glow mb-6 group-hover:scale-110 transition-transform duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full gradient-primary blur-xl opacity-40 -z-10 group-hover:opacity-70 transition-opacity duration-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "h-8 w-8" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold uppercase tracking-widest text-primary/60 mb-1", children: p.n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2", children: p.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: p.d })
        ] }, p.n)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mx-auto max-w-7xl px-4 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Portfolio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold", children: [
          "Work we're proud to",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "put our name on."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: portfolio.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 32
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.07,
        duration: 0.6,
        type: "tween",
        ease: [0.22, 1, 0.36, 1]
      }, whileHover: {
        y: -6,
        scale: 1.02
      }, className: "group relative overflow-hidden rounded-3xl cursor-pointer", style: {
        transformStyle: "preserve-3d"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 transition-opacity duration-300", style: p.gradientStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-[0.07]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full", xmlns: "http://www.w3.org/2000/svg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: `pg-${i}`, width: "28", height: "28", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 28 0 L 0 0 0 28", fill: "none", stroke: "white", strokeWidth: "0.5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: `url(#pg-${i})` })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-transparent group-hover:bg-white/[0.06] transition-colors duration-300 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-7 flex flex-col justify-between", style: {
          height: 224
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-white/75 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full", children: p.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 text-white" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/60 text-xs font-semibold mb-1.5", children: p.metric }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white mb-1.5", children: p.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm leading-relaxed line-clamp-2", children: p.desc })
          ] })
        ] })
      ] }, p.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-28 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center max-w-2xl mx-auto mb-16 px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Testimonials" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold", children: [
          "Results our clients",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "actually talk about."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Don't take our word for it — here's what teams say after working with us." })
      ] }),
      [{
        dir: 1,
        speed: 32
      }, {
        dir: -1,
        speed: 26
      }].map((row, ri) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative ${ri === 1 ? "mt-5" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "flex gap-5", animate: {
          x: row.dir === 1 ? ["0%", "-50%"] : ["-50%", "0%"]
        }, transition: {
          duration: row.speed,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }, children: [...testimonials, ...testimonials].map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 glass rounded-3xl p-6 flex flex-col gap-4 hover:shadow-glow transition-shadow duration-300", style: {
          width: 380
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: Array.from({
            length: t.stars
          }).map((_, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4", style: {
            fill: "#f59e0b",
            color: "#f59e0b"
          } }, j)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-5 w-5 text-primary/30 mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/80 leading-relaxed", children: [
              '"',
              t.quote,
              '"'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-3 border-t border-border/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0", children: t.name[0] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t.role })
            ] })
          ] })
        ] }, i)) })
      ] }, ri))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mx-auto max-w-7xl px-4 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center max-w-2xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Global Reach" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold", children: [
          "Wherever you build,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "we're right there."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Teams across 5 regions rely on Webcore to keep their digital operations running." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...scaleIn(0.1), className: "relative glass rounded-3xl p-12 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 w-full h-full opacity-[0.04]", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: "reach-grid", width: "40", height: "40", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: "hsl(var(--primary))", strokeWidth: "0.5" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#reach-grid)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex flex-wrap justify-center gap-4 md:gap-5", children: regions.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          scale: 0.6,
          y: 16
        }, whileInView: {
          opacity: 1,
          scale: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.1,
          duration: 0.5,
          type: "tween",
          ease: [0.22, 1, 0.36, 1]
        }, whileHover: {
          y: -6,
          scale: 1.06
        }, className: "group relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-primary blur-xl opacity-25 group-hover:opacity-55 transition-opacity duration-300 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-3 glass rounded-2xl px-6 py-3.5 font-semibold hover:shadow-glow transition-all duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: r.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: r.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" })
          ] })
        ] }, r.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative mx-auto max-w-7xl px-4 py-16 pb-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 32
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.22, 1, 0.36, 1]
    }, className: "relative overflow-hidden rounded-3xl gradient-primary shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 w-full h-full opacity-10", xmlns: "http://www.w3.org/2000/svg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: "cta-grid", width: "40", height: "40", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: "white", strokeWidth: "0.5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#cta-grid)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
          scale: [1, 1.35, 1],
          opacity: [0.15, 0.35, 0.15]
        }, transition: {
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }, className: "absolute -top-24 -right-24 rounded-full bg-white/10 blur-3xl", style: {
          width: 480,
          height: 480
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
          scale: [1, 1.4, 1],
          opacity: [0.12, 0.26, 0.12]
        }, transition: {
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5
        }, className: "absolute -bottom-24 -left-24 rounded-full bg-white/10 blur-3xl", style: {
          width: 400,
          height: 400
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-10 py-16 md:px-20 md:py-20 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          scale: 0.9
        }, whileInView: {
          opacity: 1,
          scale: 1
        }, viewport: {
          once: true
        }, transition: {
          duration: 0.5,
          delay: 0.1,
          type: "tween",
          ease: [0.22, 1, 0.36, 1]
        }, className: "inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80 mb-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5" }),
          "No commitment. Just clarity."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-[56px] font-bold text-primary-foreground mb-5 leading-[1.08] tracking-tight", children: [
          "Your next great product",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "starts with a conversation."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-lg mb-10 max-w-lg mx-auto leading-relaxed", children: "Book a free 45-minute strategy call and walk away with a clear technical roadmap — whether you work with us or not." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { whileHover: {
            scale: 1.04,
            y: -2
          }, whileTap: {
            scale: 0.97
          }, transition: {
            type: "spring",
            stiffness: 400,
            damping: 15
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex items-center gap-2 rounded-2xl bg-background text-foreground px-8 py-4 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200", children: [
            "Book Free Strategy Call ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { whileHover: {
            scale: 1.04,
            y: -2
          }, whileTap: {
            scale: 0.97
          }, transition: {
            type: "spring",
            stiffness: 400,
            damping: 15
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", className: "inline-flex items-center gap-2 rounded-2xl bg-white/20 text-white border border-white/25 px-8 py-4 font-semibold hover:bg-white/30 transition-all duration-200", children: [
            "Explore Services ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-9 flex flex-wrap justify-center gap-6 text-white/55 text-xs font-medium", children: ["Free consultation", "No sales pressure", "Clear deliverables", "Response within 24hrs"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 text-white/55" }),
          t
        ] }, t)) })
      ] })
    ] }) })
  ] });
}
export {
  Index as component
};
