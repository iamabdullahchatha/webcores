import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Easing } from "framer-motion";
import logo from "@/assets/logo.png";
import { useSiteSettings } from "@/lib/content";

const services = [
  { name: "IT Consultation", to: "/services/it-consultation" },
  { name: "CMS Development", to: "/services/cms-development" },
  { name: "Web Development", to: "/services/web-development" },
  { name: "Software Development", to: "/services/software-development" },
  { name: "SEO & GEO", to: "/services/seo-geo" },
  { name: "Graphic Design", to: "/services/graphic-design" },
];

const nav = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Services", to: "/services", dropdown: true },
  { name: "FAQs", to: "/faqs" },
  { name: "Blog", to: "/blog" },
  { name: "Contact", to: "/contact" },
];

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" as Easing },
  },
  exit: { opacity: 0, y: -8, scale: 0.95, transition: { duration: 0.15 } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeOut" as Easing },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const { data: settings } = useSiteSettings();
  const logoSrc = settings?.logoUrl ?? logo;
  const logoAlt = settings?.logoAlt ?? "Webcore Solutions";

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`mx-auto max-w-7xl px-4`}>
        <div
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-2.5 transition-all duration-300 ${
            scrolled ? "shadow-elegant" : ""
          }`}
          style={
            scrolled
              ? {
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  backgroundColor: "rgba(255, 255, 255, 0.75)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }
              : undefined
          }
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
            aria-label="Webcore Solutions — Home"
          >
            <img
              src={logoSrc}
              alt={logoAlt}
              width={1180}
              height={319}
              decoding="async"
              fetchPriority="high"
              className="h-10 md:h-12 w-auto"
            />
            <span className="sr-only">Webcore Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary navigation">
            {nav.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative"
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                onMouseEnter={() => item.dropdown && setDrop(true)}
                onMouseLeave={() => item.dropdown && setDrop(false)}
              >
                <Link
                  to={item.to}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group"
                  activeProps={{
                    className:
                      "relative px-4 py-2 text-sm font-semibold text-primary flex items-center gap-1.5 group",
                  }}
                  activeOptions={{ exact: item.to === "/" }}
                  aria-haspopup={item.dropdown ? "true" : undefined}
                  aria-expanded={item.dropdown ? drop : undefined}
                >
                  {item.name}
                  {item.dropdown && (
                    <motion.div animate={{ rotate: drop ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </motion.div>
                  )}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>

                {/* Desktop Dropdown */}
                <AnimatePresence>
                  {item.dropdown && drop && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 mt-3 w-64 rounded-xl p-2 shadow-elegant"
                      style={{
                        backdropFilter: "blur(48px)",
                        WebkitBackdropFilter: "blur(48px)",
                        backgroundColor: "rgba(255, 255, 255, 0.88)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {services.map((s, idx) => (
                        <motion.div
                          key={s.name}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04, duration: 0.2 }}
                        >
                          <Link
                            to={s.to}
                            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:pl-4"
                          >
                            {s.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </nav>

          {/* CTA and Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:block"
            >
              <Link
                to="/contact"
                aria-label="Get in Touch — start a project"
                className="inline-flex items-center rounded-xl gradient-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-elegant hover:shadow-glow transition-all duration-200"
              >
                Get in Touch
              </Link>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg glass hover:bg-primary/10 transition-colors duration-200"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={open ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden mt-2 rounded-2xl overflow-hidden"
              style={{
                backdropFilter: "blur(64px)",
                WebkitBackdropFilter: "blur(64px)",
                backgroundColor: "rgba(255, 255, 255, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div
                className="p-4 flex flex-col gap-1"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {nav.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-lg hover:bg-primary/10 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-200"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: nav.length * 0.05, duration: 0.2 }}
                  className="mt-2 pt-2 border-t border-primary/10"
                >
                  <Link
                    to="/contact"
                    aria-label="Get in Touch — mobile menu"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold text-center transition-all duration-200 hover:shadow-glow"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
