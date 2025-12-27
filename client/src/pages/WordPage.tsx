import Page from "$client/components/Page/Page.js";
import WordCard from "$client/components/WordCard/WordCard.js";
import WordControls from "$client/components/WordControls/WordControls.js";
import type { AsyncResult, Word } from "$client/types.js";
import { getWord as getWordAPI } from "$client/utils/api.js";
import { getUser } from "$client/utils/auth.js";
import languageObs from "$client/utils/language-obs.js";
import routes from "$client/utils/routes.js";
import { getHistoryState, pageNotFound, type ParamRecord } from "reactfree-jsx/extra/router";

export default async function WordPage({ query: { id } }: { query: ParamRecord; }) {
  const [word, error] = await getWord(id);

  if (word === null)
    pageNotFound(error);

  languageObs.value = word.language;
  const user = await getUser();

  return (
    <Page title={word.entry}>
      <WordCard word={word} />
      {user && (
        // TODO: improve
        <WordControls id={id} backPath={routes.HOME} />
      )}
    </Page>
  );
}

async function getWord(id: string): AsyncResult<Word, string> {
  const cachedWord = getHistoryState();

  if (cachedWord)
    return [cachedWord as unknown as Word, null];

  return getWordAPI(id);
}