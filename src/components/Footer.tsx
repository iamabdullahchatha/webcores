import { Link } from "@tanstack/react-router";
import {
  Linkedin, Facebook, Mail, Phone, MessageCircle,
  ArrowUpRight, MapPin, Globe, Zap, Lock,
} from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/logo.png";
import { useSiteSettings } from "@/lib/content/useSiteSettings";

/* ─── Data ─────────────────────────────────────────────────────────── */
const services = [
  { name: "IT consultation services",     to: "/services/it-consultation" },
  { name: "CMS engineering",              to: "/services/cms-development" },
  { name: "Web design and build",         to: "/services/web-development" },
  { name: "Custom software builds",       to: "/services/software-development" },
  { name: "Search and GEO optimization",  to: "/services/seo-geo" },
  { name: "Branding and visual identity", to: "/services/graphic-design" },
];

const quickLinks = [
  { name: "Homepage",        to: "/" },
  { name: "Our story",       to: "/about" },
  { name: "All services",    to: "/services" },
  { name: "Blog",            to: "/blog" },
  { name: "Common questions", to: "/faqs" },
  { name: "Reach our team",  to: "/contact" },
];

const SOCIAL_COLORS = { LinkedIn: "#0A66C2", Facebook: "#1877F2", WhatsApp: "#25D366" };

/* ─── Floating Orb ─────────────────────────────────────────────────── */
function FloatingOrb({
  x, y, size, delay,
}: {
  x: string; y: string; size: number; delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y, width: size, height: size,
        background: "radial-gradient(circle, hsl(var(--primary)/0.18) 0%, transparent 70%)",
      }}
      animate={{ y: [0, -18, 0], scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 5 + delay, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay }}
    />
  );
}

/* ─── Magnetic Social Button ────────────────────────────────────────── */
function MagneticSocial({
  icon: Icon, label, href, color,
}: {
  icon: React.ElementType; label: string; href: string; color: string;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="relative group flex items-center justify-center w-10 h-10 rounded-2xl glass overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at center, ${color}30, transparent 70%)` }}
      />
      <Icon className="h-4 w-4 relative z-10" />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25, type: "tween", ease: "easeOut" }}
      />
    </motion.a>
  );
}

/* ─── Hover Link ───────────────────────────────────────────────────── */
function FlipLink({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 w-fit"
    >
      <ArrowUpRight className="h-3 w-3 shrink-0 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
      <span className="font-medium group-hover:font-semibold transition-all duration-200">
        {children}
      </span>
    </Link>
  );
}

/* ─── Section Heading ───────────────────────────────────────────────── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-semibold text-sm mb-6 inline-flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      {children}
    </p>
  );
}

/* ─── Ticker ────────────────────────────────────────────────────────── */
const tickerItems = [
  "Web Development", "•", "Software Solutions", "•",
  "IT Consultation", "•", "SEO & GEO", "•",
  "Graphic Design",  "•", "CMS Development",    "•",
];

function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="relative overflow-hidden py-3 border-y border-border/30 my-10">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-background to-transparent pointer-events-none" />
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, repeatType: "loop", ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`text-xs font-medium tracking-widest uppercase ${
              item === "•" ? "text-primary" : "text-muted-foreground/50"
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────── */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { data: settings } = useSiteSettings();

  const show   = { opacity: 1, y: 0 };
  const hidden = { opacity: 0, y: 28 };

  const socials = [
    { icon: Linkedin,      label: "LinkedIn", href: settings?.socialLinkedin ?? "https://www.linkedin.com/in/webcore-solutions-939b88408", color: SOCIAL_COLORS.LinkedIn },
    { icon: Facebook,      label: "Facebook", href: settings?.socialFacebook ?? "https://www.facebook.com/profile.php?id=61587249472207", color: SOCIAL_COLORS.Facebook },
    { icon: MessageCircle, label: "WhatsApp", href: settings?.whatsappUrl    ?? "https://wa.me/447570792516", color: SOCIAL_COLORS.WhatsApp },
  ];

  const contactItems = [
    { icon: Phone,  label: "UK",    value: settings?.phoneUk   ?? "+44 7570 792516" },
    { icon: Phone,  label: "Dubai", value: settings?.phoneUae  ?? "+971 50 716 9200" },
    { icon: Mail,   label: "Email", value: settings?.email     ?? "info@webcoreuae.com" },
    { icon: MapPin, label: "HQ",    value: settings?.addressLine1 ?? "Dubai, United Arab Emirates" },
  ];

  return (
    <footer ref={ref} className="relative mt-24 overflow-hidden">

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingOrb x="5%"  y="10%" size={300} delay={0}   />
        <FloatingOrb x="70%" y="5%"  size={200} delay={1.5} />
        <FloatingOrb x="85%" y="60%" size={250} delay={3}   />
        <FloatingOrb x="20%" y="70%" size={180} delay={2}   />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      {/* Top shimmer */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, type: "tween", ease: "easeOut" }}
        className="relative h-px bg-linear-to-r from-transparent via-primary/60 to-transparent origin-left"
      />

      <div className="relative border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-10">

          {/* CTA Banner */}
          <motion.div
            initial={hidden}
            animate={inView ? show : hidden}
            transition={{ duration: 0.6, delay: 0, type: "tween", ease: "easeOut" }}
            className="relative mb-14 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)/0.12) 0%, hsl(var(--primary)/0.05) 50%, transparent 100%)",
              border: "1px solid hsl(var(--primary)/0.2)",
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/6 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-7">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">Ready to build?</span>
                </div>
                <h3 className="text-xl font-bold">Let's turn your vision into reality.</h3>
              </div>
              <Link
                to="/contact"
                className="shrink-0 group inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              >
                Begin Your Engagement
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Main grid */}
          <div className="grid gap-10 md:grid-cols-12">

            {/* Brand */}
            <motion.div
              initial={hidden}
              animate={inView ? show : hidden}
              transition={{ duration: 0.6, delay: 0.15, type: "tween", ease: "easeOut" }}
              className="md:col-span-4 space-y-5"
            >
              <Link to="/" className="inline-block">
                <img
                  src={logo}
                  alt="Webcore Solutions"
                  width={1180}
                  height={319}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Transforming ideas into digital reality. Premium software, web & IT solutions built for the modern world.
              </p>
              <div className="flex items-center gap-2 pt-1">
                {socials.map((s) => <MagneticSocial key={s.label} {...s} />)}
              </div>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl glass text-xs text-muted-foreground"
              >
                <Globe className="h-3.5 w-3.5 text-primary shrink-0" />
                Dubai, UAE · United Kingdom
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={hidden}
              animate={inView ? show : hidden}
              transition={{ duration: 0.6, delay: 0.2, type: "tween", ease: "easeOut" }}
              className="md:col-span-2"
            >
              <SectionHeading>Quick Links</SectionHeading>
              <nav aria-label="Footer navigation">
                <ul className="space-y-3">
                  {quickLinks.map((l) => (
                    <li key={l.name}><FlipLink to={l.to}>{l.name}</FlipLink></li>
                  ))}
                </ul>
              </nav>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={hidden}
              animate={inView ? show : hidden}
              transition={{ duration: 0.6, delay: 0.25, type: "tween", ease: "easeOut" }}
              className="md:col-span-3"
            >
              <SectionHeading>Services</SectionHeading>
              <ul className="space-y-2.5">
                {services.map((s) => (
                  <li key={s.name}>
                    <Link
                      to={s.to}
                      className="group flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <span className="h-px w-4 bg-primary/30 group-hover:w-6 group-hover:bg-primary transition-all duration-300 shrink-0" />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={hidden}
              animate={inView ? show : hidden}
              transition={{ duration: 0.6, delay: 0.3, type: "tween", ease: "easeOut" }}
              className="md:col-span-3"
            >
              <SectionHeading>Get in Touch</SectionHeading>
              <ul className="space-y-4">
                {contactItems.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="group flex items-start gap-3">
                    <span className="mt-0.5 p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/25 transition-all duration-200 shrink-0 group-hover:scale-110">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-primary/50 leading-none mb-0.5">{label}</p>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Ticker */}
          <motion.div
            initial={hidden}
            animate={inView ? show : hidden}
            transition={{ duration: 0.6, delay: 0.35, type: "tween", ease: "easeOut" }}
          >
            <Ticker />
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            initial={hidden}
            animate={inView ? show : hidden}
            transition={{ duration: 0.6, delay: 0.4, type: "tween", ease: "easeOut" }}
            className="flex flex-col md:flex-row justify-between items-center gap-3"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <p>© {new Date().getFullYear()} Webcore Solutions. All rights reserved.</p>
              <Link to="/privacy-policy" className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/sitemap" className="hover:text-primary transition-colors duration-200">
                Sitemap
              </Link>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
              <motion.span
                className="inline-block w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
              />
              Crafting digital excellence, one pixel at a time.
              <Link
                to="/admin/login"
                aria-label="Admin login"
                className="text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors duration-300 ml-4"
              >
                <Lock className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </footer>
  );
}