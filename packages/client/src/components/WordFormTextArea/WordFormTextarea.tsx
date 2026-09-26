import {
  insertText,
  moveLinesDown,
  moveLinesUp,
  surround,
  tabLeft,
  tabRight
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
      on:keydown={handleKeyDown}
      value={text}
      $init={(element) => {
        onTextInsert((text) => insertText(element, text));
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
    case "(": {
      e.preventDefault();
      surround(textarea, "(", ")");
      break;
    }
    case "[": {
      e.preventDefault();
      surround(textarea, "[", "]");
      break;
    }
    case "\"": {
      e.preventDefault();
      surround(textarea, "\"", "\"");
      break;
    }
  }
}