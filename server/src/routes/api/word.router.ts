import { requireAuth } from "$server/middleware/auth.middleware.js";
import wordModel from "$server/models/word.model.js";
import type { JsonValue, Result, SerializedWord } from "$server/types.js";
import { Hono as Router } from "hono";
import TOML from "smol-toml";

const wordRouter = new Router<{
  Variables: { word: Result<SerializedWord, string>; };
}>();

wordRouter.get("/", async (ctx) => {
  const { language, from, to } = ctx.req.query();

  if (isLetter(from) && isLetter(to)) {
    const result = await wordModel.getWordsBetween(language, `${from}-${to}`);
    return ctx.json(result);
  }

  const result = await wordModel.getWords(language);
  // Cache response 10 seconds.
  ctx.res.headers.set("Cache-Control", "max-age=10");
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

wordRouter.use(async (ctx, next) => {
  const id = ctx.req.query("id");
  const result: Result<SerializedWord, string> = id
    ? (await wordModel.getWord(id))
    : [null, "Word id missing"];
  ctx.set("word", result);
  await next();
});

wordRouter.get("/@", async (ctx) => {
  const [word, error] = ctx.get("word");

  // Add option to get word as TOML string.
  if (word && ctx.req.query("as-toml") === "true") {
    const { id, ...data } = word;
    const toml = TOML.stringify(data);
    return ctx.json([toml, null]);
  }

  return ctx.json([word, error]);
});

wordRouter.put("/@", requireAuth, async (ctx) => {
  const [word, error] = ctx.get("word");

  if (!word)
    return ctx.json([null, error]);

  const body = await ctx.req.json();
  const data = safeParseToml(body.text as string);
  const apiResponse = await wordModel.replaceWord(word.id, data);
  return ctx.json(apiResponse);
});

wordRouter.delete("/@", requireAuth, async (ctx) => {
  const [word, error] = ctx.get("word");

  if (!word)
    return ctx.json([null, error]);

  const apiResponse = await wordModel.deleteWord(word.id);
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