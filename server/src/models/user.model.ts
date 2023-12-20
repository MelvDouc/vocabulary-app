import { userCollection } from "$server/core/database.js";
import { ApiResponse, User } from "$server/types.js";
import bcrypt from "bcryptjs";
import { ZodError, z } from "zod";

const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string({ required_error: "Password required." }).min(1)
});

async function checkCredentials(credentials: User): Promise<{ success: boolean; }> {
  try {
    UserSchema.parse(credentials);
    const user = await userCollection.findOne({ email: credentials.email });

    return {
      success: user !== null && (await bcrypt.compare(credentials.password, user.password))
    };
  } catch {
    return { success: false };
  }
}

export default {
  checkCredentials,
};