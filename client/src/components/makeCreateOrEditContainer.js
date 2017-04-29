import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import { emptyBody } from 'actions/story-actions';

export default function makeCreateOrEditContainer(FormComponent) {
  class CreateOrEditContentContainer extends Component {
    componentWillMount () {
      // empty body form Field
      this.props.emptyBody()
    }

    render () {
      const _id = this.props.location.pathname.replace(/\/edit\//, '');

      return (

        <div className="content-page">
          <div className="story-form-container">
            <Row>
              <h2 className="heading">Write a Story</h2>
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
