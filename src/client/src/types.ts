import type { Result,  JsonValue, Word as _Word } from "$global/types.js";

type Word = _Word & { id: string; };

export type {
  Result,
  JsonValue,
  Word
};