import React from 'react';
import { Carousel } from 'react-bootstrap';
import images from '../../../publicManifest';

const CarouselContainer = () => {
  const slides = images.map(({ name, path }) =>
    <Carousel.Item className='item' key={name}>
      <img src={path} alt={`Campfire Stories People: ${name}`} className='carousel-image'/>
    </Carousel.Item>
  );

  return (
    <Carousel interval={2000} className="carousel" children={slides} />
  );
};

export default CarouselContainer;
