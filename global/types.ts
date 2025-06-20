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

interface Word extends WordBase {
  language: string;
  related?: WordBase[];
}

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