// ===== ===== ===== ===== =====
// API
// ===== ===== ===== ===== =====

type ApiResponse<T extends {}> = [data: T, errors: null] | [data: null, errors: string[]];
type AsyncApiResponse<T extends {}> = Promise<ApiResponse<T>>;

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
  trl?: string[];
  trls?: string[];
};

// ===== ===== ===== ===== =====
// EXPORTS
// ===== ===== ===== ===== =====

export type {
  ApiResponse,
  AsyncApiResponse,
  Word
};