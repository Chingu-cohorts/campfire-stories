import { Carousel } from 'react-bootstrap';
import images from 'publicManifest';
import CarouselContainer from './CarouselContainer';

let component;

beforeEach(() => {
  component = shallow(<CarouselContainer />)
});

test('CarouselContainer should be a Carousel', () => {
  expect(component.type()).toEqual(Carousel);
});

test('CarouselContainer should contain all the images in the manifest', () => {
  expect(component.children().length).toEqual(images.length);
});


test('CarouselContainer should only have Carousel.Items as children', () => {
  const children = component.children();
  for (let child of children.nodes) {
    expect(child.type).toEqual(Carousel.Item);
  }
});
