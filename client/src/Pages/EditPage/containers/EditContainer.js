// modules
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form'
// import moment from 'moment'
// import classnames from 'classnames'
// locals
import * as adminActions from 'actions/admin-actions'
import * as storyActions from 'actions/story-actions'
import { renderField } from 'components/utils/formFields'
import { renderTextarea } from 'components/utils/textareaField'
import { validatePost as validate } from 'utils/validation'

//let EditForm = ({ role, path, name, body, errorMessage, handleSubmit, updateStory, approveStory, deleteStory, handleStoryBody }) => {

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.findStory = this.findStory.bind(this);
  }

  componentWillMount()  {
    const { stories, getStory, _id } = this.props;
    if (!stories.length) getStory(_id);
  }

  findStory() {
    const { _id, stories } = this.props;
    return stories.filter(story => story && story._id === _id)[0];
  }

  setInitialValues(story = {}) {
    this.props.initialValues = {
      image: story.image,
      title: story.title,
      body: story.body
    }
  }

  render() {
    this.setInitialValues(this.findStory())
    let pattern = /[a-f0-9]{24}/;
    const { handleSubmit, deleteStory, updateStory, _id } = this.props;
    const onSubmit = ({ image, title, body  }) => {
      // update story
      let id = _id.match(pattern)
      updateStory({ body, image, title }, id)
    }

    return (
      <div className="col-md-8 col-sm-8 col-xs-12">
          <form onSubmit={handleSubmit(onSubmit)} >

            <Field key={1}
              id="text" name="image" placeholder="Include an image URL for your header"
              type="url" label="Image" component={renderField} />

            <Field key={2}
              id="text1" name="title" placeholder="Title" type="text"
              label="Title" component={renderField}  />

            <Field key={3}
              cols="40" id="textarea" name="body" rows="10"
              placeholder="Tell people about yourself, how you got started with FCC, and what you hope to achieve. Or something."
              type="text" label="Story" component={renderTextarea}  />

              <div className="form-group">
                <button type="submit" className="btn btn-primary cs-btn-green">Update</button>
                <button onClick={() => deleteStory(_id.match(pattern)) } className="btn btn-primary cs-btn-green admin-btn">Delete</button>
              </div>

          </form>
      </div>
    );
  }
}

// form
EditForm = reduxForm({
  form: 'new-story',
  validate
})(EditForm)

// connect
const actions = Object.assign({}, adminActions, storyActions)
// form preloading
function matchStory(state, ownProps){
  const { path } = ownProps;
  const role = state.user.role
  let preload = { initialValues: {}, body: '' };
  let lookup;
  //
  if (role === 'Member') {
    lookup = state.content.submitted
  }
  if (role === 'Admin') {
    lookup =  [...state.content.submitted, ...state.content.adminStories]
  }

  lookup = lookup.filter(( story ) => {
    return (story._id === path)
  })[0]
  //
  preload.initialValues = {title: lookup.title, image: lookup.image, body: lookup.body}
  return preload;

}

const createStoryList = (content) => {
  const { submitted, current, currentStory } = content;

  let stories = [ ...submitted, ...current ]
  if (currentStory) stories.push(currentStory);

  return stories;
}

function mapStateToProps(state, ownProps) {
  console.log(ownProps)
  return {
    name: state.user.name,
    errorMessage: state.content.error,
    role: state.user.role,
    stories: createStoryList(state.content)
  }
}
EditForm = connect(mapStateToProps, actions)(EditForm)

export default EditForm
