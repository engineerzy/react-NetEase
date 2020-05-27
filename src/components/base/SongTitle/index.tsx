import React from 'react'
import styles from './style.module.scss'

export type SongTitle = {
	name: string;
	author: Array<any>
	album: string
	quality?: string
}
export default function SongTitle(props: SongTitle) {
	const { name, author = [], album } = props
	const authors = author.reduce((s, t) => s.concat(t.name), [])
	return (
		<div className={styles['g-songtitle-wrapper']}>
			<div className={styles['g-songtitle-left']}>
				<div className={styles['songtitle-left-name']}>{name}</div>
				<div className={styles['songtitle-left-info']}>
					{
						props.quality === "EP/Single" && <i></i>
					}
					{authors.join('/')}
					-
					{album}
				</div>
			</div>
			<div className={styles['g-songtitle-right']}>
				<span className={styles['g-songtitle-play']}></span>
			</div>
		</div>
	)
}

SongTitle.defaultProps = {
	name: '',
	author: [],
	album: '',
	quality: '',
}
