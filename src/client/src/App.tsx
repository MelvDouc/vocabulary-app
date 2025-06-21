import { Route, Router } from "client-side-router";
import { obs } from "reactfree-jsx";

import Nav from "$client/components/Nav/Nav.js";
import Spinner from "$client/components/Spinner/Spinner.js";
import ThemeToggler from "$client/components/ThemeToggler/ThemeToggler.js";
import AddWordPage from "$client/pages/AddWordPage.js";
import HomePage from "$client/pages/HomePage.js";
import LanguagePage from "$client/pages/LanguagePage.js";
import NotFoundPage from "$client/pages/NotFoundPage.js";
import UpdateWordPage from "$client/pages/UpdateWordPage.js";
import WordPage from "$client/pages/WordPage.js";
import routes from "$client/utils/routes.js";

import cssClasses from "./App.module.scss";

export default async function App() {
  const spinnerOpenObs = obs(false);

  return (
    <>
      {await Nav()}
      <main className={cssClasses.Main}>
        <section className={cssClasses.MainTop}>
          <ThemeToggler />
        </section>
        <Router
          onNavStarted={() => { spinnerOpenObs.value = true; }}
          onNavComplete={() => { spinnerOpenObs.value = false; }}
          internalLinks
        >
          <Route
            path={routes.home()}
            component={HomePage}
            name="app_home"
          />
          <Route
            path={routes.language(":language") as "/:language"}
            component={LanguagePage}
            name="app_language"
          />
          <Route
            path={routes.word(":id") as "/:id"}
            component={WordPage}
            name="app_word"
          />
          <Route
            path={routes.addWord()}
            component={AddWordPage}
            name="app_add_word"
          />
          <Route
            path={routes.updateWord(":id") as "/:id"}
            component={UpdateWordPage}
            name="app_update_word"
          />
          <Route
            path=".*"
            component={NotFoundPage}
            name="app_404"
          />
        </Router>
      </main>
      <Spinner openObs={spinnerOpenObs} />
    </>
  );
}