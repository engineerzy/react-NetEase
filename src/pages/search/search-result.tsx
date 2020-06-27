import React, { useEffect } from 'react'
import SongCover from '@/components/SongCover'
import SongTitleIndex from '@/components/base/SongTitleIndex'
import Styles from './search-result.module.scss'

/**
 *关键词高亮
 *
 * @param {string} key
 * @param {string} [id='root']
 * @param {string} [bgColor='#507daf']
 */

const useKeywordHighLight = (key: string, id = 'root', bgColor = '#507daf') => {
	useEffect(() => {
		let oDiv = document.getElementById(id),
			sText = oDiv.innerHTML,
			color = bgColor || 'orange',
			sKey =
				"<span name='addSpan' style='color: " + color + ";'>" + key + '</span>',
			num = -1,
			rStr = new RegExp(key, 'g'),
			rHtml = new RegExp('<.*?>', 'ig'), //匹配html元素
			aHtml = sText.match(rHtml) //存放html元素的数组
		sText = sText.replace(rHtml, '{~}') //替换html标签
		sText = sText.replace(rStr, sKey) //替换key
		sText = sText.replace(/{~}/g, function () {
			//恢复html标签
			num++
			return aHtml[num]
		})
		oDiv.innerHTML = sText
	}, [id, key, bgColor])
}

export interface Props {
	keyword: string
	multiMatchset: {[T: string]: any}
	searchList: any[]
}

const useScroll = () => {
	useEffect(() => {
		const el = document.querySelector('#search-result-wrapper')
		function handleScroll () {

		}
		el.addEventListener('scroll', handleScroll)
		return () => {
			
		}
	}, [])
}

export default function SearchResult (props: Props) {
	useKeywordHighLight(props.keyword, 'search-result-wrapper')
	const { multiMatchset, searchList } = props
	return (
		<div id="search-result-wrapper">
			<h5 className={Styles['search-result-matchtext']}>最佳匹配</h5>
			<ul className={Styles['search-result-wrapper']}>
				<li>
					{multiMatchset && multiMatchset.artist && (
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
							type={multiMatchset.album[0].type}
						/>
					)}
				</li>
				{searchList.length >= 1 &&
					searchList.map(item => (
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
		</div>
	)
}
SearchResult.defaultProps = {
	keyword: '',
	multiMatchset: {},
	searchList: []
}