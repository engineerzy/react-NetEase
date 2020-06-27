import React, { PropsWithChildren } from 'react'
import TreeDots from '@/assets/images/three-dots.svg'
import Spinning from '@/assets/images/spinning.svg'
import TailSpin from '@/assets/images/tail-spin.svg'
import Bars from '@/assets/images/bars.svg'
import Styles from './asyncloading.module.scss'

const types = {
	'three-dots': TreeDots,
	'spinning': Spinning,
	'tail-spin': TailSpin,
	'bars': Bars,
}

export type SvgType = keyof typeof types
export interface Props {
	isComplete: boolean
	type?: SvgType
	width?: number
	height?: number,
	className?: string
}
export default function AsyncLoading(props: PropsWithChildren<Props>) {
	return (
		<div className={`${Styles['async-loading-wrapper']} ${props.className}`}>
			{props.isComplete ? (
				props.children
			) : (
				<img className={Styles['async-icon']} src={types[props.type]} alt="icon" />
			)}
		</div>
	)
}

AsyncLoading.defaultProps = {
	isComplete: true,
	type: 'bars',
	width: 30,
	height: 36,
	className: ''
}
