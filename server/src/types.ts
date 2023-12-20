declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly AUTH_TOKEN_KEY: string;
      readonly COOKIE_SECRET: string;
      readonly JWT_PRIVATE_KEY: string;
      readonly MONGODB_URI: string;
      readonly NODE_ENV: "development" | "production";
    }
  }

  namespace Express {
    interface Locals {
      wordId: string;
      user?: PublicUser;
    }
  }
}

// ===== ===== ===== ===== =====
// API
// ===== ===== ===== ===== =====

export type ApiResponse<T> =
  | { success: true; } & T
  | { success: false; errors: string[]; };

// ===== ===== ===== ===== =====
// VOCABULARY
// ===== ===== ===== ===== =====

interface CommonProps {
  prn: string;
  def: string;
  defs: Defs;
  trl: string;
  trls: Defs;
  syn: string;
  syns: Defs;
  quasiSyn: string;
  quasiSyns: Defs;
  register: string;
  registers: string;
  example: string;
  examples: Defs;
  related: unknown;
  dialect: string;
  dialects: string[];
  ctx: string;
}

interface Noun {
  readonly class: "n";
  isPlural?: boolean;
  article?: string;
}

interface Verb {
  readonly class: "v";
  transitive?: boolean;
  intransitive?: boolean;
  asNoun?: Word;
}

interface Adjective {
  readonly class: "adj";
  postPositive?: boolean;
  asNoun?: Word;
}

interface Adverb {
  readonly class: "adv";
  asAdj?: Word;
}

export type Word =
  & {
    readonly entry: string;
    readonly language: string;
  }
  & (Noun | Verb | Adjective | Adverb)
  & Partial<CommonProps>;

type Defs = (string | Partial<Word>)[];

// ===== ===== ===== ===== =====
// AUTH
// ===== ===== ===== ===== =====

export interface User {
  email: string;
  password: string;
}

export type PublicUser = Pick<User, "email">;