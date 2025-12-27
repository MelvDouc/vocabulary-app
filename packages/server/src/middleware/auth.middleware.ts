import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import auth from "$server/core/auth.js";

export async function requireAuth(ctx: Context, next: Next) {
  const authToken = getCookie(ctx, auth.cookieName);

  if (!authToken || !auth.decodeAuthToken(authToken))
    return ctx.newResponse(null, 401);

  await next();
}