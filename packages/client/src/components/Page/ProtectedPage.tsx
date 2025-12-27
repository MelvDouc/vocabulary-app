import { getUser } from "$client/utils/auth.js";
import { redirect } from "reactfree-jsx/extra/router";

export default function ProtectedPage<P, E extends JSX.Element>(component: (props: P) => E | Promise<E>) {
  return async (props: P) => {
    if (!(await getUser()))
      redirect("/");

    return component(props);
  };
}