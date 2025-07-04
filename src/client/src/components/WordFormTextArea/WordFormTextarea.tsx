import {
  tabLeft,
  tabRight,
  moveLinesUp,
  moveLinesDown
} from "$client/components/WordFormTextArea/event-handlers.js";

export default function WordFormTextarea({ name, text, onTextInsert }: {
  name: string;
  text: string;
  onTextInsert: (listener: (text: string) => void) => void;
}) {
  return (
    <textarea
      name={name}
      placeholder="TOML..."
      rows={10}
      required
      onkeydown={handleKeyDown}
      value={text}
      $init={(element) => {
        onTextInsert((text) => {
          const { selectionStart, selectionEnd, value } = element;
          const textBefore = value.slice(0, selectionStart);
          const textAfter = value.slice(selectionEnd);

          element.value = textBefore + text + textAfter;
          element.setSelectionRange(selectionStart + text.length, selectionStart + text.length);
        });
      }}
    ></textarea>
  );
}

function handleKeyDown(e: KeyboardEvent) {
  const textarea = e.target as HTMLTextAreaElement;

  switch (e.key) {
    case "Tab": {
      e.preventDefault();
      e.shiftKey ? tabLeft(textarea) : tabRight(textarea);
      break;
    }
    case "ArrowUp": {
      if (e.altKey)
        moveLinesUp(textarea);
      break;
    }
    case "ArrowDown": {
      if (e.altKey)
        moveLinesDown(textarea);
      break;
    }
  }
}