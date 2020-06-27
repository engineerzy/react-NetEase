import React from 'react'
import styles from './style.module.scss'

export default function Footer() {
	return (
		<div className={styles['footer-wrapper']}>
			<h5>
				<i
					className="iconfont iconwangyiyun"
					style={{ fontSize: '38px', color: '#cc2b29' }}></i>
				网易云音乐
			</h5>
			<p className={styles['copyright']}>
				提莫队长版权所有©侏罗纪-白垩纪 由提莫队长独立运营-
			</p>
		</div>
	)
}
