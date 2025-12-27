import ErrorList, { createErrorObs } from "$client/components/ErrorList/ErrorList.js";
import Page from "$client/components/Page/Page.js";
import ProtectedPage from "$client/components/Page/ProtectedPage.js";
import WordForm from "$client/components/WordForm/WordForm.js";
import { getWordTOML, updateWord } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";
import routes from "$client/utils/routes.js";
import { navigate, pageNotFound, type ParamRecord } from "reactfree-jsx/extra/router";

const UpdateWordPage = ProtectedPage(async ({ query: { id } }: { query: ParamRecord; }) => {
  const [text, error] = await getWordTOML(id);

  if (text === null) {
    languageObs.value = null;
    pageNotFound(error);
  }

  const errorObs = createErrorObs();

  const handleSubmit = async (text: string) => {
    const [_, errors] = await updateWord(id, text);

    if (errors) {
      errorObs.value = errors;
      return;
    }

    navigate(routes.Word(id));
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