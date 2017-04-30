import React from 'react';
import { FormGroup } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthBox from 'components/AuthBox';
import { renderField } from 'components/utils/formFields';
import SubmitButton from 'components/SubmitButton';
import { changePassword } from 'actions/authentication-actions';
//import { validateLogin as validate } from 'utils/validation';

const validate = () => ({});

const form = reduxForm({
  form: 'password-form',
  validate
});

const ChangePassword = ({ handleSubmit, onSubmit }) => (
  <AuthBox>
    <form id="password-form" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Field
          type="password"
          name="oldPassword"
          component={renderField}
          label="Old Password"
          id="old-password"
          tabIndex="1"
          className="form-control"
          placeholder="Old Password"
        />
        <Field
          type="password"
          name="newPassword"
          component={renderField}
          label="New Password"
          id="new-password"
          tabIndex="2"
          className="form-control"
          placeholder="Password"
        />
        <Field
          type="password"
          name="passwordConfirmation"
          component={renderField}
          label="Password Confirmation"
          id="confirm-password"
          tabIndex="3"
          className="form-control"
          placeholder="Confirm Password"
        />
        <SubmitButton>Change Password</SubmitButton>
      </FormGroup>
    </form>
  </AuthBox>
);

const mapDispatchToProps = dispatch => ({
  onSubmit: ({ newPassword, oldPassword }) => dispatch(changePassword({ newPassword, oldPassword }))
});

export default connect(null, mapDispatchToProps)(form(ChangePassword));
