export default class WordForm extends HTMLFormElement {
  #wordYaml = "";

  constructor() {
    super();
    this.addEventListener("submit", async (e) => {
      e.preventDefault();
      const response = await fetch(location.href, {
        method: this.dataset.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ wordYaml: this.#wordYaml })
      });
      const data = await response.json();
      if (data.success) {
        location.href = `/word?id=${data.id}`;
        return;
      }
      alert(data.errors.join("\n"));
    });
  }

  connectedCallback() {
    const textarea = this.querySelector("#word_yaml") as HTMLTextAreaElement;
    this.#wordYaml = textarea.value;
    textarea.addEventListener("input", () => {
      this.#wordYaml = textarea.value;
    });
  }
}