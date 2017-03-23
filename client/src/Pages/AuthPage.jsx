import React from 'react'
import AuthForm from '../components/Authentication/AuthForm'

const AuthContainer = () => ({ location }) => {
  let currentRoute = location.pathname

  return (
    <div className="container-fluid" id="login-page">
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
          <div className=" top-offset panel panel-login">
            <AuthForm location={currentRoute} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthContainer
