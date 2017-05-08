import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
/*
 * Authorization
 */
import RequireAdmin from './components/utils/RequireAdmin'
import RequireAuth from './components/utils/RequireAuth'
import LogoutPage from './components/utils/LogoutPage'
/*
 * Views
 */
import * as pages from './Pages';
import Layout from './Layout'
/*
 * Routes
 */
const Routes = () => {
  return (
    <Router history={ browserHistory }>
      <Route path="/" component={ Layout }>
        <IndexRoute component={ pages.HomePage } />
        <Route path="login" component={ pages.Login } />
        <Route path="register" component={ RequireAdmin(pages.Register) } />
        <Route path="full/:story_id" component={ pages.FullStoryPage } />
        <Route path="story" component={ RequireAuth(pages.CreatePage) } />
        <Route path="edit/:story_id" component={ RequireAuth(pages.EditPage) } />
        <Route path="about" component={pages.AboutUs} />
        <Route path="admin" component={ RequireAdmin(pages.AdminPage) } />
        <Route path="logout" component={ LogoutPage } />
        <Route path="change_password" component={ pages.ChangePassword } />
        <Route path="account" component={ pages.AccountPage } />
        <Route path="forgot_password" component={ pages.ForgotPassword } />
        // handle 404 routes
        <Route path="*" component={pages.NotFoundPage} />
      </Route>
    </Router>
  )
}

export default Routes;
