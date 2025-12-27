import NavAuthSection from "$client/components/NavAuthSection/NavAuthSection.js";
import RandomWordLink from "$client/components/RandomWordLink/RandomWordLink.js";
import type { User } from "$client/types.js";
import routes from "$client/utils/routes.js";
import { Link } from "reactfree-jsx/extra/router";

import cssClasses from "./Nav.module.scss";

export default function Nav({ user }: {
  user: User | null;
}) {
  return (
    <nav className={cssClasses.Nav}>
      <section className={cssClasses.NavLeft}>
        <Link href={routes.HOME}>Home</Link>
        {user && (
          <Link href={routes.ADD_WORD}>Add a word</Link>
        )}
        <RandomWordLink />
      </section>
      <section className={cssClasses.NavRight}>
        <NavAuthSection user={user} />
      </section>
    </nav>
  );
}