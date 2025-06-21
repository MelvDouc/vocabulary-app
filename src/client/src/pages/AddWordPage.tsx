import { navigateToRoute } from "client-side-router";

import ErrorList, { createErrorObs } from "$client/components/ErrorList/ErrorList.js";
import Page from "$client/components/Page/Page.js";
import ProtectedPage from "$client/components/Page/ProtectedPage.js";
import WordForm from "$client/components/WordForm/WordForm.js";
import { addWord } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";

const AddWordPage = ProtectedPage(() => {
  languageObs.value = null;

  const errorObs = createErrorObs();

  const handleSubmit = async (text: string) => {
    const [word, errors] = await addWord(text);

    if (errors) {
      errorObs.value = errors;
      return;
    }

    navigateToRoute("app_word", { id: word.id });
  };


  return (
    <Page title="Add a word">
      <h1>Add a word</h1>
      <WordForm handleSubmit={handleSubmit} data={DEFAULT_TEXT} />
      <ErrorList obs={errorObs} />
    </Page>
  );
});

const DEFAULT_TEXT = [
  "entry = \"\"",
  "language = \"en\"",
  "class = \"n\"",
  "[[meanings]]",
  ""
].join("\n");

export default AddWordPage;