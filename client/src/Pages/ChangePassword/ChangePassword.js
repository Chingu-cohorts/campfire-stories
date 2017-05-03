import React from 'react';
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
    name: 'oldPassword',
    label: 'Old Password',
    placeholder: 'Old Password'
  },
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

const ChangePassword = ({ handleSubmit, onSubmit }) => {
  const form = makeFields(formFields);

  return (
    <AuthBox>
      <form id="password-form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          {form}
          <SubmitButton>Change Password</SubmitButton>
        </FormGroup>
      </form>
    </AuthBox>
  );
};


const mapDispatchToProps = dispatch => ({
  onSubmit: ({ newPassword, oldPassword }) => dispatch(changePassword({ newPassword, oldPassword }))
});

export default connect(null, mapDispatchToProps)(makeForm(ChangePassword));
