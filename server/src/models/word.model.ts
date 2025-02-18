import { ObjectId, type WithId } from "mongodb";
import { z } from "zod";
import { collections } from "$server/core/database.js";
import type { AsyncApiResponse, Word } from "$server/types.ts";
import { getErrorMessages } from "$server/utils/errors.js";

const WordSchema = z.object({
  entry: z.string({ required_error: "Entry required." }).min(1),
  language: z.string({ required_error: "Language required" }).min(1),
  class: z.string({ required_error: "Word class required." }).min(1)
});

function getLanguages() {
  return collections.word.distinct("language");
}

function getWords(language: string) {
  return collections.word
    .find({ language })
    .sort({ entry: 1 })
    .collation({ locale: language })
    .toArray();
}

function getWord(id: string) {
  try {
    return collections.word.findOne({ _id: new ObjectId(id) });
  } catch {
    return null;
  }
}

async function addWord(data: unknown): AsyncApiResponse<WithId<Word>> {
  try {
    WordSchema.parse(data);
    const result = await collections.word.insertOne(data as Word);
    const insertedWord = {
      _id: result.insertedId,
      ...(data as Word)
    };
    return [insertedWord, null];
  } catch (error) {
    return [null, getErrorMessages(error)];
  }
}

async function replaceWord(id: string, word: Word): AsyncApiResponse<ObjectId> {
  try {
    WordSchema.parse(word);
    const result = await collections.word.replaceOne({ id: new ObjectId(id) }, word as Word);
    return [result.upsertedId, null];
  } catch (error) {
    return [null, getErrorMessages(error)];
  }
}

async function deleteWord(id: string): AsyncApiResponse<true> {
  try {
    await collections.word.deleteOne({ _id: new ObjectId(id) });
    return [true, null];
  } catch (error) {
    return [null, getErrorMessages(error)];
  }
}

export default {
  getLanguages,
  getWords,
  getWord,
  addWord,
  replaceWord,
  deleteWord
};