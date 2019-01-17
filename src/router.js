import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/share/:id',
      models: () => [import('./models/demo')],
      component: () => import('./routes/demo/'),
    },
    {
      path: '/detail',
      models: () => [import('./models/demo')],
      component: () => import('./routes/demo/detail'),
    },
    // {
    //   path: '/invitations/:id',
    //   models: () => [import('./models/invitations')],
    //   component: () => import('./routes/invitations'),
    // },
    {
      path: '/invitations/*',
      models: () => [import('./models/invitations')],
      component: () => import('./routes/invitations'),
    },

  ]

  return (
    <ConnectedRouter history={history}>
        <Switch>
          {/*<Route exact path="/" render={() => (<Redirect to="/share/:id" />)} />*/}
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
