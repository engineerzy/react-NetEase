import React from 'react'
import Toast from '@/components/base/Toast'

export default function TestCom () {
	function handleClick0 () {
		Toast.info({content: '默认测试内容', mask: false})
	  }
	  function handleClick () {
		Toast.success({content: '成功！', mask: false})
	  }
	  function handleClick1 () {
		Toast.error({content: 'error测试内容'})
	  }
	  function handleClick2 () {
		Toast.warning({content: 'warning测试内容'})
	  }
	return (
		<div>
			<button onClick={handleClick0}>info</button>
			<button onClick={handleClick}>success</button>
			<button onClick={handleClick1}>error</button>
			<button onClick={handleClick2}>warning</button>
		</div>
	)
}
