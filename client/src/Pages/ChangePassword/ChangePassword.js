import React from 'react';
import { FormGroup } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthBox from 'components/AuthBox';
import { renderField } from 'components/utils/formFields';
import SubmitButton from 'components/SubmitButton';
import { loginUser } from 'actions/authentication-actions';
import { validateLogin as validate } from 'utils/validation';

const form = reduxForm({
  form: 'password'
});

const onSubmit = () => console.log('submitted');

const ChangePassword = ({ handleSubmit}) => (
  <AuthBox>
    <form id="password-form" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Field
          type="password"
          name="oldPassword"
          component={renderField}
          label="Old Password"
          id="old-password"
          tabIndex="2"
          className="form-control"
          placeholder="Old Password"
        />
        <Field
          type="password"
          name="password"
          component={renderField}
          label="Password"
          id="password"
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
          tabIndex="2"
          className="form-control"
          placeholder="Confirm Password"
        />
        <SubmitButton>Log in</SubmitButton>
      </FormGroup>
    </form>
  </AuthBox>
);

export default connect(null, { loginUser })(form(ChangePassword));
