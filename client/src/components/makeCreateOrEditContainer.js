import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import { emptyBody } from 'actions/story-actions';

export default function makeCreateOrEditContainer(FormComponent) {
  class CreateOrEditContentContainer extends Component {
    static propTypes = {
      emptyBody: PropTypes.func.isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
      }).isRequired
    }

    componentWillMount () {
      // empty body form Field
      this.props.emptyBody();
    }

    render () {
      const _id = this.props.location.pathname.replace(/\/edit\//, '');

      return (

        <div className="content-page">
          <div className="create-story-container">
            <Row>
              <h2 className="create-story-heading">Write a Story</h2>
            </Row>
            <span className="horizontal-rule"></span>
            <Row>
              <FormComponent _id={_id} />
            </Row>
          </div>
        </div>
      );
    }
  }

  const mapDispatchToProps = dispatch => ({
    emptyBody
  })

  return connect(
    null,
    mapDispatchToProps
  )(CreateOrEditContentContainer);
}
