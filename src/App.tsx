import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { history } from '@/utils'
import routes from '@/router'

export default function App() {
	return (
		<Router history={history}>
			<Switch>
				{routes.map(route => (
					<Route
						path={route.path}
						exact={route.exact ? true : false}
						component={route.component}
						key={route.title}
					/>
				))}
			</Switch>
		</Router>
	)
}
