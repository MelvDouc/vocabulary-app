import type { Word } from "$client/types.js";
import { Link } from "reactfree-jsx/extra/router";
import routes from "$client/utils/routes.js";

import cssClasses from "./WordList.module.scss";

export default function WordList({ words }: {
  words: Word[];
}) {
  return (
    <ul className={cssClasses.WordList}>
      {words.map(({ id, entry }) => (
        <li>
          <Link href={routes.Word(id)}>{entry}</Link>
        </li>
      ))}
    </ul>
  );
}