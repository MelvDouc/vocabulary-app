import type { Word } from "$client/types.js";
import routes from "$client/utils/routes.js";

import cssClasses from "./WordList.module.scss";

export default function WordList({ words }: {
  words: Word[];
}) {
  return (
    <ul className={cssClasses.WordList}>
      {words.map(({ id, entry }) => (
        <li>
          <a href={routes.word(id)}>{entry}</a>
        </li>
      ))}
    </ul>
  );
}