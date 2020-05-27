import React from 'react'
import styles from './style.module.scss'

type Props = {
	count: number
}

function countFilter(num: number) {
	const numStr = '' + num
	if (numStr.length <= 5) {
		return num
	} else if (5 < numStr.length && numStr.length < 9) {
		return +numStr.slice(0, numStr.length - 3) / 10 + '万'
	} else if (numStr.length >= 9) {
		return +numStr.slice(0, numStr.length - 7) / 10 + '亿'
	}
}

export default function PlayCount(props: Props) {
	const { count } = props
	return (
		<span className={styles['g-songsheet-count']}>
			<span className={styles['g-songsheet-icon']}></span>
			<span>{countFilter(count)}</span>
		</span>
	)
}

PlayCount.defaultProps = {
	count: 0,
}
