import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Shield,
  Building2,
  Globe,
  Award,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";
import { getSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/webcore-solutions-dubai")({
  head: () =>
    getSeoHead("webcoreSolutionsDubai", {
      faqs: [
        {
          q: "Is this the official Webcore Solutions Dubai website?",
          a: "Yes. webcoreuae.com is the official website of Webcore Solutions, the Dubai, United Arab Emirates digital agency founded in 2012 by Muhammad Abdullah Chattha. We are not affiliated with similarly-named businesses based in Pakistan, India, the United Kingdom, or the United States.",
        },
        {
          q: "Where is Webcore Solutions based?",
          a: "Webcore Solutions is headquartered in Dubai, United Arab Emirates, with active client operations across the UAE, the UK, Europe, the US, and Pakistan. Our Dubai phone is +971 50 716 9200.",
        },
        {
          q: "How long has Webcore Solutions operated in Dubai?",
          a: "Webcore Solutions has operated from Dubai since 2012. Over 12 years, the agency has grown from a 3-person team to 25 full-time engineers, designers, and strategists, with 450+ delivered client projects.",
        },
      ],
    }),
  component: WebcoreSolutionsDubai,
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, type: "tween" as const, ease: [0.22, 1, 0.36, 1] as const },
});

const credibilityPoints = [
  {
    icon: Building2,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
    title: "Dubai-headquartered since 2012",
    desc: "Operating continuously from the United Arab Emirates for over twelve years. Founded by Muhammad Abdullah Chattha.",
  },
  {
    icon: Shield,
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
    title: "Verified UAE entity",
    desc: "Trade-licensed in the UAE. Local phone number, local team, local accountability. Not a reseller or offshore-only operation.",
  },
  {
    icon: Award,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    title: "450+ delivered projects",
    desc: "Web, software, CMS, SEO, branding, and IT consultation work for UAE, UK, US, and EU clients with a 4.9 / 5 average rating.",
  },
  {
    icon: Globe,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
    title: "Serving five regions",
    desc: "Active client engagements across the UAE, the United Kingdom, Europe, the United States, and Pakistan.",
  },
];

function WebcoreSolutionsDubai() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[55vh] flex items-center">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />

        <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-20 md:pt-24 md:pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-7"
          >
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Dubai · United Arab Emirates
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "tween", ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            <span className="gradient-text">Webcore Solutions</span>, Dubai.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            The verified Dubai entity. Webcore Solutions has built web, software, and SEO
            products for UAE, UK, US, and EU clients from Dubai since 2012. This page exists
            to disambiguate us from same-name companies in other regions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              Speak to the Dubai team
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 rounded-2xl glass px-7 py-3.5 font-semibold transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              About the founder
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CREDIBILITY GRID */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <motion.div {...fadeUp()} className="max-w-2xl mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            The Dubai facts
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Four reasons we are the Webcore Solutions you are looking for.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {credibilityPoints.map((p, i) => (
            <motion.div
              key={p.title}
              {...fadeUp(i * 0.08)}
              className="glass rounded-2xl p-6 hover:shadow-glow transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: p.bg, boxShadow: `0 4px 16px ${p.color}22` }}
              >
                <p.icon className="h-5 w-5" style={{ color: p.color }} />
              </div>
              <p className="text-lg font-bold mb-2">{p.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DISAMBIGUATION */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <motion.div
          {...fadeUp()}
          className="glass rounded-3xl p-8 md:p-12 border-l-4 border-primary"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
            Disambiguation
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-5">
            Not affiliated with same-name businesses in other regions.
          </h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              At least four businesses worldwide use the name &ldquo;Webcore&rdquo; or a
              close variant. To make this clear:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 marker:text-primary">
              <li>
                Webcore Solutions on this website is the Dubai, United Arab Emirates
                entity, headquartered in Dubai since 2012.
              </li>
              <li>
                We are not affiliated with Webcore-named businesses based in Pakistan,
                India, the United Kingdom, or the United States.
              </li>
              <li>
                All projects, team members, testimonials, and case studies referenced on
                webcoreuae.com were delivered by the Dubai team led by Muhammad Abdullah
                Chattha.
              </li>
              <li>
                Our official contact channels are: +971 50 716 9200 (Dubai), +44 7570
                792516 (UK), and info@webcoreuae.com.
              </li>
            </ul>
            <p>
              If you arrived here looking for a Webcore Solutions in another country, this
              is not that company. We do not provide forwarding contact details for the
              other businesses — please use a Google search with the relevant country
              qualifier.
            </p>
          </div>
        </motion.div>
      </section>

      {/* WHAT WE DO IN DUBAI */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <motion.div {...fadeUp()} className="max-w-2xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            What Webcore Solutions delivers from Dubai
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Six service lines, in-house, in Dubai.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-3">
          {[
            { name: "Web development for Dubai businesses", to: "/services/web-development" },
            { name: "Custom software for UAE startups and enterprises", to: "/services/software-development" },
            { name: "CMS engineering — headless and WordPress", to: "/services/cms-development" },
            { name: "Dubai SEO and GEO services", to: "/services/seo-geo" },
            { name: "Brand identity and graphic design", to: "/services/graphic-design" },
            { name: "IT consultation and technology advisory", to: "/services/it-consultation" },
          ].map((item, i) => (
            <motion.div key={item.to} {...fadeUp(i * 0.05)}>
              <Link
                to={item.to}
                className="group flex items-center justify-between gap-3 glass rounded-xl px-5 py-4 hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-semibold">{item.name}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-16 pb-24">
        <motion.div {...fadeUp()} className="relative glass rounded-3xl p-10 md:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 gradient-primary opacity-[0.05] pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Verified Dubai team. Available now.
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-7 leading-relaxed">
              Reach Webcore Solutions Dubai for a 45-minute scoping call. We respond inside
              one business day on UAE time.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              Contact Webcore Solutions Dubai
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
