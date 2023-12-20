import userModel from "$server/models/user.model.js";
import authService from "$server/services/auth.service.js";
import { Request, Response } from "express";

const logIn_GET = (req: Request, res: Response) => {
  res.render("auth/log-in.twig");
};

const logIn_POST = async (req: Request, res: Response) => {
  const authResult = await userModel.checkCredentials(req.body);
  if (!authResult.success)
    return res.json({
      success: false,
      errors: ["Invalid credentials."]
    });
  authService.logIn(req.body.email, res);
  res.json({ success: true });
};

const logOut = (req: Request, res: Response) => {
  authService.logOut(res);
  res.json({ success: true });
};

export default {
  logIn_GET,
  logIn_POST,
  logOut,
};