import { getUser } from "$client/utils/auth";

export default function ProtectedPage<P, E extends JSX.Element | Promise<JSX.Element>>(component: (props: P) => E) {
  return (props: P) => {
    if (!getUser())
      return (
        <h1>401 Not Allowed</h1>
      );

    return component(props);
  };
}