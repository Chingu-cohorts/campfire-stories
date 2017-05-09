import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Row, Col, Button, Form, FormGroup } from 'react-bootstrap';

import { renderAlert } from 'components/utils/formFields';
import { addNewStory } from 'actions/story-actions';
import ContentForm from 'components/ContentForm';
import {
  validatePost as validate,
  imgUrlHeaderValidate as asyncValidate
} from 'utils/validation';

const CreateForm = ({ handleSubmit, addNewStory }) => {
  // Handle Story Body Change
  const onSubmit = ({ image, title, body, description }) => {
    addNewStory({ body, image, title, description })
  };

  return (
    <Row>
      <Col md={12} sm={12} xs={12}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {renderAlert(this.props.createError)}
          <ContentForm />
          <FormGroup>
            <Button type="submit" bsStyle="primary" className="cs-btn-green">
              Submit your story
            </Button>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
};

CreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  addNewStory: PropTypes.func.isRequired,
  createError: PropTypes.string
};

const makeForm = reduxForm({
  form: 'new-story',
  validate,
  asyncValidate,
  asyncBlurFields: [ 'image' ]
});

const mapStateToProps = state => {
  return {
    initialValues: {},
    createError: state.content.newStory.error
  }
};

const mapDispatchToProps = dispatch => ({
  addNewStory: data => dispatch(addNewStory(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(makeForm(CreateForm));
