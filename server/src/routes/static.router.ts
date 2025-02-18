import { Hono as Router, type Context } from "hono";
import { getMimeType } from "hono/utils/mime";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const staticRouter = new Router();
const root = process.cwd();
const clientDir = "client";
const htmlPath = join(root, clientDir, "index.html");
const html = await readFile(htmlPath, "utf-8");

staticRouter.get("*", async (ctx, next) => {
  try {
    const { path } = ctx.req;

    if (path.startsWith(`/${clientDir}`))
      return serveStatic(ctx, path);

    return ctx.html(html);
  } catch (error) {
    console.log({ staticError: error });
    await next();
  }
});

async function serveStatic(ctx: Context, path: string) {
  const mimeType = getMimeType(path) ?? "application/octet-stream";
  const filePath = join(root, path.slice(1));
  const buffer = await readFile(filePath);

  return ctx.newResponse(buffer, 200, {
    "Content-Length": Buffer.byteLength(buffer).toString(),
    "Content-Type": mimeType
  });
}

export default staticRouter;