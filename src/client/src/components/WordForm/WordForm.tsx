import { TypedEventEmitter } from "reactfree-jsx/extra";

import Button from "$client/components/Button/Button.js";
import WordFormTextarea from "$client/components/WordFormTextArea/WordFormTextarea.js";
import WordFormTextButton from "$client/components/WordFormTextButton/WordFormTextButton.js";

import cssClasses from "./WordForm.module.scss";

export default function WordForm({ handleSubmit, data }: {
  handleSubmit: (data: string) => unknown;
  data: string;
}) {
  const textareaName = "word-text";
  const emitter = new TypedEventEmitter<{ textInsert: [string]; }>();
  const [onTextInsert, emitTextInsert] = emitter.createHandlers("textInsert");

  const onsubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    handleSubmit(data.get(textareaName) as string);
  };

  const TextButton = ({ text }: { text: string; }) => {
    return (
      <WordFormTextButton text={text} emitText={() => emitTextInsert(text)} />
    );
  };

  return (
    <form className={cssClasses.WordForm} onsubmit={onsubmit}>
      <section className={cssClasses.FormGroup}>
        <WordFormTextarea
          name={textareaName}
          text={data}
          onTextInsert={onTextInsert}
        />
      </section>
      <section className={cssClasses.TextButtons}>
        <TextButton text="[[meanings]]" />
        <TextButton text="= []" />
        <TextButton text="= {}" />
      </section>
      <section className={cssClasses.FormSubmit}>
        <Button type="submit">Submit</Button>
        <Button onclick={() => history.back()} isDanger>Cancel</Button>
      </section>
    </form>
  );
}