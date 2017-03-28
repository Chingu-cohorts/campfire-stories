import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import AuthForm from '../components/Authentication/AuthForm';

const AuthContainer = () => ({ location }) => {
  let currentRoute = location.pathname

  return (
    <Grid id="login-page" fluid>
      <Row>
        <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4}>
          {currentRoute === "/register" &&
            <div>
              <Link to="/admin"><i className="fa fa-arrow-left" aria-hidden="true"/> Back to Admin</Link>
            </div>
          }
          <div className="panel panel-login">
            <AuthForm location={currentRoute} />
          </div>
        </Col>
      </Row>
    </Grid>
  )
}

export default AuthContainer
