import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from 'actions/story-actions';
import { StoryThumbnail, WriteButton } from '../components';

class MyStories extends Component {
  componentWillMount(){
    this.props.getMyStories()
  }

  render () {
    const { submitted } = this.props;

    let childElemenets = submitted.map(story =>
      <StoryThumbnail key={story._id} {...story} />
    );

    if (!submitted.length) childElemenets = (<WriteButton />);

    return (
      <section>
        { childElemenets }
      </section>
    );
  }
}

MyStories.propTypes = {
  submitted: PropTypes.array.isRequired,
  getMyStories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    submitted: state.content.submitted
  }
};

export default connect(mapStateToProps, actions)(MyStories);
