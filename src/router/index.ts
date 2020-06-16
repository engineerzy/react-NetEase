import Loadable from 'react-loadable'
import Load from '@/components/Loading'

const routes = [
	{
		path: '/home',
    exact: false,
		component: Loadable({
			loader: () => import('@/pages/home'),
			loading: Load
		}),
		title: '推荐'
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
	},
	{
		path: '/count',
		component: Loadable({
			loader: () => import('@/pages/count'),
			loading: Load
		}),
		title: 'count'
	}
]

export const homeRoutes = [
	{
		path: '/home',
    exact: true,
		component: Loadable({
			loader: () => import('@/pages/home'),
			loading: Load
		}),
		title: '推荐'
	},
	{
		path: '/home/hot',
		exact: false,
		component: Loadable({
			loader: () => import('@/pages/hot'),
			loading: Load
		}),
		title: '热歌榜'
	},
	{
		path: '/home/search',
		exact: false,
		component: Loadable({
			loader: () => import('@/pages/search'),
			loading: Load
		}),
		title: '搜索'
	},
	{
		path: '/home/recommend',
		exact: false,
		component: Loadable({
			loader: () => import('@/pages/recommend'),
			loading: Load
		}),
		title: '推荐'
	}
]

export default routes;
