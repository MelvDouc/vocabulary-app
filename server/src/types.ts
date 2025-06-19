import type {
  ApiResponse,
  ApiSuccessResponse,
  JsonValue,
  User as _User,
  Word
} from "$global/types.js";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly API_VERSION: string;
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

export type {
  ApiResponse,
  ApiSuccessResponse,
  JsonValue,
  Word,
  SerializedWord,
  User
};