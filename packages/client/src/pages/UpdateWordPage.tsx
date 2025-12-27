import { showAlertBox } from "$client/components/AlertBox/AlertBox.js";
import Page from "$client/components/Page/Page.js";
import ProtectedPage from "$client/components/Page/ProtectedPage.js";
import WordForm from "$client/components/WordForm/WordForm.js";
import { getWordTOML, updateWord } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";
import routes from "$client/utils/routes.js";
import { navigate, pageNotFound } from "reactfree-jsx/extra/router";

const UpdateWordPage = ProtectedPage(async ({ id }: { id: string; }) => {
  const [text, error] = await getWordTOML(id);

  if (text === null) {
    languageObs.value = null;
    pageNotFound(error);
  }

  return (
    <Page title="Update a word">
      <h1>Update a word</h1>
      <WordForm handleSubmit={(text) => handleSubmit(id, text)} data={text} />
    </Page>
  );
});

const handleSubmit = async (id: string, text: string) => {
  const [_, errors] = await updateWord(id, text);

  if (errors) {
    showAlertBox({
      message: (
        <ul>
          {errors.map((error) => (<li>{error}</li>))}
        </ul>
      ) as HTMLUListElement,
      type: "danger"
    });
    return;
  }

  navigate(routes.Word(id));
};

export default UpdateWordPage;