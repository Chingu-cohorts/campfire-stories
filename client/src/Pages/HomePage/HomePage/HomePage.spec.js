import React from 'react';
import { shallow } from 'enzyme';
import { Hero } from '../components';
import { Masonry } from '../containers';
import HomePage from './HomePage';

let component;

beforeEach(() => {
  component = shallow(<HomePage />);
});

test('HomePage has a Hero component', () => {
  expect(component.childAt(0).node.type).toEqual(Hero);
});

test('HomePage has a Masonry component', () => {
  expect(component.childAt(1).node.type).toEqual(Masonry);
});
