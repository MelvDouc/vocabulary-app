import Page from "$client/components/Page/Page";
import languageObs from "$client/utils/language-obs";

export default function NotFoundPage({ message = "Page not found" }: {
  message?: string;
}) {
  languageObs.value = null;

  return (
    <Page title="Page not found">
      <p>{message}</p>
    </Page>
  );
}