import Page from "$client/components/Page/Page.js";
import languageObs from "$client/utils/language-obs.js";
import routes from "$client/utils/routes.js";
import { Link } from "reactfree-jsx/extra/router";

export default function EnglishWordsPage() {
  languageObs.value = "en";

  return (
    <Page title="English">
      <ul>
        <li><Link href={routes.WordRange("en", "A", "I")}>A-I</Link></li>
        <li><Link href={routes.WordRange("en", "J", "R")}>J-R</Link></li>
        <li><Link href={routes.WordRange("en", "S", "Z")}>S-Z</Link></li>
      </ul>
    </Page>
  );
}