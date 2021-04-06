import React from 'react';

import styles from './components.module.css';

/* eslint-disable-next-line */
export interface ComponentsProps {}

export function Components(props: ComponentsProps) {
  return (
    <div className={styles.cmp}>
      <h1>Welcome to components!</h1>
    </div>
  );
}

export default Components;
