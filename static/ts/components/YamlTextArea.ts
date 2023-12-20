export default class YamlTextArea extends HTMLTextAreaElement {
  constructor() {
    super();
    this.addEventListener("keydown", (e) => {
      if (e.key !== "Tab")
        return;
      e.preventDefault();
      const caretPosition = this.selectionStart;
      const chars = this.value.split("");
      chars.splice(caretPosition, 0, "  ");
      this.value = chars.join("");
      this.setSelectionRange(caretPosition + 2, caretPosition + 2);
    });
  }
}