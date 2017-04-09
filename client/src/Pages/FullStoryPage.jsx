import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import * as actions from 'actions/story-actions'
import moment from 'moment';


class FullStoryPage extends Component {
  componentDidMount () {
    let id = this.props.location.pathname.slice(6)
    this.props.getStory(id)
  }

  render () {
    if (!this.props.currentStory) {
      return <div>loading :)...</div>
    }
    let { image, body, created_at, postedBy: { firstName, lastName } } = this.props.currentStory
    let time = moment(created_at, "YYYY-MM-DD").format('LL');
    // const url= `${window.location.host}${this.props.location.pathname}`
    return (
      <div id="full-story">
        <Grid className="full-story section bg-white padding-top padding-bottom">
          <Row>
            <Col md={8} mdOffset={2}>
              <div className="no-padding-picture full-head">
                <div className="post-header">
                  <h1 className="post-title">{`${firstName} ${lastName}`}</h1>
                  <p className="post-date">Published on {time}</p>
                </div>
                <div className="post-image">
                  <img alt="body" src={image} className="img-responsive" />
                </div>
              </div>
              <p className="post-text">{body}</p>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="social-buttons">
              <a
                href={`http://twitter.com/share?text=This is an awesome story!!!`}
                id="share-tw"
                target="_blank"
              >
                <i className="fa fa-twitter" />
              </a>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentStory: state.content.currentStory
  }
}

export default connect(mapStateToProps, actions)(FullStoryPage)
