import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-bootstrap';

import Hero from './Hero';

let component;

beforeEach(() => {
  component = shallow(<Hero />);
});

test('Hero should be a section', () => {
  expect(component).toHaveTagName('section');
});

test('Hero should be centered with a table', () => {
  const inlineBlock = component.find('article');
  const cell = inlineBlock.parent();
  const table = cell.parent();

  expect(inlineBlock.length).toEqual(1);
  expect(inlineBlock).toHaveClassName('hero-content-group');
  expect(cell).toHaveClassName('table-cell');
  expect(table).toHaveClassName('table');
});

test('Hero should have an h1 title', () => {
  const title = component.find('article').find('h1');
  const expectedText = 'Welcome to the Campfire Stories';
  expect(title).toHaveText(expectedText);
});

test('Hero should have two buttons', () => {
  expect(component.find('article').find(Button).length).toEqual(2);
});

test('Hero should have an explore Button', () => {
  const btn = component.find('article').childAt(2);
  expect(btn).toHaveProp('href', '#explore-stories');
});

test('Hero should have a join us Button', () => {
  const btn = component.find('article').childAt(4);
  expect(btn).toHaveProp('href', 'https://tropicalchancer.github.io/projectus/');
});

test('Hero should have a subtitle', () => {
  const subtitle = component.find('article').find('p');
  const expectedText = 'Place where people from all over the world share their stories while on a quest of learning to code';
  expect(subtitle).toHaveText(expectedText);
});
