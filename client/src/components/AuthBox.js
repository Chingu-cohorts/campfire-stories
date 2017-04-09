import React from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

const AuthBox = props => (
  <Grid id="login-page" fluid>
    <Row>
      <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4}>
        <Panel {...props} className="panel-login" />
      </Col>
    </Row>
  </Grid>
);

export default AuthBox;
