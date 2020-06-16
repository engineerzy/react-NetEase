import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { history } from '@/utils'
import routes from '@/router'
import models from '@/store'
import createStore, {Provider } from '@/Teemo'

const stores = createStore(models)
export default function App() {
	return (
		<Provider Stores={stores} >
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={() => (<Redirect to="/home/recommend" />)} />
					{routes.map(route => (
						<Route
							path={route.path}
							component={route.component}
							key={route.title}
						/>
					))}
				</Switch>
			</Router>
		</Provider>
	)
}
