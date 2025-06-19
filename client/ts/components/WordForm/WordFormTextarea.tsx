export default function WordFormTextarea({ name, text }: {
  name: string;
  text: string;
}) {
  const handleKeyDown = (e: KeyboardEvent) => {
    const textarea = e.target as HTMLTextAreaElement;

    switch (e.key) {
      case "Tab": {
        e.preventDefault();
        e.shiftKey ? tabLeft(textarea) : tabRight(textarea);
        break;
      }
    }
  };

  return (
    <textarea
      name={name}
      placeholder="Word YAML..."
      rows={10}
      required
      onkeydown={handleKeyDown}
    >{text}</textarea>
  );
}

function tabLeft(textarea: HTMLTextAreaElement): void {
  const textBefore = textarea.value.slice(0, textarea.selectionStart);
  const textAfter = textarea.value.slice(textarea.selectionEnd);
  const lastSpaceIndex = textBefore.lastIndexOf(" ");
  const lastTabIndex = textBefore.lastIndexOf("  ");

  if (lastTabIndex === -1 || lastTabIndex < lastSpaceIndex)
    return;

  textarea.value = textBefore.slice(0, lastTabIndex)
    + textBefore.slice(lastTabIndex + 2)
    + textAfter;
  textarea.selectionStart = textarea.selectionEnd = lastTabIndex;
}

function tabRight(textarea: HTMLTextAreaElement): void {
  const textBefore = textarea.value.slice(0, textarea.selectionStart);
  const textAfter = textarea.value.slice(textarea.selectionEnd);
  textarea.value = textBefore + "  " + textAfter;
  textarea.selectionStart = textarea.selectionEnd = textBefore.length + 2;
}