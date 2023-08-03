import React, { FC } from 'react';
import CodeArea from '../CodeArea/CodeArea';
import styles from './App.module.scss';

const App: FC = () => {
  return (
    <div className={styles.app}>
      <CodeArea />
    </div>
  );
};

export default App;
