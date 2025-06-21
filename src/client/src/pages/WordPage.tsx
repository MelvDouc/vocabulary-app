import Page from "$client/components/Page/Page.js";
import WordCard from "$client/components/WordCard/WordCard.js";
import WordControls from "$client/components/WordControls/WordControls.js";
import NotFoundPage from "$client/pages/NotFoundPage.js";
import { getWord } from "$client/utils/api.js";
import { getUser } from "$client/utils/auth.js";
import languageObs from "$client/utils/language-obs.js";

export default async function WordPage({ id }: {
  id: string;
}) {
  const word = await getWord(id, false);

  if (!word)
    return (
      <NotFoundPage message="Word not found" />
    );

  languageObs.value = word.language;
  const user = await getUser();

  return (
    <Page title={word.entry}>
      <WordCard word={word} />
      {user && (
        <WordControls id={id} language={word.language} />
      )}
    </Page>
  );
}