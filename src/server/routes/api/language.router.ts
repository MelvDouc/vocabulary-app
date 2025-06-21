import { Hono as Router } from "hono";

import wordModel from "$server/models/word.model.js";

const languageRouter = new Router();

languageRouter.get("/", async (ctx) => {
  const languages = await wordModel.getLanguages();
  return ctx.json(languages);
});

languageRouter.get("/:language", async (ctx) => {
  const language = ctx.req.param("language");
  const words = await wordModel.getWords(language);
  // Cache response 10 seconds.
  ctx.res.headers.set("Cache-Control", "max-age=10");
  return ctx.json(words);
});

languageRouter.get("/:language/random-word-id", async (ctx) => {
  const language = ctx.req.param("language");
  const wordId = await wordModel.getRandomWordId(language);
  return ctx.json(wordId);
});

export default languageRouter;