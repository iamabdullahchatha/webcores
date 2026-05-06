import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

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
  { name: "Contact", to: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`mx-auto max-w-7xl px-4 ${scrolled ? "" : ""}`}>
        <div className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-2.5 transition-all ${
          scrolled ? "glass shadow-elegant" : ""
        }`}>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Webcore Solutions" className="h-10 md:h-12 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setDrop(true)}
                onMouseLeave={() => item.dropdown && setDrop(false)}
              >
                <Link
                  to={item.to}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1 group"
                  activeProps={{ className: "relative px-4 py-2 text-sm font-semibold text-primary flex items-center gap-1 group" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="h-3.5 w-3.5" />}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>

                <AnimatePresence>
                  {item.dropdown && drop && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 rounded-xl p-2 shadow-elegant"
                      style={{
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        backgroundColor: "rgba(255, 255, 255, 0.82)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {services.map((s) => (
                        <Link
                          key={s.name}
                          to={s.to}
                          className="block rounded-lg px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary transition"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center rounded-xl gradient-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.97] active:translate-y-0"
            >
              Book Consultation
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg glass"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-2 glass rounded-2xl overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-lg hover:bg-primary/10 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
