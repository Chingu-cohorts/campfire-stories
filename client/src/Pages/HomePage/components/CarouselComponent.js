import React from 'react';
import { Carousel } from 'react-bootstrap';
import images from 'publicManifest';

const CarouselComponent = () => {
  const slides = images.map(({ name, path }) =>
    <Carousel.Item className="item" key={name}>
      <img src={path} alt={`Campfire Stories People: ${name}`} />
    </Carousel.Item>
  );

  return (
    <Carousel interval={2000} className="carousel">
      {slides}
    </Carousel>
  );
};

export default CarouselComponent;