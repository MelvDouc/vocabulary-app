import WordCardBody from "$client/components/WordCard/WordCardBody.js";
import type { Word } from "$client/types.js";
import routes from "$client/utils/routes.js";
import { Link } from "reactfree-jsx/extra/router";

import cssClasses from "./WordCard.module.scss";

export default function WordCard({ word: { _id, entry, language, class: wordClass, ...word } }: {
  word: Word;
}) {
  return (
    <div className={cssClasses.WordCard}>
      <h1>{entry}</h1>
      <h2>{wordClass}</h2>
      <h3><Link href={routes.Words(language)}>{language}</Link></h3>
      <WordCardBody value={word} />
    </div>
  );
}