import authRouter from "$server/routes/api/auth.router.js";
import wordRouter from "$server/routes/api/word.router.js";
import { Hono as Router } from "hono";

const apiRouter = new Router();

apiRouter.route("/words", wordRouter);
apiRouter.route("/auth", authRouter);

export default apiRouter;