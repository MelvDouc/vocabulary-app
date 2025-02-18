export default function WordForm({ action, backUrl, wordYaml }: {
  action: string;
  wordYaml: string;
  backUrl?: string;
}) {
  return (
    <form className="form" action={action} method="post">
      <section className="form-group">
        <textarea name="word" placeholder="Word YAML..." rows={10} required>
          {wordYaml}
        </textarea>
      </section>
      <section className="form-submit">
        <button className="btn" type="submit">Submit</button>
        {backUrl && (
          <a className="btn btn-danger" href={backUrl}>Cancel</a>
        )}
      </section>
    </form>
  );
}