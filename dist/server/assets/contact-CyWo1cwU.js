import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-D_UF2F5s.js";
import { c as createLucideIcon, u as useTransform, d as useInView, L as Layout, a as GridBackground, F as FloatingShapes, m as motion, Z as Zap, G as Globe, A as ArrowRight, P as Phone, e as Mail, f as MapPin, M as MessageCircle, g as Linkedin, h as Facebook, C as CircleCheck, i as ChevronDown, b as AnimatePresence } from "./Scene3D-BXzIJuzj.js";
import { L as Link } from "./router-DfFauod9.js";
import { u as useScroll } from "./use-scroll-CkkmOARf.js";
import { S as Shield } from "./shield-JOFxPuJS.js";
import { C as Clock } from "./clock-B4uQmsaI.js";
import { C as CircleHelp } from "./circle-help-Dy3_2VvY.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const Send = createLucideIcon("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
]);
const workingDays = [{
  day: "Mon",
  active: true
}, {
  day: "Tue",
  active: true
}, {
  day: "Wed",
  active: true
}, {
  day: "Thu",
  active: true
}, {
  day: "Fri",
  active: true
}, {
  day: "Sat",
  active: false
}, {
  day: "Sun",
  active: false
}];
const contactFaqs = [{
  q: "How quickly do you respond to enquiries?",
  a: "We respond to all enquiries within one business day. For urgent matters, WhatsApp is the fastest way to reach us."
}, {
  q: "Can I book a free consultation call?",
  a: "Absolutely. Just send us a message and we'll schedule a free 45-minute discovery call — no commitment required."
}, {
  q: "Do you work with clients outside Dubai and the UK?",
  a: "Yes — we serve clients across Europe, America, and Pakistan. All our workflows are async-friendly across time zones."
}, {
  q: "What information should I include in my message?",
  a: "A brief description of your project, your timeline, and budget range helps us give you a faster, more accurate response."
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
function WorkingHours() {
  const today = (/* @__PURE__ */ new Date()).getDay();
  const isOpen = today >= 1 && today <= 5;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl overflow-hidden border border-border/40", style: {
    background: "linear-gradient(135deg, hsl(var(--primary)/0.06) 0%, transparent 100%)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-5 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Working Hours" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { animate: {
          opacity: [1, 0.4, 1]
        }, transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }, className: `flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isOpen ? "bg-green-500/15 text-green-600" : "bg-red-400/15 text-red-500"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500" : "bg-red-400"}` }),
          isOpen ? "Open now" : "Closed"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 mb-4", children: workingDays.map(({
        day,
        active
      }, i) => {
        const isToday = i === today - 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-1 py-2 rounded-lg text-center text-[10px] font-bold uppercase tracking-wide transition-all ${active ? isToday ? "gradient-primary text-primary-foreground shadow-elegant" : "bg-primary/10 text-primary" : "bg-muted/40 text-muted-foreground/40 line-through"}`, children: day }, day);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Mon – Fri" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "9:00 AM – 6:00 PM" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Saturday" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50 italic", children: "Closed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Sunday" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50 italic", children: "Closed" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-t border-border/30 bg-primary/[0.02]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/60 text-center", children: "🌍 Dubai (GST) · United Kingdom (GMT/BST) · Response within 1 business day" }) })
  ] });
}
function ContactItem({
  icon: Icon,
  label,
  value,
  delay,
  inView
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    x: -16
  }, animate: inView ? {
    opacity: 1,
    x: 0
  } : {
    opacity: 0,
    x: -16
  }, transition: {
    duration: 0.5,
    delay,
    type: "tween",
    ease: "easeOut"
  }, className: "group flex items-start gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-11 rounded-xl gradient-primary flex items-center justify-center shadow-elegant shrink-0 group-hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary-foreground" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-0.5", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm group-hover:text-primary transition-colors duration-200", children: value })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1.5", children: label }),
    children
  ] });
}
function FaqItem({
  q,
  a,
  index
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(index * 0.07), className: `group relative rounded-2xl overflow-hidden transition-all duration-300 ${open ? "glass shadow-glow border border-primary/20" : "glass border border-border/40 hover:border-primary/20"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-300 ${open ? "gradient-primary opacity-100" : "opacity-0"}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(!open), className: "w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-primary/5 transition-colors duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `shrink-0 h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-300 ${open ? "gradient-primary shadow-elegant" : "bg-primary/10 group-hover:bg-primary/15"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: `h-4 w-4 transition-colors duration-200 ${open ? "text-primary-foreground" : "text-primary"}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm md:text-base pr-4", children: q })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        rotate: open ? 180 : 0
      }, transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }, className: `shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-colors duration-200 ${open ? "gradient-primary" : "bg-primary/10"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-4 w-4 transition-colors duration-200 ${open ? "text-primary-foreground" : "text-primary"}` }) })
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
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1]
    }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-[4.75rem] pr-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-primary/10 pt-4", children: a }) }) })
  ] });
}
function Contact() {
  const [sent, setSent] = reactExports.useState(false);
  const [focused, setFocused] = reactExports.useState(null);
  const heroRef = reactExports.useRef(null);
  const leftRef = reactExports.useRef(null);
  const rightRef = reactExports.useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const leftInView = useInView(leftRef, {
    once: true,
    margin: "-60px"
  });
  const rightInView = useInView(rightRef, {
    once: true,
    margin: "-60px"
  });
  const inputClass = (name) => `w-full rounded-xl bg-background/60 border px-4 py-3 outline-none text-sm transition-all duration-200 ${focused === name ? "border-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]" : "border-border hover:border-primary/40"}`;
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
          "Contact Us"
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
          "Let's build",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "together." })
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
        }, className: "mt-7 text-lg text-muted-foreground leading-relaxed max-w-xl", children: "Drop us a line — we usually respond within one business day." }),
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
          icon: Zap,
          label: "Response within 24h"
        }, {
          icon: Globe,
          label: "UK & Dubai offices"
        }, {
          icon: Shield,
          label: "Free consultation"
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
        }, className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#contact-form", className: "group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 text-sm", children: [
          "Send us a message",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" })
        ] }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "contact-form", className: "mx-auto max-w-7xl px-4 pb-24 grid md:grid-cols-5 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: leftRef, className: "md:col-span-2 flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          x: -30
        }, animate: leftInView ? {
          opacity: 1,
          x: 0
        } : {
          opacity: 0,
          x: -30
        }, transition: {
          duration: 0.6,
          type: "tween",
          ease: "easeOut"
        }, className: "glass rounded-3xl p-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-1", children: "Get in touch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We're just a message away." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ContactItem, { icon: Phone, label: "UK", value: "+44 12345678", delay: 0.1, inView: leftInView }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ContactItem, { icon: Phone, label: "Dubai", value: "+971 3743029402", delay: 0.2, inView: leftInView }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ContactItem, { icon: Mail, label: "Email", value: "info@webcoreuae.com", delay: 0.3, inView: leftInView }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ContactItem, { icon: MapPin, label: "HQ", value: "Dubai, UAE", delay: 0.4, inView: leftInView })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3", children: "Follow us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: [{
              href: "https://wa.me/4412345678",
              icon: MessageCircle,
              label: "WhatsApp"
            }, {
              href: "#",
              icon: Linkedin,
              label: "LinkedIn"
            }, {
              href: "#",
              icon: Facebook,
              label: "Facebook"
            }].map(({
              href,
              icon: Icon,
              label
            }) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.a, { href, "aria-label": label, whileHover: {
              y: -3,
              scale: 1.1
            }, whileTap: {
              scale: 0.95
            }, transition: {
              type: "spring",
              stiffness: 400,
              damping: 15
            }, className: "p-2.5 rounded-xl glass hover:shadow-glow hover:text-primary transition-colors duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }, label)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          x: -30
        }, animate: leftInView ? {
          opacity: 1,
          x: 0
        } : {
          opacity: 0,
          x: -30
        }, transition: {
          duration: 0.6,
          delay: 0.15,
          type: "tween",
          ease: "easeOut"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkingHours, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: rightRef, className: "md:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.form, { initial: {
        opacity: 0,
        x: 30
      }, animate: rightInView ? {
        opacity: 1,
        x: 0
      } : {
        opacity: 0,
        x: 30
      }, transition: {
        duration: 0.6,
        type: "tween",
        ease: "easeOut"
      }, onSubmit: (e) => {
        e.preventDefault();
        setSent(true);
      }, className: "glass rounded-3xl p-8 space-y-5 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-1", children: "Send us a message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Fill out the form and we'll get back to you shortly." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Your name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, placeholder: "John Doe", className: inputClass("name"), onFocus: () => setFocused("name"), onBlur: () => setFocused(null) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email address", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", placeholder: "john@example.com", className: inputClass("email"), onFocus: () => setFocused("email"), onBlur: () => setFocused(null) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", placeholder: "+44 000 000 000", className: inputClass("phone"), onFocus: () => setFocused("phone"), onBlur: () => setFocused(null) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Service interested in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: inputClass("service"), onFocus: () => setFocused("service"), onBlur: () => setFocused(null), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a service…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "IT Consultation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Web Development" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Software Development" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "CMS Development" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "SEO & GEO" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Graphic Design" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Subject", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "How can we help?", className: inputClass("subject"), onFocus: () => setFocused("subject"), onBlur: () => setFocused(null) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Message", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, rows: 5, placeholder: "Tell us about your project, goals, and timeline…", className: `${inputClass("message")} resize-none`, onFocus: () => setFocused("message"), onBlur: () => setFocused(null) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/50", children: "🔒 Your data is safe and never shared." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.button, { type: "submit", disabled: sent, whileHover: sent ? {} : {
            scale: 1.03,
            y: -2
          }, whileTap: sent ? {} : {
            scale: 0.97
          }, transition: {
            type: "spring",
            stiffness: 400,
            damping: 15
          }, className: `inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-elegant transition-all duration-300 ${sent ? "bg-green-500/20 text-green-600 border border-green-500/30" : "gradient-primary text-primary-foreground hover:shadow-glow"}`, children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
            " Message sent!"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Send message ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
          ] }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-4xl px-4 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "FAQs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold", children: [
          "Common questions",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "before reaching out."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-muted-foreground max-w-lg mx-auto", children: [
          "Can't find what you're looking for?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/faqs", className: "text-primary font-semibold hover:underline underline-offset-2", children: "View all FAQs." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: contactFaqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FaqItem, { q: faq.q, a: faq.a, index: i }, faq.q)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fadeUp(0.3), className: "mt-14 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-10 relative overflow-hidden", children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-elegant", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-7 w-7 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Still have questions?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-2", children: "We'd love to hear from you." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-sm mx-auto", children: "Book a free 45-minute strategy call. Walk away with clarity — whether you work with us or not." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#contact-form", className: "group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 text-sm", children: [
            "Send a Message",
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
  Contact as component
};
