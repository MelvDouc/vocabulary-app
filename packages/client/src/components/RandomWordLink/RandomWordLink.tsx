import { getRandomWord } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";
import routes from "$client/utils/routes.js";
import { navigate } from "reactfree-jsx/extra/router";

import cssClasses from "./RandomWordLink.module.scss";

export default function RandomWordLink() {
  const onclick = async () => {
    const language = languageObs.value;

    if (!language)
      return;

    const [word] = await getRandomWord(language);

    if (word)
      navigate(routes.Word(word._id), word);
  };

  return (
    <button
      on:click={onclick}
      className={{
        [cssClasses.RandomWordLink]: true,
        [cssClasses.Visible]: languageObs.map((language) => !!language)
      }}
    >Random word</button>
  );
}