import React, {
	PropsWithChildren,
	useReducer,
	useCallback,
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
	(Stores: Store, commit: Commit): Dispatch
}

export interface Props {
	Stores: Store
}

const useTeemoSelect = (Store: Store) => {
	return useCallback((fn: Select) => {
		return fn(storeMapToView(Store.state))
	}, [])
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

const useTeemoDispatch: UseDispatch = (Stores, commit) => {
	const select = useTeemoSelect(Stores)
	const dispatch = useCallback(async (action: Action) => {
		const [effectKey, modelName] = viewMapToStore(action.type)
		const effect = Stores.effects[effectKey]
		try {
			return await effect(action.payload, {
				state: Stores.state[modelName],
				commit,
				select,
				dispatch,
			})
		} catch (error) {
			throw Error(error)
		}
	}, [])
	return dispatch
}

export default function Provider(props: PropsWithChildren<Props>) {
	const { Stores, children } = props
	const [state, commit] = useTeemoReducer(Stores)
	const dispatch = useTeemoDispatch(Stores, commit)
	return (
		<Context.Provider value={{ state, commit, dispatch }}>
			{children}
		</Context.Provider>
	)
}
