import React from 'react';

import img1 from '../../../public/img/people-slide/1.jpg';
import img2 from '../../../public/img/people-slide/2.jpg';
import img3 from '../../../public/img/people-slide/3.jpg';
import img4 from '../../../public/img/people-slide/4.jpg';
import img5 from '../../../public/img/people-slide/5.jpg';
import img6 from '../../../public/img/people-slide/6.jpg';
import img7 from '../../../public/img/people-slide/7.jpg';
import img8 from '../../../public/img/people-slide/8.jpg';
import img9 from '../../../public/img/people-slide/9.jpg';
import img10 from '../../../public/img/people-slide/10.jpg';
import img11 from '../../../public/img/people-slide/11.jpg';
import img12 from '../../../public/img/people-slide/12.jpg';
import img13 from '../../../public/img/people-slide/13.jpg';
import img14 from '../../../public/img/people-slide/14.jpg';
import img15 from '../../../public/img/people-slide/15.jpg';

// preserve original slide order
// const picSrcNumber = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5];
const images = [ img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img1, img2, img3, img4, img5 ]

const Carousel = () => {
  const slides = images.map((img, i) => {
    if (i === 0) {
      return (
        <div className="item active" key={i}>
          <img src={img} alt="Campfire Stories People"/>
        </div>
      )
    } else {
      return (
        <div className="item" key={i}>
          <img src={img} alt="Campfire Stories People"/>
        </div>
      )
    }
  });

  return (
    <section id="myCarousel" className="carousel" data-ride="carousel" data-interval="2000">
      <div className="carousel-inner" role="listbox">
        {slides}
      </div>
    </section>
  );
};

export default Carousel;
