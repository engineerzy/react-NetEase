import React, { useEffect, useReducer } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Top from '@/components/base/Top'
import NarBar from '@/components/base/NarBar'
import { homeRoutes } from '@/router'
import styles from './style.module.scss'

export default function Home(props) {
	return (
		<>
			<Top />
			<NarBar />
			<div className={styles['home-content-wrapper']}>
				<Switch>
					{homeRoutes.map(route => (
							<Route
							path={route.path}
							exact={route.exact}
							component={route.component}
							key={route.title}
						/>
					))}
				</Switch>
			</div>
		</>
	)
}
