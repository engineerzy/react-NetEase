import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Tag from '@/components/base/Tag'
import PlayCount from '@/components/base/PlayCount'
import Avatar from '@/components/base/Avatar'
import SongTitle from '@/components/base/SongTitle'
import { useAsynceffect } from '@/hooks'
import { getSongSheetDetail } from '@/api'
import styles from './style.module.scss'

type Action = {
	type: string
	payload: any
}

const isOverWrapper = (content: string, limit = 118) => {
	if (content === '') return false
	const div = document.createElement('div')
	div.innerHTML = content
	document.querySelector('body').appendChild(div)
	const isOver = div.clientHeight >= limit
	document.querySelector('body').removeChild(div)
	return isOver
}

const useExpand = (content: string) => {
	const [showExpand, setExpand] = useState<boolean>(false)
	const [icon, set] = useState<boolean>(false)
	const setIcon = useCallback(() => set(c => !c), [])
	useEffect(() => {
		if (isOverWrapper(content)) {
			setExpand(true)
		}
	}, [content])

	return { showExpand, setIcon, icon }
}

const reducer = (state: any, action: Action) => {
	switch (action.type) {
		case 'detail':
			return { ...state, detail: action.payload }
		default:
			return state
	}
}

const initState = {
	detail: [],
}

const useGetSheetDetail = (id: number) => {
	const [state, dispatch] = useReducer(reducer, initState)
	useAsynceffect(async () => {
		const result: any = await getSongSheetDetail(id)
		dispatch({ type: 'detail', payload: result.playlist })
	}, [id])
	return { state, dispatch }
}

export default function Playlist(props: RouteComponentProps<{id: string}>) {
	const { state } = useGetSheetDetail(+props.match.params.id)
	const htmlStr = state.detail?.description?.replace(/\n/g, '<br />')
	const { showExpand, icon, setIcon } = useExpand(htmlStr || '')

	return (
		<div className={styles['playlist-wrapper']}>
			<div className={styles['playlist-poster-cover']}>
				<div
					style={{
						backgroundImage: `url(${state.detail.coverImgUrl})`,
					}}
					className={styles['playlist-poster-filter']}></div>
				<div className={styles['playlist-poster-left']}>
					<img src={state.detail.coverImgUrl} alt="背景图" />
					<PlayCount count={state.detail.playCount} />
					<span className={styles['playlist-poster-tag']}>歌单</span>
				</div>
				<div className={styles['playlist-poster-right']}>
					<h5 className={styles['playlist-poster-title']}>{state.detail.name}</h5>
					<Avatar
						name={state.detail?.creator?.nickname}
						url={state.detail?.creator?.avatarUrl}
						id={state.detail?.creator?.userId}
					/>
				</div>
			</div>
			<div className={styles['playlist-introduction']}>
				<p className={styles['introduction-paragraph']}>
					<span>标签:</span>
					{state.detail?.tags?.map((tag, i) => (
						<Tag content={tag} key={i} />
					))}
				</p>
				<div
					className={`${styles['introduction-paragraph']} ${icon ? '' : styles['paragraph-flod']}`}>
					<span>简介:</span>
					<span dangerouslySetInnerHTML={{ __html: htmlStr }}></span>
				</div>
				{showExpand && (
					<i className={`iconfont ${icon ? 'iconpackup' : 'iconunfold'}`} onClick={setIcon}></i>
				)}
			</div>
			<div className={styles['playlist-song-content']}>
				<h3>歌曲列表</h3>
				<div>
					{state.detail.tracks?.map((item, i) => (
						<div className={styles['song-item-wrapper']} key={i}>
							<div className={styles['song-item-index']}>{i + 1}</div>
							<SongTitle id={item.id} name={item.name} author={item.ar} album={item.name} />
						</div>
					))}
				</div>
			</div>
			<div></div>
		</div>
	)
}

