import { ObjectId, type WithId } from "mongodb";
import { z } from "zod";

import { collections } from "$server/core/database.js";
import type { Result, SerializedWord, Word } from "$server/types.ts";
import { getErrorMessages } from "$server/utils/errors.js";

const WordSchema = z.object({
  entry: z
    .string({ required_error: "Entry required." })
    .min(1, "Entry required."),
  language: z
    .string({ required_error: "Language required" })
    .min(1, "Language required."),
  class: z
    .string({ required_error: "Word class required." })
    .min(1, "Word class required.")
});

function getLanguages(): Promise<string[]> {
  return collections.word.distinct("language");
}

function getWords(language: string): Promise<SerializedWord[]> {
  return collections.word
    .find({ language })
    .sort({ entry: 1 })
    .collation({ locale: language })
    .map(serializeWord)
    .toArray();
}

async function getWord(id: string): Promise<SerializedWord | null> {
  try {
    const word = await collections.word.findOne({ _id: new ObjectId(id) });
    return word ? serializeWord(word) : null;
  } catch {
    return null;
  }
}

async function getRandomWordId(language: string): Promise<string | null> {
  try {
    const word = await collections.word
      .aggregate([
        { $match: { language } },
        { $sample: { size: 1 } }
      ])
      .next() as WithId<Word> | null;
    return word?._id.toHexString() ?? null;
  } catch {
    return null;
  }
}

async function addWord(data: unknown): Promise<Result<SerializedWord>> {
  try {
    WordSchema.parse(data);
    const result = await collections.word.insertOne(data as Word);
    const insertedWord = {
      id: result.insertedId.toHexString(),
      ...(data as Word)
    };
    return [insertedWord, null];
  } catch (error) {
    return [null, getErrorMessages(error)];
  }
}

async function replaceWord(id: string, data: unknown): Promise<Result<true>> {
  try {
    WordSchema.parse(data);
    await collections.word.replaceOne({ _id: new ObjectId(id) }, data as Word);
    return [true, null];
  } catch (error) {
    return [null, getErrorMessages(error)];
  }
}

async function deleteWord(id: string): Promise<Result<true>> {
  try {
    await collections.word.deleteOne({ _id: new ObjectId(id) });
    return [true, null];
  } catch (error) {
    return [null, getErrorMessages(error)];
  }
}

function serializeWord({ _id, ...word }: WithId<Word>): SerializedWord {
  return {
    id: _id.toHexString(),
    ...word
  };
}

export default {
  getLanguages,
  getWords,
  getWord,
  getRandomWordId,
  addWord,
  replaceWord,
  deleteWord
};