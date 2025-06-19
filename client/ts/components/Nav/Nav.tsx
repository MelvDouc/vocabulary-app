import LogInButton from "$client/components/LogInButton/LogInButton";
import RandomWordLink from "$client/components/RandomWordLink/RandomWordLink";
import { logOut } from "$client/utils/api";
import { getUser } from "$client/utils/auth";
import languageObs from "$client/utils/language-obs";
import routes from "$client/utils/routes";
import cssClasses from "./Nav.module.scss";

export default function Nav() {
  const user = getUser();

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