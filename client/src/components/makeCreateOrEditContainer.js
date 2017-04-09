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
        <Grid className="content-page">
          <Row>
            <Col md={12}><h2 className="h2">Write a Story</h2></Col>
          </Row>
          <Row>
            <FormComponent _id={_id} />            
          </Row>
        </Grid>
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
