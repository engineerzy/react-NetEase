import React from 'react'
import styles from './style.module.scss'

type Props = {
	name: string
	url: string
	id?: any
}
export default function Avatar(props: Props) {
	return (
		<div className={styles['avatar-wrapper']}>
			<img src={props.url} alt="" className={styles['avatar-img']} />
			<p className={styles['avatar-name']}>{props.name}</p>
		</div>
	)
}

Avatar.defaultProps = {
	name: '',
	url: ''
}
