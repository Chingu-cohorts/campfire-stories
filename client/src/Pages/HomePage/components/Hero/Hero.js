import React from 'react';
import { Button } from 'react-bootstrap';

import CarouselContainer from '../CarouselContainer';

const Hero = () => {
  return (
    <section>
      <div id="hero-content" className="table">
        <div id="hero-content-centered" className="table-cell">
          <article className="hero-content-group">
            <h1 className="hero-headline">Welcome to the Campfire Stories</h1>
            <p className="hero-copy">Place where people from all over the world share their stories while on a quest of learning to code</p>
            <Button className="cs-btn-green-inverted" href="#cs-stories">Explore</Button>
            <span className="hero-or">or</span>
            <Button
              className="cs-btn-green-outline"
              href="https://tropicalchancer.github.io/projectus/"
              target="_blank"
              children={[ 'Join Us' ]}
            />
          </article>
        </div>
      </div>
      <CarouselContainer />
    </section>
  )
}

export default Hero;
