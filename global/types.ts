// ===== ===== ===== ===== =====
// JSON
// ===== ===== ===== ===== =====

type JsonArray = JsonValue[];
type JsonDict = { [key: string]: JsonValue; };
type JsonValue = string | number | boolean | null | JsonArray | JsonDict;

// ===== ===== ===== ===== =====
// API
// ===== ===== ===== ===== =====

type ApiResponse<T extends {}> = [data: T, errors: null] | [data: null, errors: string[]];
type ApiSuccessResponse = [true] | [false, errors: string[]];

// ===== ===== ===== ===== =====
// ENTITIES
// ===== ===== ===== ===== =====

type WordClass = "adj" | "adv" | "conj" | "idiom" | "interj" | "n" | "phrase" | "prep" | "pron" | "v";

type Word = {
  entry: string;
  language: string;
  class: WordClass;
  def?: string;
  defs?: string[];
  trl?: string;
  trls?: string[];
  example?: string;
  examples?: string[];
};

type User = {
  email: string;
};

// ===== ===== ===== ===== =====
// EXPORTS
// ===== ===== ===== ===== =====

export type {
  ApiResponse,
  ApiSuccessResponse,
  JsonValue,
  User,
  Word
};