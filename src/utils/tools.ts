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

export const throttle = (fn: (...args: any[]) => any, wait = 100) => {
	let timer = null
	let start = new Date().getTime()
	return function () {
		let now = new Date().getTime()
		let context = this
		let args = arguments
		timer && clearTimeout(timer)
		if(now - start > wait) {
			fn.apply(context, [...args])
			start = now
		}else {
			timer = setTimeout(() => {
				fn.apply(context, [...args])
			}, wait);
		}
	}
}

export const storage = {
	getLocalStorage <T>(key: string): T {
		const store = window.localStorage.getItem(key)
		return store ? JSON.parse(store) : null
	},
	setLocalStorage(key: string, payload: any) {
		window.localStorage.setItem(key, JSON.stringify(payload))
	},
	removeLocalStorage(key: string) {
		window.localStorage.removeItem(key)
	}
}