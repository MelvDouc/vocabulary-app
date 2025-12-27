import Page from "$client/components/Page/Page.js";
import WordList from "$client/components/WordList/WordList.js";
import type { WordLinkParams } from "$client/types.js";
import { getWordRange } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";
import routes from "$client/utils/routes.js";
import { Link, type ParamRecord } from "reactfree-jsx/extra/router";

export default async function WordRangePage({ language, from, to }: ParamRecord) {
  languageObs.value = language;

  const [words, error] = await getWordRange(language, from, to);

  return (
    <Page title={`${language} ${from}-${to}`}>
      {
        words
          ? (<Content language={language} words={words} range={`${from}-${to}`} />)
          : (<p>{error}</p>)
      }
    </Page>
  );
}

const RANGES = ["A-I", "J-R", "S-Z"] as const;

function Content({ language, words, range }: {
  language: string;
  words: WordLinkParams[];
  range: string;
}) {
  return (
    <>
      <h2>{range}</h2>
      <div style={{ display: "flex", gap: "1em" }}>{
        RANGES
          .filter((x) => x !== range)
          .map((range) => (
            <Link href={routes.WordRange(language, range[0], range[2])}>{range}</Link>
          ))
      }</div>
      <WordList words={words} />
    </>
  );
}