import React, { FunctionComponent } from 'react'
import Context from './context'
import { storeMapToView } from './utils'
import { MapStateToProps, MapDispatchToProps } from './types'

export default function connect(
	mapStateToProps: MapStateToProps,
	mapDispatchToProps: MapDispatchToProps,
) {
	return function (ReactComponent: FunctionComponent) {
		return function WrapperComponent (props) {
			return (
				<>
					<Context.Consumer>
						{({ state, commit, dispatch }) => (
							<ReactComponent
								{...mapStateToProps(storeMapToView(state))}
								{...mapDispatchToProps(commit, dispatch)}
								{...props}
							/>
						)}
					</Context.Consumer>
				</>
			)	
		}
	}
}
