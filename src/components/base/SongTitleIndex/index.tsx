import React from 'react'
import SongTitle from '../SongTitle'
import styles from './rew.module.scss'

export interface Props {
	id: number
	name: string
	ar: any[]
	album: string
	quality: string
	index?: number
	isRank?: boolean
	isColor?: boolean
}

const colorStyles = (isRank: boolean, isColor: boolean, index: number) => {
	if(isRank && isColor) {
		return index < 3 ? {color: '#df3436'}: {color: 'rgb(153, 153, 153)'}
	}else if (isRank && !isColor){
		return {color: 'rgb(153, 153, 153)'}
	}else {
		return null;
	}
}

const formatIndex = (index: number) => {
	return index < 10 ? '0' + index : index
}

export default function SongTitleIndex(props: Props) {
	return (
		<div className={styles['index-item-wrapper']} key={props.index}>
			{props.isRank && (
				<div
					className={styles['index-item-index']}
					style={colorStyles(props.isRank, props.isColor, props.index)}>
					{formatIndex(props.index + 1)}
				</div>
			)}
			<SongTitle
				id={props.id}
				name={props.name}
				author={props.ar}
				album={props.name}
			/>
		</div>
	)
}

SongTitleIndex.defaultProps = {
	id: 0,
	name: '',
	ar: [],
	index: 0,
	quality: '',
	isRank: false,
	isColor: false
}
