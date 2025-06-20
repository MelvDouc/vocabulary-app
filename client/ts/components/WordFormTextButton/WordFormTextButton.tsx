import cssClasses from "./WordFormTextButton.module.scss";

export default function WordFormTextButton({ text, emitText }: {
  text: string;
  emitText: VoidFunction;
}) {
  return (
    <button
      className={cssClasses.WordFormTextButton}
      type="button"
      onclick={emitText}
    >{text}</button>
  );
}