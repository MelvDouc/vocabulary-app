import Page from "$client/components/Page/Page.js";
import { getLanguages } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";
import routes from "$client/utils/routes.js";

export default async function HomePage() {
  const languages = await getLanguages();
  languageObs.value = null;

  return (
    <Page title="Home">
      <h1>Home</h1>
      <Page.Section>
        <h2>Languages</h2>
        <ul>
          {languages.map((lang) => (
            <li>
              <a href={routes.language(lang)}>{lang}</a>
            </li>
          ))}
        </ul>
      </Page.Section>
    </Page>
  );
}