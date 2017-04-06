import React from 'react';
import { shallow } from 'enzyme';
import Layout from './Layout';
import { Nav, Footer } from './components';

test('Layout should have a Nav, a container div, and a Footer', () => {
  const component = shallow(<Layout />);

  expect(component.contains(
    <div>
      <Nav />
      <div className="top-offset" />
      <Footer />
    </div>
  ));
});
