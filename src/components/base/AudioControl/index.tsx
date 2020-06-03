import React, { useRef, useCallback } from 'react'
import useProgress from './useProgress'
import useAudio from './useAudio'
import styles from './style.module.scss'
import PlayPng from '@/assets/images/playbar.png'
import { formatTime } from './utils'

export type Audiocontrol = {
	url: string
	controls?: boolean
	className?: string
	onPlayChange?: (...args: any[]) => void
	onTimeUpdate?: (...args: any[]) => void
}

export default function AudioControl(props: Audiocontrol) {
	const point = useRef<HTMLElement>(null)
	const progress = useRef<HTMLDivElement>(null)
	const wrapper = useRef<HTMLDivElement>(null)
	const { state, Audio, togglePlay } = useAudio(props.url, props.onTimeUpdate)
	const useTogglePlay = useCallback(
		() => {
			togglePlay(!state.isPlaying)
			props.onPlayChange && props.onPlayChange(!state.isPlaying)
		},
		[state.isPlaying],
	)
	const { percent } = useProgress((val) => {
		Audio.current.currentTime = Audio.current.duration * val
	}, [point, wrapper, progress, Audio.current?.currentTime / Audio.current?.duration || 0])
	
	return (
		<div className={`${styles['control-wrapper']} ${props.className}`}>
			<div className={styles['progress-wrapper']}>
				<span>{formatTime(Audio.current?.duration * percent|| 0)}</span>
				<div className={styles['progress-main-wrapper']} ref={wrapper}>
					<div className={styles['progress-content']}></div>
					<div className={styles['progress-mask']} ref={progress}></div>
					<span className={styles['progress-current']} ref={point}></span>
				</div>
				<span>{formatTime(state.timeStamp)}</span>
			</div>
			<div className={styles['control-main']}>
				<div></div>
				<div className={styles['control-main-center']}>
					<div className={styles['center-prev']}></div>
					<div
						className={styles['center-play']}
						onClick={useTogglePlay}
						style={{
							background: `url(${PlayPng}) 0 ${state.isPlaying ? '-166px' : '-205px'}`,
						}}></div>
					<div className={styles['center-next']}></div>
				</div>
				<div></div>
			</div>
		</div>
	)
}

AudioControl.defaultProps = {
	url: '',
	controls: false,
}
