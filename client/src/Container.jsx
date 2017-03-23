import React from 'react';
import Nav from './components/Navbar/Nav';
import Footer from './components/BitsAndBobs/Footer'
require('./stylesheets/style.scss')

const Container = ({ children }) => {
  return (
    <div clasName="layout">
      {/* Navbar */}
      <Nav />
      {/* Content */}
      { children }
      {/* Footer */}
      <Footer className='layout-bottom'/>
    </div>
  )
}
export default Container;
