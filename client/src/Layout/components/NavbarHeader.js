import React from 'react';
import { IndexLink } from 'react-router'
import { Navbar } from 'react-bootstrap';

/*
 * Navbar Component
 */
const NavbarHeader = () => {
  return (
    <Navbar.Header>
      <Navbar.Brand>
        {/* Home Link */}
        <IndexLink to="/" activeClassName="active" id="home" rel="home">
          <img alt="logo" style={{"maxHeight":"50px"}} src="/img/cs-logo.svg" />
        </IndexLink>
        <Navbar.Toggle toggleNavKey={1}/>
      </Navbar.Brand>
    </Navbar.Header>
  )
}

export default NavbarHeader;
