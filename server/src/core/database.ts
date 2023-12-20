import { MongoClient, ObjectId, type WithId } from "mongodb";
import { User, Word } from "$server/types.js";

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();

const db = client.db("main");
const wordCollection = db.collection<Word>("word");
const userCollection = db.collection<User>("user");

export {
  ObjectId,
  WithId,
  wordCollection,
  userCollection
};