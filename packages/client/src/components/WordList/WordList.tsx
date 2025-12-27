import type { WordLinkParams } from "$client/types.js";
import routes from "$client/utils/routes.js";
import { Link } from "reactfree-jsx/extra/router";

import cssClasses from "./WordList.module.scss";

export default function WordList({ words }: {
  words: WordLinkParams[];
}) {
  return (
    <ul className={cssClasses.WordList}>
      {words.map(({ _id, entry }) => (
        <li>
          <Link href={routes.Word(_id)}>{entry}</Link>
        </li>
      ))}
    </ul>
  );
}