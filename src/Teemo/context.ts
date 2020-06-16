import React from 'react'
import { ContextInitstate } from './types'

const initState: ContextInitstate = {
	state: {}, 
	commit: () => null, 
	dispatch: () => Promise.resolve(null)
}
export default React.createContext(initState)
