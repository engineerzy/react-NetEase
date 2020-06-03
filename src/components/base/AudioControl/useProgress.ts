import { useEffect, useRef, RefObject } from 'react'

type UseTouch = (
	fn: (...args: any[]) => void,
	inputs: [
		RefObject<HTMLElement>,
		RefObject<HTMLElement>,
		RefObject<HTMLElement>,
		number
	]
) => {
	percent: number
}

const useTouch: UseTouch = (fn, [ref, wrapper, progress, currentPercent]) => {
	const wrapperRect = useRef<DOMRect>(null)
	const isTouching = useRef<boolean>(false)
	const percentRef = useRef<number>(0)
	const handlePercentWidth = (percent: number): void => {
		ref.current.style.left = `${(wrapperRect.current.width * percent).toFixed(2)}px`
		progress.current.style.width = `${(percent * wrapperRect.current.width + 4).toFixed(2)}px`
	}

	function onTouchStart() {
		isTouching.current = true
	}
	function onTouchEnd() {
		isTouching.current = false
		fn.call(this, percentRef.current)
	}
	function onTouchMove(e: TouchEvent) {
		if (
			e.touches[0].clientX < wrapperRect.current.left ||
			e.touches[0].clientX > wrapperRect.current.right - 8
		)
			return
		if (e.touches[0].clientX < wrapperRect.current.left) {
			percentRef.current = 0
		} else if (e.touches[0].clientX > wrapperRect.current.right - 4) {
			percentRef.current = 1
		} else {
			percentRef.current = (e.touches[0].clientX - wrapperRect.current.left) / wrapperRect.current.width
		}
	}

	useEffect(() => {
		if (!ref || !ref.current) return
		wrapperRect.current = wrapper.current.getBoundingClientRect()
		ref.current.addEventListener('touchstart', onTouchStart)
		ref.current.addEventListener('touchend', onTouchEnd)
		ref.current.addEventListener('touchmove', onTouchMove)
		return () => {
			ref.current.removeEventListener('touchstart', onTouchStart)
			ref.current.removeEventListener('touchmove', onTouchMove)
			ref.current.removeEventListener('touchend', onTouchEnd)
		}
	}, [ref.current, wrapper.current, progress.current])

	useEffect(() => {
		if(!isTouching.current) {
			percentRef.current = currentPercent
		}
		handlePercentWidth(isTouching.current ? percentRef.current : currentPercent)
	}, [currentPercent, percentRef.current])
	return { percent: percentRef.current }
}

export default useTouch
