import LogInButton from "$client/components/LogInButton/LogInButton.js";
import type { User } from "$client/types.js";
import { logOut } from "$client/utils/api.js";

import cssClasses from "./NavAuthSection.module.scss";

export default function NavAuthSection({ user }: {
  user: User | null;
}) {
  if (!user)
    return (<LogInButton />);

  return (
    <button className={cssClasses.LogOutButton} title="Log out" on:click={handleClick}>{user.email}</button>
  );
}

async function handleClick() {
  if (!confirm("Are you sure you want to log out?"))
    return;

  await logOut();
  location.reload();
}