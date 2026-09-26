import type { User, Word } from "$server/types.js";
import chalk from "chalk";
import { MongoClient } from "mongodb";

const client = await new MongoClient(process.env.DB_URI).connect();
console.log(chalk.yellow("Connected to database."));

const db = client.db("voc");

const collections = {
  words: db.collection<Word>("words"),
  users: db.collection<User>("users")
} as const;

export {
  collections
};
