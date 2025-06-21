import chalk from "chalk";
import { serve } from "@hono/node-server";

import app from "$server/core/app.js";
import { IS_PRODUCTION, PORT } from "$server/core/env.js";

export const port = Number(PORT) || 5173;

console.log(
  IS_PRODUCTION
    ? `App running on port ${chalk.green(port)}`
    : `App running on http://${chalk.cyan("localhost")}:${chalk.green(port)}`
);

serve({ fetch: app.fetch, port });