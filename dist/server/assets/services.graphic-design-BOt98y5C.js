import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-D_UF2F5s.js";
import { L as Link } from "./router-DfFauod9.js";
import { c as createLucideIcon, u as useTransform, L as Layout, a as GridBackground, F as FloatingShapes, m as motion, A as ArrowRight, j as ArrowUpRight, C as CircleCheck, i as ChevronDown, b as AnimatePresence } from "./Scene3D-BXzIJuzj.js";
import { u as useScroll } from "./use-scroll-CkkmOARf.js";
import { P as Palette } from "./palette-Cz-rwFow.js";
import { P as Package, F as FileText } from "./package-CavIO47r.js";
import { A as Award } from "./award-BMRkICj9.js";
import { E as Eye } from "./eye-BfGBZB42.js";
import { S as Sparkles } from "./sparkles-BVXYaY9v.js";
import { S as Star } from "./star-7BPJTbl0.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const BookOpen = createLucideIcon("BookOpen", [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
]);
const Brush = createLucideIcon("Brush", [
  ["path", { d: "m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08", key: "1styjt" }],
  [
    "path",
    {
      d: "M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z",
      key: "z0l1mu"
    }
  ]
]);
const CreditCard = createLucideIcon("CreditCard", [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
]);
const Feather = createLucideIcon("Feather", [
  [
    "path",
    {
      d: "M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z",
      key: "18jl4k"
    }
  ],
  ["path", { d: "M16 8 2 22", key: "vp34q" }],
  ["path", { d: "M17.5 15H9", key: "1oz8nu" }]
]);
const Grid3x3 = createLucideIcon("Grid3x3", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
]);
const Monitor = createLucideIcon("Monitor", [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
]);
const Pen = createLucideIcon("Pen", [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
]);
const features = [{
  icon: Pen,
  color: "#ec4899",
  bg: "rgba(236,72,153,0.10)",
  t: "Logo Design",
  d: "Marks that are timeless, scalable and unmistakably yours — crafted to work at every size, in every context, for decades."
}, {
  icon: Grid3x3,
  color: "#8b5cf6",
  bg: "rgba(139,92,246,0.10)",
  t: "Brand Systems",
  d: "Type, colour, voice and motion — codified and consistent across every touchpoint, from your website to your packaging."
}, {
  icon: BookOpen,
  color: "#06b6d4",
  bg: "rgba(6,182,212,0.10)",
  t: "Brochures & Collateral",
  d: "Print-ready editorial pieces that position your brand at the premium end of the market and sell without saying a word."
}, {
  icon: FileText,
  color: "#f59e0b",
  bg: "rgba(245,158,11,0.10)",
  t: "Company Profiles",
  d: "Editorial-grade capability documents built for high-stakes pitches, investor decks, and enterprise procurement processes."
}, {
  icon: CreditCard,
  color: "#10b981",
  bg: "rgba(16,185,129,0.10)",
  t: "Visiting Cards",
  d: "Premium business cards designed with finish, weight and character — because a first impression should be impossible to forget."
}, {
  icon: Monitor,
  color: "#f43f5e",
  bg: "rgba(244,63,94,0.10)",
  t: "Web & UI Design",
  d: "Beautiful, conversion-focused interfaces in Figma — pixel-perfect, responsive, and handed off ready for development."
}];
const processSteps = [{
  n: "01",
  t: "Discovery",
  d: "Brand questionnaire, goals, competitive audit.",
  icon: Eye,
  color: "#ec4899"
}, {
  n: "02",
  t: "Explore",
  d: "Mood boards, visual directions, reference curation.",
  icon: Sparkles,
  color: "#8b5cf6"
}, {
  n: "03",
  t: "Create",
  d: "Initial concepts presented across 3 directions.",
  icon: Pen,
  color: "#06b6d4"
}, {
  n: "04",
  t: "Refine",
  d: "Deep iteration on the chosen route with your team.",
  icon: Brush,
  color: "#f59e0b"
}, {
  n: "05",
  t: "Deliver",
  d: "Source files, brand guidelines, asset handoff.",
  icon: Package,
  color: "#10b981"
}];
const deliverables = ["Logo suite — primary, monogram & all lockups", "Full brand guidelines PDF (50+ pages)", "Source files — Figma, .AI, .PSD, .EPS", "Print-ready collateral (CMYK, bleed-ready)", "Social media template kit", "Web & favicon asset exports"];
const techStack = [{
  name: "Figma",
  color: "#ec4899"
}, {
  name: "Adobe Illustrator",
  color: "#f59e0b"
}, {
  name: "Photoshop",
  color: "#06b6d4"
}, {
  name: "InDesign",
  color: "#8b5cf6"
}, {
  name: "After Effects",
  color: "#10b981"
}, {
  name: "Procreate",
  color: "#f43f5e"
}];
const stats = [{
  v: "300+",
  l: "Brand identities delivered"
}, {
  v: "98%",
  l: "Client satisfaction rate"
}, {
  v: "3",
  l: "Concepts per project"
}, {
  v: "100%",
  l: "Full IP transferred to you"
}];
const testimonials = [{
  name: "Ahmed Khalil",
  role: "Founder, Dunescape",
  quote: "The logo alone transformed how investors perceived our company. Webcore's design team is simply on another level.",
  photo: "/ahmed-khalil.webp",
  stars: 5
}, {
  name: "Sarah Lin",
  role: "CTO, NorthPeak",
  quote: "Our rebrand went seamlessly. The brand system they delivered is so thorough our in-house team can work fully independently.",
  photo: "/sarah-lin.webp",
  stars: 5
}, {
  name: "Connor James",
  role: "Managing Director",
  quote: "We've worked with big agencies before. Webcore gave us better quality at a fraction of the time and cost. Remarkable.",
  photo: "/connor-james.webp",
  stars: 5
}];
const faqs = [{
  q: "How many logo concepts will you present?",
  a: "We present 3 distinct directions — each with a clear strategic rationale. Once you choose a direction, we iterate deeply until the mark is exactly right. Most clients land on a final logo within 2–3 revision rounds."
}, {
  q: "Do I get full IP ownership of my designs?",
  a: "Yes, absolutely. Full intellectual property transfer is included on final delivery. You own every file, every mark, every asset — with no licensing restrictions or future royalties."
}, {
  q: "What file formats will I receive?",
  a: "You receive editable source files in Figma and Adobe formats (.AI, .PSD, .EPS), plus export-ready assets in SVG, PNG and PDF. Print files are prepared in CMYK with proper bleed and trim marks."
}, {
  q: "Can you work with an existing brand rather than starting from scratch?",
  a: "Yes — we offer brand refresh and brand extension services. We conduct an audit of your existing assets, identify what's worth keeping, and build a coherent system around your strongest elements."
}, {
  q: "How long does a full brand identity project take?",
  a: "A complete logo and brand guidelines project typically takes 3–5 weeks from brief to final delivery. If you need collateral (brochures, business cards, profiles) alongside the identity, we scope an additional 1–3 weeks depending on volume."
}, {
  q: "Do you offer print management or production?",
  a: "We deliver print-ready files built to professional print specifications (CMYK, 300dpi, bleed and slug). We can also recommend trusted print partners in your region and review printer proofs on your behalf."
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
function Card3D({
  children,
  className = ""
}) {
  const ref = reactExports.useRef(null);
  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = (e.clientY - r.top - r.height / 2) / (r.height / 2) * -8;
    const ry = (e.clientX - r.left - r.width / 2) / (r.width / 2) * 8;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px) scale(1.015)`;
    el.style.transition = "transform 0.05s linear";
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateZ(0) scale(1)";
    el.style.transition = "transform 0.45s cubic-bezier(0.23,1,0.32,1)";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className, onMouseMove: onMove, onMouseLeave: onLeave, style: {
    transformStyle: "preserve-3d",
    willChange: "transform"
  }, children });
}
function FaqItem({
  q,
  a,
  index
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(index * 0.07), className: `relative border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-primary/25 glass" : "border-border/40 glass hover:border-primary/20"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full transition-all duration-300 ${open ? "gradient-primary opacity-100" : "opacity-0"}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(!open), className: "relative w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-primary/[0.03] transition-colors duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm md:text-base pr-4", children: q }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        rotate: open ? 180 : 0
      }, transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }, className: `shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "gradient-primary" : "bg-primary/10 hover:bg-primary/15"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-4 w-4 ${open ? "text-primary-foreground" : "text-primary"}` }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      height: 0,
      opacity: 0
    }, animate: {
      height: "auto",
      opacity: 1
    }, exit: {
      height: 0,
      opacity: 0
    }, transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1]
    }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-5 pt-4 text-sm text-muted-foreground leading-relaxed border-t border-border/30", children: a }) }) })
  ] });
}
function TestimonialPhoto({
  photo,
  name
}) {
  const [err, setErr] = reactExports.useState(false);
  return err ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0 ring-1 ring-border/30", children: name[0] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: photo, alt: name, onError: () => setErr(true), className: "h-9 w-9 rounded-full object-cover object-top shrink-0 ring-1 ring-border/30" });
}
function GraphicDesign() {
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: heroRef, className: "relative overflow-hidden min-h-[78vh] flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "var(--gradient-hero)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GridBackground, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingShapes, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        scale: [1, 1.15, 1],
        opacity: [0.22, 0.45, 0.22]
      }, transition: {
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut"
      }, className: "absolute top-10 right-16 rounded-full pointer-events-none", style: {
        width: 520,
        height: 520,
        background: "radial-gradient(circle, hsl(var(--primary)/0.14) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.22, 0.1]
      }, transition: {
        duration: 13,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3
      }, className: "absolute bottom-0 left-12 rounded-full pointer-events-none", style: {
        width: 320,
        height: 320,
        background: "radial-gradient(circle, hsl(var(--primary)/0.10) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        scale: [1, 1.3, 1],
        opacity: [0.06, 0.14, 0.06]
      }, transition: {
        duration: 11,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5
      }, className: "absolute top-1/3 left-1/4 rounded-full pointer-events-none", style: {
        width: 280,
        height: 280,
        background: "radial-gradient(circle, #ec4899 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: {
        y: heroY,
        opacity: heroOpacity
      }, className: "relative w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 pt-20 pb-32 md:pt-24 md:pb-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            scale: 0.88
          }, animate: {
            opacity: 1,
            scale: 1
          }, transition: {
            duration: 0.5,
            delay: 0.08,
            type: "tween",
            ease: [0.22, 1, 0.36, 1]
          }, className: "inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-7", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-3.5 w-3.5 text-primary" }),
            "Graphic Design"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
            opacity: 0,
            y: 28
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.8,
            type: "tween",
            ease: [0.22, 1, 0.36, 1]
          }, className: "text-5xl md:text-6xl lg:text-[66px] font-bold leading-[1.04] tracking-tight", children: [
            "Brand identity that",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "commands attention." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
            opacity: 0,
            y: 14
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.6,
            delay: 0.25,
            type: "tween",
            ease: "easeOut"
          }, className: "mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg", children: "From distinctive logos to editorial-grade brand systems — design that earns your audience's trust at first glance and keeps it for years." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
            opacity: 0,
            y: 12
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.5,
            delay: 0.38,
            type: "tween",
            ease: "easeOut"
          }, className: "mt-7 flex flex-wrap gap-2.5", children: [{
            icon: Pen,
            label: "Full IP ownership"
          }, {
            icon: Feather,
            label: "3 concepts presented"
          }, {
            icon: Package,
            label: "Print-ready source files"
          }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 glass border border-border/40 rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "h-3 w-3 text-primary" }),
            p.label
          ] }, p.label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            y: 12
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.5,
            delay: 0.48,
            type: "tween",
            ease: "easeOut"
          }, className: "mt-9 flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] text-sm", children: [
              "Book a free consultation",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", className: "group inline-flex items-center gap-2 rounded-2xl glass border border-border/40 px-7 py-3.5 font-semibold hover:border-border/70 transition-all duration-200 hover:-translate-y-0.5 text-sm", children: [
              "All services",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          x: 30
        }, animate: {
          opacity: 1,
          x: 0
        }, transition: {
          duration: 0.7,
          delay: 0.2,
          type: "tween",
          ease: [0.22, 1, 0.36, 1]
        }, className: "relative hidden md:grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-6 gradient-primary opacity-[0.07] blur-3xl rounded-full pointer-events-none" }),
          stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { animate: {
            y: [0, -8, 0]
          }, transition: {
            duration: 4 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }, className: "glass border border-border/30 rounded-2xl p-6 text-center cursor-default", style: {
            transform: "perspective(600px) rotateY(-4deg) rotateX(2deg)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold gradient-text mb-1", children: s.v }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground leading-tight", children: s.l })
          ] }, s.l))
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "What We Design" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold", children: [
            "Every design discipline,",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "under one roof."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm text-sm leading-relaxed", children: "From the first mark on a page to a fully codified brand system — we handle every visual discipline in-house." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 24
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.07,
        duration: 0.55,
        type: "tween",
        ease: "easeOut"
      }, className: "group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card3D, { className: "relative bg-card/60 backdrop-blur-sm border border-border/35 rounded-2xl p-7 h-full hover:border-border/60 transition-all duration-300 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl opacity-[0.05] pointer-events-none", style: {
          background: f.color
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[48px] h-[48px] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300", style: {
            background: f.bg,
            boxShadow: `0 4px 16px ${f.color}18`
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5", style: {
            color: f.color
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base mb-2", children: f.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: f.d })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center", style: {
          background: `linear-gradient(to right, transparent, ${f.color}55, transparent)`
        } })
      ] }) }, f.t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fadeUp(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border/35 rounded-2xl p-8 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Deliverables" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-6", children: "What you walk away with." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3.5", children: deliverables.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.li, { initial: {
          opacity: 0,
          x: -14
        }, whileInView: {
          opacity: 1,
          x: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.08,
          duration: 0.45,
          type: "tween",
          ease: "easeOut"
        }, className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: d })
        ] }, d)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fadeUp(0.1), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border/35 rounded-2xl p-8 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Tools & Software" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-2", children: "Our design toolset." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-7 leading-relaxed", children: "Industry-standard tools handled by senior designers — so your files are always compatible, portable and future-proof." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: techStack.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          scale: 0.88
        }, whileInView: {
          opacity: 1,
          scale: 1
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.06,
          duration: 0.4,
          type: "tween",
          ease: "easeOut"
        }, whileHover: {
          y: -3,
          scale: 1.06
        }, className: "inline-flex items-center gap-2 bg-card/80 border border-border/40 rounded-xl px-4 py-2.5 cursor-default hover:border-border/70 transition-all duration-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full", style: {
            background: t.color
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: t.name })
        ] }, t.name)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-start gap-3 p-4 bg-primary/[0.05] border border-primary/15 rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "100% IP transfer." }),
            " ",
            "Every file, every asset, every mark belongs to you on final delivery. No licensing, no subscriptions, no strings attached."
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center max-w-2xl mx-auto mb-18", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Our Process" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold", children: [
          "From brief to brand —",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "five clear steps."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground text-sm", children: "A structured creative process refined across 300+ brand projects." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          scaleX: 0
        }, whileInView: {
          scaleX: 1
        }, viewport: {
          once: true
        }, transition: {
          duration: 1.1,
          delay: 0.3,
          type: "tween",
          ease: "easeOut"
        }, className: "hidden md:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border/60 to-transparent origin-left" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-5 gap-6", children: processSteps.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 24
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: 0.1 + i * 0.1,
          duration: 0.5,
          type: "tween",
          ease: "easeOut"
        }, whileHover: {
          y: -6
        }, className: "group relative text-center cursor-default", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300", style: {
            background: `linear-gradient(135deg, ${p.color}cc, ${p.color}88)`,
            boxShadow: `0 6px 24px ${p.color}40`
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full blur-xl opacity-30 -z-10 pointer-events-none", style: {
              background: p.color
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "h-7 w-7 text-white" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-1", children: p.n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm mb-1.5", children: p.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: p.d })
        ] }, p.n)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Client Stories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold", children: "What our clients say." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 24
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.1,
        duration: 0.55,
        type: "tween",
        ease: "easeOut"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card3D, { className: "bg-card/60 backdrop-blur-sm border border-border/35 rounded-2xl p-6 h-full hover:border-border/60 transition-colors duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5 mb-4", children: Array.from({
          length: t.stars
        }).map((_, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-primary text-primary" }, j)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/75 leading-relaxed mb-5", children: [
          '"',
          t.quote,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-border/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialPhoto, { photo: t.photo, name: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm leading-none", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: t.role })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto w-7 h-7 rounded-full flex items-center justify-center bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-primary" }) })
        ] })
      ] }) }, t.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-4xl px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "FAQs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold", children: [
          "Common questions",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "about design work."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-muted-foreground max-w-md mx-auto text-sm", children: [
          "Still have questions?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-primary font-semibold hover:underline underline-offset-2", children: "Just ask us directly." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 relative", children: faqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FaqItem, { q: faq.q, a: faq.a, index: i }, faq.q)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-5xl px-4 py-10 pb-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "relative overflow-hidden rounded-2xl gradient-primary shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 w-full h-full opacity-[0.06]", xmlns: "http://www.w3.org/2000/svg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: "cta-grid-gd", width: "32", height: "32", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 32 0 L 0 0 0 32", fill: "none", stroke: "white", strokeWidth: "0.5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#cta-grid-gd)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
          scale: [1, 1.22, 1],
          opacity: [0.13, 0.25, 0.13]
        }, transition: {
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }, className: "absolute -top-14 -right-14 w-64 h-64 rounded-full bg-white/10 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
          scale: [1, 1.28, 1],
          opacity: [0.1, 0.18, 0.1]
        }, transition: {
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }, className: "absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white/10 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
          rotate: 360
        }, transition: {
          duration: 24,
          repeat: Infinity,
          ease: "linear"
        }, className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-white/[0.06] pointer-events-none" }),
        [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
          opacity: [0, 1, 0],
          scale: [0.4, 1.3, 0.4]
        }, transition: {
          duration: 2.8 + i * 0.55,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.8
        }, className: "absolute w-1 h-1 rounded-full bg-white/60", style: {
          top: `${12 + i * 13}%`,
          left: `${6 + i * 12}%`
        } }, i))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-10 md:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-3 w-3 text-pink-300" }),
            "Free brand consultation"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl md:text-3xl font-bold text-white leading-snug", children: [
            "Ready to build a brand",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
            " that earns attention?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm mt-2.5 leading-relaxed max-w-sm", children: "Book a free 45-minute discovery call. We'll audit your current brand and map out the right creative direction." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-6 mt-5", children: [{
            v: "300+",
            l: "Brand projects"
          }, {
            v: "3",
            l: "Concepts shown"
          }, {
            v: "100%",
            l: "IP transferred"
          }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-white leading-none", children: s.v }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/45 mt-0.5 uppercase tracking-wide", children: s.l })
          ] }, s.l)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 shrink-0 w-full md:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { whileHover: {
            scale: 1.03,
            y: -2
          }, whileTap: {
            scale: 0.97
          }, transition: {
            type: "spring",
            stiffness: 420,
            damping: 18
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-foreground px-7 py-3 text-sm font-semibold shadow-elegant hover:opacity-95 transition-all duration-200 w-full", children: [
            "Book free consultation",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { whileHover: {
            scale: 1.03,
            y: -2
          }, whileTap: {
            scale: 0.97
          }, transition: {
            type: "spring",
            stiffness: 420,
            damping: 18
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", className: "group inline-flex items-center justify-center gap-2 rounded-xl bg-white/12 text-white border border-white/20 px-7 py-3 text-sm font-semibold hover:bg-white/20 transition-all duration-200 w-full", children: [
            "View all services",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-4 mt-1", children: ["No commitment", "Free of charge"].map((label) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[10px] text-white/45", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
            label
          ] }, label)) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  GraphicDesign as component
};
