import { Line, Char } from './types/types';

export const addChar = (
    lines: Line[],
    focusedLine: number,
    char: string,
    focusedChar: number,
  ) => lines.map(line => {
  console.log(line.number, focusedLine);
  if (line.number !== focusedLine) {
    return line;
  }

  const newChars: Char[] = [];
  for (let i = 0, j = 0; i < line.chars.length; i++, j++) {
    console.log(i, j)
    if (i === focusedChar) {
      console.log('reached yeah')
      newChars[j] = {
        number: j,
        value: char,
        isTargeted: false,
      };
      j++;
    }
    newChars[j] = {
      number: j,
      value: line.chars[i].value,
      isTargeted: line.chars[i].isTargeted,
    }
  }

  console.log(newChars)

  return {
    ...line,
    chars: newChars,
  }
})