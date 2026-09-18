import type { WordLinkParams } from "$client/types.js";
import routes from "$client/utils/routes.js";
import { Link } from "reactfree-jsx/extra/router";
import cssClasses from "./WordList.module.scss";

export default function WordList({ words }: {
  words: WordLinkParams[];
}) {
  console.log(words.slice(0, 10));

  return (
    <ul className={cssClasses.WordList}>
      {words.map(({ _id, label }) => (
        <li>
          <Link href={routes.Word(_id)}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}