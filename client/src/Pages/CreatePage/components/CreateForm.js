// modules
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col } from 'react-bootstrap';
// import moment from 'moment'
// import classnames from 'classnames'
// locals
import * as adminActions from 'actions/admin-actions';
import * as storyActions from 'actions/story-actions';
import { renderField } from 'components/utils/formFields';
import { renderTextarea } from 'components/utils/textareaField';
import { validatePost as validate } from 'utils/validation';

/*
 * Component
 */
let CreateForm = ({ role, path, name, body, errorMessage, handleSubmit, addNewStory, updateStory, approveStory, deleteStory, handleStoryBody }) => {
  /*
   * Handle Story Body Change
   */
  const onSubmit = ({ image, title, body }) => {
    addNewStory({ body, image, title })
  }
  /*
   * Render
   */
  // let time = moment().format('LL')

  return (
    <Col sm={8} xs={12}>
      <form onSubmit={handleSubmit(onSubmit)} >
        <Field
          id="text" name="image" placeholder="Include an image URL for your header"
          type="url" label="Image" component={renderField} />

        <Field
          id="text1" name="title" placeholder="Title" type="text"
          label="Title" component={renderField}  />

        <Field
          cols="40" id="textarea" name="body" rows="10"
          type="text" label="Story" component={renderTextarea}  />

          <div className="form-group">
            <button type="submit" className="btn btn-primary cs-btn-green">Submit your story</button>
          </div>
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
    name: state.user.name,
    errorMessage: state.content.error,
    role: state.user.role,
    initialValues: {},
    body: state.content.body
  }
}
CreateForm = connect(mapStateToProps, actions)(CreateForm)

export default CreateForm
