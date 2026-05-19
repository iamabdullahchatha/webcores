import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/",
  plugins: [tanstackRouter({ target: "react", autoCodeSplitting: true }), react(), tailwindcss(), tsConfigPaths()],
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
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion") || id.includes("motion-")) return "framer";
          if (id.includes("lucide-react")) return "icons";
          return undefined;
        },
      },
    },
  },
});
