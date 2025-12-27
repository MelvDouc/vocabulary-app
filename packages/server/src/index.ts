import app from "$server/core/app.js";
import { serve } from "@hono/node-server";
import chalk from "chalk";

(() => {
  const port = Number(process.env.PORT);

  serve({ fetch: app.fetch, port }, () => {
    console.log(
      process.env.NODE_ENV === "production"
        ? `App running on port ${chalk.green(port)}`
        : `App running on http://${chalk.cyan("localhost")}:${chalk.green(port)}`
    );
  });
})();