import React from 'react';
import { shallow } from 'enzyme';
import { Grid, Row, Col } from 'react-bootstrap';
import Footer from '../Footer'

test('Footer should be a footer element', () => {
  const component = shallow(<Footer />);
  expect(component.type()).toEqual('footer');
})
