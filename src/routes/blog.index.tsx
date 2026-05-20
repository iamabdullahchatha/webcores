import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Clock, Calendar, HelpCircle, Plus } from "lucide-react";
import { Layout } from "@/components/Layout";
import { FloatingShapes, GridBackground } from "@/components/Scene3D";
import { getSeoHead, applyPageSeo, pageSeo } from "@/lib/seo";
import { usePageSeoOverrides } from "@/lib/content";
import { blogFallback } from "@/lib/content/seedFallback.generated";
import { supabase } from "@/lib/supabase/client";

export const Route = createFileRoute("/blog/")({
  head: () => getSeoHead("blog"),
  component: BlogIndex,
});

/* Animation configs — copied verbatim from index.tsx */
const fadeUp = (delay = 0, duration = 0.65) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration, delay, type: "tween" as const, ease: [0.22, 1, 0.36, 1] as const },
});

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-bold uppercase tracking-widest text-primary mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      {children}
    </div>
  );
}

/* ─── FAQ Accordion Item — mirrors the pattern used on /faqs ─────── */
function FaqItem({
  q, a, index, isOpen, onToggle,
}: {
  q: string; a: string; index: number; isOpen: boolean; onToggle: () => void;
}) {
  const panelId = `blog-faq-panel-${index}`;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    const previousTop = buttonRef.current?.getBoundingClientRect().top;
    onToggle();
    if (typeof previousTop !== "number") return;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const nextTop = buttonRef.current?.getBoundingClientRect().top;
        if (typeof nextTop !== "number") return;
        window.scrollBy({ top: nextTop - previousTop, left: 0, behavior: "auto" });
      });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.55, type: "tween", ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "glass shadow-glow border border-primary/20"
          : "glass border border-border/40 hover:border-primary/20"
      }`}
    >
      {/* Active left accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-300 ${
          isOpen ? "gradient-primary opacity-100" : "opacity-0"
        }`}
      />

      <h3 className="m-0 p-0 font-normal leading-none">
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-primary/5"
        >
          <div className="flex items-center gap-4">
            <div
              className={`shrink-0 h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isOpen ? "gradient-primary shadow-elegant" : "bg-primary/10 group-hover:bg-primary/15"
              }`}
            >
              <HelpCircle className={`h-4 w-4 transition-colors duration-200 ${isOpen ? "text-primary-foreground" : "text-primary"}`} />
            </div>
            <span className="font-semibold text-sm md:text-base">{q}</span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
              isOpen ? "gradient-primary" : "bg-primary/10"
            }`}
          >
            <Plus className={`h-3.5 w-3.5 transition-colors duration-200 ${isOpen ? "text-primary-foreground" : "text-primary"}`} />
          </motion.div>
        </button>
      </h3>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-18 pr-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-primary/10 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const BLOG_FAQS = [
  {
    q: "What does the Webcore Solutions blog cover?",
    a: "The blog covers practical web development, software engineering, headless CMS builds, ecommerce, and software architecture — alongside SEO, GEO strategy, and growth. Posts are written by senior engineers and strategists in Dubai who actually ship the work for our UAE, UK, Europe, US, and Pakistan clients.",
  },
  {
    q: "How often are new articles published?",
    a: "We publish new posts regularly throughout 2026 and beyond — each one tied to a real client project or live engineering problem. Nothing is generated for volume or outsourced for SEO; every article is written by the team doing the work.",
  },
  {
    q: "Which technical topics appear most often?",
    a: "Core Web Vitals, schema markup, technical SEO, headless CMS architecture, and frontend performance feature regularly. We also cover GEO (Generative Engine Optimization) for AI-driven search, server-side rendering trade-offs, and the architectural decisions behind sites that rank and convert in competitive UAE markets.",
  },
  {
    q: "Who is the blog written for?",
    a: "Founders, operators, marketing leads, and engineering teams who need substance over surface — especially those building or scaling digital businesses in Dubai, the wider UAE, and global markets. Expect lead generation, conversion, organic growth, and the technical foundations that quietly drive all three.",
  },
];

type PostCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  tags: string[] | null;
  reading_time_min: number | null;
  published_at: string | null;
};

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function BlogIndex() {
  const { data: seoOverrides } = usePageSeoOverrides();
  useEffect(() => {
    applyPageSeo("blog", seoOverrides?.["blog"] ?? null, pageSeo.blog);
  }, [seoOverrides]);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Seed with the same published posts the DB ships, so SSR/first paint has
  // real content for crawlers. The effect below still fetches live data and
  // replaces this — Supabase remains the source of truth.
  const [posts, setPosts] = useState<PostCard[] | null>(blogFallback as PostCard[]);
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const toggleFaq = (i: number) =>
    setOpenFaqs((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id,slug,title,excerpt,cover_image_url,cover_image_alt,tags,reading_time_min,published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (!active) return;
      if (error) {
        console.error("Failed to load posts:", error.message);
        setPosts([]);
        return;
      }
      setPosts((data ?? []) as PostCard[]);
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <Layout>
      {/* Hero — same structure as service page heroes */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[58vh] flex items-center">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <GridBackground />
        <FloatingShapes />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.22, 0.45, 0.22] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-16 rounded-full pointer-events-none"
          style={{ width: 520, height: 520, background: "radial-gradient(circle, hsl(var(--primary)/0.14) 0%, transparent 70%)" }}
        />
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-4 pt-24 pb-20">
            <motion.div {...fadeUp()}>
              <SectionLabel>Insights</SectionLabel>
            </motion.div>
            <motion.h1
              {...fadeUp(0.08)}
              className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              Insights and{" "}
              <span className="gradient-text">Field Notes</span>
            </motion.h1>
            <motion.p
              {...fadeUp(0.12)}
              className="mt-3 text-sm md:text-base font-semibold text-primary/80 tracking-wide"
            >
              Web Development &amp; SEO Blog from Dubai
            </motion.p>
            <motion.p
              {...fadeUp(0.18)}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              The Webcore Solutions blog shares practical insights from our team on web development, SEO, GEO optimization, ecommerce, and scalable digital systems. Our articles are based on real client projects across the UAE, Europe, the UK, the US, and Pakistan — covering performance, search visibility, architecture, and growth strategies that deliver real business results.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Posts grid */}
      <section className="mx-auto max-w-7xl px-4 pt-4 pb-24">
        {posts === null ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-muted/40" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-16 bg-muted/40 rounded-full" />
                  <div className="h-5 w-3/4 bg-muted/40 rounded" />
                  <div className="h-3 w-full bg-muted/30 rounded" />
                  <div className="h-3 w-2/3 bg-muted/30 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <SectionLabel>Coming soon</SectionLabel>
            <p className="text-muted-foreground mt-2">
              We're putting the finishing touches on our first articles.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.div key={post.id} {...fadeUp(Math.min(i * 0.06, 0.3))}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  aria-label={post.title}
                  className="group block glass rounded-2xl overflow-hidden h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow"
                >
                  <div className="aspect-video overflow-hidden">
                    {post.cover_image_url ? (
                      <img
                        src={post.cover_image_url}
                        alt={post.cover_image_alt ?? post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full gradient-primary opacity-20" />
                    )}
                  </div>
                  <div className="p-5">
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full glass border border-border/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="font-display font-semibold text-lg leading-snug group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      {post.reading_time_min && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.reading_time_min} min read
                        </span>
                      )}
                      {post.published_at && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.published_at)}
                        </span>
                      )}
                      <ArrowUpRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-primary" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* FAQs — visible accordion. Reinforces the SEO keywords (headless CMS,
          Core Web Vitals, schema, GEO, ecommerce, software architecture) that
          were trimmed from the shortened intro paragraph above. */}
      <section className="mx-auto max-w-4xl px-4 pb-24">
        <motion.div {...fadeUp()} className="mb-8">
          <SectionLabel>FAQs</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
            Common questions about the{" "}
            <span className="gradient-text">Webcore Solutions blog</span>
          </h2>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="space-y-3">
          {BLOG_FAQS.map((f, i) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              index={i}
              isOpen={openFaqs.includes(i)}
              onToggle={() => toggleFaq(i)}
            />
          ))}
        </motion.div>
      </section>

      {/* SEO text mirror — crawler-only, aria-hidden, sr-only */}
      <section aria-hidden="true" className="sr-only">
        <h2>Web Development &amp; SEO Blog — Dubai Insights from Webcore Solutions</h2>
        <h2>About the Webcore Solutions Blog</h2>
        <p>
          The Webcore Solutions blog is where our Dubai team writes about the work we actually
          ship. We cover web development for UAE and international businesses, technical and
          local SEO, GEO optimization for AI-driven search, software architecture decisions,
          headless CMS builds, and ecommerce strategy. Articles go into the trade-offs behind
          real projects — performance budgets, framework choices, indexation, schema, content
          structure and growth — rather than surface-level summaries. Each post is written by
          an engineer, strategist or designer on the team in Dubai who has done the work,
          so the guidance is practical, specific to the Middle East and global markets we
          serve, and grounded in shipped outcomes instead of generated for search volume.
        </p>
        <h2>Topics We Cover</h2>
        <ul>
          <li>Web Development Dubai</li>
          <li>SEO Services UAE</li>
          <li>GEO Optimization</li>
          <li>Headless CMS</li>
          <li>Custom Software Development</li>
          <li>Ecommerce Strategy</li>
        </ul>
        <h2>Why Read the Webcore Solutions Blog</h2>
        <p>
          Every article is written by the Webcore Solutions team in Dubai — the same engineers,
          SEO specialists and designers delivering client projects across the UAE, UK, Europe,
          the United States and Pakistan. We write from regional context and live problems, not
          theory. The tone stays practical and honest: real constraints, real decisions, no
          AI-generated filler and no padding for keyword counts.
        </p>
      </section>
    </Layout>
  );
}
