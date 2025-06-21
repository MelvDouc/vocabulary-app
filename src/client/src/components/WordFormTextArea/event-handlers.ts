const SPACE = " ";
const PSEUDO_TAB = SPACE + SPACE;
const LINEFEED = "\n";

export function tabLeft(textarea: HTMLTextAreaElement): void {
  const { selectionStart, selectionEnd, value: text } = textarea;
  const { row: startRow } = indexToPoint(text, selectionStart);
  const { row: endRow } = indexToPoint(text, selectionEnd);
  const lines = textarea.value.split(LINEFEED);

  const nextStart = selectionStart - getTabWidth(lines[startRow]);
  let nextEnd = selectionEnd;

  for (let row = startRow; row <= endRow; row++) {
    const tabWidth = getTabWidth(lines[row]);
    lines[row] = lines[row].slice(tabWidth);
    nextEnd -= tabWidth;
  }

  textarea.value = lines.join(LINEFEED);
  textarea.setSelectionRange(nextStart, nextEnd);
}

export function tabRight(textarea: HTMLTextAreaElement): void {
  const { selectionStart, selectionEnd, value: text } = textarea;
  const { row: startRow } = indexToPoint(text, selectionStart);
  const { row: endRow } = indexToPoint(text, selectionEnd);
  const lines = textarea.value.split(LINEFEED);
  let nextEnd = selectionEnd;

  for (let row = startRow; row <= endRow; row++) {
    lines[row] = PSEUDO_TAB + lines[row];
    nextEnd += 2;
  }

  textarea.value = lines.join(LINEFEED);
  textarea.setSelectionRange(selectionStart + 2, nextEnd);
}

export function moveLinesUp(textarea: HTMLTextAreaElement): void {
  const { selectionStart, selectionEnd, value: text } = textarea;
  const { row: startRow, col: startCol } = indexToPoint(text, selectionStart);
  const { row: endRow, col: endCol } = indexToPoint(text, selectionEnd);

  if (startRow === 0)
    return;

  const lines = textarea.value.split(LINEFEED);
  const lineAbove = lines[startRow - 1];
  lines.splice(startRow - 1, 1);
  lines.splice(endRow, 0, lineAbove);

  textarea.value = lines.join(LINEFEED);
  textarea.setSelectionRange(
    pointToIndex(textarea.value, { row: startRow - 1, col: startCol }),
    pointToIndex(textarea.value, { row: endRow - 1, col: endCol })
  );
}

export function moveLinesDown(textarea: HTMLTextAreaElement): void {
  const { selectionStart, selectionEnd, value: text } = textarea;
  const { row: startRow, col: startCol } = indexToPoint(text, selectionStart);
  const { row: endRow, col: endCol } = indexToPoint(text, selectionEnd);
  const lines = textarea.value.split(LINEFEED);

  if (endRow === lines.length - 1)
    return;

  const lineBelow = lines[endRow + 1];
  lines.splice(endRow + 1, 1);
  lines.splice(startRow, 0, lineBelow);

  textarea.value = lines.join(LINEFEED);
  textarea.setSelectionRange(
    pointToIndex(textarea.value, { row: startRow + 1, col: startCol }),
    pointToIndex(textarea.value, { row: endRow + 1, col: endCol })
  );
}

function getTabWidth(line: string): number {
  let count = 0;

  for (let i = 0; i < 2 && line[i] === SPACE; i++)
    count++;

  return count;
}

function indexToPoint(str: string, index: number): Point {
  let row = 0;
  let col = 0;
  let j = 0;

  while (j < index) {
    if (str[j++] !== LINEFEED) {
      col++;
      continue;
    }

    row++;
    col = 0;
  }

  return { row, col };
}

function pointToIndex(str: string, point: Point): number {
  let row = 0;
  let col = 0;
  let index = 0;

  while (index < str.length) {
    if (row === point.row && col === point.col)
      break;

    if (str[index++] !== LINEFEED) {
      col++;
      continue;
    }

    row++;
    col = 0;
  }

  return index;
}

interface Point {
  row: number;
  col: number;
}