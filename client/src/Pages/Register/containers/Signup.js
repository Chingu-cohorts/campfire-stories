import React from 'react';
import { Row, Col, FormGroup } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { renderField, renderAlert } from 'components/utils/formFields';
import SubmitButton from 'components/SubmitButton';
import * as actions from 'actions/authentication-actions';
import { validateLogin as validate } from 'utils/validation';


class SignupForm extends React.Component {
  constructor (props){
    super(props);
    // bind this to our event handlers so we don't have to do it somehwere else
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({firstName, lastName, email, password, passwordConfirmation}){
    this.props.registerUser({firstName, lastName, email, password, passwordConfirmation})
  }

  render (){
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit) } role="form" id="register-form">
        {renderAlert(this.props.errorMessage)}
        <FormGroup>
          <Row>
            <Col sm={6}>
              <Field
                type="text"
                name="firstName"
                component={renderField}
                label="First Name"
                tabIndex="1"
                className="form-control"
                placeholder="First"
              />
            </Col>
            <Col sm={6}>
              <Field
                type="text"
                name="lastName"
                component={renderField}
                label="Last Name"
                id="lastName"
                tabIndex="1"
                className="form-control"
                placeholder="Last"
              />
            </Col>
          </Row>
          <Field
            name="email"
            component={renderField}
            label="Email"
            id="email"
            tabIndex="1"
            className="form-control"
            placeholder="Email Address"
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
          <SubmitButton>Register</SubmitButton>
        </FormGroup>
      </form>
    );
  }
}
/*
 * Redux
 */
SignupForm.propTypes = {
  registerUser: React.PropTypes.func.isRequired
}

const form = reduxForm({
  form: 'register',
  validate: validate
})

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    isDone: state.user.await
  }
}

export default connect(mapStateToProps, actions )(form(SignupForm));
