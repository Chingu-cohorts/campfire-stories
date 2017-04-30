import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav } from 'react-bootstrap';

import NavLink from '../NavLink';

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
      path: 'mystories',
      text: 'My Stories'
    },
    {
      path: 'logout',
      text: 'Logout'
    }
  ]
};

const makeLinkList = role => ({
  ...base,
  ...role === 'Admin' && navRole.Writer,
  ...navRole[role]
});

const NavbarLinks = ({ role }) => {
  // Define Links for User, Guest, or Admin
  const links = makeLinkList(role);
  console.log(links)
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
