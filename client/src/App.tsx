import Nav from "$client/components/Nav/Nav.js";
import Spinner from "$client/components/Spinner/Spinner.js";
import ThemeToggler from "$client/components/ThemeToggler/ThemeToggler.js";
import AddWordPage from "$client/pages/AddWordPage.js";
import EnglishWordsPage from "$client/pages/EnglishWordsPage.js";
import HomePage from "$client/pages/HomePage.js";
import WordsPage from "$client/pages/WordsPage.js";
import NotFoundPage from "$client/pages/NotFoundPage.js";
import UpdateWordPage from "$client/pages/UpdateWordPage.js";
import WordPage from "$client/pages/WordPage.js";
import WordRangePage from "$client/pages/WordRangePage.js";
import { getUser } from "$client/utils/auth.js";
import routes from "$client/utils/routes.js";
import { obs } from "reactfree-jsx";
import { Route, Router } from "reactfree-jsx/extra/router";

import cssClasses from "./App.module.scss";

export default async function App() {
  const spinnerOpenObs = obs(false);
  const user = await getUser();

  return (
    <>
      <Nav user={user} />
      <main className={cssClasses.Main}>
        <section className={cssClasses.MainTop}>
          <ThemeToggler />
        </section>
        <Router
          $init={(router) => {
            router.onNavStarted(() => { spinnerOpenObs.value = true; });
            router.onNavComplete(() => { spinnerOpenObs.value = false; });

            router.onPageNotFound((err) => {
              router.updateChildren(<NotFoundPage message={err.message} />);
            });
          }}
        >
          <Route path={routes.ADD_WORD} component={AddWordPage} />
          <Route path={routes.UPDATE_WORD} query={["id"]} component={UpdateWordPage} />
          <Route path={routes.Words(":language")} query={["from", "to"]} component={WordRangePage} />
          <Route path={routes.Words("en")} component={EnglishWordsPage} />
          <Route path={routes.Words(":language")} component={WordsPage} />
          <Route path={routes.WORDS} query={["id"]} component={WordPage} />
          <Route path={routes.HOME} component={HomePage} />
        </Router>
      </main>
      <Spinner openObs={spinnerOpenObs} />
    </>
  );
}