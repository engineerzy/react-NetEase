import React, { useState } from 'react'
import { connect } from '@/Teemo'
import AsyncLoading from '@/components/AsyncLoading'
import { useAsynceffect } from '@/hooks'

const useAsyncStatus = () => {
	const [loading, setLoading] = useState(false)
	useAsynceffect(async () => {
		function asyncFun () {
			return new Promise<boolean>((resolve) => {
				setTimeout(() => {
					resolve(true)
				}, 3000);
			})
		}
		const res = await asyncFun()
		setLoading(res)
	})
	return loading
}
function Count(props) {
	async function handleClick() {
		const result = await props.getServerData(54)
	}
	const loading = useAsyncStatus()
	
	return (
		<div>
			<button onClick={handleClick}>dianwo</button>
			<p>{props.count}</p>
			<AsyncLoading isComplete={loading}>
					<span>加载完成</span>
			</AsyncLoading>
		</div>
	)
}

function mapStateToProps(store) {
	return {
		count: store.test.count,
		serverCount: store.test.serverCount,
		name: store.name,
	}
}

function mapDispatchToProps(commit, dispatch) {
	return {
		modifyName: (payload: string) => commit({ type: 'modifyName', payload }),
		addCount: (payload: number) => commit({ type: 'test/addCount', payload }),
		getServerData: (payload: number) =>
			dispatch({ type: 'test/getServerData', payload }),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Count)
