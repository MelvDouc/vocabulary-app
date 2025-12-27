import authRouter from "$server/routes/api/v1/auth.js";
import wordRouter from "$server/routes/api/v1/words.js";
import type { HttpBindingsEnv } from "$server/types.js";
import { Hono as Application } from "hono";

const API_VERSION = "v1";

const app = new Application<HttpBindingsEnv>();

if (process.env.NODE_ENV === "development") {
  const { cors } = await import("hono/cors");
  app.use("*", cors({
    origin: "http://localhost:5173",
    credentials: true
  }));
}

app.get("/health", (ctx) => ctx.newResponse(null, 200));
app.route(`/api/${API_VERSION}/auth`, authRouter);
app.route(`/api/${API_VERSION}/words`, wordRouter);

export default app;