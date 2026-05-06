import { T as jsxRuntimeExports } from "./worker-entry-D_UF2F5s.js";
import { L as Link } from "./router-DfFauod9.js";
import { L as Layout, a as GridBackground, F as FloatingShapes, m as motion, A as ArrowRight, C as CircleCheck } from "./Scene3D-BXzIJuzj.js";
import { S as Sparkles } from "./sparkles-BVXYaY9v.js";
function ServicePage(p) {
  const Icon = p.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: { background: "var(--gradient-hero)" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GridBackground, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingShapes, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-6xl px-4 py-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "max-w-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
            p.eyebrow
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-7xl font-bold leading-[1.05]", children: [
            p.title,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: p.highlight })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-muted-foreground max-w-2xl", children: p.intro }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-4 font-semibold shadow-elegant hover:shadow-glow transition-all hover:-translate-y-0.5", children: [
              "Start a project ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "inline-flex items-center gap-2 rounded-2xl glass px-7 py-4 font-semibold hover:shadow-glow transition-all", children: "All services" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.6, rotate: -10 },
            animate: { opacity: 1, scale: 1, rotate: 0 },
            transition: { duration: 0.8 },
            className: "absolute right-8 top-20 hidden lg:block",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-40 w-40 perspective", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-primary opacity-30 blur-3xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-full w-full rounded-3xl gradient-primary flex items-center justify-center shadow-glow animate-float", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-20 w-20 text-primary-foreground" }) })
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary mb-3", children: "WHAT'S INCLUDED" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold", children: "Capabilities that ship." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: p.features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.06 },
          whileHover: { y: -6 },
          className: "glass rounded-3xl p-7 hover:shadow-glow transition-shadow",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl gradient-primary flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold mb-2", children: f.t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: f.d })
          ]
        },
        f.t
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 grid md:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "glass rounded-3xl p-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary mb-3", children: "DELIVERABLES" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-6", children: "What you walk away with" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: p.deliverables.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-primary mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: d })
            ] }, d)) })
          ]
        }
      ),
      p.tech && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "glass rounded-3xl p-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary mb-3", children: "TECH WE LOVE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-6", children: "Modern, proven stack" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: p.tech.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-medium border border-primary/20", children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary mb-3", children: "HOW WE WORK" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold", children: "A proven path to launch." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid md:grid-cols-5 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" }),
        p.process.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.1 },
            className: "relative text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto h-20 w-20 rounded-full gradient-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-glow mb-5", children: [
                step.n,
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full gradient-primary blur-xl opacity-50 -z-10" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-1", children: step.t }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: step.d })
            ]
          },
          step.n
        ))
      ] })
    ] }),
    p.faqs && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-4 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary mb-3", children: "FAQS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-bold", children: "Common questions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: p.faqs.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.05 },
          className: "glass rounded-2xl p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: f.q }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: f.a })
          ]
        },
        f.q
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16 text-center shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold text-primary-foreground mb-4", children: "Ready to begin?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto", children: "Book a free consultation — we'll scope, plan and quote within 48 hours." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex items-center gap-2 rounded-2xl bg-background text-foreground px-8 py-4 font-semibold hover:scale-105 transition-transform shadow-elegant", children: [
          "Talk to us ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ServicePage as S
};
