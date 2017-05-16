import React from 'react';
import { shallow } from 'enzyme';
import { Grid, Row, Col } from 'react-bootstrap';
import NotFoundPage from './NotFoundPage';

test('NotFoundPage should be contained within a bootstrap grid', () => {
  const component = shallow(<NotFoundPage />);

  const expectedCol = {
    md: 12
  };

  expect(component.type()).toEqual(Grid);
  expect(component.find(Row).find(Col).props()).toMatchObject(expectedCol);
});

test('NotFoundPage should explain that the page cannot be found', () => {
  const component = shallow(<NotFoundPage />);
  const title = component.find('h1');
  
  expect(title.length).toEqual(1);
  expect(title.text()).toMatch(/404/);
  expect(component.find('p').length).toEqual(1);
});
