import React from 'react';
import { FormGroup } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { renderField, renderAlert } from 'components/utils/formFields';
import SubmitButton from 'components/SubmitButton';
import { loginUser } from 'actions/authentication-actions';
import { validateLogin as validate } from 'utils/validation';


const loginForm = reduxForm({
  form: 'login',
  validate: validate
})

class LoginForm extends React.Component {
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

    return (
      <form id="login-form" onSubmit={ handleSubmit(this.onSubmit) } >
        {renderAlert(this.props.errorMessage)}
        <FormGroup>
          <Field
            type="text"
            name="email"
            component={renderField}
            label="Email"
            id="username"
            tabIndex="1"
            className="form-control"
            placeholder="Username"
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
          <SubmitButton>Log in</SubmitButton>
        </FormGroup>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.user.error
  }
}

export default connect(mapStateToProps, { loginUser })(loginForm(LoginForm))
