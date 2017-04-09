import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const love = (<i className="fa fa-heart"/>);
  const chinguLink = (
    <a href="https://tropicalchancer.github.io/projectus/" target="_blank">Chingu</a>
  );

  return (
    <footer className="section bg-blue">
      <Grid>
        <Row>
          <Col xs={6} xsOffset={3}>
            <p className="text-center">
              Built with {love} by {chinguLink} Cohorts
            </p>
          </Col>
        </Row>
      </Grid>
    </footer>
  );
};

export default Footer
