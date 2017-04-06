import React from 'react';
import { Footer, Nav } from './components';
import 'stylesheets/style.scss'

const Layout = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <Nav />
      {/* Content */}
      <div className="top-offset">{ children }</div>
      {/* Footer */}
      <Footer />
    </div>
  )
}
export default Layout;
