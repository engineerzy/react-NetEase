function getServerData (payload: number) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
				resolve(payload + 2)
		}, 1000);
	})
}
function getServerData1 (payload: number) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
				resolve(payload - 1)
		}, 1000);
	})
}

export default {
	namespace: 'test',
	state: {
		count: 0,
		serverCount: 0
	},
	effects: {
		async getServerData (payload: any, {commit, put, select }) {
			const result = await getServerData(1)
			commit({type: 'test/addCount', payload: result})
			await put({type: 'test/getServerData1', payload: result})
			const myState = select(state => state)
			console.log(myState)
		},
		async getServerData1 (payload: number, {commit}) {
			const result = await getServerData1(payload)
			commit({type: 'test/modifyServerCount', payload: result})
		}
	},
	reducers: {
		addCount (state, payload) {
			return {...state, count: payload}
		},
		modifyServerCount(state, payload) {
			return { ...state, serverCount: payload }
		}
	}
}