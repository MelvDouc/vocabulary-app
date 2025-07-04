// ===== ===== ===== ===== =====
// JSON
// ===== ===== ===== ===== =====

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue; };

// ===== ===== ===== ===== =====
// API
// ===== ===== ===== ===== =====

export type Result<T extends {}> = [data: T, errors: null] | [data: null, errors: string[]];

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

export interface Word extends WordBase {
  language: string;
  related?: WordBase[];
}

export type User = {
  email: string;
};