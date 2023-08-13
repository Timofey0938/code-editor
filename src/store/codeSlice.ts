import {createSlice} from '@reduxjs/toolkit';
import {initialState} from '@/initialState';
import {Char, Line} from '@/types/types';
import {State} from '@/types/types';

// const getNewLine = (lineNumber: number) => ({
//   number: lineNumber,
//   chars: [
//     {
//       number: 0,
//       value: '',
//       isTargeted: true,
//     }
//   ],
//   isFocused: true,
// });

const updateFocus = (state: State, lineNumber: number, charNumber: number) => {
  const {focusedLine, focusedChar, lines} = state;
  const newLines = JSON.parse(JSON.stringify(lines));

  if (lineNumber === focusedLine) {
    if (charNumber === focusedChar) {
      return;
    } else {
      newLines[focusedLine].chars[focusedChar].isTargeted = false;
      newLines[lineNumber].chars[charNumber].isTargeted = true;
    }
  } else {
    if (focusedLine !== null) {
      newLines[focusedLine].isFocused = false;
    }

    if (focusedChar !== null) {
      newLines[focusedLine].chars[focusedChar].isTargeted = false;
    }

    newLines[lineNumber].isFocused = true;
    newLines[lineNumber].chars[charNumber].isTargeted = true;
  }
  
  return {
    focusedLine: lineNumber,
    focusedChar: charNumber,
    lines: newLines,
  };
}

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    setFocus(state, action) {
      const {lineNumber, charNumber} = action.payload;
      return {
        ...state,
        movementStartChar: null,
        ...updateFocus(state, lineNumber, charNumber)
      };
    },
    moveUp(state) {
      let focusedLine = state.focusedLine - 1;
      let focusedChar = state.focusedChar;
      let {movementStartChar} = state;

      if (focusedLine < 0) {
        focusedLine = 0;
        focusedChar = 0;
      } else {
        if (movementStartChar !== null) {
          focusedChar = movementStartChar;
        } else {
          movementStartChar = focusedChar;
        }
  
        if (state.lines[focusedLine].chars.length - 1 < focusedChar) {
          focusedChar = state.lines[focusedLine].chars.length - 1;
        }
      }

      return {
        ...state,
        movementStartChar,
        ...updateFocus(state, focusedLine, focusedChar)
      };
    },
    moveToRight(state) {
      let focusedLine = state.focusedLine;
      let focusedChar = state.focusedChar + 1;

      if (focusedChar === state.lines[focusedLine].chars.length) {
        if (focusedLine === state.lines.length - 1) {
          return state;
        }
        focusedLine++;
        focusedChar = 0;
      }
      
      return {
        ...state,
        movementStartChar: null,
        ...updateFocus(state, focusedLine, focusedChar)
      };
    },
    moveDown(state) {
      let focusedLine = state.focusedLine + 1;
      let focusedChar = state.focusedChar;
      let {movementStartChar} = state;

      if (focusedLine > state.lines.length - 1) {
        return state;
      } else {
        if (movementStartChar !== null) {
          focusedChar = movementStartChar;
        } else {
          movementStartChar = focusedChar;
        }
  
        if (state.lines[focusedLine].chars.length - 1 < focusedChar) {
          focusedChar = state.lines[focusedLine].chars.length - 1;
        }
      }

      return {
        ...state,
        movementStartChar,
        ...updateFocus(state, focusedLine, focusedChar)
      };
    },
    moveToLeft(state) {
      let focusedLine = state.focusedLine;
      let focusedChar = state.focusedChar - 1;

      if (focusedChar < 0) {
        if (focusedLine === 0) {
          return state;
        }
        focusedLine--;
        focusedChar = state.lines[focusedLine].chars.length - 1;
      }

      return {
        ...state,
        movementStartChar: null,
        ...updateFocus(state, focusedLine, focusedChar)
      };
    },
    jumpToNextLine(state) {
      const {focusedLine, focusedChar, lines} = state;
      const newLines = [];
      let j = 0;
      for (let i = 0; i < lines.length; i++, j++) {
        const line = lines[i];
        if (i === focusedLine) {
          let leftChars = line.chars.slice(0, focusedChar);
          leftChars.push({
            number: leftChars.length,
            value: '',
            isTargeted: false,
          });
          const rightChars = line.chars.slice(focusedChar);
          newLines.push({
            number: j++,
            chars: leftChars,
            isFocused: false,
          });
          newLines.push({
            number: j,
            chars: rightChars,
            isFocused: false,
          });
        } else {
          newLines.push({
            ...line,
            number: j,
            chars: line.chars.map(char => {
              if (char.isTargeted) {
                return {
                  ...char,
                  isTargeted: false,
                }
              }
              return char;
            }),
            isFocused: false,
          });
        }
      }

      return {
        ...state,
        movementStartChar: null,
        focusedLine: focusedLine + 1,
        focusedChar: 0,
        lines: newLines,
      }
    },
    addChar(state, action) {
      const {char} = action.payload;
      const {focusedLine, focusedChar} = state;
      const lines = JSON.parse(JSON.stringify(state.lines));

      return {
        ...state,
        movementStartChar: null,
        focusedChar: focusedChar + 1,
        lines: lines.map((line: Line) => {
          if (line.number !== focusedLine) {
            return line;
          }
        
          const newChars: Char[] = [];
          for (let i = 0, j = 0; i < line.chars.length; i++, j++) {
            if (i === focusedChar) {
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
        
          return {
            ...line,
            chars: newChars,
          }
        }),
      };
    },
    removeLeftChar(state) {
      const {focusedLine, focusedChar} = state;
      let newFocusedLine = focusedLine;
      let newFocusedChar = focusedChar - 1;
      const lines = JSON.parse(JSON.stringify(state.lines));

      if (focusedLine === 0 && focusedChar === 0) {
        return state;
      }

      const newLines: Line[] = [];
      let lineNumber = 0;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.number === focusedLine - 1 && focusedChar === 0) {
          const newChars = line.chars.slice(0, -1);
          const length = newChars.length;
          let charNumber = 0;
          for (let j = length; j < length + lines[focusedLine].chars.length; j++) {
            newChars[j] = lines[focusedLine].chars[charNumber++];
          }
          newChars[length].isTargeted = true;
          newFocusedLine--;
          newFocusedChar = length;

          newLines.push({
            ...line,
            number: lineNumber++,
            chars: newChars,
            isFocused: true,
          });
          continue;
        }

        if (line.number === focusedLine && focusedChar === 0) {
          continue;
        }

        if (line.number !== focusedLine) {
          newLines.push({
            ...line,
            number: lineNumber++,
          });
          continue;
        }
      
        const newChars: Char[] = [];
        let charNumber = 0
        for (let i = 0; i < line.chars.length; i++) {
          if (i !== focusedChar - 1) {
            newChars[charNumber] = {
              number: charNumber++,
              value: line.chars[i].value,
              isTargeted: line.chars[i].isTargeted,
            }
          }
        }
      
        newLines.push({
          ...line,
          number: lineNumber++,
          chars: newChars,
        });
      }

      return {
        ...state,
        movementStartChar: null,
        focusedLine: newFocusedLine,
        focusedChar: newFocusedChar,
        lines: newLines,
      };
    },
    removeRightChar(state) {
      return state;
    },
  }
});

export const {
  setFocus,
  moveUp,
  moveToRight,
  moveDown,
  moveToLeft,
  jumpToNextLine,
  addChar,
  removeLeftChar,
  removeRightChar,
} = codeSlice.actions;
export default codeSlice.reducer;