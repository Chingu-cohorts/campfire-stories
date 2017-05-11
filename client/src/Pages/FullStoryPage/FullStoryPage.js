import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import { getStory } from 'actions/story-actions'
import moment from 'moment';


class FullStoryPage extends Component {
  static propTypes = {
    getStory: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    currentStory: PropTypes.shape({
      image: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  }

  componentDidMount () {
    const id = this.props.location.pathname.slice(6)
    this.props.getStory(id)
  }

  render () {
    if (!this.props.currentStory) {
      return <div>loading :)...</div>
    }
    const {
      image,
      body,
      title,
      description,
      created_at,
      postedBy: { firstName, lastName }
    } = this.props.currentStory

    const time = moment(created_at, "YYYY-MM-DD").format('LL');

    return (
      <div className="subtle-background">
        <Grid>

          <Row className="story-title-row">
            <h2 className="full-story-title">{title}</h2>
          </Row>

          <Row className="story-writer-row">
            <div>
              <span className="full-story-writer">{`Written by ${firstName} ${lastName}`}</span>
              <span className="full-story-writer">Published on {time}</span>
            </div>
            <div>
              <a
                href={`http://twitter.com/share?text=This is an awesome story!!!`}
                id="share-tw"
                className="social-buttons"
                target="_blank">
                  <i className="fa fa-twitter" />
              </a>
              <a
                href=''
                id="share-tw"
                className="social-buttons"
                target="_blank">
                  <i className="fa fa-facebook" />
              </a>
            </div>
          </Row>

          <Row>
            <Col md={8} mdOffset={2} className="full-story-content-container">
              <div className="no-padding-picture full-head">
                <div className="post-image">
                  <img alt="body" src={image} className="img-responsive" />
                  <span className="post-description">{description}</span>
                </div>
              </div>
              <span className="horizontal-rule"></span>
              <p className="post-text">{body}</p>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentStory: state.content.currentStory.story
  }
};

const mapDispatchToProps = dispatch => ({
  getStory: _id => dispatch(getStory(_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullStoryPage);
