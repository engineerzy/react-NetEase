import React, { memo, useEffect } from 'react'
import Styles from './history.module.scss'

export interface Props {
	historys: string[]
	onClickItem?: (his: string) => void
	onClearItem?: (his: string) => void
}


function SearchHistory(props: Props) {
	const { historys, onClickItem, onClearItem } = props
	return (
		<ul className={Styles['history-wrapper']}>
			{historys &&
				historys.map(his => (
					<li className={Styles['history-item']} key={his}>
						<span className={Styles['icon-time']}>
							<i className="iconfont iconshizhenkaifajishi "></i>
						</span>
						<div
							className={Styles['history-item-name']}
						>
							<p onClick={() => onClickItem(his)}>{his}</p>
							<i
								className="iconfont iconclose close"
								onClick={() => onClearItem(his)}></i>
						</div>
					</li>
				))}
		</ul>
	)
}

SearchHistory.defaultProps = {
	historys: [],
}
export default memo(SearchHistory)
