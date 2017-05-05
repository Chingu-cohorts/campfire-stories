import React from 'react';
import { shallow } from 'enzyme';
import { Grid, Row, Col } from 'react-bootstrap';
import AboutUs from './AboutUs';

let component;

beforeEach(() => {
  component = shallow(<AboutUs />);
})

test('AboutUs should be inside a bootstrap grid', () => {
  expect(component.type()).toEqual(Grid);
  expect(component.find(Row).hasClass('about-row')).toBe(true);
});

test('About Us should have two sections', () => {
  const content = component.find(Row).find('article');
  expect(content.length).toEqual(2);
  expect(content.find('h2').length).toEqual(2);
  expect(content.find('p').length).toEqual(2);
});

test('About Us should have an image', () => {
  expect(component.find('img').length).toEqual(1);
})
