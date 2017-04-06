import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav } from 'react-bootstrap';

import NavLink from '../NavLink';

const NavbarLinks = ({ role }) => {
  // Define Links for User, Guest, or Admin
  let links = [];

  links.push(<NavLink eventkey={7} key={7} path="about" text="About Us" />);

  // Guest Links
  if (role === 'Guest') {
    links.push(<NavLink eventKey={1} key={1} path="login" text="Login" />);
  }

  // Logged-in Links
  if (role === 'Admin' || role === 'Writer') {
    links.push(<NavLink eventkey={3} key={3} path="story" text="Create" />);
    links.push(<NavLink eventkey={4} key={4} path="mystories" text="My Stories" />);
    links.push(<NavLink eventkey={5} key={5} path="logout" text="Logout" />);
  }

  // Admin Links
  if (role === 'Admin') {
    links.push(<NavLink eventkey={6} key={6} path="admin" text="Admin" />);
  }

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
