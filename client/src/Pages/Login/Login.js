import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormGroup } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthBox from 'components/AuthBox';
import SubmitButton from 'components/SubmitButton';
import { renderAlert } from 'components/utils/formFields';
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

class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    loginError: PropTypes.string
  }

  constructor (props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  //
  onSubmit({email, password}){
    this.props.loginUser({email, password})
  }
  //
  render (){

    const { handleSubmit } = this.props
    const form = makeFields(formFields);

    return (
      <AuthBox>
        <form id="login-form" onSubmit={ handleSubmit(this.onSubmit) } >
          {renderAlert(this.props.loginError)}
          <FormGroup>
            {form}
            <Link to="forgot_password">
              <span>Forgot password?</span>
            </Link>
            <SubmitButton>Log in</SubmitButton>
          </FormGroup>
        </form>
      </AuthBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginError: state.user.authenticated.error
  }
}

export default connect(
  mapStateToProps,
  { loginUser }
)(makeForm(LoginForm));
