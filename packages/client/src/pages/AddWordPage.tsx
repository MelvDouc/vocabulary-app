import { showAlertBox } from "$client/components/AlertBox/AlertBox.js";
import Page from "$client/components/Page/Page.js";
import ProtectedPage from "$client/components/Page/ProtectedPage.js";
import WordForm from "$client/components/WordForm/WordForm.js";
import { addWord } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";
import routes from "$client/utils/routes.js";
import { navigate } from "reactfree-jsx/extra/router";

const AddWordPage = ProtectedPage(() => {
  languageObs.value = null;

  return (
    <Page title="Add a word">
      <h1>Add a word</h1>
      <WordForm handleSubmit={handleSubmit} />
    </Page>
  );
});

const handleSubmit = async (text: string) => {
  const [word, errors] = await addWord(text);

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

  navigate(routes.Word(word._id), word);
};

export default AddWordPage;