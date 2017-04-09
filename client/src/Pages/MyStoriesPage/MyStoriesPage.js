import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';

import * as actions from 'actions/story-actions';
import { StoryThumbnail, WriteButton } from './components';

 /*
  * Component
  */
class MyStoryPage extends Component {
  componentWillMount(){
    // get my submitted stories
    this.props.getMyStories()
  }

  render () {
    const { submitted } = this.props;

    let childElemenets = submitted.map(story =>
      <StoryThumbnail key={story._id} {...story} />
    );

    if (!submitted.length) childElemenets = (<WriteButton />);

    return (
      <Grid className="section bg-white">
        <Row className="grid-1 bottom-space">
          { childElemenets }
        </Row>
      </Grid>
    );
  }
}

/*
 * Redux
 */
const mapStateToProps = (state) => {
  return {
    submitted: state.content.submitted
  }
}

export default connect(mapStateToProps, actions)(MyStoryPage)
