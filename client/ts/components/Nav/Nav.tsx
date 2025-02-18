import routes from "$global/routes";
import cssClasses from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={cssClasses.Nav}>
      <section className={cssClasses.NavLeft}>
        <a href={routes.home()}>Home</a>
        <a href={routes.addWord()}>Add a word</a>
      </section>
      <section className={cssClasses.NavRight}></section>
    </nav>
  );
}