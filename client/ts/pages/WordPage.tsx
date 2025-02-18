import Page from "$client/components/Page/Page";
import WordCard from "$client/components/WordCard/WordCard";
import WordControls from "$client/components/WordControls/WordControls";
import NotFoundPage from "$client/pages/NotFoundPage";
import { getWord } from "$client/utils/api";
import { getUser } from "$client/utils/auth";
import languageObs from "$client/utils/language-obs";

export default async function WordPage({ id }: {
  id: string;
}) {
  const word = await getWord(id, false);

  if (!word)
    return (
      <NotFoundPage message="Word not found" />
    );

  languageObs.value = word.language;
  const user = getUser();

  return (
    <Page>
      <WordCard word={word} />
      {user && (
        <WordControls id={id} language={word.language} />
      )}
    </Page>
  );
}