import { Navbar } from 'react-bootstrap';
import { IndexLink } from 'react-router';

import { NavbarLinks } from '../../containers';
import NavbarHeader from './NavbarHeader';

let component;

beforeEach(() => {
  component = shallow(<NavbarHeader />);
})

test('NavbarHeader should have a logo brand that points to the home page', () => {
  const brand = component
    .find(Navbar.Header)
    .find(Navbar.Brand)
    .find(IndexLink);

  const expectedLink = {
    to: '/',
    activeClassName: 'active'
  };

  const expectedImg = {
    alt: 'logo',
    src: '/img/cs-logo.svg',
    className: 'logo'
  }

  expect(brand.length).toEqual(1);
  expect(brand.props()).toMatchObject(expectedLink);
  expect(brand.find('img').props()).toMatchObject(expectedImg);
});

test('NavbarHeader should have a collapsible navbar', () => {
  expect(component.find(Navbar.Toggle).length).toEqual(1);
  expect(component.find(Navbar.Collapse).find(NavbarLinks).length).toEqual(1);
});
