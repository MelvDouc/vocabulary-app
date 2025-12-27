import Page from "$client/components/Page/Page.js";
import languageObs from "$client/utils/language-obs.js";

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