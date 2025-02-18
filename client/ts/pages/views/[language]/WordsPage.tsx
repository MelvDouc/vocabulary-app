import type { Word } from "$/server/types.ts";
import MainLayout from "$/views/__layouts/MainLayout.tsx";

export default function WordsPage({ language, words }: {
  language: string;
  words: Word[];
}) {
  return (
    <MainLayout title={language}>
      <ul class="word-list">
        {words.map((word) => (
          <li>
            <a href={wordLink(word)}>{word.entry}</a>
          </li>
        ))}
      </ul>
      <p>Word count: <strong>{words.length}</strong>.</p>
    </MainLayout>
  );
}

function wordLink({ _id, language }: Word) {
  const queryString = new URLSearchParams({ id: _id.toHexString(), language });
  return "/word?" + queryString;
}