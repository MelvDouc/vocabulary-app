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
  return ctx.json(words);
});

languageRouter.get("/:language/random-word-id", async (ctx) => {
  const language = ctx.req.param("language");
  const wordId = await wordModel.getRandomWordId(language);
  return ctx.json(wordId);
});

export default languageRouter;