import { checkCredentials } from "$client/utils/api.js";
import type { User } from "$global/types.js";

let user: User | null = null;

export async function getUser() {
  return user ??= await checkCredentials();
}