import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router';

const WriteButton = () => (
  <Col md={4} mdOffset={4} key='orange' className="no-story">
    <Link type="button" className="btn btn-primary cs-btn-green" to="/story">
      <h2 key={'title'}>Why not write a story?</h2>
    </Link>
  </Col>
);

export default WriteButton;
