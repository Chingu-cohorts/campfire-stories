import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import * as actions from 'actions/story-actions';

import Brick from './Brick';
import PaginationElement from 'components/PaginationElement';

const StoryContent = ({ storyPage, storyPages, current }) => {
  const masonryOptions = {
    transitionDuration: 0
  };

  const bricks = current.map(brick =>
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
              >
                {bricks}
              </Masonry>
            </Row>
          </Col>
        </Row>
      </Grid>
      <PaginationElement items={storyPages} page={storyPage} />
    </section>
  );
};

function mapStateToProps(state) {
  return {
    storyPages: state.content.storyPages,
    storyPage: state.content.storyPage,
  }
};

export default connect(mapStateToProps, actions)(StoryContent);
