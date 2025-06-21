import LogInButton from "$client/components/LogInButton/LogInButton.js";
import RandomWordLink from "$client/components/RandomWordLink/RandomWordLink.js";
import { logOut } from "$client/utils/api.js";
import { getUser } from "$client/utils/auth.js";
import routes from "$client/utils/routes.js";

import cssClasses from "./Nav.module.scss";

export default async function Nav() {
  const user = await getUser();

  return (
    <nav className={cssClasses.Nav}>
      <section className={cssClasses.NavLeft}>
        <a href={routes.home()}>Home</a>
        {user && (
          <a href={routes.addWord()}>Add a word</a>
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
    <button className={cssClasses.LogOutButton} title="Log out" onclick={handleClick}>{user.email}</button>
  );
}