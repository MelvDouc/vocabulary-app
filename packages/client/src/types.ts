import type { Word as CommonWord } from "common";

export type Result<Data, Err = unknown> = [Data, null] | [null, Err];
export type AsyncResult<Data, Err = unknown> = Promise<Result<Data, Err>>;

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue; };

export type Word = CommonWord & { _id: string; };
export type WordLinkParams = Pick<Word, "_id" | "label">;

export interface User {
  email: string;
}