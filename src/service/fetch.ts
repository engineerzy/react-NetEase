import axios, { AxiosRequestConfig } from 'axios'
import Toast from '@/components/base/Toast'

const ERROR_MAPS = {
	'401': '没有权限',
	'402': '身份过期',
	'403': '令牌不正确',
	'404': '请求路径不存在',
	'405': '请求方式错误',
	'500': '服务错误',
}
// 响应拦截器
axios.interceptors.response.use(response => {
	if (response.status !== 200) {
		Toast.error({ content: ERROR_MAPS[response.status] })
	}
	return response.data || {}
})

const baseConfig: AxiosRequestConfig = {
	method: 'post',
	baseURL: 'http://127.0.0.1:4000',
	headers: {
		'Content-type': 'application/json',
	},
	timeout: 60000, // 超时时间
	responseType: 'json', //返回数据类型
}

function createConfig(url: string, config: AxiosRequestConfig) {
	return {
		...baseConfig,
		...config,
		url,
	}
}
function fetch(url: string, config: AxiosRequestConfig) {
	return new Promise(resolve => {
		axios(createConfig(url, config)).then(res => {
			resolve(res)
		})
	})
}

export default fetch
