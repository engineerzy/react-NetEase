import React from 'react';
import { Link } from 'react-router-dom'
import PlayCount from '../PlayCount'
import styles from './style.module.scss';

type Props = {
  id: number;
  name: string;
  count: number;
  url: string;
  [propName: string]: any;
}

export default function SongRemd (props: Props) {
  const { count, url, name, id } = props
  return (
      <Link to={`/playlist/${id}`} className={styles['g-songsheet-wrapper']}>
        <div className={styles['g-songsheet-pic']}>
          <img src={url} alt="背景图"/>
          <PlayCount  count={count} />
        </div>
        <p className={styles['g-songsheet-text']}>{name}</p>
      </Link>
  )
}

SongRemd.defaultProps = {
  id: '',
  name: '',
  count: 0,
  url: ''
}
