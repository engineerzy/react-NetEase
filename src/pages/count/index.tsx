import React from 'react'
import connect from '@/Teemo/connect'
function Count(props) {
	async function handleClick() {
		const result = await props.getServerData(54)
		console.log('result ==>', result)
	}
	return (
		<div>
			<button onClick={handleClick}>dianwo</button>
			{props.count}
		</div>
	)
}

function mapStateToProps (store) {
	return {
		count: store.test.count,
		serverCount: store.test.serverCount,
		name: store.name,
	}
}

function mapDispatchToProps (commit, dispatch) {
	return {
		modifyName: (payload: string) => commit({type: 'modifyName', payload}),
		addCount: (payload: number) => commit({ type: 'test/addCount', payload }),
		getServerData: (payload: number) => dispatch({type: 'test/getServerData', payload})
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Count)
