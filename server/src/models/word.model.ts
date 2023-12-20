import { wordCollection, ObjectId, WithId } from "$server/core/database.js";
import errorService from "$server/services/error.service.js";
import { ApiResponse, Word } from "$server/types.js";
import { z } from "zod";

const WordSchema = z.object({
  entry: z.string({ required_error: "Entry required." }).min(1),
  language: z.string({ required_error: "Language required" }).min(1),
  class: z.string({ required_error: "Word class required." }).min(1)
});


function getLanguages(): Promise<string[]> {
  return wordCollection.distinct("language");
}

function getWordsOfLanguage(language: string) {
  return wordCollection
    .find({ language })
    .sort("entry")
    .collation({ locale: "fr" })
    .map(({ _id, ...word }) => ({ id: _id.toHexString(), ...word }))
    .toArray();
}

function getWord(id: string) {
  return wordCollection.findOne({ _id: new ObjectId(id) });
}

async function randomWordId(language: string) {
  const word = await wordCollection
    .aggregate([
      { $match: { language } },
      { $sample: { size: 1 } }
    ])
    .tryNext() as WithId<Word> | null;
  return word?._id ?? null;
}

async function addWord(word: Word): Promise<ApiResponse<{ id: string; }>> {
  try {
    WordSchema.parse(word);
    const insertResult = await wordCollection.insertOne(word);
    if (!insertResult.acknowledged)
      throw new Error("Word could not be added.");
    return {
      success: true,
      id: insertResult.insertedId.toHexString()
    };
  } catch (error) {
    return {
      success: false,
      errors: errorService.formatErrors(error)
    };
  }
}

async function updateWord(id: string, update: Word): Promise<ApiResponse<{ id: string; }>> {
  try {
    WordSchema.parse(update);
    const updateResult = await wordCollection.replaceOne({ _id: new ObjectId(id) }, update);
    if (!updateResult.acknowledged)
      throw new Error("Word could not be updated.");
    return {
      success: true,
      id
    };
  } catch (error) {
    return {
      success: false,
      errors: errorService.formatErrors(error)
    };
  }
}

async function deleteWord(id: string): Promise<ApiResponse<{}>> {
  try {
    const deleteResult = await wordCollection.deleteOne({ _id: new ObjectId(id) });
    if (!deleteResult.acknowledged)
      throw new Error("Word could not be deleted.");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: errorService.formatErrors(error)
    };
  }
}

export default {
  getLanguages,
  getWordsOfLanguage,
  getWord,
  randomWordId,
  addWord,
  updateWord,
  deleteWord,
};