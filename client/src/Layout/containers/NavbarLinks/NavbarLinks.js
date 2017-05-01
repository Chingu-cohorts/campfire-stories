import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav } from 'react-bootstrap';

import NavLink from '../../components/NavLink';

const navRole = {
  base: [
    {
      path: 'about',
      text: 'About Us'
    }
  ],
  Guest: [
    {
      path: 'login',
      text: 'Login'
    }
  ],
  Admin: [
    {
      path: 'admin',
      text: 'Admin'
    }
  ],
  Writer: [
    {
      path: 'story',
      text: 'Create'
    },
    {
      path: 'account',
      text: 'Account'
    },
    {
      path: 'logout',
      text: 'Logout'
    }
  ]
};

const makeLinkList = role => [
  ...navRole.base,
  ...navRole[role],
  ...role === 'Admin' && navRole.Writer
];

const NavbarLinks = ({ role }) => {
  // Define Links for User, Guest, or Admin
  const links = makeLinkList(role).map(linkProps =>
    <NavLink key={linkProps.path} eventKey={linkProps.path} {...linkProps} />
  );

  return (
    <Nav pullRight>
      { links }
    </Nav>
  );
};

NavbarLinks.propTypes = {
  role: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    role: state.user.role
  }
};

export default connect(mapStateToProps)(NavbarLinks);
