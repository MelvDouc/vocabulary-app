import { serve } from "@hono/node-server";
import app from "$server/core/app.js";

serve(
  {
    port: Number(process.env.PORT ?? process.env.Port ?? process.env.port) || 8000,
    fetch: app.fetch
  },
  (info) => {
    const hostname = info.address === "::" ? "http://localhost" : info.address;
    console.log(`App running on ${hostname}:${info.port}...`);
  }
);