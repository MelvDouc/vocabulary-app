import { getRandomWordId } from "$client/utils/api";
import languageObs from "$client/utils/language-obs";
import { navigateToRoute } from "client-side-router";
import cssClasses from "./RandomWordLink.module.scss";

export default function RandomWordLink() {
  const onclick = async () => {
    const language = languageObs.value;

    if (!language)
      return;

    const id = await getRandomWordId(language);

    if (id) {
      navigateToRoute("app_word", { id });
    }
  };

  return (
    <button
      onclick={onclick}
      className={{
        [cssClasses.RandomWordLink]: true,
        [cssClasses.Visible]: languageObs.map((language) => !!language)
      }}
    >Random word</button>
  );
}