import Page from "$client/components/Page/Page.js";
import WordList from "$client/components/WordList/WordList.js";
import type { Word } from "$client/types.js";
import { getWords } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";

export default async function WordsPage({ params: { language } }: {
  params: { language: string; };
}) {
  languageObs.value = language;

  const [words, error] = await getWords(language);

  return (
    <Page title={language}>
      {
        words
          ? (<Content words={words} />)
          : (<p>{error}</p>)
      }
    </Page>
  );
}

function Content({ words }: { words: Word[]; }) {
  return (
    <>
      <WordList words={words} />
      <p>Word count: <strong>{words.length}</strong>.</p>
    </>
  );
}