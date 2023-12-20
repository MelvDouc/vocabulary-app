import { Response } from "express";
import jwt from "jsonwebtoken";
import { PublicUser } from "$server/types.js";

const isUserPayload = (payload: unknown): payload is PublicUser => {
  return typeof payload === "object"
    && payload !== null
    && "email" in payload
    && typeof payload.email === "string";
};

const logIn = (email: string, res: Response) => {
  const token = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY);
  res.cookie(process.env.AUTH_TOKEN_KEY, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 365 * 24 * 60 * 60 * 1000,
    signed: true
  });
};

const checkLogIn = (token: string | undefined) => {
  const payload = token
    ? jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    : null;
  const isLoggedIn = isUserPayload(payload);

  return {
    isLoggedIn,
    user: isLoggedIn ? payload : null
  } as LogInCheckResult;
};

const logOut = (res: Response) => {
  res.cookie(process.env.AUTH_TOKEN_KEY, "", {
    maxAge: 0
  });
  delete res.locals.user;
};

export default {
  logIn,
  checkLogIn,
  logOut,
};

type LogInCheckResult =
  | {
    isLoggedIn: true;
    user: PublicUser;
  }
  | {
    isLoggedIn: false;
    user: null;
  };