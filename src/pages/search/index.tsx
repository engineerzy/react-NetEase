import React, {
	useState,
	useCallback,
	useEffect,
	useReducer,
	useMemo,
	memo,
	PropsWithChildren,
} from 'react'
import SearchHistory from './search-history'
import SearchResult from './search-result'
import { useAsynceffect } from '@/hooks'
import { connect } from '@/Teemo'
import { getHotSearchList, getSearchSuggest } from '@/api'
import { storage } from '@/utils/tools'
import styles from './search.module.scss'
export interface Props {
	multiMatchset: { [T: string]: any }
	searchResultList: any[]
	searchKeywords: string
	getSearchResult: (keyword: string) => void
	clearSearchResult: () => void
}

/**
 *处理搜索输入框输入事件
 *
 * @returns
 */
const useSearchInput = (clearSearchResult: () => void) => {
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
		clearSearchResult()
	}, [])
	const onFocus = useCallback(() => {
		setFocus(true)
	}, [])
	const onBlur = useCallback(() => {
		setFocus(false)
	}, [])
	return {
		onChange,
		clearValue,
		onFocus,
		onBlur,
		setValue,
		focus,
		value,
		matchSuggest,
	}
}

/**
 *处理搜索结果
 *
 * @returns
 */
const useSearchHandle = (
	searchValue: string,
	isFocus: boolean,
	getSearchResult: (keyword: string) => void,
) => {
	const handleSearch = useCallback(keyword => {
		getSearchResult(keyword)
	}, [])
	useEffect(() => {
		if (!!!searchValue || isFocus) {
			// dispatch({ type: 'SearchResult', payload: { match: {}, search: [] } })
		}
	}, [searchValue, isFocus])
	return { handleSearch }
}

/**
 *搜索历史events
 *
 * @param {(keyword: string) => void} handleSearch
 * @returns
 */
const useHistoryEvent = (
	searchKeywords: string,
	handleSearch: (keyword: string) => void,
	setValue: (keyword: string) => void,
) => {
	const [searchHistory, setSearchHistory] = useState([])
	useEffect(() => {
		const historyStorages = storage.getLocalStorage<any[]>('search_hot_history')
		setSearchHistory(historyStorages || [])
	}, [])
	useEffect(() => {
		if (!!!searchKeywords || searchHistory.includes(searchKeywords)) return;
 		setSearchHistory([...searchHistory, searchKeywords])
		const historyStorages = storage.getLocalStorage<any[]>('search_hot_history')
		if (historyStorages) {
			storage.setLocalStorage('search_hot_history', [
				searchKeywords,
				...searchHistory,
			])
		} else {
			storage.setLocalStorage('search_hot_history', [searchKeywords])
		}
	}, [searchKeywords])
	const onClearItem = useCallback(
		(his: string) => {
			const newHistory = searchHistory.filter(e => e !== his)
			storage.setLocalStorage('search_hot_history', newHistory)
			setSearchHistory(newHistory)
		},
		[searchHistory],
	)
	const onClickItem = useCallback((his: string) => {
		setValue(his)
		handleSearch(his)
	}, [])
	return { onClearItem, onClickItem, searchHistory }
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
	setValue: (value: string) => void
}) => {
	const handleClick = useCallback(() => {
		props.handleClick(props.keyword)
		props.setValue(props.keyword)
	}, [props.keyword])

	return useMemo(
		() => (
			<li className={styles['search-suggest-item']} onClick={handleClick}>
				<i className={`${styles['suggest-item-icon']} iconfont iconsearch`}></i>
				<div className={styles['suggest-item-content']}>{props.keyword}</div>
			</li>
		),
		[props.keyword, props.handleClick, props.setValue],
	)
}

// 热门搜索组件
const HotSearch = memo(
	(props: {
		keyword: string
		handleClick: (...args: any[]) => void
		setValue: (value: string) => void
	}) => {
		const handleClick = useCallback(() => {
			props.handleClick(props.keyword)
			props.setValue(props.keyword)
		}, [])
		return (
			<li className={styles['search-hot-item']} onClick={handleClick}>
				{props.keyword}
			</li>
		)
	},
)

function Search(props: PropsWithChildren<Props>) {
	const {
		searchResultList,
		multiMatchset,
		searchKeywords,
		getSearchResult,
		clearSearchResult,
	} = props
	const hots = useGetHotList()
	const {
		onChange,
		clearValue,
		onFocus,
		onBlur,
		setValue,
		focus,
		value,
		matchSuggest,
	} = useSearchInput(clearSearchResult)
	const { handleSearch } = useSearchHandle(value, focus, getSearchResult)
	const { onClearItem, onClickItem, searchHistory } = useHistoryEvent(
		searchKeywords,
		handleSearch,
		setValue,
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
			{searchResultList &&
			searchResultList.length >= 1 ? (
				<SearchResult
					keyword={value}
					multiMatchset={multiMatchset}
					searchList={searchResultList}
				/>
			) : (
				<div className={styles['search-hot']}>
					{matchSuggest && matchSuggest.length >= 1 ? (
						<ul>
							{matchSuggest.map((suggest, i) => (
								<SuggestItem
									key={i}
									keyword={suggest.keyword}
									setValue={setValue}
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
										setValue={setValue}
										handleClick={handleSearch}
									/>
								))}
							</ul>
							<SearchHistory
								historys={searchHistory}
								onClearItem={onClearItem}
								onClickItem={onClickItem}
							/>
						</>
					)}
				</div>
			)}
		</div>
	)
}

const mapStoreToProps = store => ({
	searchResultList: store.search.searchResultList,
	multiMatchset: store.search.multiMatchset,
	searchKeywords: store.search.searchKeywords,
})

const mapDispatchToProps = (commit, dispatch) => ({
	getSearchResult: (payload: { keyword: string }) =>
		dispatch({ type: 'search/getSearchResult', payload }),
	clearSearchResult: () =>
		dispatch({ type: 'search/clearSearchResult', payload: {} }),
})

export default connect(mapStoreToProps, mapDispatchToProps)(Search)
