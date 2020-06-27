import { useEffect, useReducer, useCallback, useRef } from 'react'

type Action = {
	type: 'currentTimeStamp' | 'timeStamp' | 'canPlay' | 'isPlaying' | 'end'
	payload?: any
}

const initState = {
	currentTimeStamp: 0,
	timeStamp: 0,
	canPlay: false,
	isPlaying: false,
	end: false
}

const createAudio = (src: string) => {
	const Audio = document.createElement('audio')
	Audio.src = src
	Audio.controls = false
	return Audio
}

const reducer = (state: typeof initState, action: Action) => {
	switch (action.type) {
		case 'currentTimeStamp':
			return { ...state, currentTimeStamp: action.payload }
		case 'timeStamp':
			return { ...state, timeStamp: action.payload }
		case 'canPlay':
			return { ...state, canplay: action.payload }
		case 'isPlaying':
			return { ...state, isPlaying: action.payload }
		case 'end':
			return {...state, end: true}
		default:
			return state
	}
}

export default function useAudioPlay(url: string, fn?: (...args: any[]) => void) {
	const [state, audioDispatch] = useReducer(reducer, initState)
	const Audio = useRef<HTMLAudioElement>(null)
	useEffect(() => {
		Audio.current = createAudio(url)
	}, [url])
	function onCanplay() {
		audioDispatch({ type: 'timeStamp', payload: Audio.current.duration })
		audioDispatch({ type: 'canPlay', payload: true })
	}
	function onEnded() {
		audioDispatch({ type: 'end'})
	}
	function onPlay() {
		audioDispatch({ type: 'currentTimeStamp', payload: Audio.current.currentTime })
		audioDispatch({ type: 'canPlay', payload: true })
	}
	function onPause() {
		audioDispatch({ type: 'isPlaying', payload: false })
	}
	function onTimeupdate() {
		if (!state.isPlaying) return
		fn && fn.call(null, Audio.current.currentTime * 1000)
		audioDispatch({ type: 'currentTimeStamp', payload: Audio.current.currentTime })
	}

	useEffect(() => {
		Audio.current.addEventListener('canplay', onCanplay)
		Audio.current.addEventListener('ended', onEnded)
		Audio.current.addEventListener('playing', onPlay)
		Audio.current.addEventListener('pause', onPause)
		Audio.current.addEventListener('timeupdate', onTimeupdate)
		return () => {
			Audio.current.removeEventListener('canplay', onCanplay)
			Audio.current.removeEventListener('ended', onEnded)
			Audio.current.removeEventListener('play', onPlay)
			Audio.current.removeEventListener('pause', onPause)
			Audio.current.removeEventListener('timeupdate', onTimeupdate)
		}
	}, [url, state.isPlaying])

	const togglePlay = useCallback(
		(payload: boolean) => {
			if (payload) {
				Audio.current.play()
			} else {
				Audio.current.pause()
			}
			audioDispatch({ type: 'isPlaying', payload })
		},
		[audioDispatch],
	)
	return { state, Audio, togglePlay }
}
