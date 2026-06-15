// SERVER-ONLY. Imported exclusively by entry-server.tsx (the prerender bundle),
// never by any client route — this is what keeps seedFallback.generated out of
// the browser bundle. It maps a route path to the seed slice that the
// prerenderer inlines into that page's HTML and that entry-server exposes to the
// component tree via globalThis during renderToString (see pageSeed.ts).

import { blogFallback, blogPostFallback, serviceFallback } from "./seedFallback.generated";
import type { SeedEnvelope } from "./pageSeed";

export function getPageSeed(path: string): SeedEnvelope | null {
  const clean = path.replace(/\/+$/, "") || "/";

  if (clean === "/blog") {
    return { key: "blog-index", data: blogFallback };
  }

  const blogMatch = /^\/blog\/(.+)$/.exec(clean);
  if (blogMatch) {
    const slug = blogMatch[1];
    const post = blogPostFallback[slug];
    return post ? { key: `blog-post:${slug}`, data: post } : null;
  }

  const serviceMatch = /^\/services\/(.+)$/.exec(clean);
  if (serviceMatch) {
    const slug = serviceMatch[1];
    const service = (serviceFallback as Record<string, unknown>)[slug];
    return service ? { key: `service:${slug}`, data: service } : null;
  }

  return null;
}
