import { useEffect, useState, useCallback, DependencyList } from 'react'

export interface StateType<T> {
	loading: boolean,
	data?: T,
	error?: Error,
}

export interface ReturnValue<T> {
	data: T,
	run: (...args: any[]) => Promise<T | undefined>,
	loading: boolean
}

export default function useAsyncEffect<Result = any>(
	effect: (...args: any[]) => Promise<Result>,
	input: DependencyList = [],
	initState: StateType<Result> = { loading: false }
): ReturnValue<Result> {
	const [state, setState] = useState<StateType<Result>>(initState)
	const run = useCallback((...args: any[]): Promise<Result | undefined> => {
		setState(s => ({
			...s,
			loading: true
		}))
		return effect(...args)
			.then(data => {
				setState(s => ({ 
					...s, 
					data, 
					loading: false 
				}))
				return data
			})
			.catch(error => {
				setState(s => ({ 
					...s, 
					error, 
					loading: false 
				}))

				return error
			})
	}, input)

	useEffect((...args: any[]) => {
		run(...args)
	}, [run])
	return {
		data: state.data,
		loading: state.loading,
		run,
	}
}