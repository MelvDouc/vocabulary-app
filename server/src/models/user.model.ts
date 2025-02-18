import { z } from "zod";
import auth from "$server/core/auth.js";
import type { ApiResponse } from "$server/types.js";

const UserCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

async function logIn(userCredentials: unknown): Promise<ApiResponse<string>> {
  const { success, data } = UserCredentialsSchema.safeParse(userCredentials);

  if (!success)
    return [null, ["Invalid form data."]];

  if (await auth.checkCredentials(data.email, data.password)) {
    const authToken = auth.createAuthToken(data.email);
    return [authToken, null];
  }

  return [null, ["Invalid credentials."]];
}

export default {
  logIn
};