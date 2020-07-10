import React from 'react'
import { Route, Switch } from 'react-router-dom'
// component
import MessageHistory from './views/MessageHistory'
import MessageCategory from './views/MessageCategory'
import MessageTemplate from './views/MessageTemplate'
import UserNormal from './views/UserNormal'
import UserSalesforce from './views/UserSalesforce'


const routes = [
  {
    path: '/admin',
    exact: true,
    main: () => <MessageHistory />
  },
  {
    path: '/admin/messagecategory',
    exact: true,
    main: () => <MessageCategory />
  },
  {
    path: '/admin/messagetemplate',
    exact: true,
    main: () => <MessageTemplate />
  },
  {
    path: '/admin/usernormal',
    exact: true,
    main: () => <UserNormal />
  },
  {
    path: '/admin/usersalesforce',
    exact: true,
    main: () => <UserSalesforce />
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