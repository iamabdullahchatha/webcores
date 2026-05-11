import { Outlet, Link, createRootRoute, useLocation, HeadContent } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { getRootHead } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-7xl font-bold text-foreground">404</p>
        <h1 className="mt-4 text-xl font-semibold text-foreground">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: getRootHead,
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

function ClientHeadContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <HeadContent /> : null;
}

function RootComponent() {
  return (
    <>
      <ClientHeadContent />
      <ScrollToTop />
      <Outlet />
    </>
  );
}
