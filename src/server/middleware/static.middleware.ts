import { existsSync as pathExists } from "node:fs";
import { join as pathJoin } from "node:path";

import type { MiddlewareHandler } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";

import type { HttpBindingsEnv } from "$server/types.js";

export async function createStaticHandler(isProduction: boolean): Promise<StaticMiddlewareHandler> {
  return isProduction ? handleStaticProd() : handleStaticDev();
}

function handleStaticProd(): StaticMiddlewareHandler {
  const staticDir = "dist";
  const indexHtmlPath = pathJoin(staticDir, "index.html");

  return serveStatic({
    rewriteRequestPath: (path) => {
      const prefixedPath = pathJoin(staticDir, path);

      return pathExists(prefixedPath)
        ? prefixedPath
        : indexHtmlPath;
    }
  });
}

async function handleStaticDev(): Promise<StaticMiddlewareHandler> {
  const { createServer: createViteServer } = await import("vite");

  const viteServer = await createViteServer({
    server: { middlewareMode: true },
    root: pathJoin(process.cwd(), "src", "client")
  });

  // Use Vite's middleware for static files and HMR.
  return async (ctx, next) => {
    // Wrap `middlewares` in a promise to match the Hono middleware's expected return type.
    return new Promise((resolve) => {
      viteServer.middlewares(ctx.env.incoming, ctx.env.outgoing, () => {
        resolve(next());
      });
    });
  };
}

type StaticMiddlewareHandler = MiddlewareHandler<HttpBindingsEnv>;