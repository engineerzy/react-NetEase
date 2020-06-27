import { useEffect, useRef, useState, RefObject } from 'react'

type IDirectionX = 'stay' | 'left' | 'right'

type IDirectionY = 'stay' | 'up' | 'down'

type IAxis = 'horizontal' | 'vertical'

type IDistance = {
	startX: number,
	endX: number,
	startY: number,
	endY: number
}
interface ITouchMove {
	directionX: IDirectionX,
	directionY: IDirectionY
	distanceX: number,
	distanceY: number
}

interface IPayload {
	ref: RefObject<HTMLElement>,
	axis?: IAxis

}

const countDistance = (distances: IDistance): { distanceX: number, distanceY: number } => {
	return {
		distanceX: distances.endX - distances.startX,
		distanceY: distances.endY - distances.startY,
	}
}

const useTouch = ({ ref, axis = 'vertical' }: IPayload): ITouchMove => {
	const touchPosi = useRef<IDistance>({
		startY: 0,
		endY: 0,
		startX: 0,
		endX: 0
	})
	const [touchInfo, setTouchInfo] = useState<ITouchMove>({
		directionX: 'stay',
		directionY: 'stay',
		distanceX: 0,
		distanceY: 0
	})

	useEffect(() => {
		const handleTouchStart = (e: TouchEvent) => {
			touchPosi.current.startX = e.touches[0].clientX
			touchPosi.current.startY = e.touches[0].clientY
		}

		const handleTouchMove = (e: TouchEvent) => {
			touchPosi.current.endX = e.touches[0].clientX
			touchPosi.current.endY = e.touches[0].clientY
			const { distanceY, distanceX } = countDistance(touchPosi.current)
			if (axis === 'horizontal') {
				ref.current.style.transform = `translateX(${distanceX}px)`
			} else if (axis === 'vertical') {
				ref.current.style.transform = `translateY(${distanceY}px)`
			}
		}

		const handleTouchEnd = () => {
			const { distanceY, distanceX } = countDistance(touchPosi.current)
			if (axis === 'horizontal') {
				ref.current.style.transform = `translateX(0px)`
			} else if (axis === 'vertical') {
				ref.current.style.transform = `translateY(0px)`
			}
			setTouchInfo({
				distanceX,
				distanceY,
				directionX: distanceX === 0 ? 'stay' : distanceX > 0 ? 'right' : 'left',
				directionY: distanceY === 0 ? 'stay' : distanceY > 0 ? 'down' : 'up'
			})
		}

		if (!ref || !ref.current) return;
		ref.current.addEventListener('touchstart', handleTouchStart)
		ref.current.addEventListener('touchmove', handleTouchMove)
		ref.current.addEventListener('touchend', handleTouchEnd)
		return () => {
			ref.current.removeEventListener('touchstart', handleTouchStart)
			ref.current.removeEventListener('touchmove', handleTouchMove)
			ref.current.removeEventListener('touchend', handleTouchEnd)
		};
	}, [ref])

	return { ...touchInfo }
}

export default useTouch