import React from 'react';
import { Navbar } from 'react-bootstrap';
import { IndexLink } from 'react-router'

import NavbarLinks from './NavbarLinks'

/*
 * Navbar Component
 */
const Nav = () => {
  return (
    <Navbar fixedTop collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          {/* Home Link */}
          <IndexLink to="/" activeClassName="active" id="home" rel="home">
            <img alt="logo" style={{"maxHeight":"50px"}} src="/img/cs-logo.svg" />
          </IndexLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse style={{paddingLeft: "40px", overflow: "hidden"}}>
        <NavbarLinks />
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Nav;
