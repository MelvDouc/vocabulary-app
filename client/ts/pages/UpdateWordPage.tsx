import { navigateToRoute } from "client-side-router";

import ErrorList, { createErrorObs } from "$client/components/ErrorList/ErrorList";
import Page from "$client/components/Page/Page";
import ProtectedPage from "$client/components/Page/ProtectedPage";
import WordForm from "$client/components/WordForm/WordForm";
import NotFoundPage from "$client/pages/NotFoundPage";
import { getWord, updateWord } from "$client/utils/api";
import languageObs from "$client/utils/language-obs";

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