import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  // `npm run build:analyze` runs `vite build --mode analyze`, which flips this
  // on and emits dist/bundle-stats.html. Normal builds never load the plugin.
  const analyze = mode === "analyze";

  return {
    base: "/",
    plugins: [
      tanstackRouter({ target: "react", autoCodeSplitting: true }),
      react(),
      tailwindcss(),
      tsConfigPaths(),
      analyze &&
        visualizer({
          filename: "dist/bundle-stats.html",
          template: "treemap",
          gzipSize: true,
          brotliSize: true,
          open: true,
        }),
    ],
    build: {
      outDir: "dist",
      target: "es2022",
      cssCodeSplit: true,
      minify: "esbuild",
      rollupOptions: {
        output: {
          // Only split self-contained leaf libraries that do NOT participate
          // in React's initialization order. React, React-DOM, scheduler, and
          // every React-consuming library (radix, router, query) are left to
          // Vite's automatic chunking so their load order is correct.
          //
          // History: a hand-rolled manualChunks that split React into its own
          // chunk created circular chunks (vendor->react->vendor,
          // vendor->radix->vendor). Those chunks executed out of order, so
          // React was undefined when React-DOM/radix initialized
          // (`Cannot read properties of undefined (reading 'useLayoutEffect')`,
          // `Cannot set properties of undefined (setting 'Activity')`),
          // crashing hydration and blanking the page.
          //
          // The splits below are all verified React-free (no react peer/runtime
          // dependency), so they cannot re-enter that cycle.
          manualChunks(id) {
            if (!id.includes("node_modules")) return;

            // React-consuming, but each is a single leaf isolated on its own —
            // they import React rather than being imported by it, so order holds.
            if (id.includes("framer-motion") || id.includes("motion-")) return "framer";
            if (id.includes("lucide-react")) return "icons";

            // Pure utilities — no React peer dependency, no init-order coupling.
            // Catches @supabase/supabase-js and its bundled postgrest/realtime/
            // auth/storage/functions sub-packages in one chunk.
            if (id.includes("@supabase")) return "supabase";
            if (id.includes("date-fns")) return "date-fns";
            // Path-bounded so we don't capture zod-validation-error / resolvers.
            if (id.includes("node_modules/zod/")) return "zod";
            // clsx + class-variance-authority are tiny and cva depends on clsx,
            // so keep them together to avoid an extra request for ~1 KB.
            if (id.includes("node_modules/clsx/") || id.includes("class-variance-authority"))
              return "ui-utils";

            return undefined;
          },
        },
      },
    },
  };
});
