import Button from "$client/components/Button/Button";
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
        <textarea name={wordYamlName} placeholder="Word YAML..." rows={10} required>
          {wordYaml}
        </textarea>
      </section>
      <section className={cssClasses.FormSubmit}>
        <Button type="submit">Submit</Button>
        {backUrl && (
          <Button isDanger><a href={backUrl}>Cancel</a></Button>
        )}
      </section>
    </form>
  );
}