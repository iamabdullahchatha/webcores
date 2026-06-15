import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryHistory } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppRouter } from "./router";
import { getStaticSeoHead, seoRoutes, type PageKey } from "./lib/seo";
import { getPageSeed } from "./lib/content/seedServer";
import "./styles.css";

export async function renderRoute(path: string) {
  // Expose this route's seed slice to the component tree so readPageSeed() can
  // read it synchronously during renderToString and bake the content into HTML.
  // Reset after rendering — the same Node process renders every route in turn.
  const seed = getPageSeed(path);
  (globalThis as { __PAGE_SEED__?: typeof seed }).__PAGE_SEED__ = seed;

  try {
    const router = createAppRouter({
      history: createMemoryHistory({
        initialEntries: [path],
      }),
    });

    await router.load();

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });

    const html = renderToString(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StrictMode>,
    );

    return { html, seed };
  } finally {
    delete (globalThis as { __PAGE_SEED__?: unknown }).__PAGE_SEED__;
  }
}

export function getRouteHead(key: PageKey) {
  return getStaticSeoHead(key);
}

export { seoRoutes };
