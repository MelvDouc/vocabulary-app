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
  _id: string;
  language: string;
  related?: WordBase[];
}

export type WordLinkParams = Pick<Word, "_id" | "entry">;

export interface User {
  email: string;
}