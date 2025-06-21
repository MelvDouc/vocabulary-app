import Page from "$client/components/Page/Page.js";
import WordList from "$client/components/WordList/WordList.js";
import { getWords } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";

export default async function LanguagePage({ language }: {
  language: string;
}) {
  languageObs.value = language;
  const words = await getWords(language);

  return (
    <Page title={language}>
      <WordList words={words} />
      <p>Word count: <strong>{words.length}</strong>.</p>
    </Page>
  );
}