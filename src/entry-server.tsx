import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryHistory } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppRouter } from "./router";
import { getStaticSeoHead, seoRoutes, type PageKey } from "./lib/seo";
import "./styles.css";

export async function renderRoute(path: string) {
  const router = createAppRouter({
    history: createMemoryHistory({
      initialEntries: [path],
    }),
  });

  await router.load();

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });

  return renderToString(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}

export function getRouteHead(key: PageKey) {
  return getStaticSeoHead(key);
}

export { seoRoutes };
