import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

test('Footer should be a footer element', () => {
  const component = shallow(<Footer />);
  expect(component.type()).toEqual('footer');
});

test('Footer should have a p element with the footer text', () => {
  const component = shallow(<Footer />);
  expect(component.text()).toMatch(/Built with.*?by Chingu Cohorts/);
  expect(component.find('p').find('i').hasClass('fa-heart')).toBe(true);
});

test('Footer should have a link to the cohorts page', () => {
  const component = shallow(<Footer />);
  expect(component.find('p').find('a').prop('href')).toMatch('https://tropicalchancer.github.io/projectus/');
});
