type WordClass = "adj" | "adv" | "conj" | "idiom" | "interj" | "n" | "phrase" | "prep" | "pron" | "v";

export type Word = {
  language: string;
  word_class: WordClass;
  label: string;
};