import { Link } from 'react-router';
import { Field } from 'redux-form';
import AuthBox from 'components/AuthBox';
import SubmitButton from 'components/SubmitButton';
import defaultFields from 'utils/defaultFields';
import ErrorBox from 'components/ErrorBox';
import { Login } from './Login';

let component, sandbox, props;

beforeEach(() => {
  sandbox = sinon.sandbox.create();

  props = {
    handleSubmit: sandbox.spy(),
    loginUser: sandbox.spy(),
    loginError: 'error'
  }

  component = shallow(<Login {...props} />);

});

afterEach(() => {
  sandbox.reset();
})

test('Login should be an AuthBox', () => {
  expect(component.type()).toBe(AuthBox);
});

test('Login should contain a form', () => {
  expect(component.children('form').length).toEqual(1);
});

test('Login form should include an email field', () => {
  expect(component.find(Field).nodes[0].props)
    .toMatchObject(defaultFields.email);
});

test('Login form should include a password field', () => {
  expect(component.find(Field).nodes[1].props)
    .toMatchObject(defaultFields.password);
});

test('Login form should include a Log in button', () => {
  expect(component.find(SubmitButton).children()).toHaveText('Log in');
});

test('Login should contain a link to the password reset page', () => {
  const linkComponent = component.find(Link);
  expect(linkComponent).toHaveProp('to', 'forgot_password');
  expect(linkComponent.children()).toHaveText('Forgot password?')
});

test('Login should be able to show an error message', () => {
  expect(component.find(ErrorBox)).toHaveProp('errorMessage', props.loginError);
});
