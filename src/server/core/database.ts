import chalk from "chalk";
import { MongoClient } from "mongodb";

import type { User, Word } from "$server/types.js";

const client = await new MongoClient(process.env.DB_URI).connect();
console.log(chalk.yellow("Connected to database."));

const db = client.db("main");

const collections = {
  word: db.collection<Word>("word"),
  user: db.collection<User>("user")
} as const;

export {
  collections
};