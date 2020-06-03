import React from 'react'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

export type SongTitle = {
	name: string;
	author: Array<any>
	album: string
	id: number,
	quality?: number
}
export default function SongTitle(props: SongTitle) {
	const { name, author = [], album, id } = props
	const authors = author.reduce((s, t) => s.concat(t.name), [])
	return (
		<Link to={`/song/${id}`} className={styles['g-songtitle-wrapper']}>
			<div className={styles['g-songtitle-left']}>
				<div className={styles['songtitle-left-name']}>{name}</div>
				<div className={styles['songtitle-left-info']}>
					{
						props.quality === 4 && <i></i>
					}
					{authors.join('/')}
					-
					{album}
				</div>
			</div>
			<div className={styles['g-songtitle-right']}>
				<span className={styles['g-songtitle-play']}></span>
			</div>
		</Link>
	)
}

SongTitle.defaultProps = {
	name: '',
	author: [],
	album: '',
	id: 0,
	quality: '',
}
