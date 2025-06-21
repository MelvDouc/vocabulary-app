import { navigateToRoute } from "client-side-router";

import ErrorList, { createErrorObs } from "$client/components/ErrorList/ErrorList.js";
import Page from "$client/components/Page/Page.js";
import ProtectedPage from "$client/components/Page/ProtectedPage.js";
import WordForm from "$client/components/WordForm/WordForm.js";
import NotFoundPage from "$client/pages/NotFoundPage.js";
import { getWord, updateWord } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";

const UpdateWordPage = ProtectedPage(async ({ id }: { id: string; }) => {
  const text = await getWord(id, true);
  languageObs.value = null;

  if (!text)
    return (
      <NotFoundPage message="Word not found" />
    );

  const errorObs = createErrorObs();

  const handleSubmit = async (text: string) => {
    const [success, errors] = await updateWord(id, text);

    if (!success) {
      errorObs.value = errors;
      return;
    }

    navigateToRoute("app_word", { id });
  };

  return (
    <Page title="Update a word">
      <h1>Update a word</h1>
      <WordForm handleSubmit={handleSubmit} data={text} />
      <ErrorList obs={errorObs} />
    </Page>
  );
});

export default UpdateWordPage;