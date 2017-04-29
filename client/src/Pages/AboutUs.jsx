import React from 'react';
import { Grid, Row } from 'react-bootstrap';

export default () => (
  <Grid>
    <Row className="about-row">
      <div className="about-section-1">
        <h2 className="heading">About Campfire-Stories</h2>
        <p>
          Right now, we’re at a time in human history where a large number of people are turning on their computers and learning how to code. Most of us on Free Code Camp are learning to code on the side, or in some way or another are in the middle of a career change. And this is happening all over the world.
          Campfire-Stories is a place that highlights this journey. It’s a place for coders to read and share stories.</p>
      </div>
      <div className="about-section-2">
        <h2 className="heading">About the Team</h2>
        <p>
          Powered by the heart of Free Code Camp, the Chingu Cohorts is a place for coders with shared goals to come together to help each other level-up, chat, and build things. In October and November, dozens of then-strangers came together to build this project. The goal was to solidify our skills, build something of value for the FCC community, and improve portfolios.
          We formed various teams to set this project up. We had a design team, front-end team, back-end team, as well as a content-generation team. Some members are writing medium articles about the experience, and they will be linked here when finished. :slightly_smiling_face:
          If you’re interested in learning more about Chingu or have any questions, please feel free to <a href="mailto:chinguftw@gmail.com">email us</a>.</p>
      </div>
    </Row>
  </Grid>
)
