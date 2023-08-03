import React, { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import { Line } from '@/types/types';
import styles from './Input.module.scss';

interface InputProps {
  line: Line;
  onFocus: (LineNumber: number, charNumber: number) => void;
};

const Input: FC<InputProps> = ({ line, onFocus }) => {
  const charClickHandler = (e: MouseEvent<HTMLElement>, charNumber: number) => {
    e.preventDefault();
    const element = e.target as HTMLElement;
    const elementStart = Math.floor(
      element.getBoundingClientRect().left + document.documentElement.scrollLeft
    );
    if (e.pageX - elementStart > 5) {
      charNumber++;
    }
    onFocus(line.number, charNumber);
  };

  const lineClickHandler = (e: MouseEvent<HTMLElement>) => {
    const element = e.target as HTMLElement;
    if (element.id === 'input') {
      onFocus(line.number, line.chars.length - 1);
    }
  };

  return (
    <div
      id='input'
      className={classNames(
        styles.input,
        { [styles.isFocused]: line.isFocused }
      )}
      onClick={e => lineClickHandler(e)}
    >
      {line.chars.map(char => (
        <div
          className={classNames(
            styles.char,
            { [styles.isTargeted]: char.isTargeted }
          )}
          onClick={e => charClickHandler(e, char.number)}
        >
          {char.value}
        </div>
      ))}
    </div>
  );
};

export default Input;
