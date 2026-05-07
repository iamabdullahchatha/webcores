import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";

export type ServicePageProps = {
  eyebrow: string;
  title: string;
  highlight: string;
  intro: string;
  icon: LucideIcon;
  features: { t: string; d: string }[];
  deliverables: string[];
  process: { n: string; t: string; d: string }[];
  tech?: string[];
  faqs?: { q: string; a: string }[];
};

export function ServicePage(p: ServicePageProps) {
  const Icon = p.icon;
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />
        <div className="relative mx-auto max-w-6xl px-4 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {p.eyebrow}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
              {p.title} <span className="gradient-text">{p.highlight}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{p.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-4 font-semibold shadow-elegant hover:shadow-glow transition-all hover:-translate-y-0.5">
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-2xl glass px-7 py-4 font-semibold hover:shadow-glow transition-all">
                All services
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute right-8 top-20 hidden lg:block"
          >
            <div className="relative h-40 w-40 perspective">
              <div className="absolute inset-0 gradient-primary opacity-30 blur-3xl" />
              <div className="relative h-full w-full rounded-3xl gradient-primary flex items-center justify-center shadow-glow animate-float">
                <Icon className="h-20 w-20 text-primary-foreground" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12">
          <div className="text-sm font-semibold text-primary mb-3">WHAT'S INCLUDED</div>
          <h2 className="text-4xl md:text-5xl font-bold">Capabilities that ship.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {p.features.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="glass rounded-3xl p-7 hover:shadow-glow transition-shadow"
            >
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.t}</h3>
              <p className="text-sm text-muted-foreground">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DELIVERABLES + TECH */}
      <section className="mx-auto max-w-7xl px-4 py-20 grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8"
        >
          <div className="text-sm font-semibold text-primary mb-3">DELIVERABLES</div>
          <h3 className="text-2xl font-bold mb-6">What you walk away with</h3>
          <ul className="space-y-3">
            {p.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {p.tech && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8"
          >
            <div className="text-sm font-semibold text-primary mb-3">TECH WE LOVE</div>
            <h3 className="text-2xl font-bold mb-6">Modern, proven stack</h3>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-medium border border-primary/20">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-sm font-semibold text-primary mb-3">HOW WE WORK</div>
          <h2 className="text-4xl md:text-5xl font-bold">A proven path to launch.</h2>
        </div>
        <div className="relative grid md:grid-cols-5 gap-6">
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
          {p.process.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative text-center"
            >
              <div className="relative mx-auto h-20 w-20 rounded-full gradient-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-glow mb-5">
                {step.n}
                <div className="absolute inset-0 rounded-full gradient-primary blur-xl opacity-50 -z-10" />
              </div>
              <h3 className="font-bold mb-1">{step.t}</h3>
              <p className="text-sm text-muted-foreground">{step.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQS */}
      {p.faqs && (
        <section className="mx-auto max-w-3xl px-4 py-20">
          <div className="text-center mb-10">
            <div className="text-sm font-semibold text-primary mb-3">FAQS</div>
            <h2 className="text-4xl font-bold">Common questions</h2>
          </div>
          <div className="space-y-3">
            {p.faqs.map((f, i) => (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-6"
              >
                <h4 className="font-semibold mb-2">{f.q}</h4>
                <p className="text-sm text-muted-foreground">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16 text-center shadow-elegant">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Ready to begin?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Book a free consultation — we'll scope, plan and quote within 48 hours.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-2xl bg-background text-foreground px-8 py-4 font-semibold hover:scale-105 transition-transform shadow-elegant">
              Talk to us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
