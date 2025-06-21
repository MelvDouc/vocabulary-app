import type { ApiResponse, ApiSuccessResponse, JsonValue, Word as _Word } from "$global/types.js";

type Word = _Word & { id: string; };

export type {
  ApiResponse,
  ApiSuccessResponse,
  JsonValue,
  Word
};