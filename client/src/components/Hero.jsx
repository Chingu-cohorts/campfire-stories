import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import Carousel from './BitsAndBobs/Carousel';

const Hero = () => {
  return (
    <Grid fluid={true} className="hero-top hero-content">
      <div id="hero-content">
        <Row id="hero-content-centered">
          <Col md={12} xs={11}>
            <h1 className="hero-headline">Welcome to the Campfire Stories</h1>
            <p className="hero-copy">Place where people from all over the world share their stories while on a quest of learning to code</p>
            <Button className="cs-btn-green-inverted" href="#explore-stories">Explore</Button><span style={{"padding":"12px"}}>or</span>
            <Button className="cs-btn-green-outline" href="https://tropicalchancer.github.io/projectus/" target="_blank">Join Us</Button>
          </Col>
          <a href="#explore-stories">
            <span className="glyphicon glyphicon-menu-down" id="explore-stories"></span>
          </a>
        </Row>
      </div>
      <Row><Carousel/></Row>
      <div id="overlay"></div>
    </Grid>
  )
}

export default Hero;
