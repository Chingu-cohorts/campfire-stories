import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const SubmitButton = (props) => (
  <Row>
    <Col sm={6} smOffset={3}>
      <Button
        {...props}
        type="submit"
        name="login-submit"
        id="login-submit"
        tabIndex="4"
        className="form-control"
      />
    </Col>
  </Row>
);

export default SubmitButton;
