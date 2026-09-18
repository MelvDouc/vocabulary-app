import { requireAuth } from "$server/middleware/auth.middleware.js";
import wordModel from "$server/models/word.model.js";
import type { JsonValue } from "$server/types.js";
import { Hono as Router } from "hono";
import TOML from "smol-toml";

const wordRouter = new Router();

wordRouter.get("/", async (ctx) => {
  const { language, from, to } = ctx.req.query();

  const result = isLetter(from) && isLetter(to)
    ? await wordModel.getWordsBetween(language, `${from}-${to}`)
    : await wordModel.getWords(language);

  // Cache response for 60 seconds.
  ctx.res.headers.set("Cache-Control", "max-age=60");
  return ctx.json(result);
});

wordRouter.post("/", requireAuth, async (ctx) => {
  const body = await ctx.req.json();
  const data = safeParseToml(body.text as string);
  const apiResponse = await wordModel.addWord(data);
  return ctx.json(apiResponse);
});

wordRouter.get("/languages", async (ctx) => {
  const result = await wordModel.getLanguages();
  return ctx.json(result);
});

wordRouter.get("/random", async (ctx) => {
  const { language } = ctx.req.query();
  const result = await wordModel.getRandomWord(language);
  return ctx.json(result);
});

wordRouter.get("/@/:id", async (ctx) => {
  const [word, error] = await wordModel.getWord(ctx.req.param("id"));

  // Add option to get word as TOML string.
  if (word && ctx.req.query("as-toml") === "true") {
    const { _id, ...data } = word;
    const toml = TOML.stringify(data);
    return ctx.json([toml, null]);
  }

  return ctx.json([word, error]);
});

wordRouter.put("/@/:id", requireAuth, async (ctx) => {
  const id = ctx.req.param("id") as string;
  const [word, error] = await wordModel.getWord(id);

  if (!word)
    return ctx.json([null, error]);

  const body = await ctx.req.json();
  const data = safeParseToml(body.text as string);
  const apiResponse = await wordModel.replaceWord(word._id, data);
  return ctx.json(apiResponse);
});

wordRouter.delete("/@/:id", requireAuth, async (ctx) => {
  const id = ctx.req.param("id") as string;
  const apiResponse = await wordModel.deleteWord(id);
  return ctx.json(apiResponse);
});

function isLetter(str: string): boolean {
  return /^[a-z]$/i.test(str);
}

function safeParseToml(text: string): JsonValue {
  try {
    return TOML.parse(text) as JsonValue;
  } catch {
    return null;
  }
}

export default wordRouter;