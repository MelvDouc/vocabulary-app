import { Hono as Application } from "hono";

import { IS_PRODUCTION } from "$server/core/env.js";
import apiRouter from "$server/routes/api.router.js";
import { createStaticHandler } from "$server/middleware/static.middleware.js";
import type { HttpBindingsEnv } from "$server/types.js";

const API_VERSION = "v1";

const app = new Application<HttpBindingsEnv>();

app.route(`/api/${API_VERSION}`, apiRouter);
app.use("*", await createStaticHandler(IS_PRODUCTION));

export default app;