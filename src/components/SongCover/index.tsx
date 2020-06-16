import React from 'react'
import styles from './songcover.module.scss'

export interface Props {
	url: string
	name: string
	id: number
	alias: string[]
	artist?: any[]
}

export default function SongCover(props: Props) {
	const { url, name, id, alias, artist } = props
	return (
		<a className={styles['songcover-wrapper']}>
			<figure className={styles['songcover-img']}>
				<img src={url} alt="cover" />
			</figure>
			<div className={styles['songcover-content']}>
				<p className={styles['songcover-content-name']}>
					{name}
					{alias && alias.length >= 1 && `(${alias.join('/')})`}
				</p>
				{artist && artist.length >= 1 && (
					<span style={{ fontSize: '12px' }}>{artist[0].name}</span>
				)}
			</div>
			<i className={`iconfont iconenter ${styles['songcover-icon']}`}></i>
		</a>
	)
}

SongCover.defaultProps = {
	url: '',
	name: '',
	id: 0,
	alias: [],
	artist: [],
}
