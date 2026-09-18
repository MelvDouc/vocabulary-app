import { collections } from "$server/core/database.js";
import type { Word } from "$server/types.ts";
import { asyncWrapper, getErrorMessages } from "$server/utils/errors.js";
import { ObjectId, type WithId } from "mongodb";
import { z } from "zod";

const WordSchema = z.object({
  "@label": z
    .string({ error: "Entry required." })
    .min(1, "Entry required."),
  "@language": z
    .string({ error: "Language required" })
    .min(1, "Language required."),
  "@class": z
    .string({ error: "Word class required." })
    .min(1, "Word class required.")
});

const getLanguages = asyncWrapper(
  () => collections.word.distinct("@language"),
  () => "Language list is unavailable."
);

const getWords = asyncWrapper(
  (language: string) => {
    return collections.word
      .find({ "@language": language })
      .collation({ locale: language })
      .map(({ _id, "@label": label }) => ({ _id, "@label": label }))
      .sort({ entry: 1 })
      .toArray();
  },
  () => "Word list is unavailable."
);

const getWordsBetween = asyncWrapper(
  (language: string, range: LetterRange) => {
    return collections.word
      .find({
        "@language": language,
        "@label": { $regex: `^[${range}]`, $options: "i" }
      })
      .collation({ locale: language })
      .map(({ _id, "@label": label }) => ({ _id, "@label": label }))
      .sort({ entry: 1 })
      .toArray();
  },
  () => "Word list is unavailable."
);

const getWord = asyncWrapper(
  async (id: string) => {
    const word = await collections.word.findOne({ _id: new ObjectId(id) });
    if (!word) throw new Error();
    return word;
  },
  () => "Word not found."
);

const getRandomWord = asyncWrapper(
  async (language: string) => {
    const word = await collections.word
      .aggregate([
        { $match: { "@language": language } },
        { $sample: { size: 1 } }
      ])
      .next() as WithId<Word> | null;

    if (!word)
      throw new Error();

    return word;
  },
  () => "Word not found."
);

const addWord = asyncWrapper<[unknown], WithId<Word>, string[]>(
  async (data) => {
    WordSchema.parse(data) as Word;
    const result = await collections.word.insertOne(data as Word);
    return {
      ...(data as Word),
      _id: result.insertedId
    };
  },
  getErrorMessages
);

const replaceWord = asyncWrapper<[ObjectId, unknown], true, string[]>(
  async (_id, data) => {
    WordSchema.parse(data);
    await collections.word.replaceOne({ _id }, data as Word);
    return true;
  },
  getErrorMessages
);

const deleteWord = asyncWrapper<[string], true, string>(
  async (id) => {
    await collections.word.deleteOne({ _id: new ObjectId(id) });
    return true;
  },
  () => "Word could not be deleted."
);

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