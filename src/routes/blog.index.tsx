import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
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
              {...fadeUp(0.18)}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              Practical thinking on web development, software, SEO and growth — field notes written
              by the team that ships it. We publish on web performance, SEO, software architecture, and the tools shaping digital business in 2025 and beyond. Posts go out regularly — written by the team actually doing the work, not generated for volume.
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
    </Layout>
  );
}
