import React from 'react';
import { shallow } from 'enzyme';
import NavLink from './NavLink';
import { NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

let component;

const props = {
  path: 'path',
  text: 'text'
};

beforeEach(() => {
  component = shallow(<NavLink {...props} />);
})

test('NavLink should contain a Nav component', () => {
  expect(component.type(Nav)).toEqual(Nav);
});

test('NavLink should have a LinkContainer that points to the path', () => {
  const link = component.find(LinkContainer);
  expect(link.prop('to')).toEqual(`/${props.path}`);
});

test('NavLink should have a NavItem that has a text description of the link', () => {
  const description = component.find(NavItem);
  expect(description.render().text()).toEqual(props.text);
});
