export interface Char {
  number: number,
  value: string,
  isTargeted: boolean,
};

export interface Line {
  number: number;
  chars: Char[];
  isFocused: boolean;
};

export type State = {
  focusedLine: number | null,
  focusedChar: number | null,
  movementStartChar: number | null,
  lines: Line[],
};