import cssClasses from "./Button.module.scss";

export default function Button({ className: _, children, ...props }: JSX.IntrinsicElements["button"] & {
  colorType?: "primary" | "secondary" | "danger";
  pill?: boolean;
}) {
  const className = {
    [cssClasses.Button]: true,
    [cssClasses.pill]: !!props.pill
  };

  return (
    <button
      className={className}
      data-type={props.colorType ?? "primary"}
      $init={(element) => props.$init?.(element)}
      {...props}
    >{children}</button>
  );
}