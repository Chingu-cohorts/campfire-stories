import React from 'react';
import { Navbar } from 'react-bootstrap';
import { IndexLink } from 'react-router';

import { NavbarLinks } from '../../containers';

const NavbarHeader = () => {
  return (
    <Navbar fixedTop collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          {/* Home Link */}
          <IndexLink to="/" activeClassName="active" id="home" rel="home">
            <img alt="logo" src="/img/cs-logo.svg" className="logo" />
          </IndexLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse className="menu">
        <NavbarLinks />
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarHeader;
