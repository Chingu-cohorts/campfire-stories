import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from 'react-bootstrap';
import { NavbarLinks } from './NavbarLinks';
import NavLink from '../NavLink';

const navOptions = {
  Common: [
    {
      eventkey: 7,
      path: 'about',
      text: 'About Us'
    }
  ],
  Guest: [
    {
      eventKey: 1,
      path: 'login',
      text: 'Login'
    }
  ],
  Writer: [
    {
      eventkey: 3,
      path: 'story',
      text: 'Create'
    },
    {
      eventkey: 4,
      path: 'mystories',
      text: 'My Stories'
    },
    {
      eventkey: 5,
      path: 'logout',
      text: 'Logout'
    }
  ],
  Admin: [
    {
      eventkey: 6,
      path: 'admin',
      text: 'Admin'
    }
  ]
};

const makePropObj = (nodes) => nodes.map(node => node.props);

const makeExpected = (role) => [
  ...navOptions.Common,
  ...role === 'Admin' ? navOptions.Writer : [],
  ...navOptions[role]
];

const testTemplate = (role) => {
  const props = { role };
  const component = shallow(<NavbarLinks {...props} />);
  const expectedNavLinks = makeExpected(props.role);
  const actualNavLinks = makePropObj(component.children().nodes);

  expect(component.children().length).toEqual(expectedNavLinks.length);
  expect(actualNavLinks).toEqual(expectedNavLinks);
}

test('NavbarLinks should contain a Nav component', () => {
  const props = { role: 'Guest' };
  const component= shallow(<NavbarLinks {...props} />);
  expect(component.type()).toEqual(Nav);
});

test('NavbarLinks should have About Us and Log In as nav options for guests', () => {
  testTemplate('Guest');
});

test('NavbarLinks should have Create, My Stories, and Log Out nav options for writers', () => {
  testTemplate('Writer');
});

test('NavbarLinks should have an Admin nav option for admins', () => {
  testTemplate('Admin');
});
