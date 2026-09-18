type WordClass = "adj" | "adv" | "conj" | "idiom" | "interj" | "n" | "phrase" | "prep" | "pron" | "v";

export type Word = {
  "@language": string;
  "@class": WordClass;
  "@label": string;
};