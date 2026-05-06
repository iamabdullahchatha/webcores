import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";
import {
  Phone, Mail, MessageCircle, MapPin, Send,
  Linkedin, Facebook, Clock, CheckCircle2, ArrowRight,
  Zap, Globe, Shield, ChevronDown, HelpCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Webcore Solutions" },
      { name: "description", content: "Get in touch with Webcore Solutions. UK, Dubai and global support." },
      { property: "og:title", content: "Contact Webcore Solutions" },
    ],
  }),
  component: Contact,
});

/* ─── Data ──────────────────────────────────────────────────────────── */
const workingDays = [
  { day: "Mon", active: true },
  { day: "Tue", active: true },
  { day: "Wed", active: true },
  { day: "Thu", active: true },
  { day: "Fri", active: true },
  { day: "Sat", active: false },
  { day: "Sun", active: false },
];

const contactFaqs = [
  {
    q: "How quickly do you respond to enquiries?",
    a: "We respond to all enquiries within one business day. For urgent matters, WhatsApp is the fastest way to reach us.",
  },
  {
    q: "Can I book a free consultation call?",
    a: "Absolutely. Just send us a message and we'll schedule a free 45-minute discovery call — no commitment required.",
  },
  {
    q: "Do you work with clients outside Dubai and the UK?",
    a: "Yes — we serve clients across Europe, America, and Pakistan. All our workflows are async-friendly across time zones.",
  },
  {
    q: "What information should I include in my message?",
    a: "A brief description of your project, your timeline, and budget range helps us give you a faster, more accurate response.",
  },
];

/* ─── Helpers ───────────────────────────────────────────────────────── */
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

/* ─── Working Hours ─────────────────────────────────────────────────── */
function WorkingHours() {
  const today = new Date().getDay();
  const isOpen = today >= 1 && today <= 5;

  return (
    <div
      className="rounded-2xl overflow-hidden border border-border/40"
      style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.06) 0%, transparent 100%)" }}
    >
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Working Hours</span>
          </div>
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isOpen ? "bg-green-500/15 text-green-600" : "bg-red-400/15 text-red-500"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500" : "bg-red-400"}`} />
            {isOpen ? "Open now" : "Closed"}
          </motion.div>
        </div>

        <div className="flex gap-1.5 mb-4">
          {workingDays.map(({ day, active }, i) => {
            const isToday = i === today - 1;
            return (
              <div
                key={day}
                className={`flex-1 py-2 rounded-lg text-center text-[10px] font-bold uppercase tracking-wide transition-all ${
                  active
                    ? isToday
                      ? "gradient-primary text-primary-foreground shadow-elegant"
                      : "bg-primary/10 text-primary"
                    : "bg-muted/40 text-muted-foreground/40 line-through"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Mon – Fri</span>
            <span className="font-semibold">9:00 AM – 6:00 PM</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Saturday</span>
            <span className="text-muted-foreground/50 italic">Closed</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sunday</span>
            <span className="text-muted-foreground/50 italic">Closed</span>
          </div>
        </div>
      </div>
      <div className="px-5 py-3 border-t border-border/30 bg-primary/[0.02]">
        <p className="text-[11px] text-muted-foreground/60 text-center">
          🌍 Dubai (GST) · United Kingdom (GMT/BST) · Response within 1 business day
        </p>
      </div>
    </div>
  );
}

/* ─── Contact Card Item ─────────────────────────────────────────────── */
function ContactItem({
  icon: Icon, label, value, delay, inView,
}: {
  icon: React.ElementType; label: string; value: string; delay: number; inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{ duration: 0.5, delay, type: "tween", ease: "easeOut" }}
      className="group flex items-start gap-4"
    >
      <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center shadow-elegant shrink-0 group-hover:scale-110 transition-transform duration-200">
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-0.5">{label}</div>
        <div className="font-semibold text-sm group-hover:text-primary transition-colors duration-200">{value}</div>
      </div>
    </motion.div>
  );
}

/* ─── Form Field ────────────────────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ─── FAQ Item ──────────────────────────────────────────────────────── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      {...fadeUp(index * 0.07)}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
        open
          ? "glass shadow-glow border border-primary/20"
          : "glass border border-border/40 hover:border-primary/20"
      }`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-300 ${open ? "gradient-primary opacity-100" : "opacity-0"}`} />
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-primary/5 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div className={`shrink-0 h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-300 ${open ? "gradient-primary shadow-elegant" : "bg-primary/10 group-hover:bg-primary/15"}`}>
            <HelpCircle className={`h-4 w-4 transition-colors duration-200 ${open ? "text-primary-foreground" : "text-primary"}`} />
          </div>
          <span className="font-semibold text-sm md:text-base pr-4">{q}</span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-colors duration-200 ${open ? "gradient-primary" : "bg-primary/10"}`}
        >
          <ChevronDown className={`h-4 w-4 transition-colors duration-200 ${open ? "text-primary-foreground" : "text-primary"}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-[4.75rem] pr-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-primary/10 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────── */
function Contact() {
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const leftInView = useInView(leftRef, { once: true, margin: "-60px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-60px" });

  const inputClass = (name: string) =>
    `w-full rounded-xl bg-background/60 border px-4 py-3 outline-none text-sm transition-all duration-200 ${
      focused === name
        ? "border-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]"
        : "border-border hover:border-primary/40"
    }`;

  return (
    <Layout>

      {/* ══════════════════════ HERO ═══════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-16 rounded-full pointer-events-none"
          style={{ width: 500, height: 500, background: "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 left-8 rounded-full pointer-events-none"
          style={{ width: 300, height: 300, background: "radial-gradient(circle, hsl(var(--primary)/0.12) 0%, transparent 70%)" }}
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
                Contact Us
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl font-bold leading-[1.06] tracking-tight"
              >
                Let's build{" "}
                <span className="gradient-text">together.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "tween", ease: "easeOut" }}
                className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-xl"
              >
                Drop us a line — we usually respond within one business day.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, type: "tween", ease: "easeOut" }}
                className="mt-8 flex flex-wrap justify-center gap-3"
              >
                {[
                  { icon: Zap,    label: "Response within 24h"  },
                  { icon: Globe,  label: "UK & Dubai offices"    },
                  { icon: Shield, label: "Free consultation"     },
                ].map((p) => (
                  <span key={p.label} className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-xs font-semibold text-primary">
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
                <a
                  href="#contact-form"
                  className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 text-sm"
                >
                  Send us a message
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════ CONTACT FORM ═══════════════════════════ */}
      <section id="contact-form" className="mx-auto max-w-7xl px-4 pb-24 grid md:grid-cols-5 gap-8">

        {/* Left — Info panel */}
        <div ref={leftRef} className="md:col-span-2 flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, type: "tween", ease: "easeOut" }}
            className="glass rounded-3xl p-8 space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-1">Get in touch</h2>
              <p className="text-sm text-muted-foreground">We're just a message away.</p>
            </div>

            <div className="space-y-5">
              <ContactItem icon={Phone}  label="UK"    value="+44 12345678"        delay={0.1} inView={leftInView} />
              <ContactItem icon={Phone}  label="Dubai" value="+971 3743029402"     delay={0.2} inView={leftInView} />
              <ContactItem icon={Mail}   label="Email" value="info@webcoreuae.com" delay={0.3} inView={leftInView} />
              <ContactItem icon={MapPin} label="HQ"    value="Dubai, UAE"          delay={0.4} inView={leftInView} />
            </div>

            <div className="pt-4 border-t border-border/40">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">Follow us</p>
              <div className="flex items-center gap-2">
                {[
                  { href: "https://wa.me/4412345678", icon: MessageCircle, label: "WhatsApp" },
                  { href: "#", icon: Linkedin, label: "LinkedIn" },
                  { href: "#", icon: Facebook, label: "Facebook" },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="p-2.5 rounded-xl glass hover:shadow-glow hover:text-primary transition-colors duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.15, type: "tween", ease: "easeOut" }}
          >
            <WorkingHours />
          </motion.div>
        </div>

        {/* Right — Form */}
        <div ref={rightRef} className="md:col-span-3">
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, type: "tween", ease: "easeOut" }}
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass rounded-3xl p-8 space-y-5 h-full"
          >
            <div className="mb-2">
              <h2 className="text-2xl font-bold mb-1">Send us a message</h2>
              <p className="text-sm text-muted-foreground">Fill out the form and we'll get back to you shortly.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Your name">
                <input required placeholder="John Doe" className={inputClass("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
              </Field>
              <Field label="Email address">
                <input required type="email" placeholder="john@example.com" className={inputClass("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Phone (optional)">
                <input type="tel" placeholder="+44 000 000 000" className={inputClass("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
              </Field>
              <Field label="Service interested in">
                <select className={inputClass("service")} onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}>
                  <option value="">Select a service…</option>
                  <option>IT Consultation</option>
                  <option>Web Development</option>
                  <option>Software Development</option>
                  <option>CMS Development</option>
                  <option>SEO &amp; GEO</option>
                  <option>Graphic Design</option>
                </select>
              </Field>
            </div>

            <Field label="Subject">
              <input placeholder="How can we help?" className={inputClass("subject")} onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)} />
            </Field>

            <Field label="Message">
              <textarea required rows={5} placeholder="Tell us about your project, goals, and timeline…" className={`${inputClass("message")} resize-none`} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
            </Field>

            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-muted-foreground/50">🔒 Your data is safe and never shared.</p>
              <motion.button
                type="submit"
                disabled={sent}
                whileHover={sent ? {} : { scale: 1.03, y: -2 }}
                whileTap={sent ? {} : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-elegant transition-all duration-300 ${
                  sent
                    ? "bg-green-500/20 text-green-600 border border-green-500/30"
                    : "gradient-primary text-primary-foreground hover:shadow-glow"
                }`}
              >
                {sent ? (
                  <><CheckCircle2 className="h-4 w-4" /> Message sent!</>
                ) : (
                  <>Send message <Send className="h-4 w-4" /></>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* ══════════════════════ FAQs ════════════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-4 pb-24">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <SectionLabel>FAQs</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold">
            Common questions<br />before reaching out.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Can't find what you're looking for?{" "}
            <Link to="/faqs" className="text-primary font-semibold hover:underline underline-offset-2">
              View all FAQs.
            </Link>
          </p>
        </motion.div>

        <div className="space-y-3">
          {contactFaqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div {...fadeUp(0.3)} className="mt-14 text-center">
          <div className="glass rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 gradient-primary opacity-[0.04] rounded-3xl pointer-events-none" />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 h-60 w-60 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.2) 0%, transparent 70%)" }}
            />
            <div className="relative">
              <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-elegant">
                <MessageCircle className="h-7 w-7 text-primary-foreground" />
              </div>
              <SectionLabel>Still have questions?</SectionLabel>
              <h3 className="text-2xl font-bold mb-2">We'd love to hear from you.</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                Book a free 45-minute strategy call. Walk away with clarity — whether you work with us or not.
              </p>
              <a
                href="#contact-form"
                className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 text-sm"
              >
                Send a Message
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                {["No commitment", "Response within 24hrs", "Free of charge"].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-primary/60" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

    </Layout>
  );
}