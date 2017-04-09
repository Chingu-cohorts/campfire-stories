import React, { PropTypes } from 'react';
import { NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavLink = ({ path, text }) => (
  <Nav>
    <LinkContainer active={false} to={`/${path}`}>
      <NavItem>
        {text}
      </NavItem>
    </LinkContainer>
  </Nav>
);

NavLink.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default NavLink;
