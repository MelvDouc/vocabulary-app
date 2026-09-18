import WordCardBody from "$client/components/WordCardBody/WordCardBody.js";
import type { Word } from "$client/types.js";
import routes from "$client/utils/routes.js";
import { Link } from "reactfree-jsx/extra/router";
import cssClasses from "./WordCard.module.scss";

export default function WordCard({
  word: { _id, label, language, word_class: wordClass, ...word }
}: Params) {
  return (
    <div className={cssClasses.WordCard}>
      <h1>{label}</h1>
      <h2>{wordClass}</h2>
      <h3><Link href={routes.Words(language)}>{language}</Link></h3>
      <WordCardBody value={word} />
    </div>
  );
}

type Params = {
  word: Word;
};