const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g

const STATE_PAUSE = 0
const STATE_PLAYING = 1

const tagRegMap = {
	title: 'ti',
	artist: 'ar',
	album: 'al',
	offset: 'offset',
	by: 'by',
}
interface ILyric {
	// constructor(lyc: string, handler: (...args: any[]) => void): any
	lines: Array<{ time: number, txt: string }>
	play(startTime?: number, skipLast?: boolean): void
	togglePlay(): void
	stop(): void
	seek(offset: number): void
}

function noop() {}

export default class Lyric implements ILyric {
	private pauseStamp: number
	private timer: NodeJS.Timeout
	private startStamp: number
	public lrc: string
	public tags: object
	public lines: Array<{ time: number; txt: string }>
	public state: number
	public curNum: number
	public handler: (...args: any[]) => void

	constructor(
		lrc: string,
		hanlder: ({ lineNum, txt }: { lineNum: number; txt: string }) => void = noop,
	) {
		this.lrc = lrc
		this.tags = {}
		this.lines = []
		this.handler = hanlder
		this.state = STATE_PAUSE
		this.curNum = 0
		this.init()
	}

	private init() {
		this.initTag()
		this.initLines()
	}

	private initTag() {
		for (let tag in tagRegMap) {
			const matches = this.lrc.match(new RegExp(`\\[${tagRegMap[tag]}:([^\\]]*)]`, 'i'))
			this.tags[tag] = (matches && matches[1]) || ''
		}
	}

	private initLines() {
		const lines = this.lrc.split('\n')
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i]
			let result = timeExp.exec(line)
			if (result) {
				const txt = line.replace(timeExp, '').trim()
				if (txt) {
					this.lines.push({
						time: +result[1] * 60 * 1000 + +result[2] * 1000 + (+result[3] || 0) * 10,
						txt,
					})
				}
			}
		}

		this.lines.sort((a, b) => {
			return a.time - b.time
		})
	}

	private findCurNum(time: number) {
		for (let i = 0; i < this.lines.length; i++) {
			if (time <= this.lines[i].time) {
				return i
			}
		}
		return this.lines.length - 1
	}

	private callHandler(i: number) {
		if (i < 0) {
			return
		}
		this.handler({
			txt: this.lines[i].txt,
			lineNum: i,
		})
	}

	private playRest() {
		let line = this.lines[this.curNum]
		let delay = line.time - (+new Date() - this.startStamp)

		this.timer = setTimeout(() => {
			this.callHandler(this.curNum++)
			if (this.curNum < this.lines.length && this.state === STATE_PLAYING) {
				this.playRest()
			}
		}, delay)
	}

	public play(startTime = 0, skipLast?: boolean) {
		if (!this.lines.length) {
			return
		}
		this.state = STATE_PLAYING

		this.curNum = this.findCurNum(startTime)
		this.startStamp = +new Date() - startTime

		if (!skipLast) {
			this.callHandler(this.curNum - 1)
		}

		if (this.curNum < this.lines.length) {
			clearTimeout(this.timer)
			this.playRest()
		}
	}

	public togglePlay() {
		let now = +new Date()
		if (this.state === STATE_PLAYING) {
			this.stop()
			this.pauseStamp = now
		} else {
			this.state = STATE_PLAYING
			this.play((this.pauseStamp || now) - (this.startStamp || now), true)
			this.pauseStamp = 0
		}
	}

	public stop() {
		this.state = STATE_PAUSE
		clearTimeout(this.timer)
	}

	public seek(offset: number) {
		this.play(offset)
	}
}
