import { getSearchList, getSearchMultimatch } from '@/api'
export default {
	namespace: 'search',
	state: {
		multiMatchset: {},
		searchResultList: [],
		searchKeywords: '',
	},
	effects: {
		async getSearchResult(keyword: string, { commit }) {
			commit({
				type: 'search/modifyState',
				payload: {
					searchKeywords: keyword,
				},
			})
			const lists: any[] = await Promise.all([
				getSearchList(keyword),
				getSearchMultimatch(keyword),
			])
			commit({
				type: 'search/modifyState',
				payload: {
					multiMatchset: lists[1].result,
					searchResultList: lists[0].result.songs,
				},
			})
		},
		// 清空数据
		async clearSearchResult({}, { commit }) {
			commit({
				type: 'search/modifyState',
				payload: {
					multiMatchset: {},
					searchResultList: [],
				},
			})
		},
	},
	reducers: {
		modifyState(state: any, payload: any) {
			return { ...state, ...payload }
		},
	},
}
