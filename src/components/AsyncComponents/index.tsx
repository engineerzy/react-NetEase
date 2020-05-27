import React from 'react'

type a = {
	ccc: string;
}
export default function (componentFactory) {
	class Asynccomponent extends React.Component {
		constructor() {
			super({})
			this.state = {
				component: null
			}
		}
		async componentDidMount () {
			const {default: component} = await componentFactory()
			this.setState({ component })
		}
		render () {
			const Comp = (this.state as any).component
			return Comp ? <Comp {...this.props} /> : null
		}
	}
	return Asynccomponent
}