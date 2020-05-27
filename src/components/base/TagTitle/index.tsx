import React from 'react';
import styles from './style.module.scss';

interface Props  {
  title?: string;
  fontSize?: number;
  color?: string;
  children?: any;
}

export default function TagTitle (props: Props) {
  const style = {
    fontSize: props.fontSize + 'px',
    color: props.color
  }
  return (
    <h2 style={style} className={styles['tag-title']}>
      { props.title }
    </h2>
  )
}

TagTitle.defaultProps = {
  title: '',
  fontSize: 16,
  color: '#333333',
  children: null
}
