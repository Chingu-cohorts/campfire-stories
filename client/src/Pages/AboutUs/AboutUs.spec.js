import React from 'react';
import { shallow } from 'enzyme';
import { Grid, Row, Col } from 'react-bootstrap';
import AboutUs from './AboutUs';

test('AboutUs should be inside a bootstrap grid', () => {
  const component = shallow(<AboutUs />);

  const expectedCol = {
    sm: 8,
    smOffset: 2,
    md: 6,
    mdOffset: 3
  };

  expect(component.type()).toEqual(Grid);
  expect(component.hasClass('about-me'));
  expect(component.find(Row).find(Col).props()).toMatchObject(expectedCol);
});

test('About Us should have two sections', () => {
  const component = shallow(<AboutUs />);
  const content = component.find(Col);

  expect(content.find('h2').length).toEqual(2);
  expect(content.find('p').length).toEqual(2);
});
