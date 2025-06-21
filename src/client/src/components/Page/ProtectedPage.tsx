import { getUser } from "$client/utils/auth.js";

export default function ProtectedPage<P, E extends JSX.Element>(component: (props: P) => E | Promise<E>) {
  return async (props: P) => {
    if (!(await getUser()))
      return (
        <h1>401 Not Allowed</h1>
      );

    return component(props);
  };
}