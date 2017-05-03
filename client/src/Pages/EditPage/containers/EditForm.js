import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Button, FormGroup } from 'react-bootstrap';
import { reduxForm } from 'redux-form'

import * as adminActions from 'actions/admin-actions'
import * as storyActions from 'actions/story-actions'
import ContentForm from 'components/ContentForm';
import {
  validatePost as validate,
  imgUrlHeaderValidate as asyncValidate
} from 'utils/validation';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount()  {
    const { getStory, _id } = this.props;
    getStory(_id);
  }

  onSubmit = ({ image, title, body  }) => {
    const { _id, updateStory } = this.props;
    updateStory({ body, image, title }, _id);
  }

  render() {
    const { handleSubmit, deleteStory, _id } = this.props;
    return (
      <Col md={8} sm={8} xs={12}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <ContentForm />
          <FormGroup>
            <Button type="submit" bsStyle="primary" className="cs-btn-green">Update</Button>
            <Button onClick={() => deleteStory(_id)} bsStyle="primary" className="cs-btn-green admin-btn">Delete</Button>
          </FormGroup>

        </form>
      </Col>
    );
  }
}

// form
EditForm = reduxForm({
  form: 'editStory',
  enableReinitialize: true,
  validate,
  asyncValidate,
  asyncBlurFields: [ 'image' ]  
})(EditForm)

// connect
const actions = Object.assign({}, adminActions, storyActions)

const setInitialValues = (story) => {
  if (!story) return {};
  const { title, image, body } = story;
  return { initialValues: { title, image, body } };
};

function mapStateToProps(state, ownProps) {
  return {
    ...setInitialValues(state.content.currentStory)
  };
};

EditForm = connect(mapStateToProps, actions)(EditForm)

export default EditForm
