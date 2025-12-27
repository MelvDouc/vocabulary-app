import { collections } from "$server/core/database.js";
import type { SerializedWord, Word } from "$server/types.ts";
import { asyncWrapper, getErrorMessages } from "$server/utils/errors.js";
import { ObjectId, type WithId } from "mongodb";
import { z } from "zod";

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

const getLanguages = asyncWrapper(
  () => collections.word.distinct("language"),
  () => "Language list is unavailable."
);

const getWords = asyncWrapper(
  (language: string) => {
    return collections.word
      .find({ language })
      .sort({ entry: 1 })
      .collation({ locale: language })
      .map(serializeWord)
      .toArray();
  },
  () => "Word list is unavailable."
);

const getWordsBetween = asyncWrapper(
  (language: string, range: LetterRange) => {
    return collections.word
      .find({ language, entry: { $regex: `^[${range}]`, $options: "i" } })
      .sort({ entry: 1 })
      .collation({ locale: language })
      .map(serializeWord)
      .toArray();
  },
  () => "Word list is unavailable."
);

const getWord = asyncWrapper(
  async (id: string) => {
    const word = await collections.word.findOne({ _id: new ObjectId(id) });
    if (!word) throw new Error();
    return serializeWord(word);
  },
  () => "Word not found."
);

const getRandomWord = asyncWrapper(
  async (language: string) => {
    const word = await collections.word
      .aggregate([
        { $match: { language } },
        { $sample: { size: 1 } }
      ])
      .next() as WithId<Word> | null;

    if (!word)
      throw new Error();

    return serializeWord(word);
  },
  () => "Word not found."
);

const addWord = asyncWrapper<[unknown], SerializedWord, string[]>(
  async (data) => {
    WordSchema.parse(data);
    const result = await collections.word.insertOne(data as Word);
    return {
      id: result.insertedId.toHexString(),
      ...(data as Word)
    };
  },
  getErrorMessages
);

const replaceWord = asyncWrapper<[string, unknown], void, string[]>(
  async (id, data) => {
    WordSchema.parse(data);
    await collections.word.replaceOne({ _id: new ObjectId(id) }, data as Word);
  },
  getErrorMessages
);

const deleteWord = asyncWrapper<[string], void, string>(
  async (id) => {
    await collections.word.deleteOne({ _id: new ObjectId(id) });
  },
  () => "Word could not be deleted."
);

function serializeWord({ _id, ...word }: WithId<Word>): SerializedWord {
  return {
    id: _id.toHexString(),
    ...word
  };
}

type LetterRange = `${string}-${string}`;

export default {
  getLanguages,
  getWords,
  getWord,
  getWordsBetween,
  getRandomWord,
  addWord,
  replaceWord,
  deleteWord
};