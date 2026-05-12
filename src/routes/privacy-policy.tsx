import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Shield, Mail, Phone, ArrowRight, MapPin } from "lucide-react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";
import { getSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => getSeoHead("privacyPolicy"),
  component: PrivacyPolicy,
});

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

function Section({
  title,
  index,
  children,
}: {
  title: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      {...fadeUp(index * 0.05)}
      className="relative glass rounded-3xl p-8 md:p-10 overflow-hidden group"
    >
      <div
        className="absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-300 pointer-events-none gradient-primary"
      />
      <h2 className="text-xl md:text-2xl font-bold mb-5 text-foreground relative">
        <span className="text-primary mr-3">{String(index + 1).padStart(2, "0")}.</span>
        {title}
      </h2>
      <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed relative">
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
    </motion.section>
  );
}

function PrivacyPolicy() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Layout>
      {/* ══════════════════════ HERO ═══════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-16 rounded-full pointer-events-none"
          style={{
            width: 500,
            height: 500,
            background: "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 left-8 rounded-full pointer-events-none"
          style={{
            width: 300,
            height: 300,
            background: "radial-gradient(circle, hsl(var(--primary)/0.12) 0%, transparent 70%)",
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-24 md:pt-24 md:pb-28">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-8"
              >
                <Shield className="h-3.5 w-3.5 text-primary" />
                Legal Information
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl font-bold leading-[1.06] tracking-tight"
              >
                Privacy <span className="gradient-text">Policy</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "tween", ease: "easeOut" }}
                className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-xl"
              >
                How Webcore Solutions collects, uses and protects your personal data under GDPR and UAE
                data protection law.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, type: "tween", ease: "easeOut" }}
                className="mt-8 flex flex-wrap justify-center gap-3"
              >
                {[
                  { label: "Last updated 12 May 2026", color: "#06b6d4" },
                  { label: "Effective 1 Jan 2024", color: "#8b5cf6" },
                  { label: "GDPR & UAE compliant", color: "#10b981" },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-xs font-semibold"
                    style={{ color: tag.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: tag.color }} />
                    {tag.label}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════ CONTENT ══════════════════════════════════ */}
      <article className="mx-auto max-w-4xl px-4 py-20 pb-28 space-y-6">
        <Section title="Who We Are" index={0}>
          <p>
            <strong className="text-foreground">Webcore Solutions</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;)
            is a digital agency headquartered in Dubai, United Arab Emirates. We provide web development,
            software development, CMS development, SEO, GEO, branding, UI/UX design and IT consultation
            services to clients globally.
          </p>
          <p>
            For the purposes of this policy, Webcore Solutions is the Data Controller for personal data
            collected through this website (
            <strong className="text-foreground">webcoreuae.com</strong>).
          </p>
          <p>
            Contact us regarding privacy matters at{" "}
            <a
              href="mailto:info@webcoreuae.com"
              className="text-primary hover:underline underline-offset-2 font-semibold"
            >
              info@webcoreuae.com
            </a>
            .
          </p>
        </Section>

        <Section title="Data We Collect" index={1}>
          <p>We collect personal data only when you interact with us or our website:</p>
          <ul className="list-disc list-inside space-y-2 pl-2 marker:text-primary">
            <li>
              <strong className="text-foreground">Contact and inquiry data</strong> &mdash; name, email
              address, phone number, company name and project details you submit through contact forms or
              direct email.
            </li>
            <li>
              <strong className="text-foreground">Communication data</strong> &mdash; email correspondence,
              WhatsApp messages and call records related to project discussions.
            </li>
            <li>
              <strong className="text-foreground">Analytics data</strong> &mdash; aggregated usage data
              (pages visited, session duration, referring source) collected by Ahrefs Analytics. This data
              does not identify individual users.
            </li>
            <li>
              <strong className="text-foreground">Technical data</strong> &mdash; IP address, browser type,
              device type and operating system, collected automatically by server infrastructure.
            </li>
          </ul>
          <p>
            We do not collect sensitive personal data (health, financial, biometric or similar categories).
          </p>
        </Section>

        <Section title="How We Use Your Data" index={2}>
          <p>We use personal data for the following purposes:</p>
          <ul className="list-disc list-inside space-y-2 pl-2 marker:text-primary">
            <li>Responding to project inquiries and providing quotations.</li>
            <li>Delivering contracted services and ongoing client support.</li>
            <li>Sending project updates, milestone notifications and invoices.</li>
            <li>Improving our website and service quality through aggregate analytics.</li>
            <li>Complying with legal and regulatory obligations.</li>
          </ul>
          <p>
            We do not use your data for automated profiling, unsolicited marketing, or sale to third
            parties.
          </p>
        </Section>

        <Section title="Legal Basis for Processing (GDPR)" index={3}>
          <p>
            For individuals in the European Economic Area (EEA) or United Kingdom, we process personal
            data under the following legal bases:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 marker:text-primary">
            <li>
              <strong className="text-foreground">Contract</strong> &mdash; processing is necessary to
              fulfil a contract or take pre-contractual steps at your request.
            </li>
            <li>
              <strong className="text-foreground">Legitimate interests</strong> &mdash; responding to
              inquiries and managing client relationships, where our legitimate interests do not override
              your rights.
            </li>
            <li>
              <strong className="text-foreground">Legal obligation</strong> &mdash; processing required to
              comply with applicable law.
            </li>
            <li>
              <strong className="text-foreground">Consent</strong> &mdash; where you have explicitly
              agreed (for example, when subscribing to updates).
            </li>
          </ul>
        </Section>

        <Section title="Data Sharing" index={4}>
          <p>
            We share personal data only with trusted third-party processors who assist in delivering our
            services:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 marker:text-primary">
            <li>
              <strong className="text-foreground">Resend</strong> &mdash; transactional email delivery for
              contact form responses and project communications.
            </li>
            <li>
              <strong className="text-foreground">Ahrefs Analytics</strong> &mdash; aggregated website
              analytics (no personal data transmitted).
            </li>
            <li>
              <strong className="text-foreground">Vercel</strong> &mdash; website hosting and serverless
              infrastructure.
            </li>
          </ul>
          <p>
            All processors are contractually bound to process data only on our instructions and in
            compliance with applicable data protection law. We do not sell, rent or share personal data
            with any other party.
          </p>
        </Section>

        <Section title="International Data Transfers" index={5}>
          <p>
            Webcore Solutions operates from Dubai, UAE, and serves clients globally. Your data may be
            processed in countries outside your own, including the UAE, United Kingdom and the United
            States (where our processors may be based).
          </p>
          <p>
            For transfers from the EEA or UK, we rely on Standard Contractual Clauses (SCCs) or equivalent
            safeguards to ensure an adequate level of protection.
          </p>
        </Section>

        <Section title="Data Retention" index={6}>
          <p>We retain personal data for as long as necessary for the purposes outlined above:</p>
          <ul className="list-disc list-inside space-y-2 pl-2 marker:text-primary">
            <li>
              <strong className="text-foreground">Inquiry data</strong> &mdash; 12 months from last contact
              if no engagement follows.
            </li>
            <li>
              <strong className="text-foreground">Client project data</strong> &mdash; 7 years after
              project completion for legal and financial compliance.
            </li>
            <li>
              <strong className="text-foreground">Analytics data</strong> &mdash; as configured by Ahrefs
              Analytics (typically 24 months of aggregated data).
            </li>
          </ul>
          <p>After retention periods expire, data is securely deleted or anonymised.</p>
        </Section>

        <Section title="Your Rights" index={7}>
          <p>
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 marker:text-primary">
            <li>
              <strong className="text-foreground">Access</strong> &mdash; request a copy of the personal
              data we hold about you.
            </li>
            <li>
              <strong className="text-foreground">Rectification</strong> &mdash; request correction of
              inaccurate or incomplete data.
            </li>
            <li>
              <strong className="text-foreground">Erasure</strong> &mdash; request deletion of your
              personal data where we no longer have a lawful basis to retain it.
            </li>
            <li>
              <strong className="text-foreground">Restriction</strong> &mdash; request that we limit
              processing while a dispute is resolved.
            </li>
            <li>
              <strong className="text-foreground">Portability</strong> &mdash; receive your data in a
              structured, machine-readable format (EEA/UK residents).
            </li>
            <li>
              <strong className="text-foreground">Objection</strong> &mdash; object to processing based on
              legitimate interests.
            </li>
            <li>
              <strong className="text-foreground">Withdraw consent</strong> &mdash; where processing is
              based on consent, you may withdraw it at any time.
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:info@webcoreuae.com"
              className="text-primary hover:underline underline-offset-2 font-semibold"
            >
              info@webcoreuae.com
            </a>
            . We will respond within 30 days. EEA/UK residents may also lodge a complaint with their local
            data protection authority.
          </p>
        </Section>

        <Section title="Cookies and Tracking" index={8}>
          <p>
            This website uses Ahrefs Analytics, which places a lightweight analytics script. This script
            collects aggregated, anonymised usage data (page views, session duration, referrer) and does
            not track individual users across sessions or set persistent identifying cookies.
          </p>
          <p>
            We do not use advertising cookies, cross-site tracking pixels, or third-party remarketing
            scripts.
          </p>
        </Section>

        <Section title="Security" index={9}>
          <p>
            We implement technical and organisational security measures appropriate to the risk level of
            the data we process. These include HTTPS enforcement, strict Content Security Policy headers,
            HSTS with long max-age, secure third-party processor agreements and restricted internal data
            access.
          </p>
          <p>
            No transmission over the internet is 100% secure. If you believe your data has been
            compromised, contact us immediately.
          </p>
        </Section>

        <Section title="Children's Privacy" index={10}>
          <p>
            Our services are not directed at individuals under 16 years of age. We do not knowingly
            collect personal data from children. If you believe a child has submitted data through our
            website, contact us and we will delete it promptly.
          </p>
        </Section>

        <Section title="Changes to This Policy" index={11}>
          <p>
            We may update this Privacy Policy when our practices change or when required by law. We will
            update the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of our
            website after changes constitutes acceptance of the updated policy.
          </p>
        </Section>

        {/* ══════════════════════ CONTACT CARD ═══════════════════════════ */}
        <motion.section
          {...fadeUp(0.1)}
          className="relative glass rounded-3xl p-8 md:p-12 overflow-hidden"
        >
          <div className="absolute inset-0 gradient-primary opacity-[0.04] rounded-3xl pointer-events-none" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 h-52 w-52 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary)/0.2) 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Questions about your data?</h2>
            <p className="text-muted-foreground text-sm mb-7 leading-relaxed max-w-md">
              For privacy-related enquiries or to exercise your data rights, reach our team through any of
              the channels below.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@webcoreuae.com",
                  href: "mailto:info@webcoreuae.com",
                  color: "#06b6d4",
                  bg: "rgba(6,182,212,0.10)",
                },
                {
                  icon: Phone,
                  label: "Dubai",
                  value: "+971 50 716 9200",
                  href: "tel:+971507169200",
                  color: "#10b981",
                  bg: "rgba(16,185,129,0.10)",
                },
                {
                  icon: Phone,
                  label: "UK",
                  value: "+44 7570 792516",
                  href: "tel:+447570792516",
                  color: "#8b5cf6",
                  bg: "rgba(139,92,246,0.10)",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group flex items-start gap-3 bg-background/60 rounded-2xl px-4 py-3.5 hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200"
                    style={{ background: c.bg, boxShadow: `0 2px 10px ${c.color}22` }}
                  >
                    <c.icon className="h-4 w-4" style={{ color: c.color }} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.12em] leading-none mb-1"
                      style={{ color: c.color }}
                    >
                      {c.label}
                    </p>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                      {c.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Webcore Solutions, Dubai, United Arab Emirates
            </div>
          </div>
        </motion.section>

        {/* Back link */}
        <motion.div {...fadeUp(0.15)} className="pt-6 text-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to home
          </Link>
        </motion.div>
      </article>
    </Layout>
  );
}
