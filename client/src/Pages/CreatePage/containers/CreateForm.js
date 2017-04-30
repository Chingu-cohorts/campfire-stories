import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Row, Col, Button, Form, FormGroup } from 'react-bootstrap';

import * as adminActions from 'actions/admin-actions';
import * as storyActions from 'actions/story-actions';
import ContentForm from 'components/ContentForm';
import { validatePost as validate, asyncValidate } from 'utils/validation';

/*
 * Component
 */
let CreateForm = ({ handleSubmit, addNewStory }) => {
  // Handle Story Body Change
  const onSubmit = ({ image, title, body, description }) => {
    addNewStory({ body, image, title, description })
  }

  return (
    <Row>
      <Col md={12} sm={12} xs={12}>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
/*
 * Redux
 */

// form
CreateForm = reduxForm({
  form: 'new-story',
  validate,
  asyncValidate,
  asyncBlurFields: [ 'image' ]
})(CreateForm);

// connect
const actions = Object.assign({}, adminActions, storyActions)
function mapStateToProps(state) {
  return {
    initialValues: {},
  }
}
CreateForm = connect(mapStateToProps, actions)(CreateForm)

export default CreateForm
