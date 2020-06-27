import { useEffect } from 'react'
import { tools } from '@/utils'

export default function useScroll (
	selector: string,
	fn: (...args: any[]) => void,
	deps: any[]
) {
	const handleScroll = tools.throttle(function () {

	}, 100)
	useEffect(() => {
		const el = document.querySelector(selector)
		el.addEventListener('scroll', handleScroll)
		return () => {
			el.removeEventListener('scroll', handleScroll)
		}
	}, [])
}