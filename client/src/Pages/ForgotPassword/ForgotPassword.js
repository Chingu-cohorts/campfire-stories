import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthBox from 'components/AuthBox';
import SubmitButton from 'components/SubmitButton';
import { renderAlert } from 'components/utils/formFields';
import { requestPasswordReset } from 'actions/authentication-actions';
import defaultFields, { makeFields } from 'utils/defaultFields';
import { validateLogin as validate } from 'utils/validation';

const { email } = defaultFields;

const formFields = [
  email
];

const makeForm = reduxForm({
  form: 'resetpassword',
  validate: validate
})

class ForgotPassword extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    requestPasswordReset: PropTypes.func.isRequired
  }

  constructor (props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({email}){
    this.props.requestPasswordReset({email})
  }

  render (){
    const { handleSubmit } = this.props
    const form = makeFields(formFields);

    return (
      <AuthBox>
        <form id="login-form" onSubmit={ handleSubmit(this.onSubmit) } >
          {renderAlert(this.props.errorMessage)}
          <FormGroup>
            {form}
            <SubmitButton>Reset password</SubmitButton>
          </FormGroup>
        </form>
      </AuthBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.user.email.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestPasswordReset: (email) => dispatch(requestPasswordReset(email))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(makeForm(ForgotPassword));
