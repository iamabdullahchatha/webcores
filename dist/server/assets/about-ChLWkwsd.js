import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-D_UF2F5s.js";
import { L as Link } from "./router-DfFauod9.js";
import { c as createLucideIcon, u as useTransform, L as Layout, a as GridBackground, F as FloatingShapes, m as motion, f as MapPin, A as ArrowRight, G as Globe, Z as Zap, C as CircleCheck, i as ChevronDown } from "./Scene3D-BXzIJuzj.js";
import { u as useScroll } from "./use-scroll-CkkmOARf.js";
import { A as Award } from "./award-BMRkICj9.js";
import { U as Users, L as Layers } from "./users-B_118NDf.js";
import { B as Briefcase, S as ShieldCheck, H as Heart } from "./shield-check-Dcji75vA.js";
import { E as Eye } from "./eye-BfGBZB42.js";
import { L as Lightbulb } from "./lightbulb-hsS0suQr.js";
import { C as CodeXml } from "./code-xml-Dhz1xHxm.js";
import { C as Clock } from "./clock-B4uQmsaI.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const MessageSquare = createLucideIcon("MessageSquare", [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
]);
const Target = createLucideIcon("Target", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
]);
const TrendingUp = createLucideIcon("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
const stats = [{
  v: "12+",
  l: "Years Experience",
  icon: Award
}, {
  v: "450+",
  l: "Happy Clients",
  icon: Users
}, {
  v: "25+",
  l: "Team Members",
  icon: Briefcase
}, {
  v: "5",
  l: "Countries",
  icon: Globe
}];
const timeline = [{
  year: "2012",
  title: "Founded in Dubai",
  desc: "Muhammad Abdullah Chattha launches Webcore with a team of 3, focused on web development for regional businesses."
}, {
  year: "2015",
  title: "First 100 Clients",
  desc: "Milestone reached as Webcore expands into SEO, graphic design, and CMS development services."
}, {
  year: "2018",
  title: "Global Expansion",
  desc: "Offices and client portfolios established in UK, Europe, and America. Team grows to 15 members."
}, {
  year: "2021",
  title: "Software Division",
  desc: "Dedicated software engineering division launched, handling enterprise data systems and custom SaaS products."
}, {
  year: "2024",
  title: "450+ Clients Worldwide",
  desc: "Serving clients across 5 regions with a 25-member team of engineers, designers, and strategists."
}];
const faqs = [{
  q: "Where is Webcore Solutions based?",
  a: "We are headquartered in Dubai, UAE, with active client operations across Europe, the UK, America, and Pakistan. Our team works across time zones to serve clients globally."
}, {
  q: "What types of businesses do you work with?",
  a: "We work with ambitious businesses of all sizes — from early-stage startups building their first product to established enterprises modernising legacy systems. Our sweet spot is teams that want premium execution, not just cheap output."
}, {
  q: "How long does a typical project take?",
  a: "Project timelines vary by scope. A branding project typically takes 2–3 weeks. A web or CMS build ranges from 4–8 weeks. Custom software or enterprise systems are scoped individually, usually 8–20 weeks. We always agree on milestones upfront."
}, {
  q: "Do you offer ongoing support after launch?",
  a: "Yes — every engagement includes a post-launch support period, and we offer ongoing retainer packages for maintenance, updates, and continued growth work. Most of our clients continue working with us long after launch."
}, {
  q: "How does pricing work?",
  a: "We operate on fixed-scope or retainer pricing — never hourly billing surprises. After a discovery call, we provide a transparent proposal with a clear scope, timeline, and cost. No hidden fees, ever."
}, {
  q: "What makes Webcore different from other agencies?",
  a: "Three things: craft, process, and integrity. We don't outsource your project to juniors, we don't overpromise on timelines, and we don't disappear after payment. You get a senior team, a clear process, and honest communication from start to finish."
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
function FaqItem({
  q,
  a,
  index
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(index * 0.07), className: "group border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(!open), className: "w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-primary/[0.03] transition-colors duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm md:text-base pr-4", children: q }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        rotate: open ? 180 : 0
      }, transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }, className: "shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-primary" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: false, animate: {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0
    }, transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1]
    }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-4", children: a }) })
  ] });
}
function About() {
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
          "About Webcore Solutions"
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
          "We design and ship",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "premium digital" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "products." })
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
        }, className: "mt-7 text-lg text-muted-foreground leading-relaxed max-w-xl", children: "Born in Dubai, made for the world. Webcore partners with ambitious teams to engineer software that performs and endures." }),
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
        }, className: "mt-8 flex flex-wrap justify-center gap-3", children: ["Dubai HQ", "12+ Years", "5 Regions", "450+ Clients"].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-xs font-semibold text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
          tag
        ] }, tag)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          duration: 0.5,
          delay: 0.6
        }, className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 text-sm", children: [
          "Work with us",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" })
        ] }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative border-y border-border/40 py-12 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-muted/10 to-background pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold gradient-text", children: s.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: s.l })
      ] }, s.l)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-16 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Our Story" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold leading-tight mb-6", children: [
          "Built on craft.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Grown on trust."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-muted-foreground leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Founded in Dubai, UAE under the leadership of CEO",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Muhammad Abdullah Chattha" }),
            ", Webcore Solutions began with a simple belief: that great software is the result of great craft."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We started as a small team of three, focused on delivering web solutions to regional businesses who deserved better than what the market was offering. We obsessed over details others ignored — performance, accessibility, maintainability." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Over a decade later, we serve clients across Europe, the UK, America, Dubai and Pakistan — building everything from custom software to e-commerce platforms, brand systems, and growth engines. The team is bigger, the work is more complex, but the obsession hasn't changed." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap gap-3", children: [{
          icon: Globe,
          text: "Dubai Headquartered"
        }, {
          icon: Users,
          text: "25+ Member Team"
        }, {
          icon: ShieldCheck,
          text: "Integrity-First Culture"
        }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs font-semibold glass rounded-full px-4 py-2 text-foreground/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-3.5 w-3.5 text-primary" }),
          item.text
        ] }, item.text)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(0.1), className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: timeline.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          x: 20
        }, whileInView: {
          opacity: 1,
          x: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.1,
          duration: 0.55,
          type: "tween",
          ease: [0.22, 1, 0.36, 1]
        }, className: "relative pl-14 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-1 h-10 w-10 rounded-full gradient-primary flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl px-5 py-4 hover:shadow-glow transition-all duration-300 group-hover:-translate-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-primary/70 mb-1", children: item.year }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm mb-1", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground leading-relaxed", children: item.desc })
          ] })
        ] }, item.year)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center max-w-2xl mx-auto mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "What Drives Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold", children: [
          "Purpose behind",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "every project."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
        icon: Target,
        t: "Mission",
        d: "Empower global businesses with software that's both beautiful and built to scale — without compromise on either."
      }, {
        icon: Eye,
        t: "Vision",
        d: "To be the most trusted and dependable digital partner for ambitious businesses across every region we serve."
      }, {
        icon: Heart,
        t: "Values",
        d: "Client obsession, intellectual curiosity, and radical integrity in every line of code, every design decision."
      }].map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(i * 0.12), whileHover: {
        y: -8
      }, className: "group relative glass rounded-3xl p-8 overflow-hidden hover:shadow-glow transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-8 -top-8 h-36 w-36 rounded-full gradient-primary opacity-5 blur-2xl group-hover:opacity-20 transition-opacity duration-300" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-elegant group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "h-7 w-7 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-3", children: v.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: v.d }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" })
      ] }, v.t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "glass rounded-3xl p-10 md:p-14 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-16 -top-16 h-64 w-64 rounded-full gradient-primary opacity-[0.07] blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "What We Do" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl md:text-4xl font-bold leading-tight mb-4", children: [
            "Six specialisms.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "One trusted team."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Whether you need a single service or an end-to-end digital partner, we deliver every discipline in-house — no outsourcing, no middlemen." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", className: "group inline-flex items-center gap-2 mt-7 text-primary font-semibold text-sm", children: [
            "Explore all services",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [{
          icon: Lightbulb,
          label: "IT Consultation"
        }, {
          icon: Layers,
          label: "CMS Development"
        }, {
          icon: Globe,
          label: "Web Development"
        }, {
          icon: CodeXml,
          label: "Software Dev"
        }, {
          icon: TrendingUp,
          label: "SEO & GEO"
        }, {
          icon: MessageSquare,
          label: "Brand & Design"
        }].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          scale: 0.9
        }, whileInView: {
          opacity: 1,
          scale: 1
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.07,
          duration: 0.45,
          type: "tween",
          ease: [0.22, 1, 0.36, 1]
        }, whileHover: {
          scale: 1.04,
          y: -2
        }, className: "group flex items-center gap-2.5 bg-background/60 rounded-xl px-3.5 py-3 hover:bg-primary/5 hover:shadow-glow transition-all duration-200 cursor-default", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-lg gradient-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-3.5 w-3.5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: item.label })
        ] }, item.label)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-4xl px-4 py-16 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "FAQs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold", children: [
          "Questions we",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "hear often."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-muted-foreground max-w-xl mx-auto", children: [
          "Everything you need to know before working with us. Still have questions? ",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-primary font-semibold hover:underline underline-offset-2", children: "Just ask." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: faqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FaqItem, { q: faq.q, a: faq.a, index: i }, faq.q)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fadeUp(0.3), className: "mt-14 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-10 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-primary opacity-[0.04] rounded-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-8 w-8 text-primary mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-2", children: "Still have questions?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-sm mx-auto", children: "Book a free 45-minute strategy call. Walk away with clarity — whether you work with us or not." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 text-sm", children: [
            "Book Free Consultation",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground", children: ["No commitment", "Response within 24hrs", "Free of charge"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 text-primary/60" }),
            t
          ] }, t)) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  About as component
};
