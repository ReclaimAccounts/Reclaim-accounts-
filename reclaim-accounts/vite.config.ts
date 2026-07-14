import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT;
const port = rawPort && !Number.isNaN(Number(rawPort)) ? Number(rawPort) : 3000;

// IMPORTANT for GitHub Pages project sites (username.github.io/repo-name/):
// BASE_PATH must be an ABSOLUTE path like "/repo-name/", never "./" or ".".
// wouter's <Router base={...}> reads this same value from import.meta.env.BASE_URL,
// so a relative "./" here breaks client-side route matching even though assets
// still happen to load. Set it at build time, e.g.:
//   BASE_PATH=/repo-name/ npm run build
// Leave it unset (defaults to "/") if you deploy to a root domain or username.github.io.
const basePath = process.env.BASE_PATH ?? "/";

// Copies index.html to 404.html after build so GitHub Pages serves the SPA
// (with the correct base-relative asset links already baked in) for any
// direct link or hard refresh on a sub-route like /features or /support.
function githubPages404Fallback() {
  return {
    name: "github-pages-404-fallback",
    closeBundle() {
      const outDir = path.resolve(import.meta.dirname, "dist/public");
      const indexPath = path.join(outDir, "index.html");
      const notFoundPath = path.join(outDir, "404.html");
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath);
        console.log("[github-pages-404-fallback] Created dist/public/404.html");
      }
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    githubPages404Fallback(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
