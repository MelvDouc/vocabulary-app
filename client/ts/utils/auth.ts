import { checkCredentials } from "$client/utils/api";

const USER = await checkCredentials();

export function getUser() {
  return USER;
}