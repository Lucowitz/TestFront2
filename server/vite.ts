import { createServer as createViteServer, type ViteDevServer } from "vite";
import type { Server as HttpServer } from "http";
import express, { type Application } from "express";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * In development: spin up Vite in middleware mode
 * and hook its HMR server to your existing httpServer.
 */
export async function setupVite(app: Application, server: HttpServer): Promise<void> {
  const vite: ViteDevServer = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true,
    },
  });

  // Vite’s own middleware (serves /@modules, transforms, etc.)
  app.use(vite.middlewares);

  // Serve your “public” files (e.g. static assets)
  app.use(express.static(join(__dirname, "../client/public")));

  // All other routes: let Vite transform & serve index.html
  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const template = await vite.transformIndexHtml(url, "");
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

/**
 * In production: serve the built client from /client/dist
 */
export function serveStatic(app: Application): void {
  app.use(express.static(join(__dirname, "../client/dist")));
  app.get("*", (_req, res) => {
    res.sendFile(join(__dirname, "../client/dist/index.html"));
  });
}

/**
 * Simple logger wrapper—imported as `log` in index.ts
 */
export function log(...args: any[]): void {
  console.log("[SERVER]", ...args);
}
