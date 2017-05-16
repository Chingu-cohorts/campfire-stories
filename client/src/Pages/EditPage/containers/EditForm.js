import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Button, FormGroup } from 'react-bootstrap';
import { reduxForm } from 'redux-form';

import ErrorBox from 'components/ErrorBox';
import { getStory, updateStory, deleteStory } from 'actions/story-actions';
import ContentForm from 'components/ContentForm';
import {
  validatePost as validate,
  imgUrlHeaderValidate as asyncValidate
} from 'utils/validation';

class EditForm extends Component {
  static propTypes = {
    _id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    getStory: PropTypes.func.isRequired,
    deleteStory: PropTypes.func.isRequired,
    updateStory: PropTypes.func.isRequired,
    updateError: PropTypes.string,
    deleteError: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount()  {
    const { getStory, _id } = this.props;
    getStory(_id);
  }

  onSubmit = ({ image, description, title, body  }) => {
    const { _id, updateStory } = this.props;
    updateStory({ image, description, title, body }, _id);
  }

  render() {
    const { handleSubmit, deleteStory, _id } = this.props;
    return (
      <Col md={8} sm={8} xs={12}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <ErrorBox errorMessage={this.props.updateError} />
          <ErrorBox errorMessage={this.props.deleteError} />
          <ContentForm />
          <FormGroup>
            <Button
              type="submit"
              bsStyle="primary"
              className="cs-btn-green"
              children={[ 'Update' ]}
            />
            <Button
              onClick={() => deleteStory(_id)}
              bsStyle="primary"
              id="admin-btn"
              className="cs-btn-green"
              children={[ 'Delete' ]}
            />
          </FormGroup>
        </form>
      </Col>
    );
  }
}

const makeForm = reduxForm({
  form: 'editStory',
  enableReinitialize: true,
  validate,
  asyncValidate,
  asyncBlurFields: [ 'image' ]
});

const setInitialValues = (story) => {
  if (!story) return {};
  const { image, description, title, body  } = story;
  return { initialValues: { image, description, title, body } };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...setInitialValues(state.content.currentStory.story),
    updateError: state.content.update.error,
    deleteError: state.content.delete.error
  };
};

const mapDispatchToProps = dispatch => ({
  getStory: _id => dispatch(getStory(_id)),
  deleteStory: _id => dispatch(deleteStory(_id)),
  updateStory: (data, _id) => dispatch(updateStory(data, _id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(makeForm(EditForm));
