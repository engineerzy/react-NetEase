export default function eslyric (str: string): Array<{t: string, c: string}> {
	const medises = str.split('\n')
	return medises.reduce((arr, c) => {
		const t = c.substring(c.indexOf("[") + 1, c.indexOf("]"));
		const m = isNaN(+t.split(":")[0]) ? 0 : +t.split(":")[0]
		const s = isNaN(+t.split(":")[1]) ? 0 : +t.split(":")[1]
		return arr.concat({
			t: (m * 60 + parseFloat(s + '')).toFixed(2),
			c: c.substring(c.indexOf("]") + 1, c.length)
		})
	}, [])
}
