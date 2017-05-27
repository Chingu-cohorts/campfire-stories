import React from 'react';
import { Grid, Row } from 'react-bootstrap';

const AboutUs = () => (
  <Grid>
    <Row className="about-row">
      <article className="about-section-1">
        <img src="img/campfirestories.png" alt="Campfire-Stories" className="img-campfire-banner" />        
        <h2 className="about-heading">About Campfire-Stories</h2>
        <p className="about-content">
          Right now, we’re at a time in human history where a large number of people are turning on their computers and learning how to code. Most of us on Free Code Camp are learning to code on the side, or in some way or another are in the middle of a career change. And this is happening all over the world.
          Campfire-Stories is a place that highlights this journey. It’s a place for coders to read and share stories.</p>
      </article>      
      <article className="about-section-2">
        <h2 className="about-heading">About the Team</h2>
        <p className="about-content">
          Powered by the heart of Free Code Camp, the Chingu Cohorts is a place for coders with shared goals to come together to help each other level-up, chat, and build things. In October and November, dozens of then-strangers came together to build this project. The goal was to solidify our skills, build something of value for the FCC community, and improve portfolios.
          We formed various teams to set this project up. We had a design team, front-end team, back-end team, as well as a content-generation team. Some members are writing medium articles about the experience, and they will be linked here when finished. :slightly_smiling_face:
          If you’re interested in learning more about Chingu or have any questions, please feel free to <a href="mailto:chinguftw@gmail.com">email us</a>.</p>
      </article>
    </Row>
  </Grid>
);

export default AboutUs;
