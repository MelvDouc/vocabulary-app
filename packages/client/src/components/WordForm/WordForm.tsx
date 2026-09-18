import Button from "$client/components/Button/Button.js";
import WordFormTextarea from "$client/components/WordFormTextArea/WordFormTextarea.js";
import { TypedEventEmitter } from "reactfree-jsx/extra";
import cssClasses from "./WordForm.module.scss";

export default function WordForm({ handleSubmit, data = DEFAULT_TEXT }: {
  handleSubmit: (data: string) => unknown;
  data?: string;
}) {
  const textareaName = "word-text";
  const emitter = new TypedEventEmitter<{ textInsert: [string]; }>();
  const [onTextInsert, emitTextInsert] = emitter.createHandlers("textInsert");

  const onsubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    handleSubmit(data.get(textareaName) as string);
  };

  return (
    <form className={cssClasses.WordForm} on:submit={onsubmit}>
      <section className={cssClasses.FormGroup}>
        <WordFormTextarea
          name={textareaName}
          text={data}
          onTextInsert={onTextInsert}
        />
      </section>
      <section className={cssClasses.TextButtons}>
        <Button
          type="button"
          colorType="secondary"
          on:click={() => emitTextInsert('[meaning]\ndef = ""\n')}
        >meaning</Button>
        <Button
          type="button"
          colorType="secondary"
          on:click={() => emitTextInsert('[[see_also]]\n_id = ""\n_entry = ""\n')}
        >see also</Button>
      </section>
      <section className={cssClasses.FormSubmit}>
        <Button type="submit" pill>Submit</Button>
        <Button on:click={() => history.back()} type="button" colorType="danger" pill>Cancel</Button>
      </section>
    </form>
  );
}

const DEFAULT_TEXT =
  '"label" = ""\n'
  + '"language" = "en"\n'
  + '"word_class" = "n"\n';