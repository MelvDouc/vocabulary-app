import { Hono as Router } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import auth from "$server/core/auth.js";
import userModel from "$server/models/user.model.js";

const authRouter = new Router();

authRouter.post("/check-credentials", async (ctx) => {
  const authToken = getCookie(ctx, auth.cookieName);

  if (!authToken)
    return ctx.json(null);

  const email = auth.decodeAuthToken(authToken);
  return ctx.json(email ? { email } : null);
});

authRouter.post("/log-in", async (ctx) => {
  const body = await ctx.req.json();
  const [authToken, errors] = await userModel.logIn(body);

  if (errors)
    return ctx.json([false, errors]);

  setCookie(ctx, auth.cookieName, authToken, {
    httpOnly: true,
    path: "/",
    sameSite: "Lax",
    maxAge: 365 * 24 * 60 * 60
  });
  return ctx.json([true]);
});

authRouter.post("/log-out", (ctx) => {
  deleteCookie(ctx, auth.cookieName);
  return ctx.text("");
});

export default authRouter;