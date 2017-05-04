import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from 'react-bootstrap';
import { NavbarLinks } from './NavbarLinks';
import { NavLink } from 'Layout';

const navOptions = {
  Common: [
    {
      eventKey: 'about',
      path: 'about',
      text: 'About Us'
    }
  ],
  Guest: [
    {
      eventKey: 'login',
      path: 'login',
      text: 'Login'
    }
  ],
  Writer: [
    {
      eventKey: 'story',
      path: 'story',
      text: 'Create'
    },
    {
      eventKey: 'account',
      path: 'account',
      text: 'Account'
    },
    {
      eventKey: 'logout',
      path: 'logout',
      text: 'Logout'
    }
  ],
  Admin: [
    {
      eventKey: 'admin',
      path: 'admin',
      text: 'Admin'
    }
  ]
};

const makePropObj = (nodes) => nodes.map(node => node.props);

const makeExpected = (role) => [
  ...navOptions.Common,
  ...navOptions[role],
  ...role === 'Admin' ? navOptions.Writer : []
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
