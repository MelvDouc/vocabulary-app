import Button from "$client/components/Button/Button";
import WordFormTextarea from "$client/components/WordForm/WordFormTextarea";
import cssClasses from "./WordForm.module.scss";

export default function WordForm({ handleSubmit, backUrl, wordYaml }: {
  handleSubmit: (wordYaml: string) => unknown;
  wordYaml: string;
  backUrl?: string;
}) {
  const wordYamlName = "word-yaml";

  const $initForm = (form: HTMLFormElement) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      handleSubmit(data.get(wordYamlName) as string);
    });
  };

  return (
    <form className={cssClasses.WordForm} $init={$initForm}>
      <section className={cssClasses.FormGroup}>
        <WordFormTextarea name={wordYamlName} text={wordYaml} />
      </section>
      <section className={cssClasses.FormSubmit}>
        <Button type="submit">Submit</Button>
        <Button onclick={() => history.back()} isDanger>Cancel</Button>
      </section>
    </form>
  );
}