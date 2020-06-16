import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useAsynceffect } from '@/hooks'
import AudioControl from '@/components/base/AudioControl'
import { getMusicDetail, getLyric, getSongUrl } from '@/api'
import LyricParse from './_eslyric'
import DefaultImg from '@/assets/images/disc_default.png'
import styles from './style.module.scss'

export interface UseGetSongSource {
	(id: number): { lyricStr: string; url: string }
}
export interface UseLyricAction {
	(lyrics: string): { Lyric: LyricParse; line: number }
}
export interface UseGetSongDetail {
	(ids: number): any
}
export interface UseTogglePlay {
	(Lyric: LyricParse): {
		togglePlay: (status: boolean) => void
		playStyle: {
			transform: string
			animationPlayState: string
		}
	}
}

/**
 *获取歌曲作品详情
 *
 * @param {number} ids
 * @returns
 */
const useGetSongDetail: UseGetSongDetail = ids => {
	const [state, set] = useState<any>({})
	useAsynceffect(async () => {
		const result: any = await getMusicDetail(ids)
		set({ ...result.songs[0] })
	}, [ids])
	return state
}
/**
 *获取歌曲播放播放资源
 *获取歌词及播放url
 * @param {number} id 歌曲id
 * @returns
 */
const useGetSongSource: UseGetSongSource = id => {
	const [state, set] = useState<{ lyricStr: string; url: string }>({ lyricStr: '', url: '' })
	useAsynceffect(async () => {
		const result: [any, any] = await Promise.all([getLyric(id), getSongUrl(id)])
		set({
			lyricStr: result[0].lrc.lyric,
			url: result[1].data[0].url,
		})
	}, [id])
	return state
}
/**
 * 控制歌词高亮以及滚动行为
 *
 * @param {string} lyrics
 * @returns {{ Lyric: LyricParse; line: number }}
 */
const useLyricAction: UseLyricAction = lyrics => {
	const lyricInstance = useRef<LyricParse>(null)
	const [line, setLine] = useState<number>(0)
	useEffect(() => {
		lyricInstance.current = new LyricParse(lyrics, ({ lineNum }) => {
			if(lineNum === line) return;
			setLine(lineNum)
			if (lineNum <= 4) return;
			document
				.querySelector('#lyric')
				.scrollTo({ left: 0, top: (lineNum - 4) * 30, behavior: 'smooth' })
		})
	}, [lyrics])
	return { Lyric: lyricInstance.current, line }
}
/**
 *切换歌曲播放状态
 *
 * @param {*} Lyric
 * @returns
 */
const useTogglePlay: UseTogglePlay = Lyric => {
	const baseTrans = 'translate(calc(-50% + 32px), 0)'
	const [playStyle, setPlayStyle] = useState<{
		transform: string
		animationPlayState: string
	}>({
		transform: `${baseTrans} rotate(-18deg)`,
		animationPlayState: 'paused',
	})
	const togglePlay = useCallback(
		status => {
			setPlayStyle({
				transform: `${baseTrans} rotate(${status ? 0 : '-18'}deg)`,
				animationPlayState: status ? 'running' : 'paused',
			})
			if (!Lyric) return;
			status ? Lyric.play() : Lyric.stop()
		},
		[Lyric],
	)
	return { togglePlay, playStyle }
}

export default function Song(props: any) {
	const state = useGetSongDetail(props.match.params.id)
	const { lyricStr, url } = useGetSongSource(props.match.params.id)
	const { Lyric, line } = useLyricAction(lyricStr)
	const { playStyle, togglePlay } = useTogglePlay(Lyric)
	return (
		<div className={styles['song-wrapper']}>
			<div
				className={styles['song-background']}
				style={{ backgroundImage: `url(${state.al?.picUrl})` }}></div>
			<div className={styles['song-content']}>
				<div className={styles['song-needlebar']} style={{ transform: playStyle.transform }}></div>
				<div
					className={styles['song-disc-wrapper']}
					style={{ animationPlayState: playStyle.animationPlayState }}>
					<img
						src={state.al?.picUrl || DefaultImg}
						alt="poster"
						className={styles['song-disc-poster']}
					/>
				</div>
				<div className={styles['song-lyric-wrapper']}>
					<h5 className={styles['lyric-title']}>
						{state.name}
						<span style={{ margin: '0 4px' }}>-</span>
						<span>{state.ar?.reduce((t, c) => t.concat(c.name), []).join('/')}</span>
					</h5>
					<div className={styles['song-lyric-content']} id="lyric">
						<ul>
							{Lyric?.lines.map((lrc, i) => (
								<li key={i} className={i === line ? styles['high-light-lyric'] : ''}>
									{lrc.txt}
								</li>
							))}
						</ul>
					</div>
				</div>
				<AudioControl
					url={url}
					onPlayChange={togglePlay}
					onTimeUpdate={Lyric?.seek.bind(Lyric)}
					controls={false}
					className={styles['song-play-ctr']}
				/>
			</div>
			<div className={styles['song-logo']}></div>
		</div>
	)
}
