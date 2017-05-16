import React from 'react';
import { Hero } from '../components';
import { Masonry } from '../containers';

const HomePage = () => (
  <section className="hero-masonry-container">
    <Hero />
    <Masonry />
  </section>
);

export default HomePage;
