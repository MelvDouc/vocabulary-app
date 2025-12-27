import LogInButton from "$client/components/LogInButton/LogInButton.js";
import RandomWordLink from "$client/components/RandomWordLink/RandomWordLink.js";
import type { User } from "$client/types.js";
import { logOut } from "$client/utils/api.js";
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
        <AuthSection user={user} />
      </section>
    </nav>
  );
}

function AuthSection({ user }: {
  user: { email: string; } | null;
}) {
  if (!user)
    return (
      <LogInButton />
    );

  const handleClick = async () => {
    if (!confirm("Are you sure you want to log out?"))
      return;

    await logOut();
    location.reload();
  };

  return (
    <button className={cssClasses.LogOutButton} title="Log out" on:click={handleClick}>{user.email}</button>
  );
}