import { Outlet, Link, createRootRoute, useLocation } from "@tanstack/react-router";
import { useLayoutEffect } from "react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Webcore Solutions — Software, Web & IT" },
      {
        name: "description",
        content: "Premium software, web & IT solutions for global businesses.",
      },
      { name: "author", content: "Webcore Solutions" },
      { property: "og:title", content: "Webcore Solutions" },
      {
        property: "og:description",
        content: "Software, Web & IT Solutions for Global Businesses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function scrollWindowToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function scrollWindowToTopAfterPaint() {
  scrollWindowToTop();
  window.requestAnimationFrame(scrollWindowToTop);
  window.setTimeout(scrollWindowToTop, 50);
  window.setTimeout(scrollWindowToTop, 250);
}

function ScrollToTop() {
  const pathname = useLocation({ select: (location) => location.pathname });

  useLayoutEffect(() => {
    if (window.location.hash) {
      return;
    }

    scrollWindowToTopAfterPaint();
  }, [pathname]);

  useLayoutEffect(() => {
    const handleSamePathLinkClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");

      if (!link || (link.target && link.target !== "_self")) {
        return;
      }

      const url = new URL(link.href);

      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search ||
        url.hash
      ) {
        return;
      }

      window.setTimeout(scrollWindowToTopAfterPaint, 0);
    };

    document.addEventListener("click", handleSamePathLinkClick, true);

    return () => {
      document.removeEventListener("click", handleSamePathLinkClick, true);
    };
  }, []);

  return null;
}

function RootComponent() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
