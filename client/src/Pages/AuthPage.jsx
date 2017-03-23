import React from 'react'
import { Link } from 'react-router'
import AuthForm from '../components/Authentication/AuthForm'

const AuthContainer = () => ({ location }) => {
  let currentRoute = location.pathname

  return (
    <div className="container-fluid" id="login-page">
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
          {currentRoute ==="/register" &&
            <div className="top-offset">
              <Link to="/admin"><i className="fa fa-arrow-left" aria-hidden="true"/> Back to Admin</Link>
            </div>
          }
          <div className={`${currentRoute !== '/register' && 'top-offset'} panel panel-login`}>
            <AuthForm location={currentRoute} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthContainer
