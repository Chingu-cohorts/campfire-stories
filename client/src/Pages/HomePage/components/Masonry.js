import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';;
import Masonry from 'react-masonry-component';
import * as actions from 'actions/story-actions';

import Brick from './Brick';
import Controls from './Controls';

const StoryContent = ({ page, current, count, getContent }) => {
  const masonryOptions = {
    transitionDuration: 0
  };

  const bricks = current.map(brick =>
    <Brick key={brick._id} data={brick} />
  );

  const controlRow = (
    <Controls getContent={getContent} page={page} count={count} />
  );

  return (
    <section className="bg-white" id="cs-stories">
      <hr className="horizontal-rule" />
      <Grid>
        <Row>
          <Col sm={4} lg={10} smOffset={1}>
            <Row className="grid">
              {controlRow}
              <Masonry
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              >
                {bricks}
              </Masonry>
              <div className='bottom-buttons'>
                {controlRow}
              </div>
            </Row>
          </Col>
        </Row>
      </Grid>
    </section>
  );
};


/*
 * Redux
 */
function mapStateToProps(state) {
  return {
    page: state.content.storyPage,
    count: state.content.count
  }
};

export default connect(mapStateToProps, actions)(StoryContent);
