import Page from "$client/components/Page/Page.js";
import { getLanguages } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";
import routes from "$client/utils/routes.js";
import { Link } from "reactfree-jsx/extra/router";

export default async function HomePage() {
  languageObs.value = null;
  const [languages, error] = await getLanguages();

  return (
    <Page title="Home">
      <h1>Home</h1>
      <Page.Section>
        <h2>Languages</h2>
        {
          languages
            ? (<LanguageList languages={languages} />)
            : (<p>{error}</p>)
        }
      </Page.Section>
    </Page>
  );
}

function LanguageList({ languages }: { languages: string[]; }) {
  return (
    <ul>
      {languages.map((lang) => (
        <li>
          <Link href={routes.Words(lang)}>{lang}</Link>
        </li>
      ))}
    </ul>
  );
}