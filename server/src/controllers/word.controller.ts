import errorService from "$server/services/error.service.js";
import wordModel from "$server/models/word.model.js";
import { NextFunction, Request, Response } from "express";
import { parse as yamlParse, stringify as yamlStringify } from "yaml";

const home = async (_req: Request, res: Response) => {
  const languages = await wordModel.getLanguages();
  res.render("home.twig", { languages });
};

const viewWords = async (req: Request, res: Response) => {
  const { language } = req.params;
  const words = await wordModel.getWordsOfLanguage(language);
  res.render("[language]/view-words.twig", { language, words });
};

const viewWord = async (req: Request, res: Response) => {
  const word = await wordModel.getWord(res.locals.wordId);

  if (!word)
    return res.render("404.twig");

  const { _id, entry, class: wordClass, ...w } = word;
  return res.render("word/view-word.twig", {
    id: _id.toHexString(),
    entry,
    wordClass,
    language: w.language,
    word: yamlStringify(w, { indent: 4 })
  });
};

const randomWord = async (req: Request, res: Response) => {
  const { language } = req.params;
  const _id = await wordModel.randomWordId(language);
  if (!_id)
    return res.render("404.twig");
  res.redirect(`/word?id=${_id.toHexString()}`);
};

const addWord_GET = (_req: Request, res: Response) => {
  res.render("word/add-word.twig", {
    wordYaml: yamlStringify({
      entry: "",
      class: "n",
      language: "en"
    })
  });
};

const addWord_POST = async (req: Request, res: Response) => {
  try {
    const word = yamlParse(req.body.wordYaml);
    const insertResult = await wordModel.addWord(word);
    res.json(insertResult);
  } catch (error) {
    res.json({
      success: false,
      errors: errorService.formatErrors(error)
    });
  }
};

const updateWord_GET = async (req: Request, res: Response) => {
  const word = await wordModel.getWord(res.locals.wordId);
  if (!word)
    return res.render("404.twig");
  const { _id, ...w } = word;
  res.render("word/update-word.twig", {
    id: res.locals.wordId,
    wordYaml: yamlStringify(w)
  });
};

const updateWord_PATCH = async (req: Request, res: Response) => {
  try {
    const update = yamlParse(req.body.wordYaml);
    const updateResult = await wordModel.updateWord(res.locals.wordId, update);
    res.json(updateResult);
  } catch (error) {
    res.json({
      success: false,
      errors: errorService.formatErrors(error)
    });
  }
};

const deleteWord = async (req: Request, res: Response) => {
  const deleteResult = await wordModel.deleteWord(res.locals.wordId);
  res.json(deleteResult);
};

const idMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;

  if (typeof id === "string") {
    res.locals.wordId = id;
    return next();
  }

  if (req.method === "GET")
    return res.render("404.twig");

  res.json({
    success: false,
    errors: ["Word id is required."]
  });
};

export default {
  home,
  viewWords,
  viewWord,
  randomWord,
  addWord_GET,
  addWord_POST,
  updateWord_GET,
  updateWord_PATCH,
  deleteWord,
  idMiddleware
};