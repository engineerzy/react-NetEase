import { prefixModel } from './utils'
export { default as Provider} from './Provider'
export { default as connect } from './connect'

export default function createStore(models = []) {
	return prefixModel(models)
}
