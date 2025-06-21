import { Hono as Application } from "hono";

import { IS_PRODUCTION } from "$server/core/env.js";
import apiRouter from "$server/routes/api.router.js";
import { createStaticHandler } from "$server/middleware/static.middleware.js";
import type { HttpBindingsEnv } from "$server/types.js";

const API_VERSION = "v1";

const app = new Application<HttpBindingsEnv>();
app.route(`/api/${API_VERSION}`, apiRouter);

app.get("/api/users", (ctx) => {
  return ctx.json([
    { id: 1, username: "john_doe" },
    { id: 2, username: "john_doe2" }
  ]);
});

app.use("*", await createStaticHandler(IS_PRODUCTION));

export default app;