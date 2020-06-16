import { Model, Reducers, Effects } from './types'

export const MODIFIER = '@@'

export const storeMapToView = store => {
	const proxy = {}
	for (const key in store) {
		if (store.hasOwnProperty(key)) {
			if (key === `${MODIFIER}global`) {
				for (const globalKey in store[key]) {
					if (store[key].hasOwnProperty(globalKey)) {
						proxy[globalKey] = store[key][globalKey]
					}
				}
			} else {
				proxy[key.split(MODIFIER)[1]] = store[key]
			}
		}
	}
	return proxy
}

function _actionTypeIsString(
	actionType: string | number,
): actionType is string {
	return typeof actionType === 'string'
}

export const viewMapToStore = (actionType: string | number) => {
	let key = ''
	let keys: string[] = []
	let modelName = ''
	if (_actionTypeIsString(actionType) && actionType.includes('/')) {
		keys = actionType.split('/')
		key = `${MODIFIER}${keys[0]}-${keys[1]}`
		modelName = `@@${keys[0]}`
	} else {
		key = `${MODIFIER}global${actionType}`
		modelName = `@@global`
	}
	return [key, modelName]
}

export const prefixModel = (models: Array<Model>) => {
	const reducerConfig: {state: any, reducers: Reducers, effects: Effects} = {
		state: {},
		reducers: {},
		effects: {},
	}

	for (const model of models) {
		if (!model.state || !model.reducers) {
			throw Error(`model 必须包含 state 和 reducers 属性`)
		}
		// 没有namespace，注册为全局state, 有namspace注册为模块state,且模块名不能重复
		if (model.namespace && !Reflect.has(reducerConfig.state, model.namespace)) {
			reducerConfig.state[`${MODIFIER}${model.namespace}`] = model.state
		} else if (
			model.namespace &&
			Reflect.has(reducerConfig.state, model.namespace)
		) {
			throw Error(`model ${model.namespace} namspace 不能重复`)
		} else {
			reducerConfig.state[`${MODIFIER}global`] = {
				...reducerConfig.state[`${MODIFIER}global`],
				...model.state,
			}
		}
		
		// 没有namespace，注册为全局reducers, 有namspace注册为模块reducers
		for (const key in model.reducers) {
			if (model.reducers.hasOwnProperty(key)) {
				const reuducerKey = model.namespace
					? `${MODIFIER}${model.namespace}-${key}`
					: `${MODIFIER}global-${key}`
				reducerConfig.reducers[reuducerKey] = model.reducers[key]
			}
		}
		// 注册effects
		if (model.effects) {
			for (const key in model.effects) {
				if (model.effects.hasOwnProperty(key)) {
					const reuducerKey = model.namespace
						? `${MODIFIER}${model.namespace}-${key}`
						: `${MODIFIER}global-${key}`
					reducerConfig.effects[reuducerKey] = model.effects[key]
				}
			}
		}
	}
	return reducerConfig
}
