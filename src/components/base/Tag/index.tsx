import React from 'react'
import styles from './style.module.scss'

type Props = {
	content: string
}
export default function Tag (props: Props) {
	return (
		<span className={styles['g-tag-wrapper']}>
			{ props.content }
		</span>
	)
}

Tag.defaultProps = {
	content: ''
}
