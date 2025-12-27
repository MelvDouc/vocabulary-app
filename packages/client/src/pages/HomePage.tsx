import Page from "$client/components/Page/Page.js";
import { getLanguages } from "$client/utils/api.js";
import languageObs from "$client/utils/language-obs.js";
import { Link } from "reactfree-jsx/extra/router";
import routes from "$client/utils/routes.js";

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
            ? (<ul>
              {languages.map((lang) => (
                <li>
                  <Link href={routes.Words(lang)}>{lang}</Link>
                </li>
              ))}
            </ul>)
            : (<p>{error}</p>)
        }
      </Page.Section>
    </Page>
  );
}