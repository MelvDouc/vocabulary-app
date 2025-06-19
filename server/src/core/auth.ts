import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { collections } from "$server/core/database.js";

const cookieName = "auth_token";

async function checkCredentials(email: string, plainPassword: string): Promise<boolean> {
  const user = await collections.user.findOne({ email });
  return user !== null && bcrypt.compare(plainPassword, user.password);
}

function createAuthToken(email: string): string {
  return jwt.sign(email, process.env.JWT_KEY);
}

function decodeAuthToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return typeof decoded === "string" ? decoded : null;
  } catch {
    return null;
  }
}

export default {
  cookieName,
  checkCredentials,
  createAuthToken,
  decodeAuthToken
};