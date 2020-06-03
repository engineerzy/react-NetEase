import Loadable from 'react-loadable'
import Load from '@/components/Loading'


const routes = [
	{
    path: '/',
    exact: true,
		component: Loadable({
			loader: () => import('@/pages/home'),
			loading: Load
		}),
		title: '首页'
	},
	{
		path: '/hot',
		component: Loadable({
			loader: () => import('@/pages/hot'),
			loading: Load
		}),
		title: '热歌榜'
	},
	{
		path: '/search',
		component: Loadable({
			loader: () => import('@/pages/search'),
			loading: Load
		}),
		title: '搜索'
	},
	{
		path: '/song/:id',
		component: Loadable({
			loader: () => import('@/pages/song'),
			loading: Load
		}),
		title: '歌曲'
	},
	{
		path: '/playlist/:id',
		component: Loadable({
			loader: () => import('@/pages/playlist'),
			loading: Load
		}),
		title: '歌单'
	}
]

export default routes;
