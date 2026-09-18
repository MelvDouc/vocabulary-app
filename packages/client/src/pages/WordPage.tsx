import Page from "$client/components/Page/Page.js";
import WordCard from "$client/components/WordCard/WordCard.js";
import WordControls from "$client/components/WordControls/WordControls.js";
import type { AsyncResult, Word } from "$client/types.js";
import { getWord as getWordAPI } from "$client/utils/api.js";
import { getUser } from "$client/utils/auth.js";
import languageObs from "$client/utils/language-obs.js";
import routes from "$client/utils/routes.js";
import { pageNotFound } from "reactfree-jsx/extra/router";

export default async function WordPage({ id }: {
  id: string;
}) {
  const [word, error] = await getWord(id);

  if (word === null)
    pageNotFound(error);


  const language = word["@language"];
  languageObs.value = language;
  const user = await getUser();

  return (
    <Page title={word["@label"]}>
      <WordCard word={word} />
      {user && (
        <WordControls id={id} backPath={routes.Words(language)} />
      )}
    </Page>
  );
}

async function getWord(id: string): AsyncResult<Word, string> {
  const cachedWord = history.state;

  if (cachedWord)
    return [cachedWord, null];

  return getWordAPI(id);
}