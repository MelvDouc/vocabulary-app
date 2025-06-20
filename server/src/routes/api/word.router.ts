import { Hono as Router } from "hono";
import TOML from "smol-toml";
import { requireAuth } from "$server/middleware/auth.middleware.js";
import wordModel from "$server/models/word.model.js";
import type { JsonValue, SerializedWord } from "$server/types.js";

const wordRouter = new Router<{
  Variables: { word: SerializedWord | null; };
}>();

wordRouter.use(async (ctx, next) => {
  const id = ctx.req.query("id");

  if (!id) {
    await next();
    return;
  }

  const word = await wordModel.getWord(id);
  ctx.set("word", word);
  await next();
});

wordRouter.get("/", async (ctx) => {
  const word = ctx.get("word");

  // Add option to get word as TOML string.
  if (word && ctx.req.query("toml")) {
    const { id, ...data } = word;
    return ctx.json(TOML.stringify(data));
  }

  return ctx.json(word);
});


wordRouter.post("/add", requireAuth, async (ctx) => {
  const body = await ctx.req.json();
  const data = safeParseToml(body.toml as string);
  const apiResponse = await wordModel.addWord(data);
  return ctx.json(apiResponse);
});

wordRouter.put("/update", requireAuth, async (ctx) => {
  const word = ctx.get("word");

  if (!word)
    return ctx.json([false, ["Word not found."]]);

  const body = await ctx.req.json();
  const data = safeParseToml(body.toml as string);
  const apiResponse = await wordModel.replaceWord(word.id, data);
  return ctx.json(apiResponse);
});

wordRouter.delete("/delete", requireAuth, async (ctx) => {
  const word = ctx.get("word");

  if (!word)
    return ctx.json([false, ["Word not found."]]);

  const apiResponse = await wordModel.deleteWord(word.id);
  return ctx.json(apiResponse);
});

function safeParseToml(toml: string): JsonValue {
  try {
    return TOML.parse(toml) as JsonValue;
  } catch {
    return null;
  }
}

export default wordRouter;