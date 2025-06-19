import { Hono as Router } from "hono";
import authRouter from "$server/routes/api/auth.router.js";
import languageRouter from "$server/routes/api/language.router.js";
import wordRouter from "$server/routes/api/word.router.js";

const apiRouter = new Router();

apiRouter.route("/languages", languageRouter);
apiRouter.route("/words", wordRouter);
apiRouter.route("/auth", authRouter);

export default apiRouter;