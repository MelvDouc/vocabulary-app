import Page from "$client/components/Page/Page";
import WordList from "$client/components/WordList/WordList";
import { getWords } from "$client/utils/api";
import languageObs from "$client/utils/language-obs";

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