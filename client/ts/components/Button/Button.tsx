import type { ComponentChild } from "reactfree-jsx";
import cssClasses from "./Button.module.scss";

export default function Button({ onclick, title, type = "button", isDanger, children }: {
  onclick?: JSX.IntrinsicElements["button"]["onclick"];
  title?: string;
  type?: JSX.IntrinsicElements["button"]["type"];
  isDanger?: boolean;
  children: ComponentChild;
}) {
  return (
    <button
      className={{
        [cssClasses.Button]: true,
        [cssClasses.Danger]: !!isDanger
      }}
      onclick={onclick}
      title={title ?? ""}
      type={type}
    >{children}</button>
  );
}