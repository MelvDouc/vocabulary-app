import auth from "$server/core/auth.js";
import type { AsyncResult } from "$server/types.js";
import { z } from "zod";

const UserCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

async function logIn(userCredentials: unknown): AsyncResult<string, string> {
  const { success, data } = UserCredentialsSchema.safeParse(userCredentials);

  if (!success)
    return [null, "Invalid form data."];

  if (await auth.checkCredentials(data.email, data.password)) {
    const authToken = auth.createAuthToken(data.email);
    return [authToken, null];
  }

  return [null, "Invalid credentials."];
}

export default {
  logIn
};