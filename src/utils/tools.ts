export const debounce = (fn: (...args: any[]) => any, wait = 500) => {
	let timer = null
	return function (e) {
		clearTimeout(timer)
		e.persist && e.persist();
		const context = this
		const args = arguments
		timer = setTimeout(() => {
			fn.apply(context, args)
		}, wait);
	}
}