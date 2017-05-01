import React from 'react';
import { Button } from 'react-bootstrap';

import Carousel from './CarouselComponent';

const Hero = () => {
  return (
    <section>
      <div id="hero-content" className="table">
        <div id="hero-content-centered" className="table-cell">
          <div className="cell-child">
            <h1 className="hero-headline">Welcome to the Campfire Stories</h1>
            <p className="hero-copy">Place where people from all over the world share their stories while on a quest of learning to code</p>
            <Button className="cs-btn-green-inverted" href="#explore-stories">Explore</Button>
            <span style={{"padding":"12px"}}>or</span>
            <Button
              className="cs-btn-green-outline"
              href="https://tropicalchancer.github.io/projectus/"
              target="_blank"
            >
              Join Us
            </Button>
          </div>
        </div>
      </div>
      <Carousel/>
    </section>
  )
}

export default Hero;
