import type { HttpBindings } from "@hono/node-server";

import type {
  Result,
  JsonValue,
  User as _User,
  Word
} from "$global/types.js";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DB_URI: string;
      readonly JWT_KEY: string;
      readonly NODE_ENV: "development" | "production";
      readonly PORT: string;
    }
  }
}

type SerializedWord = Word & { id: string; };

type User = _User & {
  password: string;
};

export interface HttpBindingsEnv {
  /**
   * Get access to `ctx.env.(incoming|outgoing)` in dev middleware.
   */
  Bindings: HttpBindings;
}

export type {
  Result,
  JsonValue,
  Word,
  SerializedWord,
  User
};