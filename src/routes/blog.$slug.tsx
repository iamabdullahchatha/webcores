import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight, ArrowLeft, Clock, Calendar } from "lucide-react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/lib/supabase/client";
import { blogPostFallback } from "@/lib/content/seedFallback.generated";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | Webcore Solutions` },
      { name: "description", content: "Webcore Solutions publishes practical insights on web development, software engineering, SEO, GEO and digital growth for Dubai and global teams." },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: "Webcore Solutions" },
      { property: "og:title", content: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | Webcore Solutions` },
      { property: "og:description", content: "Webcore Solutions publishes practical insights on web development, software engineering, SEO, GEO and digital growth for Dubai and global teams." },
      { property: "og:url", content: `https://www.webcoreuae.com/blog/${params.slug}` },
      { property: "og:image", content: "https://www.webcoreuae.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@webcoresolutions" },
      { name: "twitter:title", content: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | Webcore Solutions` },
      { name: "twitter:description", content: "Webcore Solutions publishes practical insights on web development, software engineering, SEO, GEO and digital growth for Dubai and global teams." },
      { name: "twitter:image", content: "https://www.webcoreuae.com/og-image.png" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    ],
    links: [
      { rel: "canonical", href: `https://www.webcoreuae.com/blog/${params.slug}` },
    ],
  }),
  component: BlogPost,
});

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

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  tags: string[] | null;
  reading_time_min: number | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

type RelatedPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  tags: string[] | null;
};

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const SITE_URL = "https://www.webcoreuae.com";

function BlogPost() {
  const { slug } = Route.useParams();
  const seedPost = blogPostFallback[slug] ?? null;
  const [state, setState] = useState<"loading" | "found" | "notfound">(
    seedPost ? "found" : "loading",
  );
  const [post, setPost] = useState<Post | null>(seedPost as Post | null);
  const [related, setRelated] = useState<RelatedPost[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          "id,slug,title,excerpt,content,cover_image_url,cover_image_alt,tags,reading_time_min,published_at,seo_title,seo_description",
        )
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (!active) return;

      if (error || !data) {
        // Only fall to notfound if we also have no seed fallback.
        if (!seedPost) setState("notfound");
        return;
      }

      setPost(data as Post);
      setState("found");

      // Document title + meta (client-side; route is client-rendered).
      document.title = (data as Post).seo_title ?? `${(data as Post).title} | Webcore Solutions`;
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl && (data as Post).seo_description) {
        descEl.setAttribute("content", (data as Post).seo_description!);
      }

      const { data: rel } = await supabase
        .from("blog_posts")
        .select("id,slug,title,excerpt,cover_image_url,tags")
        .eq("status", "published")
        .neq("slug", slug)
        .order("published_at", { ascending: false })
        .limit(3);
      if (active && rel) setRelated(rel as RelatedPost[]);
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  if (state === "loading") {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="h-6 w-6 animate-spin-slow rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </Layout>
    );
  }

  if (state === "notfound" || !post) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
          <SectionLabel>Not found</SectionLabel>
          <h1 className="text-3xl font-bold">This article doesn't exist</h1>
          <p className="mt-2 text-muted-foreground">
            It may have been moved or unpublished.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </div>
      </Layout>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo_description ?? post.excerpt ?? undefined,
    image: post.cover_image_url ?? undefined,
    datePublished: post.published_at ?? undefined,
    author: { "@type": "Organization", name: "Webcore Solutions" },
    publisher: {
      "@type": "Organization",
      name: "Webcore Solutions",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Full-bleed cover hero */}
      <section className="relative">
        <div className="relative max-h-[60vh] h-[52vh] w-full overflow-hidden">
          {post.cover_image_url ? (
            <img
              src={post.cover_image_url}
              alt={post.cover_image_alt ?? post.title}
              className="w-full h-full object-cover"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full gradient-primary opacity-30" />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 30%, color-mix(in oklab, var(--background) 85%, transparent) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-3xl px-4 pb-10">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, type: "tween", ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight"
              >
                {post.title}
              </motion.h1>
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pt-10 pb-24">
        <motion.div {...fadeUp()}>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full glass border border-border/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Webcore Solutions</span>
            {post.published_at && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.published_at)}
              </span>
            )}
            {post.reading_time_min && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.reading_time_min} min read
              </span>
            )}
          </div>

          <hr className="my-8 border-border/40" />
        </motion.div>

        <motion.div
          {...fadeUp(0.05)}
          className="prose prose-webcore max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:no-underline hover:prose-a:underline"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content ?? ""}</ReactMarkdown>
        </motion.div>

        {/* End CTA — matches service-page CTA style */}
        <motion.div
          {...fadeUp(0.1)}
          className="mt-14 relative glass rounded-2xl p-8 overflow-hidden"
          style={{ border: "1px solid color-mix(in oklab, var(--primary) 25%, transparent)" }}
        >
          <div className="absolute -inset-8 gradient-primary opacity-[0.06] blur-3xl rounded-full pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h3 className="text-xl font-bold">Ready to build?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Let's turn the idea into something shipped.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-24">
          <motion.div {...fadeUp()}>
            <SectionLabel>Keep reading</SectionLabel>
          </motion.div>
          <div className="grid gap-6 lg:grid-cols-3 mt-2">
            {related.map((r, i) => (
              <motion.div key={r.id} {...fadeUp(Math.min(i * 0.06, 0.2))}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group block glass rounded-2xl overflow-hidden h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow"
                >
                  <div className="aspect-video overflow-hidden">
                    {r.cover_image_url ? (
                      <img
                        src={r.cover_image_url}
                        alt={r.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full gradient-primary opacity-20" />
                    )}
                  </div>
                  <div className="p-5">
                    {r.tags && r.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {r.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full glass border border-border/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="font-display font-semibold text-lg leading-snug group-hover:text-primary transition-colors duration-200">
                      {r.title}
                    </h3>
                    {r.excerpt && (
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {r.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
