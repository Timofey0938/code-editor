import React, { FC, useState, KeyboardEvent, useEffect } from 'react';
import Input from '@/components/Input/Input';
import { Char, Line } from '@/types/types';
import { initialState } from '@/initialState';
import { addChar } from '@/uitls';
import styles from './CodeArea.module.scss';

const initLines: Line[] = initialState;

const CodeArea: FC = () => {
  const [lines, setLines] = useState(initLines);
  const [focusedLine, setFocusedLine] = useState<number>(null);
  const [focusedChar, setFocusedChar] = useState<number>(null);

  const handleKeyPress = (e: KeyboardEvent) => {
    console.log(e);
    setLines(addChar(lines, focusedLine, e.key, focusedChar));
    setFocusedChar(focusedChar + 1);
  };

  useEffect(() => {
    document.addEventListener('keypress', (e) => {
      handleKeyPress(e as unknown as KeyboardEvent<Element>);
      // Я пока не очень понимаю, как тут типизировать события
    });
  }, [handleKeyPress]);

  const focusHandler = (lineNumber: number, charNumber: number) => {
    const newLines = lines;

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
      newLines[lineNumber].isFocused = true;

      if (focusedChar !== null) {
        newLines[focusedLine].chars[focusedChar].isTargeted = false;
      }
      newLines[lineNumber].chars[charNumber].isTargeted = true;
    }
    console.log(lineNumber, focusedLine);
    setFocusedLine(lineNumber);
    setFocusedChar(charNumber);
    setLines(newLines);
  };

  return (
    <div className={styles.codeArea}>
      {lines.map((line, i) => (
        <div className={styles.line}>
          <div className={styles.number}>{i + 1}</div>
          <Input line={line} onFocus={focusHandler} />
        </div>
      ))}
    </div>
  );
};

export default CodeArea;