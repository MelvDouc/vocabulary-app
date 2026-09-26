export const WordClasses = ["adj", "adv", "conj", "idiom", "interj", "n", "phrase", "prep", "pron", "v"] as const;
type WordClass = typeof WordClasses[number];

type WordDict = {
  [key: string]: string | boolean | WordDict | (string | WordDict)[];
};

export type Word = {
  language: string;
  word_class: WordClass;
  label: string;
};