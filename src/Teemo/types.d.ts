export interface Action<T = string | number> {
	type: T,
	payload?: any
}
export interface Commit {
	(action?: Action): void
}
export interface Dispatch {
	<R>(action: Action): Promise<R | void>
}

export interface Reducer {
	<T, S>(state: S, action: Action): S
}

export interface Reducers {
	[key: string | number]: Reducer
}

export interface Effect {
	<T, S>(
		payload: any,
		store: { state: S; commit: (action: Action) => void },
	): Promise<T | void>
}

export interface Effects {
	[key: string | number]: Effect 
}

export interface Model {
	namespace: string
	state?: any
	reducers?: {
		[reducerKey: string]: Reducer
	}
	effects?: {
		[effectKey: string]: Effect
	}
}
export interface MapStateToProps {
	(
		store: any
	): {
		[key: string]: any
	}
}

export interface MapDispatchToProps {
	(
		commit: (action: Action) => void,
		dispatch: <T>(action: Action) => Promise<T | void>,
	): {
		[key: string]: (payload: any) => void
	}
}

export interface ContextInitstate<S = any> {
	state: S,
	commit: (action?: Action) => void,
	dispatch: <R>(action: Action) => Promise<R | void> 
}

export interface Select {
	(store: any): any
}

