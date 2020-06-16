import React, { useEffect, useRef, useState, RefObject } from 'react'

type UseTouch = (
	ref: RefObject<HTMLElement>,
	wrapper: RefObject<HTMLElement>,
	progress: RefObject<HTMLElement>,
	initPercent: number,
	...args: any[]
) => {
	percent: number
	setPercent: React.Dispatch<React.SetStateAction<number>>
}

const useTouch: UseTouch = (ref, wrapper, progress, initPercent) => {
	const wrapperRect = useRef<DOMRect>(null)
	const [percent, setPercent] = useState<number>(initPercent || 0)

	useEffect(() => {
		if (!ref || !ref.current) return
		wrapperRect.current = wrapper.current.getBoundingClientRect()
		const handleTouchMove = (e: TouchEvent) => {
			if (
				e.touches[0].clientX < wrapperRect.current.left ||
				e.touches[0].clientX > wrapperRect.current.right - 8
			)
				return
			if (e.touches[0].clientX < wrapperRect.current.left) {
				setPercent(0)
			} else if (e.touches[0].clientX > wrapperRect.current.right - 4) {
				setPercent(1)
			} else {
				setPercent(
					(e.touches[0].clientX - wrapperRect.current.left) /
						wrapperRect.current.width,
				)
			}
		}

		ref.current.addEventListener('touchmove', handleTouchMove)
		return () => {
			ref.current.removeEventListener('touchmove', handleTouchMove)
		}
	}, [ref.current, wrapper.current, progress.current])

	useEffect(() => {
		ref.current.style.left = `${(
			wrapperRect.current.width * initPercent
		).toFixed(2)}px`
		progress.current.style.width = `${(
			initPercent * wrapperRect.current.width +
			4
		).toFixed(2)}px`
	}, [initPercent, wrapperRect.current, ref.current, progress.current])

	return { percent, setPercent }
}

export default useTouch
