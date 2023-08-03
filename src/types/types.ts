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