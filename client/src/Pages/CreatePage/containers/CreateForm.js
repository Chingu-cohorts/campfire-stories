import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Col, Button, FormGroup } from 'react-bootstrap';

import * as adminActions from 'actions/admin-actions';
import * as storyActions from 'actions/story-actions';
import ContentForm from 'components/ContentForm';
import { validatePost as validate } from 'utils/validation';

/*
 * Component
 */
let CreateForm = ({ handleSubmit, addNewStory }) => {
  // Handle Story Body Change
  const onSubmit = ({ image, title, body }) => {
    addNewStory({ body, image, title })
  }

  return (
    <Col sm={8} xs={12}>
      <form onSubmit={handleSubmit(onSubmit)} >
        <ContentForm />
        <FormGroup>
          <Button type="submit" bsStyle="primary" className="cs-btn-green">
            Submit your story
          </Button>
        </FormGroup>
      </form>
    </Col>
  );
};
/*
 * Redux
 */

// form
CreateForm = reduxForm({
  form: 'new-story',
  validate
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
