import type { JsonValue, Word } from "$client/types.js";
import routes from "$client/utils/routes.js";

import cssClasses from "./WordCard.module.scss";

export default function WordCard({ word: { id, entry, language, class: wordClass, ...word } }: {
  word: Word;
}) {
  return (
    <div className={cssClasses.WordCard}>
      <h1>{entry}</h1>
      <h2>{wordClass}</h2>
      <h3><a href={routes.language(language)}>{language}</a></h3>
      <WordCardBody value={word as unknown as JsonValue} />
    </div>
  );
}

function WordCardBody({ value }: {
  value: JsonValue;
}) {
  if (Array.isArray(value))
    return (
      <ol>
        {value.map((item) => (
          <li><WordCardBody value={item} /></li>
        ))}
      </ol>
    );

  if (typeof value === "object" && value !== null)
    return (
      <dl>
        {Object.entries(value).map(([key, value]) => (
          <>
            <dt>{key}</dt>
            <dd><WordCardBody value={value} /></dd>
          </>
        ))}
      </dl>
    );

  return document.createTextNode(String(value)) as unknown as Element;
}