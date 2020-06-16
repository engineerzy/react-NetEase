import React, { useState, useCallback, useEffect } from 'react'
import SongCover from '@/components/SongCover'
import SongTitleIndex from '@/components/base/SongTitleIndex'
import { useAsynceffect } from '@/hooks'
import {
	getHotSearchList,
	getSearchList,
	getSearchSuggest,
	getSearchMultimatch,
} from '@/api'
import { tools } from '@/utils'
import styles from './search.module.scss'

/**
 *处理搜索输入框输入事件
 *
 * @returns
 */
const useSearchInput = () => {
	const [value, setValue] = useState<string>('')
	const [focus, setFocus] = useState<boolean>(false)
	const [matchSuggest, setMatch] = useState<any[]>([])
	const onChange = useCallback(async function (events) {
		setValue(events.target.value)
		if (!!events.target.value) {
			const result: any = await getSearchSuggest(events.target.value)
			setMatch(result.result.allMatch)
		} else {
			setMatch([])
		}
	}, [])
	const clearValue = useCallback(() => {
		setValue('')
		setMatch([])
	}, [])
	const onFocus = useCallback(() => {
		setFocus(true)
	}, [])
	const onBlur = useCallback(() => {
		setFocus(false)
	}, [])
	return { onChange, clearValue, onFocus, onBlur, focus, value, matchSuggest }
}
/**
 *处理搜索结果
 *
 * @returns
 */
const useSearchHandle = (searchValue: string, isFocus: boolean) => {
	const [searchList, setSearchList] = useState<any[]>([])
	const [multiMatchset, setMultiMatchset] = useState<any>({})
	const handleSearch = useCallback(async keyword => {
		const lists: any[] = await Promise.all([
			getSearchList(keyword),
			getSearchMultimatch(keyword),
		])
		setSearchList(lists[0].result.songs)
		setMultiMatchset(lists[1].result)
	}, [])
	useEffect(() => {
		if (!!!searchValue || isFocus) {
			setSearchList([])
			setMultiMatchset({})
		}
	}, [searchValue, isFocus])
	return { searchList, multiMatchset, handleSearch }
}

/**
 *获取热门搜索列表
 *
 * @returns
 */
const useGetHotList = () => {
	const [hots, setHots] = useState<any[]>([])
	useAsynceffect(async () => {
		const result: any = await getHotSearchList()
		setHots(result.result.hots)
	}, [])
	return hots
}

// 搜索建议组件
const SuggestItem = (props: {
	keyword: string
	handleClick: (...args: any[]) => void
}) => {
	const handleClick = useCallback(() => {
		props.handleClick(props.keyword)
	}, [])
	return (
		<li className={styles['search-suggest-item']} onClick={handleClick}>
			<i className={`${styles['suggest-item-icon']} iconfont iconsearch`}></i>
			<div className={styles['suggest-item-content']}>{props.keyword}</div>
		</li>
	)
}

// 热门搜索组件
const HotSearch = (props: {
	keyword: string
	handleClick: (...args: any[]) => void
}) => {
	const handleClick = useCallback(() => {
		props.handleClick(props.keyword)
	}, [])
	return (
		<li className={styles['search-hot-item']} onClick={handleClick}>
			{props.keyword}
		</li>
	)
}

// 搜索结果组件
const SearchResult = (props: { multiMatchset: any; searchList: any[] }) => {
	const { multiMatchset, searchList } = props
	return (
		<>
			<h5 className={styles['search-result-matchtext']}>最佳匹配</h5>
			<ul className={styles['search-result-wrapper']}>
				<li>
					{multiMatchset.artist && multiMatchset.artist.length >= 1 && (
						<SongCover
							id={multiMatchset.artist[0]?.picId}
							name={multiMatchset.artist[0]?.name}
							url={multiMatchset.artist[0]?.img1v1Url}
							alias={multiMatchset.artist[0]?.alias}
						/>
					)}
				</li>
				<li>
					{multiMatchset.album && multiMatchset.album.length >= 1 && (
						<SongCover
							id={multiMatchset.album[0].picId}
							name={multiMatchset.album[0].name}
							url={multiMatchset.album[0].blurPicUrl}
							alias={multiMatchset.album[0].alias}
							artist={multiMatchset.album[0].artists}
						/>
					)}
				</li>
				{searchList.length >= 1 && searchList.map(item => (
					<SongTitleIndex
						key={item.id}
						id={item.id}
						name={item.name}
						ar={item.artists}
						quality={item.rtype}
						album={item.album}
					/>
				))}
			</ul>
		</>
	)
}

export default function Search() {
	const {
		onChange,
		clearValue,
		onFocus,
		onBlur,
		focus,
		value,
		matchSuggest,
	} = useSearchInput()
	const hots = useGetHotList()
	const { searchList, multiMatchset, handleSearch } = useSearchHandle(
		value,
		focus,
	)
	return (
		<div className={styles['search-wrapper']}>
			<div className={styles['search-input-wrapper']}>
				<div className={styles['search-input-content']}>
					<i className={`iconfont iconsearch ${styles['iconfont-search']}`}></i>
					<input
						type="text"
						value={value}
						onFocus={onFocus}
						onChange={onChange}
						onBlur={onBlur}
						className={styles['search-input-main']}
						placeholder="搜索歌曲、歌手、专辑"
					/>
					{!!value && (
						<i
							onClick={clearValue}
							className={`iconfont iconclose ${styles['iconfont-close']}`}></i>
					)}
				</div>
			</div>
			{searchList &&
			searchList.length >= 1 &&
			Object.keys(multiMatchset).length >= 1 ? (
				<SearchResult multiMatchset={multiMatchset} searchList={searchList} />
			) : (
				<div className={styles['search-hot']}>
					{matchSuggest && matchSuggest.length >= 1 ? (
						<ul>
							{matchSuggest.map((suggest, i) => (
								<SuggestItem
									key={i}
									keyword={suggest.keyword}
									handleClick={handleSearch}
								/>
							))}
						</ul>
					) : (
						<>
							<h5 className={styles['search-hot-title']}>热门搜索</h5>
							<ul className={styles['search-hot-content']}>
								{hots.map((hot, i) => (
									<HotSearch
										key={i}
										keyword={hot.first}
										handleClick={handleSearch}
									/>
								))}
							</ul>
						</>
					)}
				</div>
			)}
		</div>
	)
}
