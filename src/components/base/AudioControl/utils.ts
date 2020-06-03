const formatNum = (n: number | string): string => {
	return n >= 10 ? '' + n : '0' + n
}

const formatTime = (timestamp: number, isDecimal = false) => {
	const timestamps = Math.round(timestamp) || 0
	let h = 0,
			m = 0,
			s = 0,
			ss = '0';
	if(timestamps >= 60) {
		h = timestamps >= 3600 ? Math.ceil(timestamps / 3600) : 0
		m = timestamps >= 3600 ? Math.ceil((timestamps % 3600) / 60) : Math.ceil(timestamp / 60)
		s = timestamps % 60
	}else {
		h = 0
		m = 0
		s = timestamps
	}

	ss = isDecimal ? (timestamp || 0.00).toFixed(2).split('.')[1] : '0'
	const timeStr = h > 0 ? `${formatNum(h)}:${formatNum(m)}:${s}` : `${formatNum(m)}:${formatNum(s)}`
	return !isDecimal ? timeStr : timeStr + '.' + formatNum(ss);
}

export {
	formatNum,
	formatTime
}