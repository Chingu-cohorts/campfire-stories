import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthBox from 'components/AuthBox';
import ErrorBox from 'components/ErrorBox';
import SubmitButton from 'components/SubmitButton';
import { registerUser } from 'actions/admin-actions';
import defaultFields, { makeFields } from 'utils/defaultFields';
import { validateRegister as validate } from 'utils/validation';

const { name, email } = defaultFields;

const formFields = [
  {
    ...name,
    name: 'firstName',
    label: 'First Name'
  },
  {
    ...name,
    name: 'lastName',
    label: 'Last Name'
  },
  email
];

const makeForm = reduxForm({
  form: 'register',
  validate
});

class SignupForm extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  }

  constructor (props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({firstName, lastName, email}){
    this.props.registerUser({ firstName, lastName, email })
  }

  render (){
    const { handleSubmit } = this.props;
    const otherFields = makeFields(formFields).slice(2);

    return (
      <AuthBox>
        <form onSubmit={ handleSubmit(this.onSubmit) } role="form" id="register-form">
          <ErrorBox errorMessage={this.props.registerError} />
          <FormGroup>
            <Row>
              <Col sm={6}>
                <Field tabIndex={1} {...formFields[0]} />
              </Col>
              <Col sm={6}>
                <Field tabIndex={2} {...formFields[1]} />
              </Col>
            </Row>
            {otherFields}
            <SubmitButton>Register</SubmitButton>
          </FormGroup>
        </form>
      </AuthBox>
    );
  }
}

const mapStateToProps = state => {
  return {
    registerError: state.admin.register.error,
  }
};

const mapDispatchToProps = dispatch => ({
  registerUser: data => dispatch(registerUser(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(makeForm(SignupForm));
