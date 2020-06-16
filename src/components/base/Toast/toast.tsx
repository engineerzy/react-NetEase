import React from 'react'
import styles from './style.module.scss'

const iconTypes = {
	error: 'iconclose',
	success: 'iconsuccess',
	warning: 'iconprompt',
}

export type Props = {
	content: string
	duration?: number
	mask?: boolean
	type?: string
}
export default function Toast(props: Props) {
	const { type, content, mask } = props
	const icon = iconTypes[type]
	return (
		<>
			<div className={styles['g-toast-content']}>
				{type && (
					<div className={styles['g-toast-icon']}>
						<i className={`iconfont ${icon}`} style={{ fontSize: '36px' }}></i>
					</div>
				)}
				<p>{content}</p>
			</div>
			{mask && <div className={styles['g-toast-mask']}></div>}
		</>
	)
}

Toast.defaultProps = {
	content: '错误',
	mask: false,
}
