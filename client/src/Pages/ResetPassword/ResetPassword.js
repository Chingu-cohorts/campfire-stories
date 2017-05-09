import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthBox from 'components/AuthBox';
import SubmitButton from 'components/SubmitButton';
import { changePassword } from 'actions/authentication-actions';
import defaultFields, { makeFields } from 'utils/defaultFields';
import { validateChangePassword as validate } from 'utils/validation';

const password = defaultFields.password;

const formFields = [
  {
    ...password,
    name: 'newPassword',
    label: 'New Password',
    placeholder: 'New Password'
  },
  {
    ...password,
    name: 'passwordConfirmation',
    label: 'Password Confirmation',
    placeholder: 'Confirm Password'
  }
]

const makeForm = reduxForm({
  form: 'password-form',
  validate
});

const ResetPassword = ({ handleSubmit, onSubmit, location }) => {
  const form = makeFields(formFields);
  const jwt = location.search.replace(/^\?jwt=/, '');
  const curriedJwt = onSubmit(jwt);
  return (
    <AuthBox>
      <form id="password-form" onSubmit={handleSubmit(curriedJwt)}>
        <FormGroup>
          {form}
          <SubmitButton>Change Password</SubmitButton>
        </FormGroup>
      </form>
    </AuthBox>
  );
};

ResetPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onSubmit: (token) => ({ newPassword }) => dispatch(changePassword({ newPassword, token, isToken: true }))
});

export default connect(null, mapDispatchToProps)(makeForm(ResetPassword));
