import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import { getContent } from 'actions/story-actions';

import Brick from './Brick';
import PaginationElement from 'components/PaginationElement';

class StoryContent extends Component {
  static propTypes = {
    storyPages: PropTypes.number.isRequired,
    storyPage: PropTypes.number.isRequired,
    stories: PropTypes.array.isRequired,
    getContent: PropTypes.func.isRequired
  }

  componentWillMount () {
    // get the stories to display
    this.props.getContent();
  }

  render() {
    const { storyPage, storyPages, stories } = this.props;

    const masonryOptions = {
      transitionDuration: 0
    };

    const bricks = stories.map(brick =>
      <Brick key={brick._id} data={brick} />
    );

    return (
      <section id="cs-stories">
        <hr className="horizontal-rule" />
        <Grid>
          <Row>
            <Col sm={12} lg={10} lgOffset={1}>
              <Row className="grid">
                <Masonry
                  options={masonryOptions} // default {}
                  disableImagesLoaded={false} // default false
                  updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                  children={bricks}
                />
              </Row>
            </Col>
          </Row>
        </Grid>
        <PaginationElement items={storyPages} page={storyPage} />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    storyPages: state.content.current.pages,
    storyPage: state.content.current.page,
    stories: state.content.current.stories
  }
};

const mapDispatchToProps = dispatch => ({
  getContent: () => dispatch(getContent())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryContent);
