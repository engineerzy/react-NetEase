import React, {
	PropsWithChildren,
	useReducer,
	useCallback,
	useRef,
} from 'react'
import Context from './context'
import { viewMapToStore, storeMapToView } from './utils'
import { Action, Commit, Dispatch, Reducers, Effects, Select } from './types'

export interface Store {
	state: { [T: string]: any }
	reducers: Reducers
	effects: Effects
}

export interface UseDispatch {
	(state: { [T: string]: any }, effects: Effects, commit: Commit): Dispatch
}

export interface Props {
	Stores: Store
}

const useTeemoReducer = (Stores: Store) => {
	const storeReducer = (
		state: typeof Stores.state,
		action: Action<keyof typeof Stores.reducers>,
	) => {
		const [reducerKey, modelName] = viewMapToStore(action.type as string)
		const reducer = Stores.reducers[reducerKey]
		const changedState = reducer(state[modelName], action.payload)
		return reducer ? { ...state, ...{ [modelName]: changedState } } : state
	}
	return useReducer(storeReducer, Stores.state)
}

const useTeemoDispatch: UseDispatch = (state, effects, commit) => {
	const currentState = useRef(state)
	currentState.current = state
	const put = useCallback(async (action: Action) => {
		const [effectKey] = viewMapToStore(action.type)
		const effect = effects[effectKey]
		try {
			await effect(action.payload, {
				commit,
				put,
				select: (fn: Select) => fn(storeMapToView(currentState.current)),
			})
		} catch (error) {
			throw Error(error)
		}
	}, [])
	return put
}

export default function Provider(props: PropsWithChildren<Props>) {
	const { Stores, children } = props
	const [state, commit] = useTeemoReducer(Stores)
	const dispatch = useTeemoDispatch(state, Stores.effects, commit)
	return (
		<Context.Provider value={{ state, commit, dispatch }}>
			{children}
		</Context.Provider>
	)
}
