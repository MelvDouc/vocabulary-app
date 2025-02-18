import ErrorList, { createErrorObs } from "$client/components/ErrorList/ErrorList";
import Page from "$client/components/Page/Page";
import WordForm from "$client/components/WordForm/WordForm";
import NotFoundPage from "$client/pages/NotFoundPage";
import { getWord, updateWord } from "$client/utils/api";
import languageObs from "$client/utils/language-obs";
import routes from "$client/utils/routes";
import { navigateToRoute } from "client-side-router";

export default async function UpdateWordPage({ id }: {
  id: string;
}) {
  const wordYaml = await getWord(id, true);
  languageObs.value = null;

  if (!wordYaml)
    return (
      <NotFoundPage message="Word not found" />
    );

  const errorObs = createErrorObs();

  const handleSubmit = async (yaml: string) => {
    const [success, errors] = await updateWord(id, yaml);

    if (!success) {
      errorObs.value = errors;
      return;
    }

    navigateToRoute("app_word", { id });
  };

  return (
    <Page>
      <h1>Add a word</h1>
      <WordForm handleSubmit={handleSubmit} wordYaml={wordYaml} backUrl={routes.word(id)} />
      <ErrorList obs={errorObs} />
    </Page>
  );
}