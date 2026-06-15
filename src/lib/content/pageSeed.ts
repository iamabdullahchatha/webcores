// Reads the per-page seed that the prerenderer inlines into each static HTML
// file. This is the SEO content for the current route, available *synchronously*
// in both render contexts so hydration matches the prerendered markup:
//
//   • Build-time SSR  — entry-server sets `globalThis.__PAGE_SEED__` before
//     renderToString (see seedServer.ts). Read fresh every call because the
//     value is reset between routes in the same Node process — never cache it.
//   • Client hydrate  — the prerenderer emits `<script id="__page_seed__">` with
//     this route's slice only. Parse it once and cache for the page lifetime.
//
// The envelope is keyed (e.g. "blog-post:<slug>") so that after client-side SPA
// navigation — where the inlined seed belongs to the *initial* page — a request
// for a different route returns null and the component falls through to Supabase.
//
// Crucially, this module does NOT import seedFallback.generated, so the heavy
// (~281 KB) seed object never enters the client bundle.

export type SeedEnvelope = { key: string; data: unknown };

let clientEnvelope: SeedEnvelope | null | undefined;

function readClientEnvelope(): SeedEnvelope | null {
  if (clientEnvelope !== undefined) return clientEnvelope;
  if (typeof document !== "undefined") {
    const el = document.getElementById("__page_seed__");
    if (el?.textContent) {
      try {
        clientEnvelope = JSON.parse(el.textContent) as SeedEnvelope;
      } catch {
        clientEnvelope = null;
      }
      return clientEnvelope;
    }
  }
  clientEnvelope = null;
  return clientEnvelope;
}

export function readPageSeed<T>(key: string): T | null {
  const g = globalThis as { __PAGE_SEED__?: SeedEnvelope | null };
  // Build-time SSR path — set fresh per route, so read it directly (no caching).
  if (g.__PAGE_SEED__ !== undefined) {
    const env = g.__PAGE_SEED__;
    return env && env.key === key ? (env.data as T) : null;
  }
  // Client path — parse the inlined JSON once.
  const env = readClientEnvelope();
  return env && env.key === key ? (env.data as T) : null;
}
