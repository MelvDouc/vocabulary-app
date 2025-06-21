import cssClasses from "./Button.module.scss";

export default function Button({ children, ...props }: JSX.IntrinsicElements["button"] & {
  isDanger?: boolean;
}) {
  return (
    <button
      className={{
        [cssClasses.Button]: true,
        [cssClasses.Danger]: !!props.isDanger
      }}
      $init={(element) => {
        props.$init?.(element);
        // Ensure that clicking the padding clicks the child anchor element.
        element.addEventListener("click", (e) => {
          if (!(e.currentTarget instanceof HTMLAnchorElement))
            element.querySelector("a")?.click();
        });
      }}
      {...props}
    >{children}</button>
  );
}