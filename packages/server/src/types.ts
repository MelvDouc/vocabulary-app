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

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue; };

type WordClass = "adj" | "adv" | "conj" | "idiom" | "interj" | "n" | "phrase" | "prep" | "pron" | "v";

interface Meaning {
  def?: string;
  defs?: string[];
  trl?: string[];
  trls?: string[];
  example?: string;
  examples?: string[];
}

interface WordBase {
  entry: string;
  class: WordClass;
  meanings: Meaning[];
  prn?: string;
  register?: string;
  dialect?: string;
}

export interface Word extends WordBase {
  language: string;
  related?: WordBase[];
}

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