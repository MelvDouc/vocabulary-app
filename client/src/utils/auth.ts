import type { User } from "$client/types.js";
import { checkCredentials } from "$client/utils/api.js";

const getUser = (() => {
  let user: User | null = null;

  return async (): Promise<User | null> => {
    if (!user) {
      const result = await checkCredentials();
      user = result[0];
    }

    return user;
  };
})();

export {
  getUser
};