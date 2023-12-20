export default class DeleteWordButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener("click", async () => {
      if (!confirm("Are you sure you want to delete this word?"))
        return;

      const response = await fetch(`/word/delete?id=${this.dataset.id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (!data.success) {
        alert(data.errors.join("\n"));
        return;
      }
      location.href = "/";
    });
  }
}