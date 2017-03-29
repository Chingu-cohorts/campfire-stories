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
        // Home Page
        <IndexRoute component={ pages.HomePage } />
        // Sign In
        <Route path="login" component={ pages.Login } />
        // Sign Up
        <Route path="register" component={ RequireAdmin(pages.Register) } />
        // Full Story
        <Route path="full/:story_id" component={ pages.FullStoryPage } />
        // Make Story
        <Route path="story" component={ RequireAuth(pages.CreatePage) } />
        // Edit Story
        <Route path="edit/:story_id" component={ RequireAuth(pages.EditPage) } />
        // My Stories
        <Route path="mystories" component={ RequireAuth(pages.MyStoriesPage) } />
        // About Us
        <Route path="about" component={pages.AboutUs} />
        // Admin Page
        <Route path="admin" component={ RequireAdmin(pages.AdminPage) } />
        // Logout
        <Route path="logout" component={ LogoutPage } />
        // handle 404 routes
        <Route path="*" component={pages.NotFoundPage} />
      </Route>
    </Router>
  )
}

export default Routes;
