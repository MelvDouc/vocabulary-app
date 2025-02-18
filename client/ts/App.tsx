import { Router, Route } from "client-side-router";
import HomePage from "$client/pages/HomePage";
import Nav from "$client/components/Nav/Nav";
import cssClasses from "./App.module.scss";

export default function App() {
  return (
    <>
      <Nav />
      <main className={cssClasses.Main}>
        <Router>
          <Route path="/" component={HomePage} name="app_home" />
        </Router>
      </main>
    </>
  );
}