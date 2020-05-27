import React from 'react';
import styles from './style.module.scss';

export default function Top () {
  return (
    <div className={styles['app-top-wrapper']}>
      <div className={styles['app-top-logo']}>

      </div>
      <div className={styles['app-top-download']}>
        下载APP
      </div>
    </div>
  )
}
