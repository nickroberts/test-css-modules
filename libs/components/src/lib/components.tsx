import React from 'react';

import styles from './components.module.css';

/* eslint-disable-next-line */
export interface ComponentsProps {}

export function Components(props: ComponentsProps) {
  return (
    <div className={styles.components}>
      <h1>Welcome to components!</h1>
      <div className={styles.inner}>
        <h2 className="mb-4">Inner</h2>
        <div className="p-4 bg-secondary text-secondary-contrast">
          Inner Inner
        </div>
      </div>
    </div>
  );
}

export default Components;
