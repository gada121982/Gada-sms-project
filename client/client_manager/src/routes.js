import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Information from './views/Information'
import Template from './views/Template'
import Complete from './views/Complete'

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Information />
  },
  {
    path: '/template',
    exact: true,
    main: () => <Template />
  },
  {
    path: '/complete',
    exact: true,
    main: () => <Complete />
  }
]

let activeRoute = () => {
  return (
    <Switch>
      {
        routes.map((route, index) => {
          return <Route component={route.main} path={route.path} exact={route.exact} key={index} />
        })
      }
    </Switch>
  )
}

export default activeRoute;