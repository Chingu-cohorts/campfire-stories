import React from 'react';
import { Footer, NavbarHeader } from 'Layout/components';
import 'stylesheets/style.scss'

const Layout = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <NavbarHeader />
      {/* Content */}
      <div className="page-padding">{ children }</div>
      {/* Footer */}
      <Footer />
    </div>
  )
}
export default Layout;
