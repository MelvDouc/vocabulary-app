import ErrorList, { createErrorObs } from "$client/components/ErrorList/ErrorList";
import Page from "$client/components/Page/Page";
import ProtectedPage from "$client/components/Page/ProtectedPage";
import WordForm from "$client/components/WordForm/WordForm";
import { addWord } from "$client/utils/api";
import languageObs from "$client/utils/language-obs";
import { navigateToRoute } from "client-side-router";

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