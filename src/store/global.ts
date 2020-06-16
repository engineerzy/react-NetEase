export default {
	// namespace: 'global',
	state: {
		name: '张三',
	},
	reducers: {
		modifyName(state, payload) {
			return {...state, name: payload}
		}
	}
}