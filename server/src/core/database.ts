import { MongoClient } from "mongodb";
import type { Word } from "$server/types.js";
import chalk from "chalk";

const DB_URI = process.env.DB_URI as string;
const client = await new MongoClient(DB_URI).connect();
console.log(chalk.yellow("Connected to database."));

const db = client.db("main");

const collections = {
  word: db.collection<Word>("word"),
  user: db.collection("user")
} as const;

export {
  collections
};