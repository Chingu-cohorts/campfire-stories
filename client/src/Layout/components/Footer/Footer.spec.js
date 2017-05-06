import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

let component;

beforeEach(() => {
  component = shallow(<Footer />);
})

test('Footer should be a footer element', () => {
  expect(component).toHaveTagName('footer');
});

test('Footer should have a p element with the footer text', () => {
  expect(component).toHaveText("Built with  by Chingu Cohorts");
  expect(component.find('p').find('i')).toHaveClassName('fa-heart');
});

test('Footer should have a link to the cohorts page', () => {
  expect(component.find('p').find('a').prop('href'))
    .toMatch('https://tropicalchancer.github.io/projectus/');
});
