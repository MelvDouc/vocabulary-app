import { NextFunction, Request, Response } from "express";
import authService from "$server/services/auth.service.js";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies[process.env.AUTH_TOKEN_KEY];
  const { isLoggedIn, user } = authService.checkLogIn(token);

  switch (req.url) {
    case "/log-in":
      isLoggedIn
        ? res.redirect("/")
        : next();
      break;
    case "/log-out":
      next();
      break;
    default:
      if (isLoggedIn) {
        res.locals.user = user;
        next();
        return;
      }
      res.redirect("/log-in");
  }
};

export default authMiddleware;