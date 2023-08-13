import React, {FC, useState, KeyboardEvent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '@/components/Input/Input';
import {Char, Line} from '@/types/types';
import {selectCode} from '@/store/selectors';
import {handleKeyDown} from '@/handleKeyDown';
import styles from './CodeArea.module.scss';

const CodeArea: FC = () => {
  const dispatch = useDispatch();
  const code = useSelector(selectCode);
  console.log(code);

  useEffect(() => {
    document.addEventListener('keydown', e => handleKeyDown(dispatch, e.key))
  }, []);

  return (
    <div className={styles.codeArea}>
      {code.lines.map((line: Line, i: number) => (
        <div className={styles.line}>
          <div className={styles.number}>{i + 1}</div>
          <Input line={line} />
        </div>
      ))}
    </div>
  );
};

export default CodeArea;