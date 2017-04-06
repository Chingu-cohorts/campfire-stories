import React from 'react';
import { shallow } from 'enzyme';
import NavLink from './NavLink';
import { NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const props = {
  path: 'path',
  text: 'text'
};

test('NavLink should contain a Nav component', () => {
  const component = shallow(<NavLink {...props} />);
  expect(component.type(Nav)).toEqual(Nav);
});

test('NavLink should have a LinkContainer that points to the path', () => {
  const component = shallow(<NavLink {...props} />);
  const link = component.find(LinkContainer);
  expect(link.prop('to')).toEqual(`/${props.path}`);
});

test('NavLink should have a NavItem that has a text description of the link', () => {
  const component = shallow(<NavLink {...props} />);
  const description = component.find(NavItem);
  expect(description.render().text()).toEqual(props.text);
});
