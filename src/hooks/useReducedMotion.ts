import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * True when the user has "reduce motion" enabled at the OS/browser level.
 *
 * Components use this to render Framer Motion elements directly in their
 * final state (`initial={false}`, loops disabled) instead of animating
 * toward it — content is never hidden or moved, it just doesn't transition.
 *
 * SSR/prerender returns false so the crawler-visible HTML keeps the same
 * markup as the animated variant; the value corrects itself at hydration
 * and live-updates if the OS setting changes mid-session.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
