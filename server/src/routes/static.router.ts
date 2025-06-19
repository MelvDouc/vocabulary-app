import { join } from "node:path";
import { Hono as Router } from "hono";
import { getMimeType } from "hono/utils/mime";
import { readFileCached } from "$server/utils/file-cache.js";

const staticRouter = new Router();
const root = process.cwd();
const clientDir = "client";

const htmlPath = join(root, clientDir, "index.html");
const html = (await readFileCached(htmlPath) as Buffer).toString("utf-8");

staticRouter.get("/client/*", async (ctx, next) => {
  const filePath = join(root, ctx.req.path.slice(1));
  const buffer = await readFileCached(filePath);

  if (!buffer) {
    await next();
    return;
  }

  const mimeType = getMimeType(filePath) ?? "application/octet-stream";
  return ctx.newResponse(buffer, 200, {
    "Content-Length": Buffer.byteLength(buffer).toString(),
    "Content-Type": mimeType
  });
});

staticRouter.get("/*", async (ctx) => {
  return ctx.html(html);
});

export default staticRouter;