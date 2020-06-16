declare module 'lyric-parser' {
	export = Lyric
	class Lyric {
		constructor(lyc: string, handler: (...args: any[]) => void) {}
		lines: Array<{time: number, txt: string}>
		curLine: number
		play(startTime?: number, skipLast?: boolean): void
		togglePlay(): void
		stop(): void
		seek(offset: number): void
	}
}
