import React, { useState, useCallback, RefObject, useEffect, useRef } from 'react'
import { useAsynceffect } from '@/hooks'
import AudioControl from '@/components/base/AudioControl'
import { getMusicDetail, getLyric, getSongUrl } from '@/api'
import eslyric from './eslyric'
import DefaultImg from '@/assets/images/disc_default.png'
import styles from './style.module.scss'

// 获取歌曲信息详情
const useGetMusicDetail = (ids: number) => {
	const [state, set] = useState<any>({})
	useAsynceffect(async () => {
		const result: any = await getMusicDetail(ids)
		set({ ...result.songs[0] })
	}, [ids])
	return state
}

// 获取歌词和歌曲播放url地址
const useGetLyricAnURL = (id: number) => {
	const [state, set] = useState<{ lyric: Array<any>; url: string }>({ lyric: [], url: '' })
	useAsynceffect(async () => {
		const result: Array<any> = await Promise.all([getLyric(id), getSongUrl(id)])
		console.log(eslyric(result[0].lrc.lyric))
		set({
			lyric: eslyric(result[0].lrc.lyric),
			url: result[1].data[0].url,
		})
	}, [id])
	return state
}

// 控制高亮歌词
const useHighLight = (lyric: Array<{ t: string; c: string }>) => {
	const [line, setLine] = useState<number>(0)
	const changeHighLight = useCallback(
		(time: number) => {
			time = +time.toFixed(2)
			const index = lyric.findIndex((lrc, i, arr) => time > +lrc.t && time < +arr[i+1].t)
			console.log(index, time)
			setLine(index)
		},
		[lyric],
	)
	return { line, changeHighLight }
}

// 歌词容器滚动
const useLyricScroll = (ref: RefObject<HTMLUListElement>, line = 0) => {
	useEffect(() => {
		if (line <= 5) return
		ref.current.scrollTo({ left: 0, top: -(line - 5) * 24, behavior: 'smooth' })
	}, [line, ref.current])
}

// 切换播放状态
const useTogglePlay = () => {
	const [trans, setTrans] = useState<string>('translate(calc(-50% + 32px), 0) rotate(-18deg)')
	const togglePlay = useCallback(playStatus => {
		setTrans(`translate(calc(-50% + 32px), 0) rotate(${playStatus ? 0 : '-18'}deg)`)
	}, [])
	return { togglePlay, trans }
}

const Song = (props: any) => {
	const lyricWrapper = useRef(null)
	const state = useGetMusicDetail(props.match.params.id)
	const { lyric, url } = useGetLyricAnURL(props.match.params.id)
	const { line, changeHighLight } = useHighLight(lyric)
	const { trans, togglePlay } = useTogglePlay()
	const posterImg = state.al?.picUrl || DefaultImg
	useLyricScroll(lyricWrapper, line)
	// console.log(line)
	return (
		<div className={styles['song-wrapper']}>
			<div
				className={styles['song-background']}
				style={{ backgroundImage: `url(${state.al?.picUrl})` }}></div>
			<div className={styles['song-content']}>
				<div className={styles['song-needlebar']} style={{ transform: trans }}></div>
				<div className={styles['song-disc-wrapper']}>
					<img src={posterImg} alt="poster" className={styles['song-disc-poster']} />
				</div>
				<div className={styles['song-lyric-wrapper']}>
					<h5 className={styles['lyric-title']}>
						{state.name}
						<span style={{ margin: '0 4px' }}>-</span>
						<span>{state.ar?.reduce((t, c) => t.concat(c.name), []).join('/')}</span>
					</h5>
					<div className={styles['song-lyric-content']} ref={lyricWrapper} >
						<ul >
							{lyric.map((lrc, i) => (
								<li key={i} className={i === line ? styles['high-light-lyric'] : ''}>
									{lrc.c}
								</li>
							))}
						</ul>
					</div>
				</div>
				<AudioControl
					url={url}
					onPlayChange={togglePlay}
					onTimeUpdate={changeHighLight}
					controls={false}
					className={styles['song-play-ctr']}
				/>
			</div>
			<div className={styles['song-logo']}></div>
		</div>
	)
}

export default Song
