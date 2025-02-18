import { Route, Router } from "client-side-router";
import routes from "$client/utils/routes";
import Nav from "$client/components/Nav/Nav";
import AddWordPage from "$client/pages/AddWordPage";
import HomePage from "$client/pages/HomePage";
import LanguagePage from "$client/pages/LanguagePage";
import NotFoundPage from "$client/pages/NotFoundPage";
import UpdateWordPage from "$client/pages/UpdateWordPage";
import WordPage from "$client/pages/WordPage";
import cssClasses from "./App.module.scss";

export default function App() {
  return (
    <>
      <Nav />
      <main className={cssClasses.Main}>
        <Router>
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
    </>
  );
}