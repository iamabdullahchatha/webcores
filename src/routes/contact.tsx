import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useCallback } from "react";
import type { CSSProperties, ChangeEvent, FormEvent, ReactNode } from "react";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Send,
  Shield,
  Star,
  MessageCircle,
  Linkedin,
  Facebook,
  Globe,
  Zap,
  ChevronDown,
  Globe2,
  Code2,
  FileText,
  TrendingUp,
  Palette,
  Cpu,
  ShoppingCart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";

/* ──────────────────────────────────────────────────────────────────── */
/* WhatsApp SVG Icon */
/* ──────────────────────────────────────────────────────────────────── */

function WhatsAppIcon({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Route */
/* ──────────────────────────────────────────────────────────────────── */

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Webcore Solutions" },
      {
        name: "description",
        content:
          "Get in touch with Webcore Solutions. Book a free consultation or send us a message.",
      },
      {
        property: "og:title",
        content: "Contact — Webcore Solutions",
      },
    ],
  }),
  component: Contact,
});

/* ──────────────────────────────────────────────────────────────────── */
/* Data */
/* ──────────────────────────────────────────────────────────────────── */

const contactInfo = [
  {
    icon: Phone,
    label: "UK",
    value: "+44 7570 792516",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
  },
  {
    icon: Phone,
    label: "Dubai",
    value: "+971 50 716 9200",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.10)",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@webcoreuae.com",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
  },
  {
    icon: MapPin,
    label: "HQ",
    value: "Dubai, UAE",
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
  },
];

const socials = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    color: "#25d366",
    bg: "rgba(37,211,102,0.10)",
    href: "https://wa.me/447570792516",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
    href: "https://www.linkedin.com/in/webcore-solutions-939b88408",
  },
  {
    icon: Facebook,
    label: "Facebook",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.10)",
    href: "https://www.facebook.com/profile.php?id=61587249472207",
  },
];

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const todayIndex = new Date().getDay();
const adjustedToday = todayIndex === 0 ? 6 : todayIndex - 1;

type ServiceItem = {
  value: string;
  icon: LucideIcon;
  color: string;
  desc: string;
};

const services: ServiceItem[] = [
  {
    value: "Web Development",
    icon: Globe2,
    color: "#06b6d4",
    desc: "Modern responsive websites",
  },
  {
    value: "Software Development",
    icon: Code2,
    color: "#3b82f6",
    desc: "Custom software solutions",
  },
  {
    value: "CMS Development",
    icon: FileText,
    color: "#8b5cf6",
    desc: "WordPress & headless CMS",
  },
  {
    value: "SEO & GEO",
    icon: TrendingUp,
    color: "#10b981",
    desc: "Search visibility growth",
  },
  {
    value: "Brand & Design",
    icon: Palette,
    color: "#ec4899",
    desc: "Creative branding systems",
  },
  {
    value: "IT Consultation",
    icon: Cpu,
    color: "#f59e0b",
    desc: "Technical strategy support",
  },
  {
    value: "E-Commerce",
    icon: ShoppingCart,
    color: "#06b6d4",
    desc: "Online store development",
  },
  {
    value: "Other",
    icon: Sparkles,
    color: "#a78bfa",
    desc: "Custom project requirements",
  },
];

const heroPills = [
  {
    icon: Star,
    label: "450+ happy clients",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
  },
  {
    icon: Clock,
    label: "Response in 24hrs",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
  },
  {
    icon: Shield,
    label: "No commitment needed",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
  },
];

/* ──────────────────────────────────────────────────────────────────── */
/* Helpers */
/* ──────────────────────────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.65,
    delay,
    type: "tween" as const,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-bold uppercase tracking-widest text-primary mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Tilt Card */
/* ──────────────────────────────────────────────────────────────────── */

function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [7, -7]),
    {
      stiffness: 200,
      damping: 22,
    }
  );

  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-7, 7]),
    {
      stiffness: 200,
      damping: 22,
    }
  );

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();

      if (!rect) return;

      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Success State */
/* ──────────────────────────────────────────────────────────────────── */

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-8 text-center h-full min-h-105"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.55,
          type: "spring",
          stiffness: 200,
          damping: 18,
        }}
        className="h-20 w-20 rounded-3xl flex items-center justify-center mb-7 shadow-elegant relative"
        style={{ background: "rgba(16,185,129,0.12)" }}
      >
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ background: "rgba(16,185,129,0.15)" }}
        />

        <CheckCircle2
          className="h-10 w-10"
          style={{ color: "#10b981" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.5 }}
      >
        <h3 className="text-3xl font-bold mb-2">
          Message <span className="gradient-text">Sent!</span>
        </h3>

        <div
          className="mx-auto mt-1 mb-5 h-0.5 w-12 rounded-full"
          style={{
            background:
              "linear-gradient(to right, #10b981, #06b6d4)",
          }}
        />

        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
          Thank you for reaching out. A member of our team
          will get back to you within 1 business day.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.45 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        {[
          {
            icon: Clock,
            label: "Within 24 hours",
            color: "#06b6d4",
          },
          {
            icon: Shield,
            label: "Data protected",
            color: "#8b5cf6",
          },
          {
            icon: Zap,
            label: "Senior team",
            color: "#f59e0b",
          },
        ].map((b) => (
          <span
            key={b.label}
            className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{ color: b.color }}
          >
            <b.icon className="h-3 w-3" />
            {b.label}
          </span>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onReset}
        className="mt-8 text-xs text-muted-foreground hover:text-primary transition-colors duration-200 underline underline-offset-2"
      >
        Send another message
      </motion.button>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Service Dropdown */
/* ──────────────────────────────────────────────────────────────────── */

function ServiceDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const selected = services.find((s) => s.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full glass rounded-xl px-4 py-3 text-sm bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-foreground flex items-center justify-between gap-2"
        style={{ minHeight: "46px" }}
      >
        {selected ? (
          <span className="flex items-center gap-2 min-w-0">
            <selected.icon
              className="h-4 w-4 shrink-0"
              style={{ color: selected.color }}
            />

            <span className="font-semibold truncate">
              {selected.value}
            </span>

            <span className="text-muted-foreground/50 text-xs hidden sm:inline truncate">
              — {selected.desc}
            </span>
          </span>
        ) : (
          <span className="text-muted-foreground/50">
            Select a service...
          </span>
        )}

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-muted-foreground"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -6,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -6,
              scale: 0.98,
            }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 left-0 right-0 mt-2 rounded-2xl overflow-hidden shadow-2xl border border-border/30"
            style={{
              background:
                "var(--card, hsl(var(--background)))",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="p-1 grid grid-cols-1 gap-0">
              {services.map((s, i) => {
                const isSelected = value === s.value;

                return (
                  <motion.button
                    key={s.value}
                    type="button"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.03,
                      duration: 0.18,
                    }}
                    onClick={() => {
                      onChange(s.value);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all duration-150 group ${
                      isSelected
                        ? "gradient-primary text-primary-foreground shadow-elegant"
                        : "hover:bg-primary/8 text-foreground"
                    }`}
                  >
                    <span
                      className={`h-6 w-6 rounded-md flex items-center justify-center shrink-0 transition-all duration-150 ${
                        isSelected
                          ? "bg-white/20"
                          : "bg-muted/60 group-hover:bg-primary/10"
                      }`}
                    >
                      <s.icon className="h-3 w-3" />
                    </span>

                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold leading-tight">
                        {s.value}
                      </span>

                      <span
                        className={`text-[10px] leading-tight ${
                          isSelected
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {s.desc}
                      </span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="h-3 w-3 ml-auto shrink-0 text-primary-foreground/80" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Contact Form */
/* ──────────────────────────────────────────────────────────────────── */

/* ──────────────────────────────────────────────────────────────────── */
/* Contact Form */
/* ──────────────────────────────────────────────────────────────────── */

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Failed to send message");
    }

    setSent(true);

    setForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      subject: "",
      message: "",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    alert("Something went wrong while sending your message. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const inputClass =
    "w-full glass rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/50 bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-foreground";

  return (
    <div className="glass rounded-3xl overflow-hidden relative">
      <AnimatePresence mode="wait">
        {sent ? (
          <SuccessState
            key="success"
            onReset={() => {
              setSent(false);

              setForm({
                name: "",
                email: "",
                phone: "",
                service: "",
                subject: "",
                message: "",
              });
            }}
          />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold mb-1">
              Send us a message
            </h2>

            <p className="text-muted-foreground text-sm mb-7">
              Fill out the form and we'll get back to you
              shortly.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Your Name
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Email Address
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Phone (Optional)
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+44 000 000 000"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Service Interested In
                  </label>

                  <ServiceDropdown
                    value={form.service}
                    onChange={(val) =>
                      setForm((prev) => ({
                        ...prev,
                        service: val,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Subject
                </label>

                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Message
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project, goals, and timeline..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3.5 w-3.5 text-primary/50" />
                  Your data is safe and never shared.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 text-sm disabled:opacity-70 disabled:pointer-events-none overflow-hidden"
                >
                  {loading && (
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}

                  <span className="relative">
                    {loading
                      ? "Sending..."
                      : "Send message"}
                  </span>

                  <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 relative" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Main Component */
/* ──────────────────────────────────────────────────────────────────── */

function Contact() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "20%"]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0]
  );

  return (
    <Layout>
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[60vh] flex items-center"
      >
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />

        <GridBackground />
        <FloatingShapes />

        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-8 right-12 rounded-full pointer-events-none"
          style={{
            width: 480,
            height: 480,
            background:
              "radial-gradient(circle, hsl(var(--primary)/0.18) 0%, transparent 70%)",
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-0 left-4 rounded-full pointer-events-none"
          style={{
            width: 320,
            height: 320,
            background:
              "radial-gradient(circle, hsl(var(--primary)/0.12) 0%, transparent 70%)",
          }}
        />

        <motion.div
          style={{
            y: heroY,
            opacity: heroOpacity,
          }}
          className="relative w-full"
        >
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-28 md:pt-24 md:pb-32">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Contact Us
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85 }}
                className="text-5xl md:text-6xl font-bold leading-[1.06] tracking-tight"
              >
                Let's build something{" "}
                <span className="gradient-text">
                  great.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                }}
                className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-xl"
              >
                Drop us a message or book a free
                45-minute strategy call. You'll leave
                with clarity — whether you work with us
                or not.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.45,
                }}
                className="mt-8 flex flex-wrap justify-center gap-3"
              >
                {heroPills.map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-xs font-semibold"
                    style={{ color: p.color }}
                  >
                    <p.icon className="h-3 w-3" />
                    {p.label}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">
          <div className="space-y-5">
            <motion.div
              {...fadeUp()}
              className="glass rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full blur-3xl opacity-[0.06] pointer-events-none gradient-primary" />

              <h2 className="text-xl font-bold mb-1">
                Get in touch
              </h2>

              <p className="text-muted-foreground text-sm mb-7">
                We're just a message away.
              </p>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="group flex items-center gap-4"
                  >
                    <div
                      className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200"
                      style={{
                        background: item.bg,
                        boxShadow: `0 4px 14px ${item.color}22`,
                      }}
                    >
                      <item.icon
                        className="h-5 w-5"
                        style={{ color: item.color }}
                      />
                    </div>

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {item.label}
                      </div>

                      <div className="text-sm font-semibold">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 pt-6 border-t border-border/40">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Follow us
                </div>

                <div className="flex gap-2">
                  {socials.map((s) => (
                    <TiltCard key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-glow"
                        style={{ background: s.bg }}
                      >
                        <s.icon
                          className="h-4 w-4"
                          style={{ color: s.color }}
                        />
                      </a>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.1)}
              className="glass rounded-3xl p-7 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{
                      background:
                        "rgba(6,182,212,0.10)",
                    }}
                  >
                    <Clock
                      className="h-4 w-4"
                      style={{ color: "#06b6d4" }}
                    />
                  </div>

                  <span className="font-bold text-sm">
                    Working Hours
                  </span>
                </div>

                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background:
                      "rgba(16,185,129,0.10)",
                    color: "#10b981",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open Now
                </span>
              </div>

              <div className="flex gap-1.5 mb-5">
                {weekDays.map((d, i) => {
                  const isToday =
                    i === adjustedToday;

                  const isWeekend = i >= 5;

                  return (
                    <div
                      key={d}
                      className={`flex-1 rounded-lg py-1.5 text-center text-[10px] font-bold transition-all duration-200 ${
                        isToday
                          ? "gradient-primary text-primary-foreground shadow-elegant"
                          : isWeekend
                          ? "text-muted-foreground/40 bg-muted/20"
                          : "glass text-muted-foreground"
                      }`}
                    >
                      {d}
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2 text-sm">
                {[
                  {
                    days: "Mon – Fri",
                    hours: "9:00 AM – 6:00 PM",
                    open: true,
                  },
                  {
                    days: "Saturday",
                    hours: "Closed",
                    open: false,
                  },
                  {
                    days: "Sunday",
                    hours: "Closed",
                    open: false,
                  },
                ].map((row) => (
                  <div
                    key={row.days}
                    className="flex justify-between items-center"
                  >
                    <span className="text-muted-foreground text-xs">
                      {row.days}
                    </span>

                    <span
                      className={`text-xs font-semibold ${
                        row.open
                          ? "text-foreground"
                          : "text-muted-foreground/50 italic"
                      }`}
                    >
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-border/40 flex items-center gap-2 text-[10px] text-muted-foreground">
                <Globe className="h-3 w-3 shrink-0" />
                Dubai (GST) · United Kingdom
                (GMT/BST) · Response within 1
                business day
              </div>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.15)}>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24">
        <motion.div
          {...fadeUp(0.1)}
          className="relative glass rounded-3xl p-10 md:p-14 overflow-hidden text-center"
        >
          <div className="absolute inset-0 gradient-primary opacity-[0.05] rounded-3xl pointer-events-none" />

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-10 -right-10 h-60 w-60 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--primary)/0.2) 0%, transparent 70%)",
            }}
          />

          <div className="relative">
            <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-elegant">
              <MessageCircle className="h-7 w-7 text-primary-foreground" />
            </div>

            <SectionLabel>
              Prefer a call?
            </SectionLabel>

            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Book a free strategy call.
            </h2>

            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8 leading-relaxed">
              45 minutes with our senior team.
              Walk away with clarity on scope,
              cost, and next steps — whether you
              work with us or not.
            </p>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-8 py-4 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
            >
              Book Free Consultation

              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <div className="mt-6 flex flex-wrap justify-center gap-5 text-xs text-muted-foreground">
              {[
                "No commitment required",
                "Response within 24 hours",
                "Completely free",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-3 w-3 text-primary/60" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}