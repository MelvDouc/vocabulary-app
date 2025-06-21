import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { MiddlewareHandler } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";

import type { HttpBindingsEnv } from "$server/types.js";

export async function createStaticHandler(isProduction: boolean): Promise<StaticMiddlewareHandler> {
  return isProduction ? handleStaticProd() : handleStaticDev();
}

function handleStaticProd(): StaticMiddlewareHandler {
  const staticDir = "dist";
  let html = "";

  return serveStatic({
    root: staticDir,
    onNotFound: async (path, ctx) => {
      try {
        html ||= await readFile(join(staticDir, "index.html"), "utf-8");
        ctx.html(html);
      } catch (error) {
        console.dir({ staticFileError: error, path }, {
          depth: Infinity, colors: true
        });
        ctx.newResponse(`Static file not found: "${path}".`, 404);
      }
    }
  });
}

async function handleStaticDev(): Promise<StaticMiddlewareHandler> {
  const { createServer: createViteServer } = await import("vite");

  const viteServer = await createViteServer({
    server: { middlewareMode: true },
    root: join(process.cwd(), "src", "client")
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