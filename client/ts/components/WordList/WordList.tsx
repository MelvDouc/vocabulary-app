import type { Word } from "$client/types";
import routes from "$client/utils/routes";
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