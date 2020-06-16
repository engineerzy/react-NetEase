import fetch from '@/service/fetch'
/**
 *获取轮播图
 *
 * @param {('pc' | 'android' | 'iphone'| 'ipad')} [type='iphone']
 */
export const getBannerList = (type: 'pc' | 'android' | 'iphone' | 'ipad' = 'iphone') =>
	fetch('/banner', {
		method: 'POST',
		data: {
			type,
		},
	})
/**
 *获取推荐歌单
 *
 */
export const getRecommends = () =>
	fetch('/personalized', {
		method: 'POST',
	})

/**
 *获取歌单详情
 *
 * @param {*} id
 */
export const getSongSheetDetail = id =>
	fetch('/playlist/detail', {
		method: 'GET',
		params: {
			id,
		},
	})
/**
 *检查音乐是否可用
 *
 * @param {*} id
 */
export const checkSong = id =>
	fetch('/check/music', {
		method: 'GET',
		params: {
			id,
		},
	})
/**
 *获取歌曲url
 *
 * @param {*} id
 */
export const getSongUrl = id =>
	fetch('/song/url', {
		method: 'GET',
		params: {
			id,
		},
	})
/**
 *获取歌曲详情
 *
 * @param {*} ids
 */
export const getMusicDetail = ids =>
	fetch('/song/detail', {
		method: 'GET',
		params: {
			ids,
		},
	})
/**
 *
 *获取最新专辑
 */
export const getNewAlbum = () => {
	return fetch('/album/newest', {
		method: 'GET'
	})
}
/**
 *获取歌词
 *
 * @param {*} id
 * @returns
 */
export const getLyric = id => {
	return fetch('/lyric', {
		method: 'GET',
		params: {
			id: id
		}
	})
}
/**
 *
 *获取最新的音乐
 * @returns
 */
export const getNewSong = () => {
	return fetch('/personalized/newsong', {
		method: 'GET',
	})
}
/**
 *获取排行榜
 *
 * @param {number} idx
 * @returns
 */
export const getTopList = (idx: number) => {
	return fetch('/top/list', {
		method: 'GET',
		params: {
			idx
		}
	})
}
/**
 *获取热搜列表
 *
 * @returns
 */
export const getHotSearchList = () => {
	return fetch('/search/hot', {
		method: 'GET',
		params: {}
	})
}
/**
 *获取热搜详情列表
 *
 * @returns
 */
export const getHotSearchDetailList = () => {
	return fetch('/search/hot/detail', {
		method: 'GET'
	})
}
/**
 *
 *获取搜索建议
 * @param {string} keywords
 * @returns
 */
export const getSearchSuggest = (keywords: string, type = 'mobile') => {
	return fetch('/search/suggest', {
		method: 'GET',
		params: {
			type,
			keywords
		}
	})
}
/**
 *
 *搜索
 * @param {string} keywords
 * @returns
 */
export const getSearchList = (keywords: string) => {
	return fetch('/search', {
		method: 'GET',
		params: {
			keywords
		}
	})
}
/**
 *获取搜索多重匹配
 *
 * @param {string} keywords
 * @returns
 */
export const getSearchMultimatch = (keywords: string) => {
	return fetch('search/multimatch', {
		method: 'GET',
		params: {
			keywords
		}
	})
}
