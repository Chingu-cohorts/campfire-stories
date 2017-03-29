import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import CreateForm from './components/CreateForm';
import { updatePath, emptyBody } from 'actions/story-actions';
 /*
  * Component
  */
class CreateOrEditPage extends Component {
  componentWillMount () {
    // empty body form Field
    this.props.emptyBody()
  }

  render () {
    let path = this.props.location.pathname
    this.props.updatePath(path)
    return (
      <Grid className="bg-white bottom-space" id="create-page">
        <Row>
          <Col md={12}>
            <h2 className="h2">Write a Story</h2>
          </Col>
          <CreateForm path={path} />
        </Row>
      </Grid>
    );
  }
}

/*
 * Redux
 */
export default connect(null, { updatePath, emptyBody })(CreateOrEditPage)
