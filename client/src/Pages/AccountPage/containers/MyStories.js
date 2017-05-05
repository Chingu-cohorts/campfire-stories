import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMyStories } from 'actions/story-actions';
import { StoryThumbnail, WriteButton } from '../components';

class MyStories extends Component {
  static propTypes = {
    submitted: PropTypes.array.isRequired,
    getMyStories: PropTypes.func.isRequired
  }

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

const mapStateToProps = (state) => {
  return {
    submitted: state.content.submitted.stories
  }
};

const mapDispatchToProps = dispatch => ({
  getMyStories: () => dispatch(getMyStories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyStories);
