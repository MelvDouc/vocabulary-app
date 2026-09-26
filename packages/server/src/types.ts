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

export type Result<Data, Err = unknown> = [Data, null] | [null, Err];
export type AsyncResult<Data, Err = unknown> = Promise<Result<Data, Err>>;

export type User = {
  email: string;
  password: string;
};

export interface HttpBindingsEnv {
  /**
   * Get access to `ctx.env.(incoming|outgoing)` in dev middleware.
   */
  Bindings: import("@hono/node-server").HttpBindings;
}

export type { Word } from "common";