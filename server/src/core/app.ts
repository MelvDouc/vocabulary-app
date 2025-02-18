import { Hono as Application } from "hono";
import apiRouter from "$server/routes/api.router.js";
import staticRouter from "$server/routes/static.router.js";

const app = new Application();
app.route(`/api/${process.env.API_VERSION}`, apiRouter);
app.route("/", staticRouter);

export default app;