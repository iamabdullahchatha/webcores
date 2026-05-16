import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CheckCircle2, Star } from "lucide-react";
import { GridBackground, FloatingShapes } from "@/components/Scene3D";
import type { Database } from "@/lib/supabase/types";
import { resolveServiceImage } from "@/lib/content/useServicePage";
import { icon } from "./icons";
import {
  fadeUp, SectionLabel, Card3D, FaqItem, TestimonialPhoto,
} from "./primitives";

type SectionRow = Database["public"]["Tables"]["service_page_content"]["Row"];

/* eslint-disable @typescript-eslint/no-explicit-any */
type J = Record<string, any>;

/* ─── HERO ───────────────────────────────────────────────────────────── */
function HeroSection({ row }: { row: SectionRow }) {
  const d = (row.data_json ?? {}) as J;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const BadgeIcon = icon(d.badge?.icon);
  const headingMain = (row.heading ?? "").replace(d.heading_accent ?? "", "").trim();
  const glow = d.glow_color ?? "#6366f1";

  return (
    <section ref={heroRef} className="relative overflow-hidden min-h-[78vh] flex items-center">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <GridBackground />
      <FloatingShapes />

      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.22, 0.45, 0.22] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute top-10 right-16 rounded-full pointer-events-none"
        style={{ width: 520, height: 520, background: "radial-gradient(circle, hsl(var(--primary)/0.14) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.10, 0.22, 0.10] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" as const, delay: 3 }}
        className="absolute bottom-0 left-12 rounded-full pointer-events-none"
        style={{ width: 320, height: 320, background: "radial-gradient(circle, hsl(var(--primary)/0.10) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" as const, delay: 1.5 }}
        className="absolute top-1/3 left-1/4 rounded-full pointer-events-none"
        style={{ width: 280, height: 280, background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }}
      />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-32 md:pt-24 md:pb-36">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.08, type: "tween" as const, ease: [0.22, 1, 0.36, 1] as const }}
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-7"
              >
                <BadgeIcon className="h-3.5 w-3.5 text-primary" />
                {d.badge?.label}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "tween" as const, ease: [0.22, 1, 0.36, 1] as const }}
                className="text-5xl md:text-6xl lg:text-[66px] font-bold leading-[1.04] tracking-tight"
              >
                {headingMain}{" "}
                <span className="gradient-text">{d.heading_accent}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, type: "tween" as const, ease: "easeOut" as const }}
                className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg"
              >
                {row.body}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38, type: "tween" as const, ease: "easeOut" as const }}
                className="mt-7 flex flex-wrap gap-2.5"
              >
                {(d.pills ?? []).map((p: J) => {
                  const PillIcon = icon(p.icon);
                  return (
                    <span
                      key={p.label}
                      className="inline-flex items-center gap-1.5 glass border border-border/40 rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground/80"
                    >
                      <PillIcon className="h-3 w-3 text-primary" />
                      {p.label}
                    </span>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.48, type: "tween" as const, ease: "easeOut" as const }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <Link
                  to={d.cta_primary?.href ?? "/contact"}
                  className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] text-sm"
                >
                  {d.cta_primary?.text}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to={d.cta_secondary?.href ?? "/services"}
                  className="group inline-flex items-center gap-2 rounded-2xl glass border border-border/40 px-7 py-3.5 font-semibold hover:border-border/70 transition-all duration-200 hover:-translate-y-0.5 text-sm"
                >
                  {d.cta_secondary?.text}
                  <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, type: "tween" as const, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative hidden md:grid grid-cols-2 gap-4"
            >
              <div className="absolute -inset-6 gradient-primary opacity-[0.07] blur-3xl rounded-full pointer-events-none" />
              {(d.stats ?? []).map((s: J, i: number) => {
                const StatIcon = icon(s.icon);
                return (
                  <motion.div
                    key={s.l}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut" as const, delay: i * 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="group glass border border-border/30 rounded-2xl p-6 text-center cursor-default hover:shadow-glow transition-all duration-300 relative overflow-hidden"
                    style={{ transform: "perspective(600px) rotateY(-4deg) rotateX(2deg)" }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200"
                      style={{ background: s.bg }}
                    >
                      <StatIcon className="h-4 w-4" style={{ color: s.color }} />
                    </div>
                    <div className="text-3xl font-bold gradient-text mb-1">{s.v}</div>
                    <div className="text-xs text-muted-foreground leading-tight">{s.l}</div>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                      style={{ background: `linear-gradient(to right, transparent, ${s.color}55, transparent)` }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── OVERVIEW ───────────────────────────────────────────────────────── */
function OverviewSection({ row }: { row: SectionRow }) {
  const d = (row.data_json ?? {}) as J;
  const headingMain = (row.heading ?? "").replace(d.heading_accent ?? "", "").trim();
  const glow = d.glow_color ?? "#6366f1";
  const BadgeBottomIcon = icon(d.badge_bottom?.icon);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 pb-8">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <SectionLabel>{row.subheading}</SectionLabel>

          <h2 className="text-3xl md:text-[2.25rem] font-bold leading-tight mb-5">
            {headingMain}{" "}
            <span className="gradient-text">{d.heading_accent}</span>
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
            {row.body}
          </p>

          <ul className="space-y-5 mb-9">
            {(d.proof_points ?? []).map((item: J, i: number) => {
              const ItemIcon = icon(item.icon);
              return (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + i * 0.09, duration: 0.5, ease: "easeOut" as const }}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200"
                    style={{ background: `${item.color}18`, boxShadow: `0 2px 10px ${item.color}20` }}
                  >
                    <ItemIcon className="h-4 w-4" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none mb-1.5">{item.label}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{item.sub}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          <div className="flex items-center gap-8 pt-6 border-t border-border/25">
            {(d.stats_row ?? []).map((s: J) => (
              <div key={s.l}>
                <p className="text-xl font-bold leading-none" style={{ color: s.color }}>{s.v}</p>
                <p className="text-[11px] text-muted-foreground mt-1.5 leading-none">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative"
        >
          <div
            className="absolute -inset-5 rounded-3xl pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 70% at 55% 45%, ${glow}1f 0%, transparent 72%)`,
              filter: "blur(24px)",
            }}
          />

          <div
            className="relative rounded-2xl overflow-hidden border border-border/25 group"
            style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
              <img
                src={resolveServiceImage(d.image)}
                alt={d.image_alt ?? ""}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="eager"
                decoding="async"
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.12) 38%, transparent 66%)" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(130deg, ${d.tint_color ?? "rgba(99,102,241,0.22)"} 0%, transparent 48%)` }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-md border border-white/12"
                style={{ background: "rgba(0,0,0,0.38)" }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-[10px] font-semibold text-white/80 tracking-wide">{d.badge_top?.label}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                className="absolute bottom-3.5 left-3.5 flex items-center gap-2 rounded-md px-3 py-1.5 backdrop-blur-md"
                style={{ background: d.badge_bottom?.bg, border: `1px solid ${d.badge_bottom?.border}` }}
              >
                <BadgeBottomIcon className="h-2.5 w-2.5 shrink-0" style={{ color: d.badge_bottom?.icon_color }} />
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/90">
                  {d.badge_bottom?.label}
                </span>
              </motion.div>
            </div>

            <div
              className="grid grid-cols-3 divide-x divide-border/25"
              style={{ background: "hsl(var(--card))" }}
            >
              {(d.footer_metrics ?? []).map((s: J, i: number) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.62 + i * 0.07, duration: 0.4, ease: "easeOut" as const }}
                  className="flex flex-col items-center py-4 px-3"
                >
                  <span className="text-[15px] font-bold leading-none tabular-nums" style={{ color: s.color }}>
                    {s.v}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-1.5 text-center leading-snug">
                    {s.l}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div
            className="absolute -bottom-2.5 -right-2.5 w-20 h-20 rounded-xl pointer-events-none border border-primary/10"
            style={{ background: `${glow}08` }}
          />
        </motion.div>

      </div>
    </section>
  );
}

/* ─── FEATURES ───────────────────────────────────────────────────────── */
function FeaturesSection({ row }: { row: SectionRow }) {
  const d = (row.data_json ?? {}) as J;
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <motion.div {...fadeUp()} className="mb-14">
        <SectionLabel>{row.subheading}</SectionLabel>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">{row.heading}</h2>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">{row.body}</p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(d.items ?? []).map((f: J, i: number) => {
          const FIcon = icon(f.icon);
          return (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55, type: "tween" as const, ease: "easeOut" as const }}
            >
              <Card3D className="group relative bg-card/60 backdrop-blur-sm border border-border/35 rounded-2xl p-7 h-full hover:border-border/60 hover:shadow-glow transition-all duration-300 overflow-hidden cursor-default">
                <div
                  className="absolute -right-10 -top-10 h-44 w-44 rounded-full blur-2xl opacity-[0.05] group-hover:opacity-[0.11] transition-opacity duration-500 pointer-events-none"
                  style={{ background: f.color }}
                />
                <div
                  className="absolute top-0 left-7 right-7 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to right, transparent, ${f.color}, transparent)` }}
                />
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                    style={{ background: f.bg, boxShadow: `0 4px 16px ${f.color}20` }}
                  >
                    <FIcon className="h-5 w-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="font-bold text-base mb-2.5 group-hover:text-primary transition-colors duration-200">{f.t}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.d}</p>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(to right, ${f.color}88, transparent)` }}
                />
              </Card3D>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── DELIVERABLES + TECH STACK (paired) ─────────────────────────────── */
function DeliverablesTechSection({ deliverables, tech }: { deliverables?: SectionRow; tech?: SectionRow }) {
  const dd = (deliverables?.data_json ?? {}) as J;
  const td = (tech?.data_json ?? {}) as J;
  const CalloutIcon = icon(td.callout?.icon);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20">
      <div className="grid md:grid-cols-2 gap-6">

        {deliverables && (
          <motion.div {...fadeUp()}>
            <div className="glass border border-border/35 rounded-3xl p-9 h-full relative overflow-hidden group hover:border-border/55 transition-colors duration-300">
              <div
                className="absolute -top-14 -right-14 w-52 h-52 rounded-full blur-3xl opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none"
                style={{ background: dd.glow_color ?? "#6366f1" }}
              />
              <SectionLabel>{deliverables.subheading}</SectionLabel>
              <h3 className="text-2xl font-bold mb-7">{deliverables.heading}</h3>
              <ul className="space-y-4">
                {(dd.items ?? []).map((item: string, i: number) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.45, type: "tween" as const, ease: "easeOut" as const }}
                    className="flex items-center gap-3.5 group/item"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 group-hover/item:bg-primary/20 transition-colors duration-200 shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <span className="text-sm font-medium leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {tech && (
          <motion.div {...fadeUp(0.1)}>
            <div className="glass border border-border/35 rounded-3xl p-9 h-full relative overflow-hidden group hover:border-border/55 transition-colors duration-300">
              <div
                className="absolute -top-14 -right-14 w-52 h-52 rounded-full blur-3xl opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none"
                style={{ background: td.glow_color ?? "#06b6d4" }}
              />
              <SectionLabel>{tech.subheading}</SectionLabel>
              <h3 className="text-2xl font-bold mb-2">{tech.heading}</h3>
              <p className="text-sm text-muted-foreground mb-7 leading-relaxed">{tech.body}</p>
              <div className="flex flex-wrap gap-2.5">
                {(td.items ?? []).map((t: J, i: number) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4, type: "tween" as const, ease: "easeOut" as const }}
                    whileHover={{ y: -3, scale: 1.06 }}
                    className="inline-flex items-center gap-2.5 bg-card/80 border border-border/40 rounded-xl px-4 py-2.5 cursor-default hover:border-border/70 hover:shadow-glow transition-all duration-200"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: t.color, boxShadow: `0 0 6px ${t.color}66` }}
                    />
                    <span className="text-sm font-semibold">{t.name}</span>
                  </motion.div>
                ))}
              </div>

              {td.callout && (
                <div className="mt-8 flex items-start gap-3.5 p-4 bg-primary/5 border border-primary/15 rounded-2xl">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-primary/10 shrink-0 mt-0.5">
                    <CalloutIcon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-semibold">{td.callout.lead}</span>{" "}
                    {td.callout.text}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ─── PROCESS ────────────────────────────────────────────────────────── */
function ProcessSection({ row }: { row: SectionRow }) {
  const d = (row.data_json ?? {}) as J;
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-80 rounded-full blur-3xl opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 70%)" }}
        />
      </div>

      <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-20">
        <SectionLabel>{row.subheading}</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">{row.heading}</h2>
        <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{row.body}</p>
      </motion.div>

      <div className="relative">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3, type: "tween" as const, ease: "easeOut" as const }}
          className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px origin-left"
          style={{
            background: "linear-gradient(to right, transparent, hsl(var(--border)/0.6) 20%, hsl(var(--primary)/0.35) 50%, hsl(var(--border)/0.6) 80%, transparent)",
          }}
        />

        <div className="grid md:grid-cols-5 gap-6">
          {(d.steps ?? []).map((p: J, i: number) => {
            const PIcon = icon(p.icon);
            return (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.55, type: "tween" as const, ease: "easeOut" as const }}
                whileHover={{ y: -8 }}
                className="group relative text-center cursor-default"
              >
                <div
                  className="relative mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${p.color}cc, ${p.color}88)`,
                    boxShadow: `0 6px 28px ${p.color}45`,
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-60 -z-10 transition-opacity duration-300 pointer-events-none"
                    style={{ background: p.color }}
                  />
                  <PIcon className="h-7 w-7 text-white" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5" style={{ color: `${p.color}99` }}>{p.n}</div>
                <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors duration-200">{p.t}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────────────────── */
function TestimonialsSection({ row }: { row: SectionRow }) {
  const d = (row.data_json ?? {}) as J;
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 pb-20">
      <motion.div {...fadeUp()} className="flex items-end justify-between flex-wrap gap-4 mb-12">
        <div>
          <SectionLabel>{row.subheading}</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">{row.heading}</h2>
        </div>
        <Link to="/contact" className="group inline-flex items-center gap-2 text-primary font-semibold text-sm">
          {row.body}
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        {(d.items ?? []).map((t: J, i: number) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55, type: "tween" as const, ease: "easeOut" as const }}
          >
            <Card3D className="group bg-card/60 backdrop-blur-sm border border-border/35 rounded-3xl p-7 h-full hover:border-border/60 hover:shadow-glow transition-all duration-300 relative overflow-hidden cursor-default">
              <div
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl opacity-[0.05] group-hover:opacity-[0.10] transition-opacity duration-500 pointer-events-none"
                style={{ background: t.color }}
              />
              <div
                className="absolute top-0 left-7 right-7 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${t.color}, transparent)` }}
              />
              <div className="flex items-center gap-0.5 mb-5">
                {Array.from({ length: t.stars ?? 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5" style={{ fill: "#f59e0b", color: "#f59e0b" }} />
                ))}
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                <TestimonialPhoto photo={t.photo} name={t.name} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm leading-none">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{t.role}</p>
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${t.color}18` }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" style={{ color: t.color }} />
                </div>
              </div>
            </Card3D>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── FAQs ───────────────────────────────────────────────────────────── */
function FaqsSection({ row }: { row: SectionRow }) {
  const d = (row.data_json ?? {}) as J;
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <motion.div {...fadeUp()} className="text-center mb-14">
        <SectionLabel>{row.subheading}</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">{row.heading}</h2>
        <p className="mt-5 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
          Still have questions?{" "}
          <Link to="/contact" className="text-primary font-semibold hover:underline underline-offset-2">
            Just ask us directly.
          </Link>
        </p>
      </motion.div>
      <div className="space-y-3">
        {(d.items ?? []).map((faq: J, i: number) => (
          <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────────── */
function CtaSection({ row }: { row: SectionRow }) {
  const d = (row.data_json ?? {}) as J;
  const BadgeIcon = icon(d.badge_icon);
  const [line1, line2] = (d.heading_break ?? (row.heading ?? "")).split("|");
  const gridId = `cta-grid-${row.service_slug}`;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 pb-28">
      <motion.div {...fadeUp()} className="relative overflow-hidden rounded-3xl gradient-primary shadow-elegant">

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={gridId} width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${gridId})`} />
          </svg>
          <motion.div
            animate={{ scale: [1, 1.22, 1], opacity: [0.13, 0.25, 0.13] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute -top-14 -right-14 w-64 h-64 rounded-full bg-white/10 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.28, 1], opacity: [0.10, 0.18, 0.10] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as const, delay: 3 }}
            className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white/10 blur-3xl"
          />
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1.3, 0.4] }}
              transition={{ duration: 2.8 + i * 0.55, repeat: Infinity, ease: "easeInOut" as const, delay: i * 0.8 }}
              className="absolute w-1 h-1 rounded-full bg-white/60"
              style={{ top: `${12 + i * 13}%`, left: `${6 + i * 12}%` }}
            />
          ))}
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-12 md:px-14">
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70 mb-5">
              <BadgeIcon className="h-3 w-3 text-yellow-300" />
              {row.subheading}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
              {line1}
              {line2 != null && <br className="hidden md:block" />}
              {line2}
            </h2>
            <p className="text-white/60 text-sm mt-3 leading-relaxed max-w-sm">
              {row.body}
            </p>
            <div className="flex items-center gap-7 mt-6">
              {(d.stats ?? []).map((s: J) => (
                <div key={s.l}>
                  <p className="text-lg font-bold text-white leading-none">{s.v}</p>
                  <p className="text-[10px] text-white/45 mt-0.5 uppercase tracking-wide">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
            >
              <Link
                to={d.cta_primary?.href ?? "/contact"}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-foreground px-8 py-3.5 text-sm font-semibold shadow-elegant hover:opacity-95 transition-all duration-200 w-full"
              >
                {d.cta_primary?.text}
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
            >
              <Link
                to={d.cta_secondary?.href ?? "/services"}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white/12 text-white border border-white/20 px-8 py-3.5 text-sm font-semibold hover:bg-white/20 transition-all duration-200 w-full"
              >
                {d.cta_secondary?.text}
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </Link>
            </motion.div>
            <div className="flex items-center justify-center gap-4 mt-1">
              {(d.reassurance ?? []).map((label: string) => (
                <div key={label} className="flex items-center gap-1.5 text-[10px] text-white/45">
                  <CheckCircle2 className="h-3 w-3" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Dispatcher ─────────────────────────────────────────────────────── */
export function ServiceSections({ sections }: { sections: SectionRow[] }) {
  const out: React.ReactNode[] = [];

  for (let i = 0; i < sections.length; i++) {
    const row = sections[i];

    if (row.section_type === "deliverables") {
      // Pair deliverables with the immediately-following tech_stack row so
      // they render as the original single 2-column <section>.
      const next = sections[i + 1];
      const tech = next?.section_type === "tech_stack" ? next : undefined;
      out.push(<DeliverablesTechSection key={row.id} deliverables={row} tech={tech} />);
      if (tech) i++;
      continue;
    }

    if (row.section_type === "tech_stack") {
      // Orphan tech_stack (no preceding deliverables) — render standalone.
      out.push(<DeliverablesTechSection key={row.id} tech={row} />);
      continue;
    }

    switch (row.section_type) {
      case "hero":         out.push(<HeroSection key={row.id} row={row} />); break;
      case "overview":     out.push(<OverviewSection key={row.id} row={row} />); break;
      case "features":     out.push(<FeaturesSection key={row.id} row={row} />); break;
      case "process":      out.push(<ProcessSection key={row.id} row={row} />); break;
      case "testimonials": out.push(<TestimonialsSection key={row.id} row={row} />); break;
      case "faqs":         out.push(<FaqsSection key={row.id} row={row} />); break;
      case "cta":          out.push(<CtaSection key={row.id} row={row} />); break;
      default: break;
    }
  }

  return <>{out}</>;
}
