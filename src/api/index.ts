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
