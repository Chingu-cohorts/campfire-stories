import Layout from './Layout';
import { NavbarHeader, Footer } from '../components';

test('Layout should have a Nav, a container div, and a Footer', () => {
  const component = shallow(<Layout />);

  expect(component.contains(
    <div>
      <NavbarHeader />
      <div className="page-padding" />
      <Footer />
    </div>
  ));
});
