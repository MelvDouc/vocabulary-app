import ErrorList, { createErrorObs } from "$client/components/ErrorList/ErrorList.js";
import Page from "$client/components/Page/Page.js";
import ProtectedPage from "$client/components/Page/ProtectedPage.js";
import WordForm from "$client/components/WordForm/WordForm.js";
import type { JsonValue } from "$client/types.js";
import { addWord } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";
import routes from "$client/utils/routes.js";
import { navigate } from "reactfree-jsx/extra/router";

const AddWordPage = ProtectedPage(() => {
  languageObs.value = null;

  const errorObs = createErrorObs();

  const handleSubmit = async (text: string) => {
    const result = await addWord(text);
    console.log({ result });
    const [word, errors] = result;

    if (!word) {
      errorObs.value = errors;
      return;
    }

    navigate(routes.Word(word.id), word as unknown as JsonValue);
  };

  return (
    <Page title="Add a word">
      <h1>Add a word</h1>
      <WordForm handleSubmit={handleSubmit} data={DEFAULT_TEXT} />
      <ErrorList obs={errorObs} />
    </Page>
  );
});

const DEFAULT_TEXT =
  'entry = ""\n'
  + 'language = "en"\n'
  + 'class = "n"\n'
  + '[[meanings]]';

export default AddWordPage;