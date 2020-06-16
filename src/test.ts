let s: string = 'rwr';

String.prototype.sayhi = function () {
	return '424'
}
type Index = {
	0: string,
	1: number,
	2?: number,
	[index: number]: any,
}
interface A {
	kind: 'a',
	width: number
}
interface B {
	kind: 'b',
	height: number
}
interface C {
	kind: 'c',
	area: number
}
type D = A | B | C
function area (s: D): boolean {
	if(s.kind === 'a') {
		return s.width > 0
	}else if(s.kind === 'b') {
		return s.height > 0
	}else if(s.kind === 'c') {
		return s.area > 0
	}
	const exhault: never = s
}
type E = keyof A
let c: Index = ['432', 4]
let d: Index = ['534',5]
function getTwo (a: number, b: number, c: number, ...args: any[]) {
	return 'rewr'
}

getTwo(5,6,7,65)