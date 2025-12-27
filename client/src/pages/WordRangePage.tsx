import Page from "$client/components/Page/Page.js";
import WordList from "$client/components/WordList/WordList.js";
import type { Word } from "$client/types.js";
import { getWordRange } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";
import type { ParamRecord } from "reactfree-jsx/extra/router";

export default async function WordRangePage({ params: { language }, query: { from, to } }: {
  params: { language: string; };
  query: ParamRecord;
}) {
  languageObs.value = language;

  const [words, error] = await getWordRange(language, from, to);

  return (
    <Page title={`${language} ${from}-${to}`}>
      {
        words
          ? (<Content words={words} range={`${from}-${to}`} />)
          : (<p>{error}</p>)
      }
    </Page>
  );
}

function Content({ words, range }: {
  words: Word[];
  range: string;
}) {
  return (
    <>
      <h2>{range}</h2>
      <WordList words={words} />
    </>
  );
}