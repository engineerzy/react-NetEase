import React, { useState } from 'react'
import { getTopList } from '@/api'
import { useAsynceffect } from '@/hooks'
import SongTitleIndex from '@/components/base/SongTitleIndex'
import AsyncLoading from '@/components/AsyncLoading'
import styles from './style.module.scss'

function formatTime(time: number): string {
	if (!!!time) return
	const date = new Date(time)
	let month = ('0' + (date.getMonth() + 1)).slice(-2),
		sdate = ('0' + date.getDate()).slice(-2)
	return month + '月' + sdate + '日'
}

const useGetHotTopList = () => {
	const [state, set] = useState<any>({})
	useAsynceffect(async () => {
			const result: any = await getTopList(1)
			set(result.playlist)
	}, [])
	return state
}

export default function Hot() {
	const state = useGetHotTopList()
	return (
		<>
			<div className={styles['hot-top-wrapper']}>
				<div className={styles['hot-logo']}></div>
				<p className={styles['hot-update-time']}>
					更新日期: {formatTime(state.updateTime)}
				</p>
			</div>
			<AsyncLoading className={styles['hot-list-wrapper']} type="bars" width={60} height={60} isComplete={state.tracks?.length > 0}>
				<ul>
					{state.tracks?.slice(0, 20).map((track, index) => (
						<SongTitleIndex
							key={track.id}
							id={track.id}
							name={track.name}
							ar={track.ar || []}
							album={track.name}
							quality={track.type}
							index={index}
							isRank
							isColor
						/>
					))}
				</ul>
			</AsyncLoading>
		</>
	)
}
