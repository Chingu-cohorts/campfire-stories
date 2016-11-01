// modules
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import moment from 'moment'
import classnames from 'classnames'
import Editor from 'react-medium-editor';
// locals
import FormButton from './FormButtons'
import * as adminActions from '../../actions/admin-actions'
import * as storyActions from '../../actions/story-actions'
import { renderField } from '../utils/formFields'
import { validatePost as validate } from '../../utils/validation'
// medium editor style
require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/bootstrap.css');


/*
 * Component
 */
let CreateForm = ({ role, path, name, body, errorMessage, handleSubmit, addNewStory, updateStory, approveStory, deleteStory, handleStoryBody }) => {
  /*
   * Handle Story Body Change
   */
  const onChangeMediumEditor = (text, medium) => {
    handleStoryBody(medium['elements'][0]['innerHTML'])
  }
  const onSubmit = ({ image, title  }) => {
    addNewStory({ body, image, title })
  }
  /*
   * Render
   */
  let time = moment().format('LL')

  return (
    <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-1">
      <form onSubmit={handleSubmit(onSubmit)} className="storyForm">
        {/* Title */}
        <h2>Tell Your Coding Story</h2>
        <hr />
        {/* Name and Date */}
        <div className="row">
          <div className="col-sm-6">
            <h4>{name}</h4>
          </div>
          <div className="col-sm-6">
            <h4>{time}</h4>
          </div>
        </div>
        {/* Spacer */}
        <div className="row"></div>
        {/* Image Url */}
        <Field type="url" label="Image" name="image" component={renderField} placeholder="Include an image url for your header"/>
        {/* Story Title */}
        <Field type="text" label="Title" name="title" component={renderField} placeholder="Title" />
        {/* Story Body */}

        <div className={classnames('form-group', {'has-error': errorMessage})}>
          <br />
          <strong>Body</strong>
          <Editor
            className="form-control"
            data-placeholder="Double click on text to style."
            text={body}
            onChange={onChangeMediumEditor}
            options={{toolbar: {buttons: ['bold', 'italic', 'underline','anchor']}}}
            />
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </div>

        {/* Form Buttons */}
        <button type="submit" className="btn btn-primary">Submit your story</button>
      </form>
    </div>
  )
}
/*         <FormButton />
 * Redux
 */

// form
CreateForm = reduxForm({
  form: 'new-story',
  validate
})(CreateForm)

// connect
const actions = Object.assign({}, adminActions, storyActions)
// form preloading
function matchStory(state){
  const path = state.content.path.slice(6)
  const role = state.user.role
  let preload = { initialValues: {}, body: '' };
  let lookup;
  //
  if (role === 'Member') {
    lookup = state.content.submitted
  }
  if (role === 'Admin') {
    lookup =  state.content.submitted
  }

  lookup = lookup.filter(( story ) => {
    return (story._id === path)
  })[0]
  //
  preload.initialValues = {title: lookup.title, image: lookup.image}
  preload.body = lookup.body
  return preload;

}


function mapStateToProps(state) {
  return {
    name: state.user.name,
    errorMessage: state.content.error,
    role: state.user.role,
    ...matchStory(state)
  }
}
CreateForm = connect(mapStateToProps, actions)(CreateForm)

export default CreateForm
