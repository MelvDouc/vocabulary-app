import apiRouter from "$server/routes/api.router.js";
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

app.route(`/api/${API_VERSION}`, apiRouter);

export default app;