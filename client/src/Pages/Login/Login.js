import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormGroup } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthBox from 'components/AuthBox';
import SubmitButton from 'components/SubmitButton';
import { ErrorBox } from 'components/ErrorBox';
import { loginUser } from 'actions/authentication-actions';
import defaultFields, { makeFields } from 'utils/defaultFields';
import { validateLogin as validate } from 'utils/validation';

const { email, password } = defaultFields;

const formFields = [
  email,
  password
];

const makeForm = reduxForm({
  form: 'login',
  validate: validate
})

export class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    loginError: PropTypes.string
  }

  constructor (props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({email, password}){
    this.props.loginUser({email, password})
  }

  render (){
    const { handleSubmit } = this.props
    const form = makeFields(formFields);

    return (
      <AuthBox>
        <form id="login-form" onSubmit={ handleSubmit(this.onSubmit) } >
          <ErrorBox errorMessage={this.props.loginError} />
          <FormGroup>
            {form}
            <Link to="forgot_password">Forgot password?</Link>
            <SubmitButton>Log in</SubmitButton>
          </FormGroup>
        </form>
      </AuthBox>
    );
  }
}

export const mapStateToProps = state => ({
  loginError: state.user.authenticated.error
});

export const mapDispatchToProps = dispatch => ({
  loginUser: credentials => dispatch(loginUser(credentials))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(makeForm(Login));
