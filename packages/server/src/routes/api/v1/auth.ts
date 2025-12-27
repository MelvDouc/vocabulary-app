import auth from "$server/core/auth.js";
import userModel from "$server/models/user.model.js";
import { Hono as Router } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

const authRouter = new Router();

authRouter.post("/check-credentials", async (ctx) => {
  const authToken = getCookie(ctx, auth.cookieName);

  if (!authToken)
    return ctx.json([null, "User not logged in."]);

  const email = auth.decodeAuthToken(authToken);

  if (!email)
    return ctx.json([null, "Invalid token."]);

  return ctx.json([{ email }, null]);
});

authRouter.post("/log-in", async (ctx) => {
  const body = await ctx.req.json();
  const [authToken, error] = await userModel.logIn(body);

  if (!authToken)
    return ctx.json([null, error]);

  setCookie(ctx, auth.cookieName, authToken, {
    httpOnly: true,
    path: "/",
    sameSite: "Lax",
    maxAge: 365 * 24 * 60 * 60
  });
  return ctx.json([true, null]);
});

authRouter.post("/log-out", (ctx) => {
  deleteCookie(ctx, auth.cookieName);
  return ctx.json([true, null]);
});

export default authRouter;