import React, { useEffect, useReducer } from 'react'
import Top from '@/components/base/Top'
import NarBar from '@/components/base/NarBar'
import TagTitle from '@/components/base/TagTitle'
import SongRemd from '@/components/base/SongRemd'
import SongTitle from '@/components/base/SongTitle'
import Footer from '@/components/base/Footer'
import { getRecommends, getNewSong } from '@/api'
import Toast from '@/components/base/Toast'
import styles from './style.module.scss'

type Action = {
	type: 'sheet' | 'album'
	payload: any
}
const reducer = (state: any, action: Action) => {
	switch (action.type) {
		case 'sheet':
			return { ...state, sheet: action.payload }
		case 'album':
			return { ...state, album: action.payload }
		default:
			break
	}
}
const initState = {
	sheet: [],
	album: [],
}
const useGetRecommends = () => {
	const [state, dispatch] = useReducer(reducer, initState)
	useEffect(() => {
		Promise.all([getRecommends(), getNewSong()])
			.then((res: any) => {
				dispatch({ type: 'sheet', payload: res[0].result.slice(0, 6) })
				dispatch({ type: 'album', payload: res[1].result.slice(0, 10) })
			})
			.catch(err => {
				Toast.error({content: '出错啦！'})
				console.log('err ==>', err)
			})
	}, [])
	return { state, dispatch }
}

export default function Home() {
	const { state } = useGetRecommends()
	return (
		<>
			<Top />
			<NarBar />
			<div className={styles['home-content-wrapper']}>
				<TagTitle title="推荐歌单" />
				<div className={styles['home-content-main']}>
					{state.sheet.map((item, index) => (
						<SongRemd 
							key={index} 
							id={item.id} 
							name={item.name} 
							url={item.picUrl} 
							count={item.playCount} 
						/>
					))}
				</div>
				<TagTitle title="最新音乐" />
				<div className={styles['home-content-album']}>
					{state.album.map((item, index) => (
						<SongTitle
							key={index}
							id={item.id}
							name={item.name}
							author={item.song.artists || []}
							album={item.name}
							quality={item.type}
						/>
					))}
				</div>
				<Footer />
			</div>
		</>
	)
}
